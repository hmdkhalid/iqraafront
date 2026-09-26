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

import { Cnss, CnssService } from '../../../layout/service/cnss.service';

@Component({
    selector: 'app-cnss',
    templateUrl: './cnss.component.html',
    styleUrls: ['./cnss.component.css'],
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
export class CnssComponent implements OnInit {
    cnssList: Cnss[] = [];
    selectedCnss: Cnss[] = [];
    totalGeneral: number = 0;

    newCnss: Cnss = { date: '', type: '', prix: 0 };
    editCnss: Cnss = { date: '', type: '', prix: 0 };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private cnssService: CnssService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getCnss();
        this.loadTotalFromBackend();
    }

    getCnss(): void {
        this.cnssService.getAll().subscribe({
            next: (data) => {
                this.cnssList = data;
                this.updateTotalLocal();
            },
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Chargement impossible'
                })
        });
    }

    /** 🔹 Charge le total depuis le backend */
    loadTotalFromBackend(): void {
        this.cnssService.getTotal().subscribe({
            next: (total) => (this.totalGeneral = total),
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de calculer le total'
                })
        });
    }

    /** 🔹 Calcule le total localement */
    updateTotalLocal(): void {
        this.totalGeneral = this.cnssList.reduce((acc, c) => acc + (c.prix || 0), 0);
    }

    ajouterCnss(): void {
        if (!this.newCnss.type.trim()) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Type requis'
            });
            return;
        }

        this.cnssService.create(this.newCnss).subscribe((c) => {
            this.cnssList.push(c);
            this.newCnss = { date: '', type: '', prix: 0 };
            this.showAddDialog = false;
            this.updateTotalLocal();
            this.messageService.add({
                severity: 'success',
                summary: 'Ajoutée',
                detail: 'Cotisation ajoutée'
            });
        });
    }

    ouvrirModifierCnss(cnss: Cnss): void {
        this.editCnss = { ...cnss };
        this.showEditDialog = true;
    }

    modifierCnss(): void {
        if (this.editCnss.id) {
            this.cnssService.update(this.editCnss.id, this.editCnss).subscribe(() => {
                this.getCnss();
                this.loadTotalFromBackend();
                this.showEditDialog = false;
                this.messageService.add({
                    severity: 'info',
                    summary: 'Modifiée',
                    detail: 'Cotisation modifiée'
                });
            });
        }
    }

    supprimerCnss(id: string | undefined, type: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${type}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.cnssService.delete(id).subscribe(() => {
                    this.getCnss();
                    this.loadTotalFromBackend();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Supprimée',
                        detail: 'Cotisation supprimée'
                    });
                });
            }
        });
    }

    supprimerCnssSelectionnees(): void {
        const toDelete = this.selectedCnss
            .map((c) => c.id)
            .filter((id) => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les cotisations sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.cnssService.delete(id).subscribe(() => {
                        this.getCnss();
                        this.loadTotalFromBackend();
                    });
                });
                this.selectedCnss = [];
                this.messageService.add({
                    severity: 'success',
                    summary: 'Supprimées',
                    detail: 'Cotisations supprimées'
                });
            }
        });
    }

    imprimer(): void {
        if (!this.cnssList || this.cnssList.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucune cotisation CNSS à imprimer'
            });
            return;
        }

        let contenu = `
    <html>
    <head>
        <title>Liste Cotisations CNSS</title>
        <style>
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid black; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            h2 { text-align: center; }
        </style>
    </head>
    <body>
        <h2>Liste des Cotisations CNSS</h2>
        <table>
            <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Prix (MAD)</th>
            </tr>`;

        contenu += this.cnssList
            .map(
                (c) => `
            <tr>
                <td>${new Date(c.date).toLocaleDateString()}</td>
                <td>${c.type}</td>
                <td>${c.prix || 0}</td>
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
    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

}
