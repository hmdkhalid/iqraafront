// ========== REVENU ESPECE SERVICE CORRIGÉ ==========
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface RevenuEspece {
    id?: string;
    montant: number;
    date: string;   // <--- obligatoire
    ecole?: string;
}

export interface RevenuEspeceResponse {
    revenus: RevenuEspece[];
    total: number;
}

@Injectable({
    providedIn: 'root',
})
export class RevenuEspeceService {
    private apiUrl = 'http://localhost:8099/api/revenus/especes';

    constructor(private http: HttpClient) {}

    // Récupérer et filtrer pour Iqraa1
    getIqraa1(): Observable<RevenuEspeceResponse> {
        return this.http.get<RevenuEspece[]>(`${this.apiUrl}`).pipe(
            map(revenus => {
                const revenus1 = revenus.filter(r => r.ecole === 'Iqraa1');
                const total = revenus1.reduce((sum, r) => sum + r.montant, 0);
                return { revenus: revenus1, total };
            })
        );
    }

    // Ajouter pour Iqraa1
    addIqraa1(revenu: RevenuEspece): Observable<RevenuEspece> {
        const revenuAvecEcole = { ...revenu, ecole: 'Iqraa1' };
        return this.http.post<RevenuEspece>(`${this.apiUrl}`, revenuAvecEcole);
    }

    // Récupérer et filtrer pour Iqraa2
    getIqraa2(): Observable<RevenuEspeceResponse> {
        return this.http.get<RevenuEspece[]>(`${this.apiUrl}`).pipe(
            map(revenus => {
                const revenus2 = revenus.filter(r => r.ecole === 'Iqraa2');
                const total = revenus2.reduce((sum, r) => sum + r.montant, 0);
                return { revenus: revenus2, total };
            })
        );
    }

    // Ajouter pour Iqraa2
    addIqraa2(revenu: RevenuEspece): Observable<RevenuEspece> {
        const revenuAvecEcole = { ...revenu, ecole: 'Iqraa2' };
        return this.http.post<RevenuEspece>(`${this.apiUrl}`, revenuAvecEcole);
    }

    // Total général
    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    // Total par école
    getTotalParEcole(ecole: string): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total/${ecole}`);
    }
    updateIqraa1(data: RevenuEspece): Observable<RevenuEspece> {
        return this.http.put<RevenuEspece>(`${this.apiUrl}/${data.id}`, { ...data, ecole: 'Iqraa1' });
    }

    // 🔹 UPDATE IQRAA2
    updateIqraa2(data: RevenuEspece): Observable<RevenuEspece> {
        return this.http.put<RevenuEspece>(`${this.apiUrl}/${data.id}`, { ...data, ecole: 'Iqraa2' });
    }
    // Supprimer un revenu espèce
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }


}
