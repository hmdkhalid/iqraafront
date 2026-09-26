import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    standalone: true,
    selector: 'app-stats-widget',
    imports: [CommonModule],
    template: `
        <div class="col-span-12 mb-4">
            <div class="bg-primary/10 border-2 border-primary rounded-lg p-4 text-center">
                <span class="text-black font-bold text-lg">
                    📊 Statistiques pour l'année : {{ 2027 }}
                </span>
            </div>
        </div>

        <!-- TOTAL GÉNÉRAL -->
        <div class="col-span-12 mb-6">
            <div
                class="card relative overflow-hidden bg-gradient-to-r from-green-100 via-emerald-200 to-teal-100
           dark:from-gray-800 dark:via-gray-900 dark:to-gray-800
           rounded-2xl shadow-xl p-6 transition transform hover:scale-[1.01] hover:shadow-2xl"
            >
                <div
                    class="absolute -top-10 -right-10 w-40 h-40 bg-emerald-300/30 rounded-full blur-3xl animate-pulse"
                ></div>
                <div
                    class="absolute -bottom-14 -left-14 w-52 h-52 bg-teal-400/20 rounded-full blur-3xl"
                ></div>

                <div class="flex justify-between items-center relative z-10">
                    <div>
                        <span class="block text-gray-800 dark:text-white font-semibold text-xl tracking-wide">
                            💰 Total Général des Dépenses
                        </span>
                        <div class="text-gray-900 dark:text-yellow-300 font-extrabold text-5xl mt-2">
                            {{ totalGeneral | number:'1.2-2' }}
                            <span class="text-emerald-600 dark:text-yellow-400">DH</span>
                        </div>
                        <span class="text-gray-600 dark:text-gray-300 text-sm mt-3 block italic">
                            Somme de toutes les dépenses (hors revenus comptes et total revenus)
                        </span>
                    </div>

                    <div
                        class="flex items-center justify-center bg-emerald-200 dark:bg-white/30 rounded-full shadow-md"
                        style="width: 5rem; height: 5rem"
                    >
                        <i class="pi pi-calculator text-emerald-700 dark:text-white text-3xl"></i>
                    </div>
                </div>
            </div>
        </div>

        <!-- Téléphones -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-black font-bold mb-4">Téléphones</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalTelephones  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-blue-100 dark:bg-blue-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-phone text-blue-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">paiements Téléphones</span>
            </div>
        </div>

        <!-- Bibliothèques -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-black font-bold mb-4">Bibliothèques</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalBibliotheques }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-orange-100 dark:bg-orange-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-book text-orange-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">prix livres</span>
            </div>
        </div>

        <!-- Assurances -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-black font-bold mb-4">Assurances</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalAssurances  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-cyan-100 dark:bg-cyan-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-shield text-cyan-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">paiements assurances</span>
            </div>
        </div>

        <!-- Gasoil -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-black font-bold mb-4">Gasoil</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalGasoil  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-gas-pump text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses gasoil</span>
            </div>
        </div>

        <!-- ONE -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">ONE</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalOne  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-green-100 dark:bg-green-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-bolt text-green-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">paiements ONE</span>
            </div>
        </div>

        <!-- ONEP -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">ONEP</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalOnep  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-tint text-teal-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">paiements ONEP</span>
            </div>
        </div>

        <!-- Impôts -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Impôts</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalImpots  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-red-100 dark:bg-red-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-wallet text-red-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">paiements impôts</span>
            </div>
        </div>

        <!-- Propreté -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Propreté</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalProprete  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-lime-100 dark:bg-lime-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-trash text-lime-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses propreté</span>
            </div>
        </div>

        <!-- Accidents -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Accidents</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalAccidents  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-rose-100 dark:bg-rose-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-exclamation-triangle text-rose-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses accidents</span>
            </div>
        </div>

        <!-- Réunions -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Réunions</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalReunions  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-sky-100 dark:bg-sky-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-users text-sky-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses réunions</span>
            </div>
        </div>

        <!-- Réparations École -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Réparations École</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalReparationsEcole  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-yellow-100 dark:bg-yellow-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-wrench text-yellow-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">réparations école</span>
            </div>
        </div>

        <!-- Crédits -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Crédits</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalCredits  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-pink-100 dark:bg-pink-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-dollar text-pink-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">montant crédits</span>
            </div>
        </div>

        <!-- Équipements -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Équipements</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalEquipements  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-violet-100 dark:bg-violet-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-cog text-violet-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses équipements</span>
            </div>
        </div>

        <!-- Réparations -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Réparations</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalReparations  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-fuchsia-100 dark:bg-fuchsia-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-hammer text-fuchsia-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses réparations</span>
            </div>
        </div>

        <!-- Pressons -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Pressons</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalPressons  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-slate-100 dark:bg-slate-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-print text-slate-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">dépenses pressons</span>
            </div>
        </div>

        <!-- Assurances Voitures + Total Visite -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Assurances Voitures + Total Visite</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalAssurancesVoituresEtVisite }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-zinc-100 dark:bg-zinc-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-car text-zinc-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">assurances + visites voitures</span>
            </div>
        </div>

        <!-- Revenus Espèces -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Revenus Espèces</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalRevenusEspeces  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-emerald-100 dark:bg-emerald-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-money-bill text-emerald-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">revenus en espèces</span>
            </div>
        </div>

        <!-- Revenus Comptes -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Revenus Comptes</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalRevenusComptes }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-indigo-100 dark:bg-indigo-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-credit-card text-indigo-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">revenus par compte</span>
            </div>
        </div>

        <!-- Revenus Bureau + Activités -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Revenus bibliothèques + Activités + Année dernière</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalRevenusBureauActivites  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-purple-100 dark:bg-purple-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-briefcase text-purple-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">revenus bibliothèques + activités + reste année dernière</span>
            </div>
        </div>

        <!-- Total Revenus -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Total Revenus</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalRevenus }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-amber-100 dark:bg-amber-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-chart-line text-amber-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total général </span>
                <span class="text-muted-color">tous revenus</span>
            </div>
        </div>

        <!-- CNSS -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">CNSS</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalCnss  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-indigo-100 dark:bg-indigo-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-briefcase text-indigo-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">paiements CNSS</span>
            </div>
        </div>

        <!-- Partage Bénéfice -->
        <div class="col-span-12 lg:col-span-6 xl:col-span-3">
            <div class="card mb-0">
                <div class="flex justify-between mb-4">
                    <div>
                        <span class="block text-muted-color font-medium mb-4">Partage Bénéfice</span>
                        <div class="text-surface-900 dark:text-surface-0 font-medium text-xl">
                            {{ totalPartageBenefice  }} DH
                        </div>
                    </div>
                    <div
                        class="flex items-center justify-center bg-teal-100 dark:bg-teal-400/10 rounded-border"
                        style="width: 2.5rem; height: 2.5rem"
                    >
                        <i class="pi pi-percentage text-teal-500 !text-xl"></i>
                    </div>
                </div>
                <span class="text-primary font-medium">Total </span>
                <span class="text-muted-color">partage bénéfice</span>
            </div>
        </div>
    `
})
export class StatsWidget implements OnInit {
    @Output() totalsUpdated = new EventEmitter<any>();

    totalTelephones = 0;
    totalCnss = 0;
    totalBibliotheques = 0;
    totalAssurances = 0;
    totalGasoil = 0;
    totalOne = 0;
    totalOnep = 0;
    totalImpots = 0;
    totalProprete = 0;
    totalAccidents = 0;
    totalReunions = 0;
    totalReparationsEcole = 0;
    totalCredits = 0;
    totalEquipements = 0;
    totalReparations = 0;
    totalPressons = 0;
    totalAssurancesVoitures = 0;
    totalVisiteVoitures = 0;
    totalAssurancesVoituresEtVisite = 0;
    totalRevenusEspeces = 0;
    totalRevenusComptes = 0;
    totalRevenus = 0;
    totalRevenusBureauActivites = 0;
    totalPartageBenefice = 0;
    totalGeneral = 0;

    private loadedCount = 0;
    private totalAPIs = 21; // 20 + 1 pour le nouveau total visite

    constructor(private http: HttpClient) {}

    ngOnInit(): void {
        // Téléphones
        this.http.get<number>('http://localhost:8099/api/telephones/total')
            .subscribe({
                next: (data) => {
                    this.totalTelephones = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur téléphones:', err);
                    this.totalTelephones = 0;
                    this.checkAllLoaded();
                }
            });

        // Bibliothèques
        this.http.get<number>('http://localhost:8099/api/bibliotheques/total')
            .subscribe({
                next: (data) => {
                    this.totalBibliotheques = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur bibliothèques:', err);
                    this.totalBibliotheques = 0;
                    this.checkAllLoaded();
                }
            });

        // Assurances
        this.http.get<number>('http://localhost:8099/api/assurances/total')
            .subscribe({
                next: (data) => {
                    this.totalAssurances = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur assurances:', err);
                    this.totalAssurances = 0;
                    this.checkAllLoaded();
                }
            });

        // Gasoil
        this.http.get<number>('http://localhost:8099/api/gasoils/total')
            .subscribe({
                next: (data) => {
                    this.totalGasoil = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur gasoil:', err);
                    this.totalGasoil = 0;
                    this.checkAllLoaded();
                }
            });

        // ONE
        this.http.get<number>('http://localhost:8099/api/ones/total')
            .subscribe({
                next: (data) => {
                    this.totalOne = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur ONE:', err);
                    this.totalOne = 0;
                    this.checkAllLoaded();
                }
            });

        // ONEP
        this.http.get<number>('http://localhost:8099/api/oneps/total')
            .subscribe({
                next: (data) => {
                    this.totalOnep = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur ONEP:', err);
                    this.totalOnep = 0;
                    this.checkAllLoaded();
                }
            });

        // Impôts
        this.http.get<number>('http://localhost:8099/api/impots/total')
            .subscribe({
                next: (data) => {
                    this.totalImpots = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur impôts:', err);
                    this.totalImpots = 0;
                    this.checkAllLoaded();
                }
            });

        // Propreté
        this.http.get<number>('http://localhost:8099/api/proprete/total')
            .subscribe({
                next: (data) => {
                    this.totalProprete = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur propreté:', err);
                    this.totalProprete = 0;
                    this.checkAllLoaded();
                }
            });

        // Accidents
        this.http.get<number>('http://localhost:8099/api/accidents/total')
            .subscribe({
                next: (data) => {
                    this.totalAccidents = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur accidents:', err);
                    this.totalAccidents = 0;
                    this.checkAllLoaded();
                }
            });

        // Réunions
        this.http.get<number>('http://localhost:8099/api/reunions/total')
            .subscribe({
                next: (data) => {
                    this.totalReunions = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur réunions:', err);
                    this.totalReunions = 0;
                    this.checkAllLoaded();
                }
            });

        // Réparations École
        this.http.get<number>('http://localhost:8099/api/reparations-ecole/total')
            .subscribe({
                next: (data) => {
                    this.totalReparationsEcole = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur réparations école:', err);
                    this.totalReparationsEcole = 0;
                    this.checkAllLoaded();
                }
            });

        // Crédits
        this.http.get<number>('http://localhost:8099/api/credits/total')
            .subscribe({
                next: (data) => {
                    this.totalCredits = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur crédits:', err);
                    this.totalCredits = 0;
                    this.checkAllLoaded();
                }
            });

        // Équipements
        this.http.get<number>('http://localhost:8099/api/equipements-ecole/total')
            .subscribe({
                next: (data) => {
                    this.totalEquipements = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur équipements:', err);
                    this.totalEquipements = 0;
                    this.checkAllLoaded();
                }
            });

        // Réparations
        this.http.get<number>('http://localhost:8099/api/reparations/total')
            .subscribe({
                next: (data) => {
                    this.totalReparations = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur réparations:', err);
                    this.totalReparations = 0;
                    this.checkAllLoaded();
                }
            });

        // Pressons
        this.http.get<number>('http://localhost:8099/api/pressons/total')
            .subscribe({
                next: (data) => {
                    this.totalPressons = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur pressons:', err);
                    this.totalPressons = 0;
                    this.checkAllLoaded();
                }
            });

        // Assurances Voitures
        this.http.get<number>('http://localhost:8099/api/assurances-voitures/total/assurance')
            .subscribe({
                next: (data) => {
                    this.totalAssurancesVoitures = Number(data) || 0;
                    this.calculerTotalAssurancesEtVisite();
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur assurances voitures:', err);
                    this.totalAssurancesVoitures = 0;
                    this.calculerTotalAssurancesEtVisite();
                    this.checkAllLoaded();
                }
            });

        // Total Visite Voitures
        this.http.get<number>('http://localhost:8099/api/assurances-voitures/total/visite')
            .subscribe({
                next: (data) => {
                    this.totalVisiteVoitures = Number(data) || 0;
                    this.calculerTotalAssurancesEtVisite();
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur total visite voitures:', err);
                    this.totalVisiteVoitures = 0;
                    this.calculerTotalAssurancesEtVisite();
                    this.checkAllLoaded();
                }
            });

        // Revenus Espèces
        this.http.get<number>('http://localhost:8099/api/revenus/especes/total')
            .subscribe({
                next: (data) => {
                    this.totalRevenusEspeces = Number(data) || 0;
                    this.calculerTotalRevenus();
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur revenus espèces:', err);
                    this.totalRevenusEspeces = 0;
                    this.calculerTotalRevenus();
                    this.checkAllLoaded();
                }
            });

        // Revenus Comptes
        this.http.get<number>('http://localhost:8099/api/revenus/comptes/total')
            .subscribe({
                next: (data) => {
                    this.totalRevenusComptes = Number(data) || 0;
                    this.calculerTotalRevenus();
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur revenus comptes:', err);
                    this.totalRevenusComptes = 0;
                    this.calculerTotalRevenus();
                    this.checkAllLoaded();
                }
            });

        // Revenus Bureau + Activités
        this.http.get<number>('http://localhost:8099/api/revenus/total')
            .subscribe({
                next: (data) => {
                    this.totalRevenusBureauActivites = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur revenus bureau activités:', err);
                    this.totalRevenusBureauActivites = 0;
                    this.checkAllLoaded();
                }
            });

        // CNSS
        this.http.get<number>('http://localhost:8099/api/cnss/total')
            .subscribe({
                next: (data) => {
                    this.totalCnss = Number(data) || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('Erreur CNSS:', err);
                    this.totalCnss = 0;
                    this.checkAllLoaded();
                }
            });

        // Partage Bénéfice
        this.http.get('http://localhost:8099/api/partage-benefices/total', { responseType: 'text' })
            .subscribe({
                next: (data) => {
                    const valeur = parseFloat(data);
                    this.totalPartageBenefice = valeur || 0;
                    this.checkAllLoaded();
                },
                error: (err) => {
                    console.error('❌ Erreur Partage Bénéfice:', err);
                    this.totalPartageBenefice = 0;
                    this.checkAllLoaded();
                }
            });
    }

    calculerTotalRevenus() {
        this.totalRevenus = this.totalRevenusEspeces + this.totalRevenusComptes;
    }

    calculerTotalAssurancesEtVisite() {
        this.totalAssurancesVoituresEtVisite = this.totalAssurancesVoitures + this.totalVisiteVoitures;
    }

    calculerTotalGeneral() {
        console.log('=== CALCUL TOTAL GÉNÉRAL - DÉBUT ===');
        console.log('totalTelephones:', this.totalTelephones);
        console.log('totalCnss:', this.totalCnss);
        console.log('totalBibliotheques:', this.totalBibliotheques);
        console.log('totalAssurances:', this.totalAssurances);
        console.log('totalGasoil:', this.totalGasoil);
        console.log('totalOne:', this.totalOne);
        console.log('totalOnep:', this.totalOnep);
        console.log('totalImpots:', this.totalImpots);
        console.log('totalProprete:', this.totalProprete);
        console.log('totalAccidents:', this.totalAccidents);
        console.log('totalReunions:', this.totalReunions);
        console.log('totalReparationsEcole:', this.totalReparationsEcole);
        console.log('totalEquipements:', this.totalEquipements);
        console.log('totalReparations:', this.totalReparations);
        console.log('totalPressons:', this.totalPressons);
        console.log('totalAssurancesVoituresEtVisite:', this.totalAssurancesVoituresEtVisite);
        console.log('🎯 totalPartageBenefice:', this.totalPartageBenefice);

        this.totalGeneral =
            this.totalTelephones +
            this.totalCnss +
            this.totalBibliotheques +
            this.totalAssurances +
            this.totalGasoil +
            this.totalOne +
            this.totalOnep +
            this.totalImpots +
            this.totalProprete +
            this.totalAccidents +
            this.totalReunions +
            this.totalReparationsEcole +
            this.totalEquipements +
            this.totalReparations +
            this.totalPressons +
            this.totalAssurancesVoituresEtVisite +
            this.totalPartageBenefice;

        console.log('💰 TOTAL GÉNÉRAL FINAL:', this.totalGeneral);
        console.log('=== CALCUL TOTAL GÉNÉRAL - FIN ===');
    }

    checkAllLoaded() {
        this.loadedCount++;
        console.log(`Chargé: ${this.loadedCount}/${this.totalAPIs}`);

        if (this.loadedCount === this.totalAPIs) {
            this.calculerTotalRevenus();
            this.calculerTotalAssurancesEtVisite();
            this.calculerTotalGeneral();

            this.totalsUpdated.emit({
                telephones: this.totalTelephones,
                cnss: this.totalCnss,
                bibliotheques: this.totalBibliotheques,
                assurances: this.totalAssurances,
                gasoil: this.totalGasoil,
                one: this.totalOne,
                onep: this.totalOnep,
                impots: this.totalImpots,
                proprete: this.totalProprete,
                accidents: this.totalAccidents,
                reunions: this.totalReunions,
                reparationsEcole: this.totalReparationsEcole,
                equipements: this.totalEquipements,
                reparations: this.totalReparations,
                pressons: this.totalPressons,
                assurancesVoituresEtVisite: this.totalAssurancesVoituresEtVisite,
                revenusBureauActivites: this.totalRevenusBureauActivites,
                benefices: this.totalPartageBenefice
            });
        }

        // ✅ Recalculer si un appel arrive après que tout soit chargé
        if (this.loadedCount > this.totalAPIs) {
            console.log('🔄 Recalcul du total (appel tardif)');
            this.calculerTotalGeneral();
        }
    }
}
