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
import { Impot, ImpotsService } from '../../../layout/service/impots.service';

@Component({
    selector: 'app-impot',
    templateUrl: './impot.component.html',
    styleUrls: ['./impot.component.css'],
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
export class ImpotComponent implements OnInit {
    impots: Impot[] = [];
    selectedImpots: Impot[] = [];
    totalGeneral: number = 0;

    newImpot: Impot = { date: '', type: '', prix: 0 };
    editImpot: Impot = { date: '', type: '', prix: 0 };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private impotService: ImpotsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getImpots();
        this.getTotalGeneral();
    }

    getImpots(): void {
        this.impotService.getAll().subscribe({
            next: (data) => this.impots = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible' })
        });
    }

    getTotalGeneral(): void {
        this.impotService.getTotal().subscribe({
            next: (total) => this.totalGeneral = total,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de calculer le total' })
        });
    }

    ajouterImpot(): void {
        if (!this.newImpot.type.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Type requis' });
            return;
        }

        this.impotService.create(this.newImpot).subscribe((i) => {
            this.impots.push(i);
            this.newImpot = { date: '', type: '', prix: 0 };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Impôt ajouté' });
        });
    }

    ouvrirModifierImpot(impot: Impot): void {
        this.editImpot = { ...impot };
        this.showEditDialog = true;
    }

    modifierImpot(): void {
        if (this.editImpot.id) {
            this.impotService.update(this.editImpot.id, this.editImpot).subscribe(() => {
                this.getImpots();
                this.getTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'Impôt modifié' });
            });
        }
    }

    supprimerImpot(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.impotService.delete(id).subscribe(() => {
                    this.getImpots();
                    this.getTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Impôt supprimé' });
                });
            }
        });
    }

    supprimerImpotsSelectionnes(): void {
        const toDelete = this.selectedImpots.map((i) => i.id).filter(id => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les impôts sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.impotService.delete(id).subscribe(() => {
                        this.getImpots();
                        this.getTotalGeneral();
                    });
                });
                this.selectedImpots = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'Impôts supprimés' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    // ✅ Impression de la liste des impôts
    imprimer(): void {
        if (!this.impots || this.impots.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucun impôt à imprimer'
            });
            return;
        }

        let contenu = `
      <html>
      <head>
        <title>Liste Impôts</title>
        <style>
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        <h2>Liste des Impôts</h2>
        <table>
          <tr>
            <th>Date</th>
            <th>Type</th>
            <th>Prix (MAD)</th>
          </tr>`;

        contenu += this.impots.map(
            (i) => `
        <tr>
          <td>${new Date(i.date).toLocaleDateString()}</td>
          <td>${i.type}</td>
          <td>${i.prix || 0}</td>
        </tr>`
        ).join('');

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
