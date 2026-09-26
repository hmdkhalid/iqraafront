// ========== REVENU COMPTE SERVICE CORRIGÉ ==========
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RevenuCompte {
    id?: string;
    nomPersonne: string;
    montant: number;
    date: string;
    ecole?: string;
}

export interface RevenuCompteResponse {
    revenus: RevenuCompte[];
    total: number;
}

@Injectable({
    providedIn: 'root',
})
export class RevenuCompteService {
    private apiUrl = 'http://localhost:8099/api/revenus/comptes';

    constructor(private http: HttpClient) {}

    // Récupérer et filtrer pour Iqraa1
    getIqraa1(): Observable<RevenuCompteResponse> {
        return this.http.get<RevenuCompte[]>(`${this.apiUrl}`).pipe(
            map(revenus => {
                const revenus1 = revenus.filter(r => r.ecole === 'Iqraa1');
                const total = revenus1.reduce((sum, r) => sum + r.montant, 0);
                return { revenus: revenus1, total };
            })
        );
    }

    // Ajouter pour Iqraa1
    addIqraa1(revenu: RevenuCompte): Observable<RevenuCompte> {
        const revenuAvecEcole = { ...revenu, ecole: 'Iqraa1' };
        return this.http.post<RevenuCompte>(`${this.apiUrl}`, revenuAvecEcole);
    }

    // 🔹 UPDATE IQRAA1
    updateIqraa1(data: RevenuCompte): Observable<RevenuCompte> {
        return this.http.put<RevenuCompte>(`${this.apiUrl}/${data.id}`, { ...data, ecole: 'Iqraa1' });
    }

    // Récupérer et filtrer pour Iqraa2
    getIqraa2(): Observable<RevenuCompteResponse> {
        return this.http.get<RevenuCompte[]>(`${this.apiUrl}`).pipe(
            map(revenus => {
                const revenus2 = revenus.filter(r => r.ecole === 'Iqraa2');
                const total = revenus2.reduce((sum, r) => sum + r.montant, 0);
                return { revenus: revenus2, total };
            })
        );
    }

    // Ajouter pour Iqraa2
    addIqraa2(revenu: RevenuCompte): Observable<RevenuCompte> {
        const revenuAvecEcole = { ...revenu, ecole: 'Iqraa2' };
        return this.http.post<RevenuCompte>(`${this.apiUrl}`, revenuAvecEcole);
    }

    // 🔹 UPDATE IQRAA2
    updateIqraa2(data: RevenuCompte): Observable<RevenuCompte> {
        return this.http.put<RevenuCompte>(`${this.apiUrl}/${data.id}`, { ...data, ecole: 'Iqraa2' });
    }

    // Supprimer un revenu compte
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
