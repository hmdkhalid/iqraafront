import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AppMenuitem } from './app.menuitem';

@Component({
    selector: 'app-menu',
    standalone: true,
    imports: [CommonModule, AppMenuitem, RouterModule],
    template: `
        <ul class="layout-menu">
            <ng-container *ngFor="let item of model; let i = index">
                <li app-menuitem *ngIf="!item.separator" [item]="item" [index]="i" [root]="true"></li>
                <li *ngIf="item.separator" class="menu-separator"></li>
            </ng-container>
        </ul>
    `
})
export class AppMenu {
    model: MenuItem[] = [];

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ]
            },


            {
                label: 'Pages',
                icon: 'pi pi-fw pi-briefcase',
                items: [

                    {
                        label: 'Bibliothèques',
                        icon: 'pi pi-fw pi-book',
                        routerLink: ['/bibliotheques']
                    },
                    {
                        label: 'Crédits',
                        icon: 'pi pi-fw pi-wallet',
                        routerLink: ['/credits-iqraa']
                    },
                    {
                        label: 'Partage des Bénéfices',
                        icon: 'pi pi-wallet',
                        routerLink: ['/partage-benefices'],
                    },
                    {
                        label: 'Voitures',
                        icon: 'pi pi-fw pi-car',
                        items: [
                            {
                                label: 'Matricule-Voitures',
                                icon: 'pi pi-fw pi-id-card',
                                routerLink: ['/voitures']
                            },
                            {
                                label: 'Assurances Voitures',
                                icon: 'pi pi-fw pi-shield',
                                routerLink: ['/assurances-voitures']
                            }
                        ]
                    },
                    {
                        label: 'Réparations',
                        icon: 'pi pi-fw pi-wrench',
                        items: [
                            {
                                label: 'Réparations Voiture',
                                icon: 'pi pi-fw pi-car',
                                routerLink: ['/reparations']
                            },
                            {
                                label: 'Réparations École',
                                icon: 'pi pi-fw pi-home',
                                routerLink: ['/reparations-ecole']
                            }
                        ]
                    },
                    {
                        label: 'Frais',
                        icon: 'pi pi-fw pi-money-bill',
                        items: [
                            {
                                label: 'Accidents',
                                icon: 'pi pi-fw pi-exclamation-triangle',
                                routerLink: ['/accidents']
                            },
                            {
                                label: 'Réunions + Formations',
                                icon: 'pi pi-fw pi-calendar',
                                routerLink: ['/reunions']
                            }
                        ]
                    },
                    {
                        label: 'Équipements',
                        icon: 'pi pi-fw pi-desktop',
                        routerLink: ['/equipements-iqraa']
                    },
                    {
                        label: 'Impôts',
                        icon: 'pi pi-fw pi-money-bill',
                        routerLink: ['/impots']
                    },
                    {
                        label: 'Assurances',
                        icon: 'pi pi-fw pi-shield',
                        routerLink: ['/assurances']
                    },
                    {
                        label: 'Propreté',
                        icon: 'pi pi-fw pi-home',
                        routerLink: ['/proprete']
                    },
                    {
                        label: 'Pressons',
                        icon: 'pi pi-fw pi-calendar',
                        routerLink: ['/presson']
                    },
                    {
                        label: 'Téléphones',
                        icon: 'pi pi-fw pi-phone',
                        routerLink: ['/telephones']
                    },
                    {
                        label: 'ONE / ONEP',
                        icon: 'pi pi-fw pi-bolt',
                        routerLink: ['/one-onep']
                    },
                    {
                        label: 'Gasoil',
                        icon: 'pi pi-fw pi-car',
                        routerLink: ['/gasoil']
                    },
                    {
                        label: 'Revenus (Espèces & Comptes)',
                        icon: 'pi pi-chart-bar',
                        routerLink: ['/revenus-especes-comptes'],
                    },
                    {
                        label: 'Revenus (Bureau & Activités Parallèles)',
                        icon: 'pi pi-chart-bar',
                        routerLink: ['/revenus-bureau-activites'],
                    },


                    {
                        label: 'CNSS',
                        icon: 'pi pi-briefcase',
                        routerLink: ['/cnss'],
                    },

                ]
            }
        ];
    }
}
