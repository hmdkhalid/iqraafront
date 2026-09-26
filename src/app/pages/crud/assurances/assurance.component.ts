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
import { Assurance, AssuranceService } from '../../../layout/service/assurances.service';

@Component({
    selector: 'app-assurances',
    templateUrl: './assurance.component.html',
    styleUrls: ['./assurance.component.css'],
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
export class AssuranceComponent implements OnInit {
    assurances: Assurance[] = [];
    selectedAssurances: Assurance[] = [];
    totalGeneral: number = 0;

    newAssurance: Assurance = { date: '', type: '', prix: 0 };
    editAssurance: Assurance = { date: '', type: '', prix: 0 };

    showAddDialog = false;
    showEditDialog = false;

    typeOptions = [
        { label: 'Étudiant', value: 'Etudiant' },
        { label: 'Professeur', value: 'Professeur' }
    ];

    @ViewChild('dt') dt: any;

    constructor(
        private assuranceService: AssuranceService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getAssurances();
        this.getTotalGeneral();
    }

    getAssurances(): void {
        this.assuranceService.getAll().subscribe({
            next: (data) => this.assurances = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible' })
        });
    }

    getTotalGeneral(): void {
        this.assuranceService.getTotal().subscribe({
            next: (total) => this.totalGeneral = total,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de calculer le total' })
        });
    }

    ajouterAssurance(): void {
        if (!this.newAssurance.type) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Type requis' });
            return;
        }

        this.assuranceService.create(this.newAssurance).subscribe((a) => {
            this.assurances.push(a);
            this.newAssurance = { date: '', type: '', prix: 0 };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Assurance ajoutée' });
        });
    }

    ouvrirModifierAssurance(assurance: Assurance): void {
        this.editAssurance = { ...assurance };
        this.showEditDialog = true;
    }

    modifierAssurance(): void {
        if (this.editAssurance.id) {
            this.assuranceService.update(this.editAssurance.id, this.editAssurance).subscribe(() => {
                this.getAssurances();
                this.getTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifiée', detail: 'Assurance modifiée' });
            });
        }
    }

    supprimerAssurance(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.assuranceService.delete(id).subscribe(() => {
                    this.getAssurances();
                    this.getTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Assurance supprimée' });
                });
            }
        });
    }

    supprimerAssurancesSelectionnees(): void {
        const toDelete = this.selectedAssurances.map((a) => a.id).filter(id => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les assurances sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.assuranceService.delete(id).subscribe(() => {
                        this.getAssurances();
                        this.getTotalGeneral();
                    });
                });
                this.selectedAssurances = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Assurances supprimées' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    // 🔹 Méthode Impression
    imprimer(): void {
        if (!this.assurances || this.assurances.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucune assurance à imprimer'
            });
            return;
        }

        let contenu = `
        <html>
        <head>
            <title>Liste des Assurances</title>
            <style>
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                h2 { text-align: center; }
            </style>
        </head>
        <body>
            <h2>Liste des Assurances</h2>
            <table>
                <tr>
                    <th>Date</th>
                    <th>Type</th>
                    <th>Prix (MAD)</th>
                </tr>`;

        contenu += this.assurances
            .map(
                (a) => `
                <tr>
                    <td>${new Date(a.date).toLocaleDateString()}</td>
                    <td>${a.type}</td>
                    <td>${a.prix || 0}</td>
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
