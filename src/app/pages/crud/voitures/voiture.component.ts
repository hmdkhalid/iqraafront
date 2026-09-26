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
import { Voiture, VoituresService } from '../../../layout/service/voitures.service';

@Component({
    selector: 'app-voitures',
    templateUrl: './voiture.component.html',
    styleUrls: ['./voiture.component.css'],
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
export class VoitureComponent implements OnInit {
    voitures: Voiture[] = [];
    selectedVoitures: Voiture[] = [];

    newVoiture: Voiture = { matricule: '' };
    editVoiture: Voiture = { matricule: '' };

    showAddDialog = false;
    showEditDialog = false;

    @ViewChild('dt') dt: any;

    constructor(
        private voituresService: VoituresService,
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    ngOnInit(): void {
        this.getVoitures();
    }

    getVoitures(): void {
        this.voituresService.getAll().subscribe({
            next: (data) => this.voitures = data,
            error: () => this.messageService.add({ severity: 'error', summary: 'Erreur', detail: 'Chargement impossible' })
        });
    }

    ajouterVoiture(): void {
        if (!this.newVoiture.matricule.trim()) {
            this.messageService.add({ severity: 'warn', summary: 'Attention', detail: 'Matricule requis' });
            return;
        }

        this.voituresService.create(this.newVoiture).subscribe((v) => {
            this.voitures.push(v);
            this.newVoiture = { matricule: '' };
            this.showAddDialog = false;
            this.messageService.add({ severity: 'success', summary: 'Ajouté', detail: 'Voiture ajoutée' });
        });
    }

    ouvrirModifierVoiture(voiture: Voiture): void {
        this.editVoiture = { ...voiture };
        this.showEditDialog = true;
    }

    modifierVoiture(): void {
        if (this.editVoiture.id) {
            this.voituresService.update(this.editVoiture.id, this.editVoiture).subscribe(() => {
                this.getVoitures();
                this.showEditDialog = false;
                this.messageService.add({ severity: 'info', summary: 'Modifiée', detail: 'Voiture modifiée' });
            });
        }
    }

    supprimerVoiture(id: string | undefined, matricule: string): void {
        if (!id) return;

        this.confirmationService.confirm({
            message: `Voulez-vous supprimer "${matricule}" ?`,
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                this.voituresService.delete(id).subscribe(() => {
                    this.getVoitures();
                    this.messageService.add({ severity: 'success', summary: 'Supprimée', detail: 'Voiture supprimée' });
                });
            }
        });
    }

    supprimerVoituresSelectionnees(): void {
        const toDelete = this.selectedVoitures.map(v => v.id).filter(id => id !== undefined) as string[];

        this.confirmationService.confirm({
            message: 'Voulez-vous supprimer les voitures sélectionnées ?',
            header: 'Confirmation multiple',
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: 'Oui',
            rejectLabel: 'Non',
            accept: () => {
                toDelete.forEach((id) => {
                    this.voituresService.delete(id).subscribe(() => {
                        this.getVoitures();
                    });
                });
                this.selectedVoitures = [];
                this.messageService.add({ severity: 'success', summary: 'Supprimées', detail: 'Voitures supprimées' });
            }
        });
    }

    onGlobalFilter(event: Event): void {
        const input = event.target as HTMLInputElement;
        this.dt.filterGlobal(input.value, 'contains');
    }
}
