import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Bibliotheque, BibliothequesService } from '../../../layout/service/Bibliotheques.service';

@Component({
    selector: 'app-bibliotheques',
    templateUrl: './bibliotheque.component.html',
    styleUrls: ['./bibliotheque.component.css'],
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
export class BibliothequeComponent implements OnInit {
    bibliotheques: Bibliotheque[] = [];
    selectedBibliotheques: Bibliotheque[] = [];
    totalGeneral: number = 0;

    newBibliotheque: Bibliotheque = { date: '', type: '', prix: 0 };
    editBibliotheque: Bibliotheque = { date: '', type: '', prix: 0 };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt!: Table;

    constructor(
        private bibliothequesService: BibliothequesService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getBibliotheques();
        this.getTotalGeneral();
    }

    getBibliotheques(): void {
        this.bibliothequesService.getAll().subscribe({
            next: (data) => this.bibliotheques = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible' })
        });
    }

    getTotalGeneral(): void {
        this.bibliothequesService.getTotal().subscribe({
            next: (total) => this.totalGeneral = total,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de calculer le total' })
        });
    }

    ajouterBibliotheque(): void {
        if (!this.newBibliotheque.type.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Type requis' });
            return;
        }

        this.bibliothequesService.create(this.newBibliotheque).subscribe((b) => {
            this.bibliotheques.push(b);
            this.newBibliotheque = { date: '', type: '', prix: 0 };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Bibliothèque ajoutée' });
        });
    }

    ouvrirModifierBibliotheque(biblio: Bibliotheque): void {
        this.editBibliotheque = { ...biblio };
        this.showEditDialog = true;
    }

    modifierBibliotheque(): void {
        if (this.editBibliotheque.id) {
            this.bibliothequesService.update(this.editBibliotheque.id, this.editBibliotheque).subscribe(() => {
                this.getBibliotheques();
                this.getTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifiée', detail: 'Bibliothèque modifiée' });
            });
        }
    }

    supprimerBibliotheque(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.bibliothequesService.delete(id).subscribe(() => {
                    this.getBibliotheques();
                    this.getTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Bibliothèque supprimée' });
                });
            }
        });
    }

    supprimerBibliothequesSelectionnees(): void {
        const toDelete = this.selectedBibliotheques.map((b) => b.id).filter(id => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les bibliothèques sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.bibliothequesService.delete(id).subscribe(() => {
                        this.getBibliotheques();
                        this.getTotalGeneral();
                    });
                });
                this.selectedBibliotheques = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Bibliothèques supprimées' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    /** 🔹 Imprimer tableau */
    /** 🔹 Imprimer tableau */
    imprimer(): void {
        if (!this.bibliotheques || this.bibliotheques.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucune bibliothèque à imprimer'
            });
            return;
        }

        let contenu = `
    <html>
    <head>
        <title>Liste Bibliothèques</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
        </style>
    </head>
    <body>
        <h2>Liste des Bibliothèques</h2>
        <table>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Prix (MAD)</th>
            </tr>`;

        contenu += this.bibliotheques
            .map(
                (b) => `
            <tr>
                <td>${new Date(b.date).toLocaleDateString()}</td>
                <td>${b.type}</td>
                <td>${b.prix || 0}</td>
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
