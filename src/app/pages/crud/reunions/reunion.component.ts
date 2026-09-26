import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Reunion, ReunionService } from '../../../layout/service/reunion.service';

// PrimeNG
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { CalendarModule } from 'primeng/calendar';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-reunion',
    templateUrl: './reunion.component.html',
    providers: [MessageService, ConfirmationService],
    standalone: true,
    imports: [
        ToolbarModule,
        TableModule,
        DialogModule,
        CalendarModule,
        ToastModule,
        ConfirmDialogModule,
        ButtonModule,
        InputTextModule,
        RippleModule,
        FormsModule,
        DatePipe,
        DecimalPipe
    ]
})
export class ReunionComponent implements OnInit {
    reunions: Reunion[] = [];
    selectedReunions: Reunion[] = [];
    newReunion: Reunion = { type: '', date: new Date(), montant: undefined };

    totalGeneral: number = 0;
    showDialog = false;
    isEditMode = false;

    constructor(
        private reunionService: ReunionService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadReunions();
    }

    loadReunions(): void {
        this.reunionService.getAllWithTotal().subscribe((response) => {
            this.reunions = response.reunions;
            this.totalGeneral = response.total;
        });
    }

    openNew(): void {
        this.newReunion = { type: '', date: new Date(), montant: undefined };
        this.isEditMode = false;
        this.showDialog = true;
    }

    editReunion(reunion: Reunion): void {
        this.newReunion = { ...reunion };
        this.isEditMode = true;
        this.showDialog = true;
    }

    saveReunion(): void {
        if (this.isEditMode && this.newReunion.id) {
            this.reunionService.update(this.newReunion.id, this.newReunion).subscribe(() => {
                this.loadReunions();
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Réunion mise à jour' });
            });
        } else {
            this.reunionService.create(this.newReunion).subscribe(() => {
                this.loadReunions();
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Réunion ajoutée' });
            });
        }
        this.showDialog = false;
    }

    deleteReunion(id: string): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer cette réunion ?',
            accept: () => {
                this.reunionService.delete(id).subscribe(() => {
                    this.loadReunions();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Réunion supprimée' });
                });
            }
        });
    }

    deleteSelectedReunions(): void {
        this.confirmationService.confirm({
            message: 'Supprimer les réunions sélectionnées ?',
            accept: () => {
                const ids = this.selectedReunions.map((r) => r.id!);
                ids.forEach((id) => {
                    this.reunionService.delete(id).subscribe(() => {
                        this.loadReunions();
                    });
                });
                this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Réunions supprimées' });
            }
        });
    }

    hideDialog(): void {
        this.showDialog = false;
    }

    imprimer(): void {
        const fenetre = window.open('', '', 'height=600,width=800');
        let rows = '';

        this.reunions.forEach(r => {
            rows += `
                <tr>
                    <td>${r.type || 'N/A'}</td>
                    <td>${new Date(r.date).toLocaleDateString('fr-FR')}</td>
                    <td><strong>${r.montant ? r.montant.toFixed(2) + ' MAD' : 'N/A'}</strong></td>
                </tr>`;
        });

        fenetre?.document.write(`
            <html>
              <head>
                <title>Rapport des Réunions</title>
                <style>
                  body { font-family: Arial, sans-serif; margin: 20px; }
                  table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                  th, td { border: 1px solid #ddd; padding: 8px; text-align: center; }
                  th { background: #f5f5f5; }
                  h3 { text-align: center; margin-bottom: 20px; }
                  .totaux { margin-top: 30px; }
                  .totaux div { margin: 8px 0; font-size: 16px; }
                  .totaux span { font-weight: bold; }
                </style>
              </head>
              <body>
                <h3>Rapport des Réunions</h3>
                <table>
                  <thead>
                    <tr>
                      <th>Type</th>
                      <th>Date</th>
                      <th>Montant</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${rows}
                  </tbody>
                </table>

                <div class="totaux">
                  <div>Total Général : <span>${(this.totalGeneral || 0).toFixed(2)} MAD</span></div>
                  <div>Nombre total de Réunions : <span>${this.reunions.length}</span></div>
                </div>
              </body>
            </html>
        `);

        fenetre?.document.close();
        fenetre?.print();
    }
}
