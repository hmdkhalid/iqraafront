import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Accident, AccidentService } from '../../../layout/service/accident.service';

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
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
    selector: 'app-accident',
    templateUrl: './accident.component.html',
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
        DropdownModule,
        FormsModule,
        DatePipe,
        DecimalPipe
    ]
})
export class AccidentComponent implements OnInit {
    accidents: Accident[] = [];
    selectedAccidents: Accident[] = [];
    newAccident: Accident = { nomPersonne: '', type: '', date: new Date(), montant: 0 };

    totalGeneral: number = 0;
    showDialog = false;
    isEditMode = false;

    // ✅ Dropdown options
    types = [
        { label: 'Professeur', value: 'Professeur' },
        { label: 'Étudiant', value: 'Étudiant' }
    ];

    constructor(
        private accidentService: AccidentService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadAccidents();
    }

    loadAccidents(): void {
        this.accidentService.getAllWithTotal().subscribe((response) => {
            this.accidents = response.accidents;
            this.totalGeneral = response.total;
        });
    }

    openNew(): void {
        this.newAccident = { nomPersonne: '', type: '', date: new Date(), montant: 0 };
        this.isEditMode = false;
        this.showDialog = true;
    }

    editAccident(accident: Accident): void {
        this.newAccident = { ...accident };
        this.isEditMode = true;
        this.showDialog = true;
    }

    saveAccident(): void {
        if (this.isEditMode && this.newAccident.id) {
            this.accidentService.update(this.newAccident.id, this.newAccident).subscribe(() => {
                this.loadAccidents();
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Accident mis à jour' });
            });
        } else {
            this.accidentService.create(this.newAccident).subscribe(() => {
                this.loadAccidents();
                this.messageService.add({ severity: 'success', summary: 'Succès', detail: 'Accident ajouté' });
            });
        }
        this.showDialog = false;
    }

    deleteAccident(id: string): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer cet accident ?',
            accept: () => {
                this.accidentService.delete(id).subscribe(() => {
                    this.loadAccidents();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Accident supprimé' });
                });
            }
        });
    }

    deleteSelectedAccidents(): void {
        this.confirmationService.confirm({
            message: 'Supprimer les accidents sélectionnés ?',
            accept: () => {
                const ids = this.selectedAccidents.map((a) => a.id!);
                ids.forEach((id) => {
                    this.accidentService.delete(id).subscribe(() => {
                        this.loadAccidents();
                    });
                });
                this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'Accidents supprimés' });
            }
        });
    }

    hideDialog(): void {
        this.showDialog = false;
    }

    imprimer(): void {
        const fenetre = window.open('', '', 'height=600,width=800');
        let rows = '';
        this.accidents.forEach((a) => {
            rows += `
                <tr>
                  <td>${a.nomPersonne || 'N/A'}</td>
                  <td>${a.type || 'N/A'}</td>
                  <td>${new Date(a.date).toLocaleDateString('fr-FR')}</td>
                  <td><strong>${(a.montant || 0).toFixed(2)} MAD</strong></td>
                </tr>`;
        });

        const totalGeneral = this.totalGeneral || 0;

        fenetre?.document.write(`
          <html>
            <head>
              <title>Rapport des Accidents</title>
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
              <h3>Rapport des Accidents</h3>
              <table>
                <thead>
                  <tr>
                    <th>Nom de la Personne</th>
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
                <div>Total Général : <span>${totalGeneral.toFixed(2)} MAD</span></div>
                <div>Nombre total d'Accidents : <span>${this.accidents.length}</span></div>
              </div>
            </body>
          </html>
        `);

        fenetre?.document.close();
        fenetre?.print();
    }
}
