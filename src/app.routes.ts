import { Routes } from '@angular/router';


function AuthGuard() {

}

export const appRoutes: Routes = [
    {
        path: '',
        loadComponent: () =>
            import('./app/layout/component/app.layout').then((m) => m.AppLayout),
        canActivate: [AuthGuard],
        children: [
            {
                path: '',
                loadComponent: () =>
                    import('./app/pages/dashboard/dashboard').then((m) => m.Dashboard),
            },
            {
                path: 'bibliotheques',
                loadComponent: () =>
                    import('./app/pages/crud/bibliotheques/bibliotheque.component').then(
                        (m) => m.BibliothequeComponent
                    ),
            },
            {
                path: 'voitures',
                loadComponent: () =>
                    import('./app/pages/crud/voitures/voiture.component').then(
                        (m) => m.VoitureComponent
                    ),
            },
            {
                path: 'reparations',
                loadComponent: () =>
                    import('./app/pages/crud/reparations/reparation.component').then(
                        (m) => m.ReparationComponent
                    ),
            },
            {
                path: 'proprete',
                loadComponent: () =>
                    import('./app/pages/crud/propretes/proprete.component').then(
                        (m) => m.PropreteComponent
                    ),
            },
            {
                path: 'impots',
                loadComponent: () =>
                    import('./app/pages/crud/impots/impot.component').then(
                        (m) => m.ImpotComponent
                    ),
            },
            {
                path: 'assurances',
                loadComponent: () =>
                    import('./app/pages/crud/assurances/assurance.component').then(
                        (m) => m.AssuranceComponent
                    ),
            },
            {
                path: 'presson',
                loadComponent: () =>
                    import('./app/pages/crud/pressons/presson.component').then(
                        (m) => m.PressonComponent
                    ),

            },
            {
                path: 'one-onep',
                loadComponent: () =>
                    import('./app/pages/crud/one-oneps/one-onep.component').then(
                        (m) => m.OneOnepComponent
                    ),
            },
            {
                path: 'telephones',
                loadComponent: () =>
                    import('./app/pages/crud/telephones/telephone.component').then(
                        (m) => m.TelephoneComponent
                    ),
            },
            {
                path: 'gasoil',
                loadComponent: () =>
                    import('./app/pages/crud/gasoils/gasoil.component').then(
                        (m) => m.GasoilComponent
                    ),
            },
            {
                path: 'equipements-iqraa',
                loadComponent: () =>
                    import('./app/pages/crud/equipements/equipement-iqraa.component').then(
                        (m) => m.EquipementIqraaComponent
                    ),
            },
            {
                path: 'assurances-voitures',
                loadComponent: () =>
                    import('./app/pages/crud/AssuranceVoitures/assurance-voiture.component').then(
                        (m) => m.AssuranceVoitureComponent
                    ),
            },
            {
                path: 'reunions',
                loadComponent: () =>
                    import('./app/pages/crud/reunions/reunion.component').then(
                        (m) => m.ReunionComponent
                    ),
            },
            {
                path: 'revenus-especes-comptes',
                loadComponent: () =>
                    import('./app/pages/crud/revenus/revenus.component').then(
                        (m) => m.RevenusComponent
                    ),
            },
            {
                path: 'revenus-bureau-activites',
                loadComponent: () =>
                    import('./app/pages/crud/revenuss/revenuss.component').then(
                        (m) => m.RevenussComponent
                    ),
            },
            {
                path: 'accidents',
                loadComponent: () =>
                    import('./app/pages/crud/accidents/accident.component').then(m => m.AccidentComponent),
            },
            {
                path: 'cnss',
                loadComponent: () =>
                    import('./app/pages/crud/cnss/cnss.component').then(m => m.CnssComponent),
            },


            {
                path: 'credits-iqraa',
                loadComponent: () =>
                    import('./app/pages/crud/Credits/credit-iqraa.component').then(
                        (m) => m.CreditIqraaComponent
                    ),
            },
            {
                path: 'partage-benefices',
                loadComponent: () => import('./app/pages/crud/partage-benefice/partage-benefice.component')
                    .then(m => m.PartageBeneficeComponent),
            },
            {
                path: 'reparations-ecole',
                loadComponent: () =>
                    import('./app/pages/crud/ReparationsEcoles/reparation-ecole.component').then(
                        (m) => m.ReparationEcoleComponent
                    ),
            },



        ],
    },

    {
        path: 'landing',
        loadComponent: () =>
            import('./app/pages/landing/landing').then((m) => m.Landing),
    },
    {
        path: 'auth',
        loadChildren: () => import('./app/pages/auth/auth.routes'),
    },
    {
        path: 'notfound',
        loadComponent: () =>
            import('./app/pages/notfound/notfound').then((m) => m.Notfound),
    },
    {
        path: '**',
        redirectTo: '',
    },
];
