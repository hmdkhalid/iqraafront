import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-produits-les-plus-vendus',
    imports: [CommonModule],
    template: `
        <div class="card !mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg">
            <div class="font-bold text-2xl mb-6 text-indigo-900 dark:text-white flex items-center gap-2">
                <i class="pi pi-shopping-cart text-indigo-600"></i>
                Somme Réelle
            </div>





                <hr class="my-4 border-gray-300 dark:border-gray-600" />

                <div class="p-4 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900 dark:to-emerald-900 rounded-xl shadow-md">
                    <div class="text-gray-800 dark:text-gray-200 mb-2 font-medium">
                        Somme = Revenus Bibliothèques + Activités + Reste année dernière + Total Revenus :
                    </div>
                    <div class="text-3xl font-extrabold text-green-600 dark:text-green-400">
                        {{ sommeTotale }} DH
                    </div>
                </div>

        </div>
    `
})
export class ProduitsLesPlusVendusComponent implements OnInit {
    revenusBibliActivites = 0;
    totalRevenus = 0;
    sommeTotale = 0;

    private loadedCount = 0;
    private totalAPIs = 2;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadData();
    }

    private loadData() {
        // 1️⃣ Charger Revenus Bibliothèques + Activités + Reste année dernière
        this.http.get<number>('http://localhost:8099/api/revenus/total')
            .subscribe(data => {
                this.revenusBibliActivites = Number(data) || 0;
                this.checkAllLoaded();
            });

        // 2️⃣ Charger Total Revenus (espèces + comptes)
        this.http.get<number>('http://localhost:8099/api/revenus/especes/total')
            .subscribe(especes => {
                this.http.get<number>('http://localhost:8099/api/revenus/comptes/total')
                    .subscribe(comptes => {
                        this.totalRevenus = (Number(especes) || 0) + (Number(comptes) || 0);
                        this.checkAllLoaded();
                    });
            });
    }

    private checkAllLoaded() {
        this.loadedCount++;
        if (this.loadedCount >= this.totalAPIs) {
            this.updateSomme();
        }
    }

    private updateSomme() {
        this.sommeTotale = this.revenusBibliActivites + this.totalRevenus;
    }
}
