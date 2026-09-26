import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Credit {
    id?: string;
    ecole: string;        // Iqraa1, Iqraa2
    nomPersonne: string;  // nom de la personne
    prix: number;         // montant du crédit
    annee: number;        // année du crédit
    total?: number;       // total calculé ou cumulé
}

@Injectable({
    providedIn: 'root'
})
export class CreditService {
    private apiUrl = 'http://localhost:8099/api/credits';

    constructor(private http: HttpClient) {}

    // Récupérer tous les crédits
    getAll(): Observable<Credit[]> {
        return this.http.get<Credit[]>(this.apiUrl);
    }

    // Récupérer par école
    getByEcole(ecole: string): Observable<Credit[]> {
        return this.http.get<Credit[]>(`${this.apiUrl}/ecole/${ecole}`);
    }

    // Récupérer par nom de personne
    getByNomPersonne(nomPersonne: string): Observable<Credit[]> {
        return this.http.get<Credit[]>(`${this.apiUrl}/personne/${nomPersonne}`);
    }

    // Récupérer par année
    getByAnnee(annee: number): Observable<Credit[]> {
        return this.http.get<Credit[]>(`${this.apiUrl}/annee/${annee}`);
    }

    // Récupérer par école et année
    getByEcoleAndAnnee(ecole: string, annee: number): Observable<Credit[]> {
        return this.http.get<Credit[]>(`${this.apiUrl}/ecole/${ecole}/annee/${annee}`);
    }

    // Créer un nouveau crédit
    create(credit: Credit): Observable<Credit> {
        return this.http.post<Credit>(this.apiUrl, credit);
    }

    // Mettre à jour un crédit
    update(id: string, credit: Credit): Observable<Credit> {
        return this.http.put<Credit>(`${this.apiUrl}/${id}`, credit);
    }

    // Supprimer un crédit
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Supprimer plusieurs crédits
    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }

    // Obtenir le total général
    getTotalPrix(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    // Obtenir le total par école
    getTotalPrixParEcole(ecole: string): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total/ecole/${ecole}`);
    }

    // Obtenir le nombre total de crédits
    getTotalCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/count`);
    }
}
