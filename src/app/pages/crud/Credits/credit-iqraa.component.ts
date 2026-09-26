import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule, Table } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { Credit, CreditService } from '../../../layout/service/Credit.service';

@Component({
    selector: 'app-credit-iqraa',
    templateUrl: './credit-iqraa.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ToolbarModule,
        TableModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        ButtonModule,
        InputTextModule,
        CalendarModule,
        InputNumberModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class CreditIqraaComponent implements OnInit {
    // Table pour la recherche
    @ViewChild('dtIqraa1') dtIqraa1!: Table;
    @ViewChild('dtIqraa2') dtIqraa2!: Table;

    creditsIqraa1: Credit[] = [];
    creditsIqraa2: Credit[] = [];

    selectedIqraa1: Credit[] = [];
    selectedIqraa2: Credit[] = [];

    newIqraa1: Credit = { ecole: 'Iqraa1', nomPersonne: '', prix: 0, annee: new Date().getFullYear() };
    newIqraa2: Credit = { ecole: 'Iqraa2', nomPersonne: '', prix: 0, annee: new Date().getFullYear() };

    showAddIqraa1 = false;
    showAddIqraa2 = false;
    isEditMode = false;

    constructor(
        private creditService: CreditService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    // Charger les crédits
    loadData(): void {
        this.creditService.getByEcole('Iqraa1').subscribe({
            next: (data) => (this.creditsIqraa1 = data),
            error: () =>
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger Iqraa1' })
        });

        this.creditService.getByEcole('Iqraa2').subscribe({
            next: (data) => (this.creditsIqraa2 = data),
            error: () =>
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger Iqraa2' })
        });
    }

    // CRUD Iqraa1
    ouvrirAjouterIqraa1(): void {
        this.newIqraa1 = { ecole: 'Iqraa1', nomPersonne: '', prix: 0, annee: new Date().getFullYear() };
        this.isEditMode = false;
        this.showAddIqraa1 = true;
    }

    ajouterIqraa1(): void {
        if (this.validerCredit(this.newIqraa1)) {
            if (this.isEditMode && this.newIqraa1.id) {
                this.creditService.update(this.newIqraa1.id, this.newIqraa1).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa1 = false;
                        this.isEditMode = false;
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Crédit modifié (Iqraa1)' });
                    }
                });
            } else {
                this.creditService.create(this.newIqraa1).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa1 = false;
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Crédit ajouté (Iqraa1)' });
                    }
                });
            }
        }
    }

    ouvrirModifierIqraa1(c: Credit): void {
        this.newIqraa1 = { ...c };
        this.isEditMode = true;
        this.showAddIqraa1 = true;
    }

    supprimerIqraa1(id: string): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ce crédit ?',
            accept: () => {
                this.creditService.delete(id).subscribe(() => {
                    this.loadData();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Crédit supprimé (Iqraa1)' });
                });
            }
        });
    }

    supprimerIqraa1Selectionnes(): void {
        const ids = this.selectedIqraa1.map((c) => c.id!).filter(Boolean) as string[];
        if (ids.length > 0) {
            this.confirmationService.confirm({
                message: `Supprimer ${ids.length} crédits ?`,
                accept: () => {
                    this.creditService.deleteMany(ids).subscribe(() => {
                        this.loadData();
                        this.selectedIqraa1 = [];
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Crédits supprimés (Iqraa1)' });
                    });
                }
            });
        }
    }

    // CRUD Iqraa2 (même logique que Iqraa1)
    ouvrirAjouterIqraa2(): void {
        this.newIqraa2 = { ecole: 'Iqraa2', nomPersonne: '', prix: 0, annee: new Date().getFullYear() };
        this.isEditMode = false;
        this.showAddIqraa2 = true;
    }

    ajouterIqraa2(): void {
        if (this.validerCredit(this.newIqraa2)) {
            if (this.isEditMode && this.newIqraa2.id) {
                this.creditService.update(this.newIqraa2.id, this.newIqraa2).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa2 = false;
                        this.isEditMode = false;
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Crédit modifié (Iqraa2)' });
                    }
                });
            } else {
                this.creditService.create(this.newIqraa2).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa2 = false;
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Crédit ajouté (Iqraa2)' });
                    }
                });
            }
        }
    }

    ouvrirModifierIqraa2(c: Credit): void {
        this.newIqraa2 = { ...c };
        this.isEditMode = true;
        this.showAddIqraa2 = true;
    }

    supprimerIqraa2(id: string): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ce crédit ?',
            accept: () => {
                this.creditService.delete(id).subscribe(() => {
                    this.loadData();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Crédit supprimé (Iqraa2)' });
                });
            }
        });
    }

    supprimerIqraa2Selectionnes(): void {
        const ids = this.selectedIqraa2.map((c) => c.id!).filter(Boolean) as string[];
        if (ids.length > 0) {
            this.confirmationService.confirm({
                message: `Supprimer ${ids.length} crédits ?`,
                accept: () => {
                    this.creditService.deleteMany(ids).subscribe(() => {
                        this.loadData();
                        this.selectedIqraa2 = [];
                        this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Crédits supprimés (Iqraa2)' });
                    });
                }
            });
        }
    }

    // Validation
    private validerCredit(c: Credit): boolean {
        if (!c.nomPersonne || c.nomPersonne.trim() === '') {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Nom obligatoire' });
            return false;
        }
        if (!c.prix || c.prix <= 0) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Prix > 0 requis' });
            return false;
        }
        if (!c.annee) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Année obligatoire' });
            return false;
        }
        return true;
    }

    // Totaux
    getTotalIqraa1(): number {
        return this.creditsIqraa1.reduce((sum, c) => sum + (c.prix || 0), 0);
    }
    getTotalIqraa2(): number {
        return this.creditsIqraa2.reduce((sum, c) => sum + (c.prix || 0), 0);
    }
    getTotalGeneral(): number {
        return this.getTotalIqraa1() + this.getTotalIqraa2();
    }

    // Recherche
    onSearchIqraa1(event: Event): void {
        this.dtIqraa1.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }
    onSearchIqraa2(event: Event): void {
        this.dtIqraa2.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    // Annuler
    annulerIqraa1(): void {
        this.showAddIqraa1 = false;
        this.isEditMode = false;
    }
    annulerIqraa2(): void {
        this.showAddIqraa2 = false;
        this.isEditMode = false;
    }
    // Impression Iqraa1
    imprimerIqraa1(): void {
        if (!this.creditsIqraa1 || this.creditsIqraa1.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Info', detail: 'Aucun crédit Iqraa1 à imprimer' });
            return;
        }

        let contenu = `
    <html>
    <head>
        <title>Crédits Iqraa 1</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
        </style>
    </head>
    <body>
        <h2>Liste des Crédits - Iqraa 1</h2>
        <table>
            <tr>
                <th>Nom</th>
                <th>Prix (MAD)</th>
                <th>Année</th>
                <th>Total</th>
            </tr>`;

        contenu += this.creditsIqraa1.map(c =>
            `<tr>
            <td>${c.nomPersonne}</td>
            <td>${c.prix}</td>
            <td>${c.annee}</td>
            <td>${c.total || 0}</td>
        </tr>`
        ).join('');

        contenu += `
        <tr>
            <td colspan="3"><strong>Total Iqraa 1</strong></td>
            <td><strong>${this.getTotalIqraa1()}</strong></td>
        </tr>
        </table>
    </body>
    </html>`;

        const popup = window.open('', '_blank', 'width=900,height=700');
        popup!.document.write(contenu);
        popup!.print();
    }


    imprimerIqraa2(): void {
        if (!this.creditsIqraa2 || this.creditsIqraa2.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Info', detail: 'Aucun crédit Iqraa2 à imprimer' });
            return;
        }

        let contenu = `
    <html>
    <head>
        <title>Crédits Iqraa 2</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
        </style>
    </head>
    <body>
        <h2>Liste des Crédits - Iqraa 2</h2>
        <table>
            <tr>
                <th>Nom</th>
                <th>Prix (MAD)</th>
                <th>Année</th>
                <th>Total</th>
            </tr>`;

        contenu += this.creditsIqraa2.map(c =>
            `<tr>
            <td>${c.nomPersonne}</td>
            <td>${c.prix}</td>
            <td>${c.annee}</td>
            <td>${c.total || 0}</td>
        </tr>`
        ).join('');

        contenu += `
        <tr>
            <td colspan="3"><strong>Total Iqraa 2</strong></td>
            <td><strong>${this.getTotalIqraa2()}</strong></td>
        </tr>
        </table>
    </body>
    </html>`;

        const popup = window.open('', '_blank', 'width=900,height=700');
        popup!.document.write(contenu);
        popup!.print();
    }

}
