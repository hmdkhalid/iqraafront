// ... imports déjà présents
import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { ReparationEcole, ReparationsEcoleService } from '../../../layout/service/ReparationsEcole.service';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-reparations-ecole',
    templateUrl: './reparation-ecole.component.html',
    styleUrls: ['./reparation-ecole.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        CardModule,
        ToolbarModule,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class ReparationEcoleComponent implements OnInit {
    reparations: ReparationEcole[] = [];
    selectedReparations: ReparationEcole[] = [];
    totalGeneral = 0;

    newReparation: ReparationEcole = { id: undefined, date: '', type: '', prix: 0 };
    editReparation: ReparationEcole = { id: undefined, date: '', type: '', prix: 0 };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private reparationsService: ReparationsEcoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.refreshData();
    }

    refreshData(): void {
        this.getReparations();
        this.getTotalGeneral();
    }

    getReparations(): void {
        this.reparationsService.getAll().subscribe({
            next: (data) => (this.reparations = data),
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Chargement impossible'
                })
        });
    }

    getTotalGeneral(): void {
        this.reparationsService.getTotal().subscribe({
            next: (total) => (this.totalGeneral = total),
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de calculer le total'
                })
        });
    }

    ajouterReparation(): void {
        if (!this.newReparation.type.trim() || !this.newReparation.date.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Type et date requis' });
            return;
        }
        if (this.newReparation.prix < 0) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Prix invalide' });
            return;
        }

        this.reparationsService.create(this.newReparation).subscribe((rep) => {
            this.reparations.push(rep);
            this.newReparation = { id: undefined, date: '', type: '', prix: 0 };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({ severity: 'success', summary: 'Ajoutée', detail: 'Réparation ajoutée' });
        });
    }

    ouvrirModifierReparation(rep: ReparationEcole): void {
        this.editReparation = { ...rep };
        this.showEditDialog = true;
    }

    modifierReparation(): void {
        if (this.editReparation.id) {
            this.reparationsService.update(this.editReparation.id, this.editReparation).subscribe(() => {
                this.refreshData();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifiée', detail: 'Réparation modifiée' });
            });
        }
    }

    supprimerReparation(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer la réparation "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.reparationsService.delete(id).subscribe(() => {
                    this.refreshData();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Réparation supprimée' });
                });
            }
        });
    }

    supprimerReparationsSelectionnees(): void {
        const toDelete = this.selectedReparations.map((r) => r.id).filter((id) => !!id) as string[];

        if (toDelete.length === 0) return;

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les réparations sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                forkJoin(toDelete.map((id) => this.reparationsService.delete(id))).subscribe(() => {
                    this.refreshData();
                    this.selectedReparations = [];
                    this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Réparations supprimées' });
                });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    /** 🔹 Méthode impression */
    imprimer(): void {
        if (!this.reparations || this.reparations.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucune réparation à imprimer'
            });
            return;
        }

        let contenu = `
      <html>
      <head>
        <title>Liste Réparations École</title>
        <style>
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        <h2>Liste des Réparations École</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Prix (MAD)</th>
          </tr>`;

        contenu += this.reparations
            .map(
                (r) => `
        <tr>
          <td>${new Date(r.date).toLocaleDateString()}</td>
          <td>${r.type}</td>
          <td>${r.prix || 0}</td>
        </tr>`
            )
            .join('');

        contenu += `
          <tr>
            <td colspan="2"><strong>Total Général</strong></td>
            <td><strong>${this.totalGeneral}</strong></td>
          </tr>
        </table>
      </body>
      </html>`;

        const popup = window.open('', '_blank', 'width=900,height=700');
        popup!.document.write(contenu);
        popup!.print();
    }
}
