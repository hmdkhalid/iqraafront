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

import { Revenu, RevenusService } from '../../../layout/service/revenus.service';

@Component({
    selector: 'app-revenuss',
    templateUrl: './revenuss.component.html',
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
export class RevenussComponent implements OnInit {
    revenus: Revenu[] = [];
    selectedRevenus: Revenu[] = [];
    totalGeneral: number = 0;

    // 🔹 Ajout du nouvel attribut `resteAnneeDerniere`
    newRevenu: Revenu = {
        montantRevenusBureau: 0,
        montantRevenusActivitesParalleles: 0,
        resteAnneeDerniere: 0,
        totalGeneral: 0
    };
    editRevenu: Revenu = {
        montantRevenusBureau: 0,
        montantRevenusActivitesParalleles: 0,
        resteAnneeDerniere: 0,
        totalGeneral: 0
    };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt!: Table;

    constructor(
        private revenusService: RevenusService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getRevenus();
    }

    // Charger les revenus + calcul du total général
    getRevenus(): void {
        this.revenusService.getAll().subscribe({
            next: (data) => {
                this.revenus = data;
                this.calculerTotalGeneral();
            },
            error: () =>
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Impossible de charger les revenus' })
        });
    }

    // Calcule le total général (inclut maintenant resteAnneeDerniere)
    calculerTotalGeneral(): void {
        this.totalGeneral = this.revenus.reduce(
            (sum, r) =>
                sum +
                (r.montantRevenusBureau || 0) +
                (r.montantRevenusActivitesParalleles || 0) +
                (r.resteAnneeDerniere || 0),
            0
        );
    }

    // Ajouter un revenu
    ajouterRevenu(): void {
        this.newRevenu.totalGeneral =
            (this.newRevenu.montantRevenusBureau || 0) +
            (this.newRevenu.montantRevenusActivitesParalleles || 0) +
            (this.newRevenu.resteAnneeDerniere || 0);

        this.revenusService.create(this.newRevenu).subscribe({
            next: (r) => {
                this.revenus.push(r);
                this.newRevenu = { montantRevenusBureau: 0, montantRevenusActivitesParalleles: 0, resteAnneeDerniere: 0, totalGeneral: 0 };
                this.showAddDialog = false;
                this.calculerTotalGeneral();
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Revenu ajouté avec succès' });
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de l\'ajout' })
        });
    }

    ouvrirModifierRevenu(r: Revenu): void {
        this.editRevenu = { ...r };
        this.showEditDialog = true;
    }

    modifierRevenu(): void {
        if (!this.editRevenu.id) return;

        this.editRevenu.totalGeneral =
            (this.editRevenu.montantRevenusBureau || 0) +
            (this.editRevenu.montantRevenusActivitesParalleles || 0) +
            (this.editRevenu.resteAnneeDerniere || 0);

        this.revenusService.update(this.editRevenu.id, this.editRevenu).subscribe({
            next: () => {
                this.getRevenus();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'Revenu modifié avec succès' });
            },
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Échec de la modification' })
        });
    }

    supprimerRevenu(id: string | undefined): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous vraiment supprimer ce revenu ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.revenusService.delete(id).subscribe(() => {
                    this.getRevenus();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Revenu supprimé avec succès' });
                });
            }
        });
    }

    supprimerRevenusSelectionnes(): void {
        const toDelete = this.selectedRevenus.map((r) => r.id).filter((id) => id !== undefined) as string[];

        if (toDelete.length === 0) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Aucune sélection à supprimer' });
            return;
        }

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les revenus sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.revenusService.delete(id).subscribe(() => {
                        this.getRevenus();
                    });
                });
                this.selectedRevenus = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'Revenus supprimés' });
            }
        });
    }

    imprimer(): void {
        if (!this.revenus || this.revenus.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucun revenu à imprimer'
            });
            return;
        }

        let contenu = `
      <html>
      <head>
        <title>Liste Revenus</title>
        <style>
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid black; padding: 8px; text-align: left; }
          th { background-color: #f2f2f2; }
          h2 { text-align: center; }
        </style>
      </head>
      <body>
        <h2>Liste des Revenus</h2>
        <table>
          <tr>
            <th>Revenus Bureau</th>
            <th>Revenus Activités Parallèles</th>
            <th>Reste Année Dernière</th>
            <th>Total</th>
          </tr>`;

        contenu += this.revenus
            .map(
                (r) => `
          <tr>
            <td>${r.montantRevenusBureau}</td>
            <td>${r.montantRevenusActivitesParalleles}</td>
            <td>${r.resteAnneeDerniere}</td>
            <td><b>${r.totalGeneral}</b></td>
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
