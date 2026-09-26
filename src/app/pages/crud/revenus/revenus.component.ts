import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';
import { RevenuEspece, RevenuEspeceService } from '../../../layout/service/revenu-espece.service';
import { RevenuCompte, RevenuCompteService } from '../../../layout/service/revenu-compte.service';

@Component({
    selector: 'app-revenus',
    standalone: true,
    templateUrl: './revenus.component.html',
    styleUrls: ['./revenus.component.css'],
    imports: [CommonModule, FormsModule],
})

export class RevenusComponent implements OnInit {
    // ========= Loading states =========
    loading = false;
    loadingEspece1 = false;
    loadingEspece2 = false;
    loadingCompte1 = false;
    loadingCompte2 = false;

    // ========= Error handling =========
    errorMessage = '';
    successMessage = '';

    // ========= Search terms =========
    searchEspece1 = '';
    searchEspece2 = '';
    searchCompte1 = '';
    searchCompte2 = '';

    // ========= Selection states =========
    selectedEspeces1: string[] = [];
    selectedEspeces2: string[] = [];
    selectedComptes1: string[] = [];
    selectedComptes2: string[] = [];

    // ========= Pagination =========
    // Espèces Iqraa 1
    currentPageEspece1 = 1;
    itemsPerPageEspece1 = 5;
    totalPagesEspece1 = 1;

    // Espèces Iqraa 2
    currentPageEspece2 = 1;
    itemsPerPageEspece2 = 5;
    totalPagesEspece2 = 1;

    // Comptes Iqraa 1
    currentPageCompte1 = 1;
    itemsPerPageCompte1 = 5;
    totalPagesCompte1 = 1;

    // Comptes Iqraa 2
    currentPageCompte2 = 1;
    itemsPerPageCompte2 = 5;
    totalPagesCompte2 = 1;

    // ========= Espèces Iqraa1 =========
    especesIqraa1: RevenuEspece[] = [];
    filteredEspecesIqraa1: RevenuEspece[] = [];
    paginatedEspecesIqraa1: RevenuEspece[] = [];
    nouveauEspece1: RevenuEspece = { montant: 0, date: '' };
    totalEspece1: number = 0;

    // ========= Espèces Iqraa2 =========
    especesIqraa2: RevenuEspece[] = [];
    filteredEspecesIqraa2: RevenuEspece[] = [];
    paginatedEspecesIqraa2: RevenuEspece[] = [];
    nouveauEspece2: RevenuEspece = { montant: 0, date: '' };
    totalEspece2: number = 0;

    // ========= Compte Iqraa1 =========
    comptesIqraa1: RevenuCompte[] = [];
    filteredComptesIqraa1: RevenuCompte[] = [];
    paginatedComptesIqraa1: RevenuCompte[] = [];
    nouveauCompte1: RevenuCompte = {
        nomPersonne: '',
        montant: 0,
        date: ''
    };
    totalCompte1: number = 0;

    // ========= Compte Iqraa2 =========
    comptesIqraa2: RevenuCompte[] = [];
    filteredComptesIqraa2: RevenuCompte[] = [];
    paginatedComptesIqraa2: RevenuCompte[] = [];
    nouveauCompte2: RevenuCompte = {
        nomPersonne: '',
        montant: 0,
        date: ''
    };
    totalCompte2: number = 0;

    // ========= Totaux généraux =========
    totalGeneralEspeces: number = 0;
    totalGeneralComptes: number = 0;
    totalGlobal: number = 0;

    constructor(
        private especeService: RevenuEspeceService,
        private compteService: RevenuCompteService
    ) {}

    ngOnInit(): void {
        this.chargerDonnees();
    }

    // ========= CHARGEMENT DES DONNÉES =========
    chargerDonnees() {
        this.loading = true;
        this.errorMessage = '';

        this.especeService.getIqraa1().pipe(
            catchError(error => {
                this.showError('Erreur lors du chargement des espèces Iqraa 1');
                return of({ revenus: [], total: 0 });
            })
        ).subscribe((res) => {
            this.especesIqraa1 = res.revenus;
            this.filteredEspecesIqraa1 = [...this.especesIqraa1];
            this.totalEspece1 = res.total;
            this.updatePaginationEspece1();
            this.calculerTotaux();
        });

        this.especeService.getIqraa2().pipe(
            catchError(error => {
                this.showError('Erreur lors du chargement des espèces Iqraa 2');
                return of({ revenus: [], total: 0 });
            })
        ).subscribe((res) => {
            this.especesIqraa2 = res.revenus;
            this.filteredEspecesIqraa2 = [...this.especesIqraa2];
            this.totalEspece2 = res.total;
            this.updatePaginationEspece2();
            this.calculerTotaux();
        });

        this.compteService.getIqraa1().pipe(
            catchError(error => {
                this.showError('Erreur lors du chargement des comptes Iqraa 1');
                return of({ revenus: [], total: 0 });
            })
        ).subscribe((res) => {
            this.comptesIqraa1 = res.revenus;
            this.filteredComptesIqraa1 = [...this.comptesIqraa1];
            this.totalCompte1 = res.total;
            this.updatePaginationCompte1();
            this.calculerTotaux();
        });

        this.compteService.getIqraa2().pipe(
            catchError(error => {
                this.showError('Erreur lors du chargement des comptes Iqraa 2');
                return of({ revenus: [], total: 0 });
            }),
            finalize(() => this.loading = false)
        ).subscribe((res) => {
            this.comptesIqraa2 = res.revenus;
            this.filteredComptesIqraa2 = [...this.comptesIqraa2];
            this.totalCompte2 = res.total;
            this.updatePaginationCompte2();
            this.calculerTotaux();
        });
    }

    // ========= PAGINATION METHODS =========
    updatePaginationEspece1() {
        this.totalPagesEspece1 = Math.ceil(this.filteredEspecesIqraa1.length / this.itemsPerPageEspece1);
        if (this.currentPageEspece1 > this.totalPagesEspece1) {
            this.currentPageEspece1 = Math.max(1, this.totalPagesEspece1);
        }
        this.updatePageEspece1();
    }

    updatePageEspece1() {
        const start = (this.currentPageEspece1 - 1) * this.itemsPerPageEspece1;
        const end = start + this.itemsPerPageEspece1;
        this.paginatedEspecesIqraa1 = this.filteredEspecesIqraa1.slice(start, end);
    }

    updatePaginationEspece2() {
        this.totalPagesEspece2 = Math.ceil(this.filteredEspecesIqraa2.length / this.itemsPerPageEspece2);
        if (this.currentPageEspece2 > this.totalPagesEspece2) {
            this.currentPageEspece2 = Math.max(1, this.totalPagesEspece2);
        }
        this.updatePageEspece2();
    }

    updatePageEspece2() {
        const start = (this.currentPageEspece2 - 1) * this.itemsPerPageEspece2;
        const end = start + this.itemsPerPageEspece2;
        this.paginatedEspecesIqraa2 = this.filteredEspecesIqraa2.slice(start, end);
    }

    updatePaginationCompte1() {
        this.totalPagesCompte1 = Math.ceil(this.filteredComptesIqraa1.length / this.itemsPerPageCompte1);
        if (this.currentPageCompte1 > this.totalPagesCompte1) {
            this.currentPageCompte1 = Math.max(1, this.totalPagesCompte1);
        }
        this.updatePageCompte1();
    }

    updatePageCompte1() {
        const start = (this.currentPageCompte1 - 1) * this.itemsPerPageCompte1;
        const end = start + this.itemsPerPageCompte1;
        this.paginatedComptesIqraa1 = this.filteredComptesIqraa1.slice(start, end);
    }

    updatePaginationCompte2() {
        this.totalPagesCompte2 = Math.ceil(this.filteredComptesIqraa2.length / this.itemsPerPageCompte2);
        if (this.currentPageCompte2 > this.totalPagesCompte2) {
            this.currentPageCompte2 = Math.max(1, this.totalPagesCompte2);
        }
        this.updatePageCompte2();
    }

    updatePageCompte2() {
        const start = (this.currentPageCompte2 - 1) * this.itemsPerPageCompte2;
        const end = start + this.itemsPerPageCompte2;
        this.paginatedComptesIqraa2 = this.filteredComptesIqraa2.slice(start, end);
    }

    goToPageEspece1(page: number) {
        if (page >= 1 && page <= this.totalPagesEspece1) {
            this.currentPageEspece1 = page;
            this.updatePageEspece1();
        }
    }

    goToPageEspece2(page: number) {
        if (page >= 1 && page <= this.totalPagesEspece2) {
            this.currentPageEspece2 = page;
            this.updatePageEspece2();
        }
    }

    goToPageCompte1(page: number) {
        if (page >= 1 && page <= this.totalPagesCompte1) {
            this.currentPageCompte1 = page;
            this.updatePageCompte1();
        }
    }

    goToPageCompte2(page: number) {
        if (page >= 1 && page <= this.totalPagesCompte2) {
            this.currentPageCompte2 = page;
            this.updatePageCompte2();
        }
    }

    getPageNumbers(totalPages: number): number[] {
        return Array.from({length: totalPages}, (_, i) => i + 1);
    }

    // ========= AJOUT DES REVENUS =========
    ajouterEspeceIqraa1() {
        if (!this.nouveauEspece1.montant || this.nouveauEspece1.montant <= 0) {
            this.showError('Veuillez entrer un montant valide');
            return;
        }

        this.loadingEspece1 = true;

        if (this.nouveauEspece1.id) {
            this.especeService.updateIqraa1(this.nouveauEspece1).pipe(
                catchError(() => {
                    this.showError('Erreur lors de la mise à jour de l\'espèce Iqraa 1');
                    return of(null);
                }),
                finalize(() => this.loadingEspece1 = false)
            ).subscribe((updated) => {
                if (updated) {
                    const index = this.especesIqraa1.findIndex(e => e.id === updated.id);
                    if (index > -1) this.especesIqraa1[index] = updated;
                    this.filteredEspecesIqraa1 = [...this.especesIqraa1];
                    this.totalEspece1 = this.especesIqraa1.reduce((sum, e) => sum + e.montant, 0);
                    this.nouveauEspece1 = { montant: 0, date: '' };
                    this.showSuccess('Revenu espèce mis à jour avec succès');
                    this.updatePaginationEspece1();
                    this.calculerTotaux();
                }
            });
        } else {
            this.especeService.addIqraa1(this.nouveauEspece1).pipe(
                catchError(() => {
                    this.showError('Erreur lors de l\'ajout de l\'espèce Iqraa 1');
                    return of(null);
                }),
                finalize(() => this.loadingEspece1 = false)
            ).subscribe((saved) => {
                if (saved) {
                    this.especesIqraa1.push(saved);
                    this.filteredEspecesIqraa1 = [...this.especesIqraa1];
                    this.totalEspece1 += saved.montant;
                    this.nouveauEspece1 = { montant: 0, date: '' };
                    this.showSuccess('Revenu espèce ajouté avec succès');
                    this.updatePaginationEspece1();
                    this.calculerTotaux();
                }
            });
        }
    }

    ajouterEspeceIqraa2() {
        if (!this.nouveauEspece2.montant || this.nouveauEspece2.montant <= 0) {
            this.showError('Veuillez entrer un montant valide');
            return;
        }

        this.loadingEspece2 = true;

        if (this.nouveauEspece2.id) {
            this.especeService.updateIqraa2(this.nouveauEspece2).pipe(
                catchError(() => {
                    this.showError('Erreur lors de la mise à jour de l\'espèce Iqraa 2');
                    return of(null);
                }),
                finalize(() => this.loadingEspece2 = false)
            ).subscribe((updated) => {
                if (updated) {
                    const index = this.especesIqraa2.findIndex(e => e.id === updated.id);
                    if (index > -1) this.especesIqraa2[index] = updated;
                    this.filteredEspecesIqraa2 = [...this.especesIqraa2];
                    this.totalEspece2 = this.especesIqraa2.reduce((sum, e) => sum + e.montant, 0);
                    this.nouveauEspece2 = { montant: 0, date: '' };
                    this.showSuccess('Revenu espèce mis à jour avec succès');
                    this.updatePaginationEspece2();
                    this.calculerTotaux();
                }
            });
        } else {
            this.especeService.addIqraa2(this.nouveauEspece2).pipe(
                catchError(() => {
                    this.showError('Erreur lors de l\'ajout de l\'espèce Iqraa 2');
                    return of(null);
                }),
                finalize(() => this.loadingEspece2 = false)
            ).subscribe((saved) => {
                if (saved) {
                    this.especesIqraa2.push(saved);
                    this.filteredEspecesIqraa2 = [...this.especesIqraa2];
                    this.totalEspece2 += saved.montant;
                    this.nouveauEspece2 = { montant: 0, date: '' };
                    this.showSuccess('Revenu espèce ajouté avec succès');
                    this.updatePaginationEspece2();
                    this.calculerTotaux();
                }
            });
        }
    }

    ajouterCompteIqraa1() {
        if (!this.nouveauCompte1.montant || this.nouveauCompte1.montant <= 0 ||
            !this.nouveauCompte1.nomPersonne.trim() || !this.nouveauCompte1.date) {
            this.showError('Veuillez remplir tous les champs correctement');
            return;
        }

        this.loadingCompte1 = true;

        if (this.nouveauCompte1.id) {
            this.compteService.updateIqraa1(this.nouveauCompte1).pipe(
                catchError(() => {
                    this.showError('Erreur lors de la mise à jour du compte Iqraa 1');
                    return of(null);
                }),
                finalize(() => this.loadingCompte1 = false)
            ).subscribe((updated) => {
                if (updated) {
                    const index = this.comptesIqraa1.findIndex(c => c.id === updated.id);
                    if (index > -1) this.comptesIqraa1[index] = updated;
                    this.filteredComptesIqraa1 = [...this.comptesIqraa1];
                    this.totalCompte1 = this.comptesIqraa1.reduce((sum, c) => sum + c.montant, 0);
                    this.nouveauCompte1 = { nomPersonne: '', montant: 0, date: '' };
                    this.showSuccess('Revenu compte mis à jour avec succès');
                    this.updatePaginationCompte1();
                    this.calculerTotaux();
                }
            });
        } else {
            this.compteService.addIqraa1(this.nouveauCompte1).pipe(
                catchError(() => {
                    this.showError('Erreur lors de l\'ajout du compte Iqraa 1');
                    return of(null);
                }),
                finalize(() => this.loadingCompte1 = false)
            ).subscribe((saved) => {
                if (saved) {
                    this.comptesIqraa1.push(saved);
                    this.filteredComptesIqraa1 = [...this.comptesIqraa1];
                    this.totalCompte1 += saved.montant;
                    this.nouveauCompte1 = { nomPersonne: '', montant: 0, date: '' };
                    this.showSuccess('Revenu compte ajouté avec succès');
                    this.updatePaginationCompte1();
                    this.calculerTotaux();
                }
            });
        }
    }

    ajouterCompteIqraa2() {
        if (!this.nouveauCompte2.montant || this.nouveauCompte2.montant <= 0 ||
            !this.nouveauCompte2.nomPersonne.trim() || !this.nouveauCompte2.date) {
            this.showError('Veuillez remplir tous les champs correctement');
            return;
        }

        this.loadingCompte2 = true;

        if (this.nouveauCompte2.id) {
            this.compteService.updateIqraa2(this.nouveauCompte2).pipe(
                catchError(() => {
                    this.showError('Erreur lors de la mise à jour du compte Iqraa 2');
                    return of(null);
                }),
                finalize(() => this.loadingCompte2 = false)
            ).subscribe((updated) => {
                if (updated) {
                    const index = this.comptesIqraa2.findIndex(c => c.id === updated.id);
                    if (index > -1) this.comptesIqraa2[index] = updated;
                    this.filteredComptesIqraa2 = [...this.comptesIqraa2];
                    this.totalCompte2 = this.comptesIqraa2.reduce((sum, c) => sum + c.montant, 0);
                    this.nouveauCompte2 = { nomPersonne: '', montant: 0, date: '' };
                    this.showSuccess('Revenu compte mis à jour avec succès');
                    this.updatePaginationCompte2();
                    this.calculerTotaux();
                }
            });
        } else {
            this.compteService.addIqraa2(this.nouveauCompte2).pipe(
                catchError(() => {
                    this.showError('Erreur lors de l\'ajout du compte Iqraa 2');
                    return of(null);
                }),
                finalize(() => this.loadingCompte2 = false)
            ).subscribe((saved) => {
                if (saved) {
                    this.comptesIqraa2.push(saved);
                    this.filteredComptesIqraa2 = [...this.comptesIqraa2];
                    this.totalCompte2 += saved.montant;
                    this.nouveauCompte2 = { nomPersonne: '', montant: 0, date: '' };
                    this.showSuccess('Revenu compte ajouté avec succès');
                    this.updatePaginationCompte2();
                    this.calculerTotaux();
                }
            });
        }
    }

    // ========= SUPPRESSION =========
    supprimerEspece(id: string, ecole: number) {
        if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) return;

        this.especeService.delete(id).subscribe({
            next: () => {
                if (ecole === 1) {
                    this.especesIqraa1 = this.especesIqraa1.filter(e => e.id !== id);
                    this.filteredEspecesIqraa1 = [...this.especesIqraa1];
                    this.totalEspece1 = this.especesIqraa1.reduce((sum, e) => sum + e.montant, 0);
                    this.updatePaginationEspece1();
                } else {
                    this.especesIqraa2 = this.especesIqraa2.filter(e => e.id !== id);
                    this.filteredEspecesIqraa2 = [...this.especesIqraa2];
                    this.totalEspece2 = this.especesIqraa2.reduce((sum, e) => sum + e.montant, 0);
                    this.updatePaginationEspece2();
                }
                this.calculerTotaux();
                this.showSuccess('Élément supprimé avec succès');
            },
            error: () => this.showError('Erreur lors de la suppression de l\'espèce')
        });
    }

    supprimerCompte(id: string, ecole: number) {
        if (!confirm('Voulez-vous vraiment supprimer cet élément ?')) return;

        this.compteService.delete(id).subscribe({
            next: () => {
                if (ecole === 1) {
                    this.comptesIqraa1 = this.comptesIqraa1.filter(c => c.id !== id);
                    this.filteredComptesIqraa1 = [...this.comptesIqraa1];
                    this.totalCompte1 = this.comptesIqraa1.reduce((sum, c) => sum + c.montant, 0);
                    this.updatePaginationCompte1();
                } else {
                    this.comptesIqraa2 = this.comptesIqraa2.filter(c => c.id !== id);
                    this.filteredComptesIqraa2 = [...this.comptesIqraa2];
                    this.totalCompte2 = this.comptesIqraa2.reduce((sum, c) => sum + c.montant, 0);
                    this.updatePaginationCompte2();
                }
                this.calculerTotaux();
                this.showSuccess('Élément supprimé avec succès');
            },
            error: () => this.showError('Erreur lors de la suppression du compte')
        });
    }

    supprimerEspecesSelectionnees(ecole: number) {
        const selected = ecole === 1 ? this.selectedEspeces1 : this.selectedEspeces2;

        if (selected.length === 0) {
            this.showError('Veuillez sélectionner des éléments à supprimer');
            return;
        }

        if (!confirm(`Voulez-vous supprimer ${selected.length} élément(s) ?`)) return;

        if (ecole === 1) {
            this.especesIqraa1 = this.especesIqraa1.filter(e => !selected.includes(e.id!));
            this.filteredEspecesIqraa1 = [...this.especesIqraa1];
            this.totalEspece1 = this.especesIqraa1.reduce((sum, e) => sum + e.montant, 0);
            this.selectedEspeces1 = [];
            this.updatePaginationEspece1();
        } else {
            this.especesIqraa2 = this.especesIqraa2.filter(e => !selected.includes(e.id!));
            this.filteredEspecesIqraa2 = [...this.especesIqraa2];
            this.totalEspece2 = this.especesIqraa2.reduce((sum, e) => sum + e.montant, 0);
            this.selectedEspeces2 = [];
            this.updatePaginationEspece2();
        }
        this.calculerTotaux();
        this.showSuccess('Éléments supprimés');
    }

    supprimerComptesSelectionnes(ecole: number) {
        const selected = ecole === 1 ? this.selectedComptes1 : this.selectedComptes2;

        if (selected.length === 0) {
            this.showError('Veuillez sélectionner des éléments à supprimer');
            return;
        }

        if (!confirm(`Voulez-vous supprimer ${selected.length} élément(s) ?`)) return;

        if (ecole === 1) {
            this.comptesIqraa1 = this.comptesIqraa1.filter(c => !selected.includes(c.id!));
            this.filteredComptesIqraa1 = [...this.comptesIqraa1];
            this.totalCompte1 = this.comptesIqraa1.reduce((sum, c) => sum + c.montant, 0);
            this.selectedComptes1 = [];
            this.updatePaginationCompte1();
        } else {
            this.comptesIqraa2 = this.comptesIqraa2.filter(c => !selected.includes(c.id!));
            this.filteredComptesIqraa2 = [...this.comptesIqraa2];
            this.totalCompte2 = this.comptesIqraa2.reduce((sum, c) => sum + c.montant, 0);
            this.selectedComptes2 = [];
            this.updatePaginationCompte2();
        }
        this.calculerTotaux();
        this.showSuccess('Éléments supprimés');
    }

    // ========= RECHERCHE =========
    rechercherEspeces1() {
        if (!this.searchEspece1.trim()) {
            this.filteredEspecesIqraa1 = [...this.especesIqraa1];
        } else {
            const searchTerm = this.searchEspece1.toLowerCase();
            this.filteredEspecesIqraa1 = this.especesIqraa1.filter(espece =>
                espece.montant.toString().includes(searchTerm)
            );
        }
        this.currentPageEspece1 = 1;
        this.updatePaginationEspece1();
    }

    rechercherEspeces2() {
        if (!this.searchEspece2.trim()) {
            this.filteredEspecesIqraa2 = [...this.especesIqraa2];
        } else {
            const searchTerm = this.searchEspece2.toLowerCase();
            this.filteredEspecesIqraa2 = this.especesIqraa2.filter(espece =>
                espece.montant.toString().includes(searchTerm)
            );
        }
        this.currentPageEspece2 = 1;
        this.updatePaginationEspece2();
    }

    rechercherComptes1() {
        if (!this.searchCompte1.trim()) {
            this.filteredComptesIqraa1 = [...this.comptesIqraa1];
        } else {
            const searchTerm = this.searchCompte1.toLowerCase();
            this.filteredComptesIqraa1 = this.comptesIqraa1.filter(compte =>
                compte.nomPersonne.toLowerCase().includes(searchTerm) ||
                compte.montant.toString().includes(searchTerm)
            );
        }
        this.currentPageCompte1 = 1;
        this.updatePaginationCompte1();
    }

    rechercherComptes2() {
        if (!this.searchCompte2.trim()) {
            this.filteredComptesIqraa2 = [...this.comptesIqraa2];
        } else {
            const searchTerm = this.searchCompte2.toLowerCase();
            this.filteredComptesIqraa2 = this.comptesIqraa2.filter(compte =>
                compte.nomPersonne.toLowerCase().includes(searchTerm) ||
                compte.montant.toString().includes(searchTerm)
            );
        }
        this.currentPageCompte2 = 1;
        this.updatePaginationCompte2();
    }

    // ========= SÉLECTION =========
    toggleSelection(id: string, selectedArray: string[]) {
        const index = selectedArray.indexOf(id);
        if (index > -1) {
            selectedArray.splice(index, 1);
        } else {
            selectedArray.push(id);
        }
    }

    toggleAllSelection(checked: boolean, array: any[], selectedArray: string[]) {
        if (checked) {
            selectedArray.length = 0;
            selectedArray.push(...array.map(item => item.id).filter(id => id));
        } else {
            selectedArray.length = 0;
        }
    }

    toggleAllEspeces1(checked: boolean) {
        this.toggleAllSelection(checked, this.especesIqraa1, this.selectedEspeces1);
    }

    toggleAllEspeces2(checked: boolean) {
        this.toggleAllSelection(checked, this.especesIqraa2, this.selectedEspeces2);
    }

    toggleAllComptes1(checked: boolean) {
        this.toggleAllSelection(checked, this.comptesIqraa1, this.selectedComptes1);
    }

    toggleAllComptes2(checked: boolean) {
        this.toggleAllSelection(checked, this.comptesIqraa2, this.selectedComptes2);
    }

    // ========= ÉDITION =========
    editerEspece(espece: RevenuEspece, ecole: number) {
        if (ecole === 1) {
            this.nouveauEspece1 = { ...espece };
        } else {
            this.nouveauEspece2 = { ...espece };
        }
    }

    editerCompte(compte: RevenuCompte, ecole: number) {
        if (ecole === 1) {
            this.nouveauCompte1 = { ...compte };
        } else {
            this.nouveauCompte2 = { ...compte };
        }
    }

    // ========= CALCUL DES TOTAUX =========
    calculerTotaux() {
        this.totalGeneralEspeces = this.totalEspece1 + this.totalEspece2;
        this.totalGeneralComptes = this.totalCompte1 + this.totalCompte2;
        this.totalGlobal = this.totalGeneralEspeces + this.totalGeneralComptes;
    }

    // ========= IMPRESSION =========
    imprimerEspeces1() {
        this.imprimer('Revenus Espèces Iqraa 1', this.especesIqraa1, 'espece');
    }

    imprimerEspeces2() {
        this.imprimer('Revenus Espèces Iqraa 2', this.especesIqraa2, 'espece');
    }

    imprimerComptes1() {
        this.imprimer('Revenus Compte Iqraa 1', this.comptesIqraa1, 'compte');
    }

    imprimerComptes2() {
        this.imprimer('Revenus Compte Iqraa 2', this.comptesIqraa2, 'compte');
    }

    private imprimer(titre: string, donnees: any[], type: string) {
        const dateImpression = new Date().toLocaleDateString('fr-FR');
        let html = `
            <html>
            <head>
                <title>${titre}</title>
                <style>
                    body { font-family: Arial, sans-serif; margin: 20px; }
                    h1 { color: #2c3e50; text-align: center; }
                    table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                    th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
                    th { background-color: #f8f9fa; }
                    .total { font-weight: bold; margin-top: 20px; text-align: right; }
                </style>
            </head>
            <body>
                <h1>${titre}</h1>
                <p>Imprimé le ${dateImpression}</p>
                <table><thead><tr>
        `;

        if (type === 'espece') {
            html += '<th>Montant (DH)</th>';
        } else {
            html += '<th>Nom Personne</th><th>Montant (DH)</th><th>Date</th>';
        }

        html += '</tr></thead><tbody>';

        donnees.forEach(item => {
            html += '<tr>';
            if (type === 'espece') {
                html += `<td>${item.montant.toFixed(2)}</td>`;
            } else {
                html += `<td>${item.nomPersonne}</td><td>${item.montant.toFixed(2)}</td><td>${new Date(item.date).toLocaleDateString('fr-FR')}</td>`;
            }
            html += '</tr>';
        });

        const total = donnees.reduce((sum, item) => sum + item.montant, 0);
        html += `</tbody></table><div class="total">Total: ${total.toFixed(2)} DH</div></body></html>`;

        const fenetreImpression = window.open('', '_blank');
        if (fenetreImpression) {
            fenetreImpression.document.write(html);
            fenetreImpression.document.close();
            fenetreImpression.focus();
            fenetreImpression.print();
        }
    }

    // ========= MESSAGES =========
    private showError(message: string) {
        this.errorMessage = message;
        this.successMessage = '';
        setTimeout(() => this.errorMessage = '', 5000);
    }

    private showSuccess(message: string) {
        this.successMessage = message;
        this.errorMessage = '';
        setTimeout(() => this.successMessage = '', 3000);
    }

    clearMessages() {
        this.errorMessage = '';
        this.successMessage = '';
    }

    // ========= UTILITAIRES =========
    trackByFn(index: number, item: any) {
        return item.id || index;
    }

    formatDate(date: string | Date | undefined): string {
        if (!date) return '';
        return new Date(date).toLocaleDateString('fr-FR');
    }
}
