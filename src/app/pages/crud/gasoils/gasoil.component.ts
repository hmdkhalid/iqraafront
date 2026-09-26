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
import { DropdownModule } from 'primeng/dropdown';
import { MessageService, ConfirmationService } from 'primeng/api';
import { Gasoil, GasoilService, Voiture } from '../../../layout/service/gasoils.service';

@Component({
    selector: 'app-gasoil',
    templateUrl: './gasoil.component.html',
    styleUrls: ['./gasoil.component.css'],
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
        ConfirmDialogModule,
        DropdownModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class GasoilComponent implements OnInit {

    gasoils: Gasoil[] = [];
    selectedGasoils: Gasoil[] = [];
    totalGeneral: number = 0;

    voitures: Voiture[] = [];

    newGasoil: Gasoil = { voiture: { matricule: '' }, paiements: [] };
    editGasoil: Gasoil = { voiture: { matricule: '' }, paiements: [] };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private gasoilService: GasoilService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadGasoils();
        this.loadVoitures();
    }

    loadGasoils(): void {
        this.gasoilService.getAll().subscribe(data => {
            this.gasoils = data;
            this.calculateTotalGeneral();
        });
    }

    loadVoitures(): void {
        this.gasoilService.getAllVoitures().subscribe(data => {
            this.voitures = data;
        });
    }

    calculateTotalGeneral(): void {
        this.totalGeneral = this.gasoils.reduce((sum, g) => sum + this.getTotalGasoil(g), 0);
    }

    getTotalGasoil(g: Gasoil): number {
        return g.paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
    }

    ouvrirAjouterGasoil(): void {
        const mois = ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'];
        this.newGasoil = {
            voiture: { matricule: '' },
            paiements: mois.map(m => ({ mois: m, montant: 0, datePaiement: null }))
        };
        this.showAddDialog = true;
    }

    ajouterGasoil(): void {
        // Debug: afficher la voiture sélectionnée
        console.log('Voiture sélectionnée:', this.newGasoil.voiture);
        console.log('Données complètes à envoyer:', this.newGasoil);

        if (!this.newGasoil.voiture || !this.newGasoil.voiture.matricule || this.newGasoil.voiture.matricule.trim() === '') {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Veuillez sélectionner une voiture' });
            return;
        }

        this.gasoilService.create(this.newGasoil).subscribe({
            next: (saved) => {
                console.log('Gasoil créé avec succès:', saved);
                this.gasoils.push(saved);
                this.calculateTotalGeneral();
                this.showAddDialog = false;
                this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Gasoil ajouté' });
            },
            error: (error) => {
                console.error('Erreur complète lors de la création:', error);
                console.error('Status:', error.status);
                console.error('Message:', error.message);
                console.error('Body:', error.error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: `Erreur ${error.status}: ${error.error?.message || error.message || 'Erreur inconnue'}`
                });
            }
        });
    }

    ouvrirModifierGasoil(g: Gasoil): void {
        this.editGasoil = JSON.parse(JSON.stringify(g));
        const mois = ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'];
        if (!this.editGasoil.paiements || !this.editGasoil.paiements.length) {
            this.editGasoil.paiements = mois.map(m => ({ mois: m, montant: 0, datePaiement: null }));
        } else {
            const existMois = this.editGasoil.paiements.map(p => p.mois);
            mois.forEach(m => {
                if (!existMois.includes(m)) {
                    this.editGasoil.paiements.push({ mois: m, montant: 0, datePaiement: null });
                }
            });
        }
        this.showEditDialog = true;
    }

    modifierGasoil(): void {
        if (!this.editGasoil.id) return;

        console.log('Voiture sélectionnée pour modification:', this.editGasoil.voiture);

        if (!this.editGasoil.voiture || !this.editGasoil.voiture.matricule || this.editGasoil.voiture.matricule.trim() === '') {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Veuillez sélectionner une voiture' });
            return;
        }

        this.gasoilService.update(this.editGasoil.id, this.editGasoil).subscribe({
            next: (updated) => {
                const index = this.gasoils.findIndex(g => g.id === updated.id);
                if (index !== -1) this.gasoils[index] = updated;
                this.calculateTotalGeneral();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'Gasoil modifié' });
            },
            error: (error) => {
                console.error('Erreur lors de la modification:', error);
                this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Erreur lors de la modification' });
            }
        });
    }

    supprimerGasoil(id?: string, matricule?: string): void {
        if (!id) return;
        this.confirmationService.confirm({
            message: `Voulez-vous supprimer le gasoil de "${matricule}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.gasoilService.delete(id).subscribe(() => {
                    this.gasoils = this.gasoils.filter(g => g.id !== id);
                    this.calculateTotalGeneral();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'Gasoil supprimé' });
                });
            }
        });
    }

    supprimerGasoilsSelectionnes(): void {
        const ids = this.selectedGasoils.map(g => g.id).filter(id => id !== undefined) as string[];
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les gasoils sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.gasoilService.deleteMany(ids).subscribe(() => {
                    this.gasoils = this.gasoils.filter(g => !ids.includes(g.id!));
                    this.calculateTotalGeneral();
                    this.selectedGasoils = [];
                    this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'Gasoils supprimés' });
                });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }

    imprimerTableau(): void {
        const printContents = document.getElementById('table-gasoil')?.innerHTML;
        if (!printContents) return;

        const printWindow = window.open('', '', 'width=900,height=650');
        if (printWindow) {
            printWindow.document.write(`
                <html>
                    <head>
                        <title>Impression Gasoils</title>
                        <style>
                            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                            th, td { border: 1px solid #333; padding: 8px; text-align: left; }
                            th { background: #f0f0f0; }
                            h2 { text-align: center; }
                            tfoot { font-weight: bold; background: #e8e8e8; }
                        </style>
                    </head>
                    <body>
                        <h2>Liste des Gasoils</h2>
                        ${printContents}
                    </body>
                </html>
            `);
            printWindow.document.close();
            printWindow.print();
        }
    }
}
