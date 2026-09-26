import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EquipementEcole, EquipementEcoleService } from '../../../layout/service/equipementecole.service';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Table } from 'primeng/table';

@Component({
    selector: 'app-equipement-iqraa',
    templateUrl: './equipement-iqraa.component.html',
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
        CalendarModule
    ],
    providers: [MessageService, ConfirmationService]
})
export class EquipementIqraaComponent implements OnInit {
    // Références des tables pour la fonctionnalité de recherche
    @ViewChild('dtIqraa1') dtIqraa1!: Table;
    @ViewChild('dtIqraa2') dtIqraa2!: Table;

    equipementsIqraa1: EquipementEcole[] = [];
    equipementsIqraa2: EquipementEcole[] = [];

    selectedIqraa1: EquipementEcole[] = [];
    selectedIqraa2: EquipementEcole[] = [];

    newIqraa1: EquipementEcole = { nom: '', prix: 0, date: '', ecole: 'Iqraa1' };
    newIqraa2: EquipementEcole = { nom: '', prix: 0, date: '', ecole: 'Iqraa2' };

    showAddIqraa1 = false;
    showAddIqraa2 = false;
    isEditMode = false;

    constructor(
        private equipementService: EquipementEcoleService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadData();
    }

    loadData(): void {
        this.equipementService.getByEcole('Iqraa1').subscribe({
            next: (data) => this.equipementsIqraa1 = data,
            error: (error) => {
                console.error('Erreur lors du chargement des équipements Iqraa1:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les équipements Iqraa1'
                });
            }
        });

        this.equipementService.getByEcole('Iqraa2').subscribe({
            next: (data) => this.equipementsIqraa2 = data,
            error: (error) => {
                console.error('Erreur lors du chargement des équipements Iqraa2:', error);
                this.messageService.add({
                    severity: 'error',
                    summary: 'Erreur',
                    detail: 'Impossible de charger les équipements Iqraa2'
                });
            }
        });
    }

    // CRUD Iqraa1
    ouvrirAjouterIqraa1(): void {
        this.newIqraa1 = { nom: '', prix: 0, date: '', ecole: 'Iqraa1' };
        this.isEditMode = false;
        this.showAddIqraa1 = true;
    }

    ajouterIqraa1(): void {
        if (this.validerEquipement(this.newIqraa1)) {
            if (this.isEditMode && this.newIqraa1.id) {
                // Mode édition
                this.equipementService.update(this.newIqraa1.id, this.newIqraa1).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa1 = false;
                        this.isEditMode = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Équipement modifié dans Iqraa1'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de la modification:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible de modifier l\'équipement'
                        });
                    }
                });
            } else {
                // Mode création
                this.equipementService.create(this.newIqraa1).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa1 = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Équipement ajouté à Iqraa1'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de l\'ajout:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible d\'ajouter l\'équipement'
                        });
                    }
                });
            }
        }
    }

    ouvrirModifierIqraa1(eq: EquipementEcole): void {
        this.newIqraa1 = { ...eq };
        this.isEditMode = true;
        this.showAddIqraa1 = true;
    }

    supprimerIqraa1(id: string): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet équipement ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.equipementService.delete(id).subscribe({
                    next: () => {
                        this.loadData();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Supprimé',
                            detail: 'Équipement supprimé'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de la suppression:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible de supprimer l\'équipement'
                        });
                    }
                });
            }
        });
    }

    supprimerIqraa1Selectionnes(): void {
        if (this.selectedIqraa1.length === 0) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer ${this.selectedIqraa1.length} équipement(s) ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedIqraa1.map((e) => e.id!).filter(id => id != null) as string[];
                this.equipementService.deleteMany(ids).subscribe({
                    next: () => {
                        this.loadData();
                        this.selectedIqraa1 = [];
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Équipements supprimés (Iqraa1)'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de la suppression multiple:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible de supprimer les équipements'
                        });
                    }
                });
            }
        });
    }

    // CRUD Iqraa2
    ouvrirAjouterIqraa2(): void {
        this.newIqraa2 = { nom: '', prix: 0, date: '', ecole: 'Iqraa2' };
        this.isEditMode = false;
        this.showAddIqraa2 = true;
    }

    ajouterIqraa2(): void {
        if (this.validerEquipement(this.newIqraa2)) {
            if (this.isEditMode && this.newIqraa2.id) {
                this.equipementService.update(this.newIqraa2.id, this.newIqraa2).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa2 = false;
                        this.isEditMode = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Équipement modifié dans Iqraa2'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de la modification:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible de modifier l\'équipement'
                        });
                    }
                });
            } else {
                this.equipementService.create(this.newIqraa2).subscribe({
                    next: () => {
                        this.loadData();
                        this.showAddIqraa2 = false;
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Équipement ajouté à Iqraa2'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de l\'ajout:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible d\'ajouter l\'équipement'
                        });
                    }
                });
            }
        }
    }

    ouvrirModifierIqraa2(eq: EquipementEcole): void {
        this.newIqraa2 = { ...eq };
        this.isEditMode = true;
        this.showAddIqraa2 = true;
    }

    supprimerIqraa2(id: string): void {
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer cet équipement ?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.equipementService.delete(id).subscribe({
                    next: () => {
                        this.loadData();
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Supprimé',
                            detail: 'Équipement supprimé'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de la suppression:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible de supprimer l\'équipement'
                        });
                    }
                });
            }
        });
    }

    supprimerIqraa2Selectionnes(): void {
        if (this.selectedIqraa2.length === 0) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer ${this.selectedIqraa2.length} équipement(s) ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                const ids = this.selectedIqraa2.map((e) => e.id!).filter(id => id != null) as string[];
                this.equipementService.deleteMany(ids).subscribe({
                    next: () => {
                        this.loadData();
                        this.selectedIqraa2 = [];
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Succès',
                            detail: 'Équipements supprimés (Iqraa2)'
                        });
                    },
                    error: (error) => {
                        console.error('Erreur lors de la suppression multiple:', error);
                        this.messageService.add({
                            severity: 'error',
                            summary: 'Erreur',
                            detail: 'Impossible de supprimer les équipements'
                        });
                    }
                });
            }
        });
    }

    // Validation
    private validerEquipement(equipement: EquipementEcole): boolean {
        if (!equipement.nom || equipement.nom.trim() === '') {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Le nom de l\'équipement est obligatoire'
            });
            return false;
        }

        if (!equipement.prix || equipement.prix <= 0) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'Le prix doit être supérieur à 0'
            });
            return false;
        }

        if (!equipement.date) {
            this.messageService.add({
                severity: 'warn',
                summary: 'Attention',
                detail: 'La date est obligatoire'
            });
            return false;
        }

        return true;
    }

    // Totaux
    getTotalIqraa1(): number {
        return this.equipementsIqraa1.reduce((sum, e) => sum + (e.prix || 0), 0);
    }

    getTotalIqraa2(): number {
        return this.equipementsIqraa2.reduce((sum, e) => sum + (e.prix || 0), 0);
    }

    getTotalGeneral(): number {
        return this.getTotalIqraa1() + this.getTotalIqraa2();
    }

    // Impression
    imprimerIqraa1(): void {
        const printContent = this.genererContenuImpressionIqraa1();
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    }

    imprimerIqraa2(): void {
        const printContent = this.genererContenuImpressionIqraa2();
        const printWindow = window.open('', '_blank');
        if (printWindow) {
            printWindow.document.write(printContent);
            printWindow.document.close();
            printWindow.print();
        }
    }

    private genererContenuImpressionIqraa1(): string {
        const total = this.getTotalIqraa1();
        let html = `
            <html>
                <head>
                    <title>Équipements Iqraa 1</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .total { font-weight: bold; margin-top: 20px; }
                        h1 { text-align: center; }
                    </style>
                </head>
                <body>
                    <h1>Équipements Iqraa 1</h1>
                    <table>
                        <thead>
                            <tr><th>Date</th><th>Nom</th><th>Prix (MAD)</th></tr>
                        </thead>
                        <tbody>
        `;

        this.equipementsIqraa1.forEach(eq => {
            html += `<tr><td>${eq.date}</td><td>${eq.nom}</td><td>${eq.prix}</td></tr>`;
        });

        html += `
                        </tbody>
                    </table>
                    <div class="total">Total: ${total} MAD</div>
                </body>
            </html>
        `;

        return html;
    }

    private genererContenuImpressionIqraa2(): string {
        const total = this.getTotalIqraa2();
        let html = `
            <html>
                <head>
                    <title>Équipements Iqraa 2</title>
                    <style>
                        body { font-family: Arial, sans-serif; }
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                        th { background-color: #f2f2f2; }
                        .total { font-weight: bold; margin-top: 20px; }
                        h1 { text-align: center; }
                    </style>
                </head>
                <body>
                    <h1>Équipements Iqraa 2</h1>
                    <table>
                        <thead>
                            <tr><th>Date</th><th>Nom</th><th>Prix (MAD)</th></tr>
                        </thead>
                        <tbody>
        `;

        this.equipementsIqraa2.forEach(eq => {
            html += `<tr><td>${eq.date}</td><td>${eq.nom}</td><td>${eq.prix}</td></tr>`;
        });

        html += `
                        </tbody>
                    </table>
                    <div class="total">Total: ${total} MAD</div>
                </body>
            </html>
        `;

        return html;
    }

    // Méthodes pour gérer la recherche
    onSearchIqraa1(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.dtIqraa1.filterGlobal(target.value, 'contains');
    }

    onSearchIqraa2(event: Event): void {
        const target = event.target as HTMLInputElement;
        this.dtIqraa2.filterGlobal(target.value, 'contains');
    }

    // Méthodes pour annuler les dialogs
    annulerIqraa1(): void {
        this.showAddIqraa1 = false;
        this.newIqraa1 = { nom: '', prix: 0, date: '', ecole: 'Iqraa1' };
        this.isEditMode = false;
    }

    annulerIqraa2(): void {
        this.showAddIqraa2 = false;
        this.newIqraa2 = { nom: '', prix: 0, date: '', ecole: 'Iqraa2' };
        this.isEditMode = false;
    }
}
