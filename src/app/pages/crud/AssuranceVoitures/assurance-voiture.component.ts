// ... imports existants ...
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { AssuranceVoiture, AssuranceVoitureService, Voiture, VoitureService } from '../../../layout/service/assurance-voiture.service';

// Imports PrimeNG
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-assurance-voiture',
    standalone: true,
    templateUrl: './assurance-voiture.component.html',
    imports: [
        CommonModule,
        ToolbarModule,
        TableModule,
        FormsModule,
        DialogModule,
        ToastModule,
        ConfirmDialogModule,
        ButtonModule,
        InputTextModule,
        DropdownModule
    ],
    providers: [ConfirmationService, MessageService]
})
export class AssuranceVoitureComponent implements OnInit {
    assurances: AssuranceVoiture[] = [];
    selectedAssurances: AssuranceVoiture[] = [];
    newAssurance: AssuranceVoiture = this.initAssurance();

    // Pour le dropdown des voitures
    voitures: Voiture[] = [];
    selectedVoiture: Voiture | null = null;

    totalAssurance: number = 0;
    totalVisite: number = 0;

    showDialog: boolean = false;
    isEditMode: boolean = false;

    constructor(
        private assuranceService: AssuranceVoitureService,
        private voitureService: VoitureService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadAssurances();
        this.loadTotals();
        this.loadVoitures();
    }

    // Init
    initAssurance(): AssuranceVoiture {
        return {
            matricule: '',
            prixAssurance: 0,
            prixVisite: 0
        };
    }

    // Charger toutes les voitures
    loadVoitures() {
        this.voitureService.getAll().subscribe({
            next: (voitures) => {
                this.voitures = voitures;
                console.log('Voitures chargées:', voitures);
            },
            error: (error) => {
                console.error('Erreur chargement voitures:', error);
                this.messageService.add({
                    severity: 'warn',
                    summary: 'Attention',
                    detail: 'Impossible de charger la liste des voitures'
                });
            }
        });
    }

    // Charger toutes les assurances
    loadAssurances() {
        this.assuranceService.getAll().subscribe({
            next: (data) => {
                this.assurances = data;
                console.log('Assurances chargées:', data);
            },
            error: (error) => {
                console.error('Erreur chargement assurances:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les assurances'
                });
            }
        });
    }

    // Charger les totaux
    loadTotals() {
        this.assuranceService.getTotalAssurance().subscribe({
            next: (total) => this.totalAssurance = total || 0,
            error: (error) => console.error('Erreur total assurance:', error)
        });

        this.assuranceService.getTotalVisite().subscribe({
            next: (total) => this.totalVisite = total || 0,
            error: (error) => console.error('Erreur total visite:', error)
        });
    }

    getTotalGeneral(): number {
        return (this.totalAssurance || 0) + (this.totalVisite || 0);
    }

    // Ajouter
    openNew() {
        this.newAssurance = this.initAssurance();
        this.selectedVoiture = null;
        this.isEditMode = false;
        this.showDialog = true;
        console.log('Dialog ouvert pour ajout');
    }

    // Éditer
    editAssurance(assurance: AssuranceVoiture) {
        this.newAssurance = { ...assurance };
        this.selectedVoiture = this.voitures.find(v => v.matricule === assurance.matricule) || null;
        this.isEditMode = true;
        this.showDialog = true;
        console.log('Dialog ouvert pour édition:', assurance);
    }

    onVoitureSelected(event: any) {
        if (this.selectedVoiture) {
            this.newAssurance.matricule = this.selectedVoiture.matricule;
            console.log('Voiture sélectionnée:', this.selectedVoiture);
        }
    }

    // Sauvegarder
    saveAssurance() {
        console.log('Sauvegarde:', this.newAssurance);

        if (!this.newAssurance.matricule || this.newAssurance.prixAssurance < 0 || this.newAssurance.prixVisite < 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Veuillez sélectionner une voiture et remplir tous les champs correctement'
            });
            return;
        }

        if (this.isEditMode && this.newAssurance.id) {
            this.assuranceService.update(this.newAssurance.id, this.newAssurance).subscribe({
                next: (result) => {
                    console.log('Mise à jour réussie:', result);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Assurance mise à jour avec succès'
                    });
                    this.hideDialog();
                    this.loadAssurances();
                    this.loadTotals();
                },
                error: (error) => {
                    console.error('Erreur mise à jour:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Échec de la mise à jour'
                    });
                }
            });
        } else {
            this.assuranceService.create(this.newAssurance).subscribe({
                next: (result) => {
                    console.log('Création réussie:', result);
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Succès',
                        detail: 'Assurance ajoutée avec succès'
                    });
                    this.hideDialog();
                    this.loadAssurances();
                    this.loadTotals();
                },
                error: (error) => {
                    console.error('Erreur création:', error);
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Erreur',
                        detail: 'Échec de l\'ajout'
                    });
                }
            });
        }
    }

    // Supprimer
    deleteAssurance(id: string) {
        console.log('Tentative suppression ID:', id);

        if (!id) {
            this.messageService.add({
                severity: 'error',
                summary: 'Erreur',
                detail: 'ID invalide'
            });
            return;
        }

        this.confirmationService.confirm({
            message: 'Voulez-vous vraiment supprimer cette assurance ?',
            header: 'Confirmation de suppression',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.assuranceService.delete(id).subscribe({
                    next: () => {
                        console.log('Suppression réussie');
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Assurance supprimée avec succès'
                        });
                        this.loadAssurances();
                        this.loadTotals();
                    },
                    error: (error) => {
                        console.error('Erreur suppression:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Échec de la suppression'
                        });
                    }
                });
            }
        });
    }

    // Supprimer plusieurs
    deleteSelectedAssurances() {
        if (!this.selectedAssurances || this.selectedAssurances.length === 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Aucune assurance sélectionnée'
            });
            return;
        }

        this.confirmationService.confirm({
            message: `Voulez-vous vraiment supprimer ${this.selectedAssurances.length} assurance(s) ?`,
            header: 'Confirmation de suppression multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                const ids = this.selectedAssurances.map(a => a.id!).filter(id => id);

                this.assuranceService.deleteMany(ids).subscribe({
                    next: () => {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: `${this.selectedAssurances.length} assurance(s) supprimée(s)`
                        });
                        this.selectedAssurances = [];
                        this.loadAssurances();
                        this.loadTotals();
                    },
                    error: (error) => {
                        console.error('Erreur suppression multiple:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Échec de la suppression multiple'
                        });
                    }
                });
            }
        });
    }

    // Fermer dialog
    hideDialog() {
        this.showDialog = false;
        this.newAssurance = this.initAssurance();
        this.selectedVoiture = null;
        this.isEditMode = false;
    }

    imprimer() {
        const fenetre = window.open('', '', 'height=600,width=800');

        // Construire le contenu de la table
        let rows = '';
        this.assurances.forEach(a => {
            const prixAssurance = a.prixAssurance || 0;
            const prixVisite = a.prixVisite || 0;
            const total = prixAssurance + prixVisite;

            rows += `
            <tr>
                <td>${a.matricule || 'N/A'}</td>
                <td>${prixAssurance.toFixed(2)} MAD</td>
                <td>${prixVisite.toFixed(2)} MAD</td>
                <td><strong>${total.toFixed(2)} MAD</strong></td>
            </tr>
        `;
        });

        const totalGeneral = this.getTotalGeneral();

        fenetre?.document.write(`
    <html>
      <head>
        <title>Impression Assurances</title>
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
        <h3>Rapport des Assurances Voitures</h3>
        <table>
          <thead>
            <tr>
              <th>Matricule</th>
              <th>Prix Assurance</th>
              <th>Prix Visite</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${rows}
          </tbody>
        </table>

        <div class="totaux">
          <div>Total Assurance : <span>${this.totalAssurance.toFixed(2)} MAD</span></div>
          <div>Total Visite : <span>${this.totalVisite.toFixed(2)} MAD</span></div>
          <div>Total Général : <span>${totalGeneral.toFixed(2)} MAD</span></div>
        </div>
      </body>
    </html>
  `);

        fenetre?.document.close();
        fenetre?.print();
    }


}
