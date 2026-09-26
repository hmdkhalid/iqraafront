import { Component } from '@angular/core';
import { StatsWidget } from './components/statswidget';
import { RevenueStreamWidget } from './components/revenuestreamwidget';
import { ProduitsLesPlusVendusComponent } from './components/bestsellingwidget';


@Component({
    selector: 'app-dashboard',
    standalone: true,
    imports: [
        StatsWidget,
        ProduitsLesPlusVendusComponent,
        RevenueStreamWidget,
    ],
    template: `
        <div class="grid grid-cols-12 gap-6">
            <!-- Statistiques en haut -->
            <app-stats-widget class="contents" />

            <!-- Somme Réelle juste en dessous de CNSS et Partage Bénéfice -->
            <div class="col-span-6">
                <app-produits-les-plus-vendus></app-produits-les-plus-vendus>
            </div>

            <!-- ✅ Revenue Stream reste à sa place -->
            <div class="col-span-12 xl:col-span-6">
                <app-revenue-stream-widget />

            </div>
        </div>
    `
})
export class Dashboard {}
