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
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Reparation, ReparationsService } from '../../../layout/service/reparations.service';
import { VoituresService } from '../../../layout/service/voitures.service';

@Component({
    selector: 'app-reparations',
    templateUrl: './reparation.component.html',
    styleUrls: ['./reparation.component.css'],
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
        ConfirmDialogModule,
        DropdownModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class ReparationComponent implements OnInit {
    reparations: Reparation[] = [];
    selectedReparations: Reparation[] = [];
    totalGeneral: number = 0;

    newReparation: Reparation = { matricule: '', type: '', date: '', montant: 0 };
    editReparation: Reparation = { matricule: '', type: '', date: '', montant: 0 };

    matricules: string[] = [];

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private reparationsService: ReparationsService,
        private voituresService: VoituresService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getReparations();
        this.getTotalGeneral();
        this.loadMatricules();
    }

    loadMatricules(): void {
        this.voituresService.getMatricules().subscribe({
            next: data => this.matricules = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les matricules' })
        });
    }

    getReparations(): void {
        this.reparationsService.getAll().subscribe({
            next: data => this.reparations = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible' })
        });
    }

    getTotalGeneral(): void {
        this.reparationsService.getTotal().subscribe({
            next: total => this.totalGeneral = total,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de calculer le total' })
        });
    }

    ajouterReparation(): void {
        if (!this.newReparation.matricule || !this.newReparation.type.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Matricule et type requis' });
            return;
        }

        this.reparationsService.create(this.newReparation).subscribe(r => {
            this.reparations.push(r);
            this.newReparation = { matricule: '', type: '', date: '', montant: 0 };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({ severity: 'success', summary: 'Ajoutée', detail: 'Réparation ajoutée' });
        });
    }

    ouvrirModifierReparation(rep: Reparation): void {
        this.editReparation = { ...rep };
        this.showEditDialog = true;
    }

    modifierReparation(): void {
        if (this.editReparation.id) {
            this.reparationsService.update(this.editReparation.id, this.editReparation).subscribe(() => {
                this.getReparations();
                this.getTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifiée', detail: 'Réparation modifiée' });
            });
        }
    }

    supprimerReparation(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.reparationsService.delete(id).subscribe(() => {
                    this.getReparations();
                    this.getTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Réparation supprimée' });
                });
            }
        });
    }

    supprimerReparationsSelectionnees(): void {
        const toDelete = this.selectedReparations.map(r => r.id).filter(id => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les réparations sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach(id => {
                    this.reparationsService.delete(id).subscribe(() => {
                        this.getReparations();
                        this.getTotalGeneral();
                    });
                });
                this.selectedReparations = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Réparations supprimées' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    // 🔹 Impression des réparations
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
            <title>Liste des Réparations</title>
            <style>
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                h2 { text-align: center; }
            </style>
        </head>
        <body>
            <h2>Liste des Réparations</h2>
            <table>
                <tr>
                    <th>Matricule</th>
                    <th>Type</th>
                    <th>Date</th>
                    <th>Montant (MAD)</th>
                </tr>`;

        contenu += this.reparations
            .map(
                (r) => `
                <tr>
                    <td>${r.matricule}</td>
                    <td>${r.type}</td>
                    <td>${new Date(r.date).toLocaleDateString()}</td>
                    <td>${r.montant || 0}</td>
                </tr>`
            )
            .join('');

        contenu += `
            <tr>
                <td colspan="3"><strong>Total Général</strong></td>
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
