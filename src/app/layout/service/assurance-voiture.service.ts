import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AssuranceVoiture {
    id?: string;                // MongoDB génère automatiquement
    matricule: string;          // Directement le matricule (pas voitureId)
    prixAssurance: number;
    prixVisite: number;
    totalAssurance?: number;    // Calculé côté backend
    totalVisite?: number;       // Calculé côté backend
}

export interface Voiture {
    id?: string;
    matricule: string;
}

@Injectable({
    providedIn: 'root'
})
export class AssuranceVoitureService {
    // ✅ URL corrigée selon votre controller
    private apiUrl = 'http://localhost:8099/api/assurances-voitures';

    constructor(private http: HttpClient) {}

    // Récupérer toutes les assurances
    getAll(): Observable<AssuranceVoiture[]> {
        return this.http.get<AssuranceVoiture[]>(this.apiUrl);
    }

    // Récupérer par matricule
    getByMatricule(matricule: string): Observable<AssuranceVoiture[]> {
        return this.http.get<AssuranceVoiture[]>(`${this.apiUrl}/matricule/${matricule}`);
    }

    // Créer une assurance
    create(assurance: AssuranceVoiture): Observable<AssuranceVoiture> {
        return this.http.post<AssuranceVoiture>(this.apiUrl, assurance);
    }

    // Mettre à jour
    update(id: string, assurance: AssuranceVoiture): Observable<AssuranceVoiture> {
        return this.http.put<AssuranceVoiture>(`${this.apiUrl}/${id}`, assurance);
    }

    // Supprimer
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    // Supprimer plusieurs
    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }

    // Totaux
    getTotalAssurance(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total/assurance`);
    }

    getTotalVisite(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total/visite`);
    }
}

@Injectable({
    providedIn: 'root'
})
export class VoitureService {
    private apiUrl = 'http://localhost:8099/api/voitures';

    constructor(private http: HttpClient) {}

    // Récupérer toutes les voitures pour le dropdown
    getAll(): Observable<Voiture[]> {
        return this.http.get<Voiture[]>(this.apiUrl);
    }

    // Récupérer par matricule
    getByMatricule(matricule: string): Observable<Voiture> {
        return this.http.get<Voiture>(`${this.apiUrl}/matricule/${matricule}`);
    }
}
