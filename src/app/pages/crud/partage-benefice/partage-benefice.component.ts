import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { Table, TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { MessageService, ConfirmationService } from 'primeng/api';

import { PartageBenefice, PartageBeneficeService } from '../../../layout/service/partage-benefice.service';

@Component({
    selector: 'app-partage-benefice',
    templateUrl: './partage-benefice.component.html',
    styleUrls: ['./partage-benefice.component.css'],
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        TableModule,
        ButtonModule,
        InputTextModule,
        DialogModule,
        CalendarModule,
        CardModule,
        ToolbarModule,
        ToastModule,
        ConfirmDialogModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class PartageBeneficeComponent implements OnInit {
    partages: PartageBenefice[] = [];
    totalGeneral: number = 0;

    newPartage: PartageBenefice = { montant: 0, datePartage: '' };
    editPartage: PartageBenefice = { montant: 0, datePartage: '' };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt!: Table;

    constructor(
        private service: PartageBeneficeService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getPartages();
        this.getTotalGeneral();
    }

    getPartages(): void {
        this.service.getAll().subscribe({
            next: (data) => (this.partages = data),
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Chargement impossible'
                })
        });
    }

    getTotalGeneral(): void {
        this.service.getTotal().subscribe({
            next: (total) => (this.totalGeneral = total),
            error: () =>
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de calculer le total'
                })
        });
    }

    ajouter(): void {
        this.service.create(this.newPartage).subscribe((p) => {
            this.partages.push(p);
            this.newPartage = { montant: 0, datePartage: '' };
            this.showAddDialog = false;
            this.getTotalGeneral();
            this.messageService.add({
                severity: 'success',
                summary: 'Ajouté',
                detail: 'Partage ajouté'
            });
        });
    }

    ouvrirModifier(p: PartageBenefice): void {
        this.editPartage = { ...p };
        this.showEditDialog = true;
    }

    modifier(): void {
        if (this.editPartage.id) {
            this.service.update(this.editPartage.id, this.editPartage).subscribe(() => {
                this.getPartages();
                this.getTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({
                    severity: 'info',
                    summary: 'Modifié',
                    detail: 'Partage modifié'
                });
            });
        }
    }

    supprimer(id?: string): void {
        if (!id) return;
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer ce partage ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.delete(id).subscribe(() => {
                    this.getPartages();
                    this.getTotalGeneral();
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Supprimé',
                        detail: 'Partage supprimé'
                    });
                });
            }
        });
    }

    /** 🔹 Imprimer tableau */
    imprimer(): void {
        if (!this.partages || this.partages.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Info',
                detail: 'Aucun partage à imprimer'
            });
            return;
        }

        let contenu = `
        <html>
        <head>
            <title>Liste des Partages de Bénéfices</title>
            <style>
                table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                th, td { border: 1px solid black; padding: 8px; text-align: left; }
                th { background-color: #f2f2f2; }
                h2 { text-align: center; }
            </style>
        </head>
        <body>
            <h2>Liste des Partages de Bénéfices</h2>
            <table>
                <tr>
                    <th>Montant (DH)</th>
                    <th>Date de partage</th>
                </tr>`;

        contenu += this.partages
            .map(
                (p) => `
                <tr>
                    <td>${p.montant}</td>
                  <td>${new Date(p.datePartage ?? new Date()).toLocaleDateString()}</td>
                </tr>`
            )
            .join('');

        contenu += `
                <tr>
                    <td><strong>Total Général</strong></td>
                    <td><strong>${this.totalGeneral} DH</strong></td>
                </tr>
            </table>
        </body>
        </html>`;

        const popup = window.open('', '_blank', 'width=900,height=700');
        popup!.document.write(contenu);
        popup!.print();
    }
}
