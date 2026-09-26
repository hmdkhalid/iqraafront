import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-revenue-stream-widget',
    imports: [CommonModule],
    template: `
        <div class="card !mb-8 p-6 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg">
            <div class="font-bold text-2xl mb-6 text-indigo-900 dark:text-white flex items-center gap-2">
                <i class="pi pi-chart-bar text-indigo-600"></i>
                Revenue Stream
            </div>
            <div class="space-y-4 text-lg">
                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Revenus Bibliothèques + Activités + Reste année dernière :</span>
                    <span class="font-bold text-purple-600 dark:text-purple-400">
                        {{ totalRevenusBureauActivites  }} DH
                    </span>
                </div>

                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Total Revenus :</span>
                    <span class="font-bold text-blue-600 dark:text-blue-400">
                        {{ totalRevenus  }} DH
                    </span>
                </div>

                <div class="flex justify-between items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow">
                    <span class="text-gray-700 dark:text-gray-300">Total Général (Dépenses) :</span>
                    <span class="font-bold text-red-600 dark:text-red-400">
                        {{ totalGeneral  }} DH
                    </span>
                </div>

                <hr class="my-4 border-gray-300 dark:border-gray-600" />

                <div class="p-4 bg-gradient-to-r from-red-100 to-rose-100 dark:from-red-900 dark:to-rose-900 rounded-xl shadow-md">
                    <div class="text-gray-800 dark:text-gray-200 mb-2 font-medium">
                        Reste = (Revenus Bibliothèques + Activités + Total Revenus - Dépenses) :
                    </div>
                    <div class="text-3xl font-extrabold text-red-600 dark:text-red-400">
                        {{ reste }} DH
                    </div>
                </div>
            </div>
        </div>
    `
})
export class RevenueStreamWidget implements OnInit {
    @Input() totals: any;

    totalRevenusBureauActivites = 0;
    totalRevenus = 0;
    totalGeneral = 0;
    reste = 0;

    private loadedCount = 0;
    private totalAPIs = 3;

    constructor(private http: HttpClient) {}

    ngOnInit() {
        this.loadData();
    }

    private loadData() {
        // 1. Charger Revenus Bureau + Activités
        this.http.get<number>('http://localhost:8099/api/revenus/total')
            .subscribe(data => {
                this.totalRevenusBureauActivites = Number(data) || 0;
                this.checkAllLoaded();
            });

        // 2. Charger Total Revenus (espèces + comptes)
        this.http.get<number>('http://localhost:8099/api/revenus/especes/total')
            .subscribe(especes => {
                this.http.get<number>('http://localhost:8099/api/revenus/comptes/total')
                    .subscribe(comptes => {
                        this.totalRevenus = (Number(especes) || 0) + (Number(comptes) || 0);
                        this.checkAllLoaded();
                    });
            });

        // 3. Calculer Total Général (Dépenses)
        this.calculerTotalGeneral();
    }

    private calculerTotalGeneral() {
        let count = 0;
        const totals: { [key: string]: number } = {
            telephones: 0, cnss: 0, bibliotheques: 0, assurances: 0,
            gasoil: 0, one: 0, onep: 0, impots: 0, proprete: 0,
            accidents: 0, reunions: 0, reparationsEcole: 0, equipements: 0,
            reparations: 0, pressons: 0, assurancesVoitures: 0,
            visiteVoitures: 0, partageBenefice: 0
        };

        const endpoints: Array<{ key: string; url: string }> = [
            { key: 'telephones', url: 'http://localhost:8099/api/telephones/total' },
            { key: 'cnss', url: 'http://localhost:8099/api/cnss/total' },
            { key: 'bibliotheques', url: 'http://localhost:8099/api/bibliotheques/total' },
            { key: 'assurances', url: 'http://localhost:8099/api/assurances/total' },
            { key: 'gasoil', url: 'http://localhost:8099/api/gasoils/total' },
            { key: 'one', url: 'http://localhost:8099/api/ones/total' },
            { key: 'onep', url: 'http://localhost:8099/api/oneps/total' },
            { key: 'impots', url: 'http://localhost:8099/api/impots/total' },
            { key: 'proprete', url: 'http://localhost:8099/api/proprete/total' },
            { key: 'accidents', url: 'http://localhost:8099/api/accidents/total' },
            { key: 'reunions', url: 'http://localhost:8099/api/reunions/total' },
            { key: 'reparationsEcole', url: 'http://localhost:8099/api/reparations-ecole/total' },
            { key: 'equipements', url: 'http://localhost:8099/api/equipements-ecole/total' },
            { key: 'reparations', url: 'http://localhost:8099/api/reparations/total' },
            { key: 'pressons', url: 'http://localhost:8099/api/pressons/total' },
            { key: 'assurancesVoitures', url: 'http://localhost:8099/api/assurances-voitures/total/assurance' },
            { key: 'visiteVoitures', url: 'http://localhost:8099/api/assurances-voitures/total/visite' },
            { key: 'partageBenefice', url: 'http://localhost:8099/api/partage-benefices/total' }
        ];

        endpoints.forEach(endpoint => {
            this.http.get<number>(endpoint.url).subscribe({
                next: (data) => {
                    totals[endpoint.key] = Number(data) || 0;
                    count++;
                    if (count === endpoints.length) {
                        this.totalGeneral = Object.values(totals).reduce((acc, val) => acc + val, 0);
                        console.log('Total Général calculé:', this.totalGeneral);
                        console.log('Détails:', totals);
                        this.checkAllLoaded();
                    }
                },
                error: (err) => {
                    console.error(`Erreur ${endpoint.key}:`, err);
                    totals[endpoint.key] = 0;
                    count++;
                    if (count === endpoints.length) {
                        this.totalGeneral = Object.values(totals).reduce((acc, val) => acc + val, 0);
                        this.checkAllLoaded();
                    }
                }
            });
        });
    }

    private checkAllLoaded() {
        this.loadedCount++;
        console.log(`Revenue Stream - Chargé: ${this.loadedCount}/${this.totalAPIs}`);

        if (this.loadedCount === this.totalAPIs) {
            this.updateReste();
        }

        // Recalculer si un appel arrive en retard
        if (this.loadedCount > this.totalAPIs) {
            console.log('🔄 Revenue Stream - Recalcul (appel tardif)');
            this.updateReste();
        }
    }

    private updateReste() {
        // FORMULE: Revenus Bureau + Activités + Total Revenus - Dépenses
        this.reste = (this.totalRevenusBureauActivites + this.totalRevenus) - this.totalGeneral;
        console.log('Reste calculé:', this.reste);
    }
}
