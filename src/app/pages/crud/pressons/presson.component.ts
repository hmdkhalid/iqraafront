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
import { Presson, PressonsService } from '../../../layout/service/pressons.service';


@Component({
    selector: 'app-pressons',
    templateUrl: './presson.component.html',
    styleUrls: ['./presson.component.css'],
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
export class PressonComponent implements OnInit {

    pressons: Presson[] = [];
    selectedPressons: Presson[] = [];
    totalGeneral: number = 0;

    newPresson: Presson = { nomComplet: '', paiements: [] };
    editPresson: Presson = { nomComplet: '', paiements: [] };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private pressonsService: PressonsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadPressons();
    }

    // 🔹 Charger depuis backend
    loadPressons(): void {
        this.pressonsService.getAll().subscribe(data => {
            this.pressons = data;
            this.calculateTotalGeneral();
        });
    }

    calculateTotalGeneral(): void {
        this.totalGeneral = this.pressons.reduce((sum, p) => sum + this.getTotalPresson(p), 0);
    }

    getTotalPresson(p: Presson): number {
        return p.paiements.reduce((sum, pay) => sum + (pay.montant || 0), 0);
    }

    ouvrirAjouterPresson(): void {
        const mois = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];
        this.newPresson = {
            nomComplet: '',
            paiements: mois.map(m => ({ mois: m, montant: 0, datePaiement: undefined }))
        };

        this.showAddDialog = true;
    }

    // 🔹 Enregistrer sur MongoDB
    ajouterPresson(): void {
        if (!this.newPresson.nomComplet.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Nom complet requis' });
            return;
        }
        this.pressonsService.create(this.newPresson).subscribe({
            next: (saved) => {
                this.pressons.push(saved);
                this.calculateTotalGeneral();
                this.showAddDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Presson ajouté' });
            }
        });
    }

    ouvrirModifierPresson(p: Presson): void {
        // clone pour ne pas modifier directement la liste
        this.editPresson = JSON.parse(JSON.stringify(p));

        const mois = ['Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'];

        // si paiements vide ou null, on initialise avec les mois
        if (!this.editPresson.paiements || !this.editPresson.paiements.length) {
            this.editPresson.paiements = mois.map(m => ({ mois: m, montant: 0, datePaiement: null }));
        } else {
            // s'assurer que tous les mois sont présents
            const existMois = this.editPresson.paiements.map(pay => pay.mois);
            mois.forEach(m => {
                if (!existMois.includes(m)) {
                    this.editPresson.paiements.push({ mois: m, montant: 0, datePaiement: null });
                }
            });
        }

        this.showEditDialog = true;
    }



    modifierPresson(): void {
        if (!this.editPresson.id) return;
        this.pressonsService.update(this.editPresson.id, this.editPresson).subscribe({
            next: (updated) => {
                const index = this.pressons.findIndex(p => p.id === updated.id);
                if (index !== -1) this.pressons[index] = updated;
                this.calculateTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'Presson modifié' });
            }
        });
    }

    supprimerPresson(id?: string, nom?: string): void {
        if (!id) return;
        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${nom}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.pressonsService.delete(id).subscribe(() => {
                    this.pressons = this.pressons.filter(p => p.id !== id);
                    this.calculateTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Presson supprimé' });
                });
            }
        });
    }

    supprimerPressonsSelectionnees(): void {
        const ids = this.selectedPressons.map(p => p.id).filter(id => id !== undefined) as string[];
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les pressons sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                ids.forEach(id => {
                    this.pressonsService.delete(id).subscribe(() => {
                        this.pressons = this.pressons.filter(p => p.id !== id);
                        this.calculateTotalGeneral();
                    });
                });
                this.selectedPressons = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'Pressons supprimés' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }
    imprimerPressons(): void {
        if (!this.pressons || this.pressons.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucun presson à imprimer'
            });
            return;
        }

        let contenu = `
    <html>
    <head>
        <title>Liste des Pressons</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
        </style>
    </head>
    <body>
        <h2>Liste des Pressons</h2>
        <table>
            <tr>
                <th>Nom complet</th>
                <th>Total (MAD)</th>
            </tr>`;

        contenu += this.pressons
            .map(
                (p) => `
            <tr>
                <td>${p.nomComplet}</td>
                <td>${this.getTotalPresson(p)}</td>
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
