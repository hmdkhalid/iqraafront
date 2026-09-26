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

import { OneOnepsService, One, Onep } from '../../../layout/service/one-oneps.service';

@Component({
    selector: 'app-one-onep',
    templateUrl: './one-onep.component.html',
    styleUrls: ['./one-onep.component.css'],
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
export class OneOnepComponent implements OnInit {
    // === ONE ===
    ones: One[] = [];
    selectedOnes: One[] = [];
    totalOne: number = 0;

    newOne: One = { nom: '', numero: '', paiements: [] };
    editOne: One = { nom: '', numero: '', paiements: [] };

    showAddOneDialog = false;
    showEditOneDialog = false;

    // === ONEP ===
    oneps: Onep[] = [];
    selectedOneps: Onep[] = [];
    totalOnep: number = 0;

    newOnep: Onep = { nom: '', numero: '', paiements: [] };
    editOnep: Onep = { nom: '', numero: '', paiements: [] };

    showAddOnepDialog = false;
    showEditOnepDialog = false;

    @ViewChild('dtOne') dtOne: any;
    @ViewChild('dtOnep') dtOnep: any;

    constructor(
        private service: OneOnepsService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.loadOnes();
        this.loadOneps();
    }

    // === ONE ===
    loadOnes(): void {
        this.service.getAllOnes().subscribe(data => {
            this.ones = data;
            this.calculateTotalOne();
        });
    }

    calculateTotalOne(): void {
        this.totalOne = this.ones.reduce((sum, t) => sum + this.getTotalPaiements(t.paiements), 0);
    }

    ouvrirAjouterOne(): void {
        const mois = this.getMois();
        this.newOne = {
            nom: '',
            numero: '',
            paiements: mois.map(m => ({ mois: m, montant: 0, datePaiement: null }))
        };
        this.showAddOneDialog = true;
    }

    ajouterOne(): void {
        if (!this.newOne.nom.trim() || !this.newOne.numero.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Nom et numéro requis' });
            return;
        }
        this.service.createOne(this.newOne).subscribe(saved => {
            this.ones.push(saved);
            this.calculateTotalOne();
            this.showAddOneDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'ONE ajouté' });
        });
    }

    ouvrirModifierOne(o: One): void {
        this.editOne = JSON.parse(JSON.stringify(o));
        this.ensureMois(this.editOne.paiements);
        this.showEditOneDialog = true;
    }

    modifierOne(): void {
        if (!this.editOne.id) return;
        this.service.updateOne(this.editOne.id, this.editOne).subscribe(updated => {
            const index = this.ones.findIndex(t => t.id === updated.id);
            if (index !== -1) this.ones[index] = updated;
            this.calculateTotalOne();
            this.showEditOneDialog = false;
            this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'ONE modifié' });
        });
    }

    supprimerOne(id?: string, nom?: string): void {
        if (!id) return;
        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${nom}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteOne(id).subscribe(() => {
                    this.ones = this.ones.filter(t => t.id !== id);
                    this.calculateTotalOne();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'ONE supprimé' });
                });
            }
        });
    }

    supprimerOnesSelectionnes(): void {
        const ids = this.selectedOnes.map(t => t.id).filter(id => id !== undefined) as string[];
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les ONE sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteManyOnes(ids).subscribe(() => {
                    this.ones = this.ones.filter(t => !ids.includes(t.id!));
                    this.calculateTotalOne();
                    this.selectedOnes = [];
                    this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'ONE supprimés' });
                });
            }
        });
    }

    // === ONEP ===
    loadOneps(): void {
        this.service.getAllOneps().subscribe(data => {
            this.oneps = data;
            this.calculateTotalOnep();
        });
    }

    calculateTotalOnep(): void {
        this.totalOnep = this.oneps.reduce((sum, t) => sum + this.getTotalPaiements(t.paiements), 0);
    }

    ouvrirAjouterOnep(): void {
        const mois = this.getMois();
        this.newOnep = {
            nom: '',
            numero: '',
            paiements: mois.map(m => ({ mois: m, montant: 0, datePaiement: null }))
        };
        this.showAddOnepDialog = true;
    }

    ajouterOnep(): void {
        if (!this.newOnep.nom.trim() || !this.newOnep.numero.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Nom et numéro requis' });
            return;
        }
        this.service.createOnep(this.newOnep).subscribe(saved => {
            this.oneps.push(saved);
            this.calculateTotalOnep();
            this.showAddOnepDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'ONEP ajouté' });
        });
    }

    ouvrirModifierOnep(o: Onep): void {
        this.editOnep = JSON.parse(JSON.stringify(o));
        this.ensureMois(this.editOnep.paiements);
        this.showEditOnepDialog = true;
    }

    modifierOnep(): void {
        if (!this.editOnep.id) return;
        this.service.updateOnep(this.editOnep.id, this.editOnep).subscribe(updated => {
            const index = this.oneps.findIndex(t => t.id === updated.id);
            if (index !== -1) this.oneps[index] = updated;
            this.calculateTotalOnep();
            this.showEditOnepDialog = false;
            this.messageService.add({ severity: 'info', summary: 'Modifié', detail: 'ONEP modifié' });
        });
    }

    supprimerOnep(id?: string, nom?: string): void {
        if (!id) return;
        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${nom}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteOnep(id).subscribe(() => {
                    this.oneps = this.oneps.filter(t => t.id !== id);
                    this.calculateTotalOnep();
                    this.messageService.add({ severity: 'success', summary: 'Supprimé', detail: 'ONEP supprimé' });
                });
            }
        });
    }

    supprimerOnepsSelectionnes(): void {
        const ids = this.selectedOneps.map(t => t.id).filter(id => id !== undefined) as string[];
        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les ONEP sélectionnés ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteManyOneps(ids).subscribe(() => {
                    this.oneps = this.oneps.filter(t => !ids.includes(t.id!));
                    this.calculateTotalOnep();
                    this.selectedOneps = [];
                    this.messageService.add({ severity: 'success', summary: 'Supprimés', detail: 'ONEP supprimés' });
                });
            }
        });
    }

    // === Helpers ===
    getMois(): string[] {
        return ['Sept', 'Oct', 'Nov', 'Déc', 'Jan', 'Fév', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août'];
    }

    ensureMois(paiements: any[]): void {
        const mois = this.getMois();
        const existMois = paiements.map(p => p.mois);
        mois.forEach(m => {
            if (!existMois.includes(m)) {
                paiements.push({ mois: m, montant: 0, datePaiement: null });
            }
        });
    }

    getTotalPaiements(paiements: any[]): number {
        return paiements.reduce((sum, p) => sum + (p.montant || 0), 0);
    }

    onGlobalFilterOne(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dtOne.filterGlobal(input.value, 'contains');
    }

    onGlobalFilterOnep(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dtOnep.filterGlobal(input.value, 'contains');
    }
    imprimerTableau(type: 'one' | 'onep'): void {
        const elementId = type === 'one' ? 'table-one' : 'table-onep';
        const printContents = document.getElementById(elementId)?.innerHTML;
        if (!printContents) return;

        const printWindow = window.open('', '', 'width=900,height=650');
        if (printWindow) {
            printWindow.document.write(`
            <html>
                <head>
                    <title>Impression ${type.toUpperCase()}</title>
                    <style>
                        table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                        th, td { border: 1px solid #333; padding: 8px; text-align: left; }
                        th { background: #f0f0f0; }
                        h2 { text-align: center; }
                    </style>
                </head>
                <body>
                    <h2>Liste des ${type.toUpperCase()}</h2>
                    ${printContents}
                </body>
            </html>
        `);
            printWindow.document.close();
            printWindow.print();
        }
    }

}
