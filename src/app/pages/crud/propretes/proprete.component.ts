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
import { Proprete, PropreteService } from '../../../layout/service/propretes.service';

@Component({
    selector: 'app-proprete',
    templateUrl: './proprete.component.html',
    styleUrls: ['./proprete.component.css'],
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
export class PropreteComponent implements OnInit {
    propretes: Proprete[] = [];
    selectedPropretes: Proprete[] = [];
    totalGeneral: number = 0;

    newProprete: Proprete = { date: '', type: '', prix: 0 };
    editProprete: Proprete = { date: '', type: '', prix: 0 };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private propreteService: PropreteService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getPropretes();
        this.getTotalGeneral();
    }

    getPropretes(): void {
        this.propreteService.getAll().subscribe({
            next: (data) => this.propretes = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible' })
        });
    }

    getTotalGeneral(): void {
        this.propreteService.getTotal().subscribe({
            next: (total) => this.totalGeneral = total,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de calculer le total' })
        });
    }

    ajouterProprete(): void {
        if (!this.newProprete.type.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Type requis' });
            return;
        }

        this.propreteService.create(this.newProprete).subscribe((p) => {
            this.propretes.push(p);
            this.newProprete = { date: '', type: '', prix: 0 };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Propriété ajoutée' });
        });
    }

    ouvrirModifierProprete(proprete: Proprete): void {
        this.editProprete = { ...proprete };
        this.showEditDialog = true;
    }

    modifierProprete(): void {
        if (this.editProprete.id) {
            this.propreteService.update(this.editProprete.id, this.editProprete).subscribe(() => {
                this.getPropretes();
                this.getTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifiée', detail: 'Propriété modifiée' });
            });
        }
    }

    supprimerProprete(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.propreteService.delete(id).subscribe(() => {
                    this.getPropretes();
                    this.getTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Propriété supprimée' });
                });
            }
        });
    }

    supprimerPropretesSelectionnees(): void {
        const toDelete = this.selectedPropretes.map((p) => p.id).filter(id => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les propriétés sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.propreteService.delete(id).subscribe(() => {
                        this.getPropretes();
                        this.getTotalGeneral();
                    });
                });
                this.selectedPropretes = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Propriétés supprimées' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }
    imprimer(): void {
        if (!this.propretes || this.propretes.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucune propriété à imprimer'
            });
            return;
        }

        let contenu = `
    <html>
    <head>
        <title>Liste des Propriétés</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
        </style>
    </head>
    <body>
        <h2>Liste des Propriétés</h2>
        <table>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Prix (MAD)</th>
            </tr>`;

        contenu += this.propretes
            .map(
                (p) => `
            <tr>
                <td>${new Date(p.date).toLocaleDateString()}</td>
                <td>${p.type}</td>
                <td>${p.prix || 0}</td>
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
