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
import { Telephone, TelephoneService } from '../../../layout/service/telephones.service';

@Component({
    selector: 'app-telephone',
    templateUrl: './telephone.component.html',
    styleUrls: ['./telephone.component.css'],
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
export class TelephoneComponent implements OnInit {

    telephones: Telephone[] = [];
    selectedTelephones: Telephone[] = [];
    totalGeneral: number = 0;

    newTelephone: Telephone = { numero: '', paiements: [] };
    editTelephone: Telephone = { numero: '', paiements: [] };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private telephoneService: TelephoneService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadTelephones();
    }

    loadTelephones(): void {
        this.telephoneService.getAll().subscribe(data => {
            this.telephones = data;
            this.calculateTotalGeneral();
        });
    }

    calculateTotalGeneral(): void {
        this.totalGeneral = this.telephones.reduce((sum, t) => sum + this.getTotalTelephone(t), 0);
    }

    getTotalTelephone(t: Telephone): number {
        return t.paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
    }

    ouvrirAjouterTelephone(): void {
        const mois = ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'];
        this.newTelephone = {
            numero: '',
            paiements: mois.map(m => ({ mois: m, montant: 0, datePaiement: null }))
        };
        this.showAddDialog = true;
    }

    ajouterTelephone(): void {
        if (!this.newTelephone.numero.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Numéro requis' });
            return;
        }
        this.telephoneService.create(this.newTelephone).subscribe(saved => {
            this.telephones.push(saved);
            this.calculateTotalGeneral();
            this.showAddDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Téléphone ajouté' });
        });
    }

    ouvrirModifierTelephone(t: Telephone): void {
        this.editTelephone = JSON.parse(JSON.stringify(t));
        const mois = ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'];
        if (!this.editTelephone.paiements || !this.editTelephone.paiements.length) {
            this.editTelephone.paiements = mois.map(m => ({ mois: m, montant: 0, datePaiement: null }));
        } else {
            const existMois = this.editTelephone.paiements.map(p => p.mois);
            mois.forEach(m => {
                if (!existMois.includes(m)) {
                    this.editTelephone.paiements.push({ mois: m, montant: 0, datePaiement: null });
                }
            });
        }
        this.showEditDialog = true;
    }

    modifierTelephone(): void {
        if (!this.editTelephone.id) return;
        this.telephoneService.update(this.editTelephone.id, this.editTelephone).subscribe(updated => {
            const index = this.telephones.findIndex(t => t.id === updated.id);
            if (index !== -1) this.telephones[index] = updated;
            this.calculateTotalGeneral();
            this.showEditDialog = false;
            this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'Téléphone modifié' });
        });
    }

    supprimerTelephone(id?: string, numero?: string): void {
        if (!id) return;
        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${numero}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.telephoneService.delete(id).subscribe(() => {
                    this.telephones = this.telephones.filter(t => t.id !== id);
                    this.calculateTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Téléphone supprimé' });
                });
            }
        });
    }

    supprimerTelephonesSelectionnes(): void {
        const ids = this.selectedTelephones.map(t => t.id).filter(id => id !== undefined) as string[];
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les téléphones sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                ids.forEach(id => {
                    this.telephoneService.delete(id).subscribe(() => {
                        this.telephones = this.telephones.filter(t => t.id !== id);
                        this.calculateTotalGeneral();
                    });
                });
                this.selectedTelephones = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'Téléphones supprimés' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    // 🔹 NOUVELLE MÉTHODE IMPRIMER
    imprimer(): void {
        if (!this.telephones || this.telephones.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucun téléphone à imprimer'
            });
            return;
        }

        let contenu = `
        <html>
        <head>
            <title>Liste des Téléphones</title>
            <style>
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                h2 { text-align: center; }
            </style>
        </head>
        <body>
            <h2>Liste des Téléphones</h2>
            <table>
                <tr>
                    <th>Numéro</th>
                    <th>Total (MAD)</th>
                </tr>`;

        contenu += this.telephones
            .map(
                (t) => `
                <tr>
                    <td>${t.numero}</td>
                    <td>${this.getTotalTelephone(t)}</td>
                </tr>`
            )
            .join('');

        contenu += `
            <tr>
                <td><strong>Total Général</strong></td>
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
