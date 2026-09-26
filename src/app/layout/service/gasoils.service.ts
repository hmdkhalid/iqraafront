import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paiement {
    mois?: string;
    montant?: number;
    datePaiement?: string | null;
}

export interface Voiture {
    id?: string;
    matricule: string;
    marque?: string;
    modele?: string;
}

export interface Gasoil {
    id?: string;
    voiture?: Voiture | null; // ✅ correction ici
    total?: number;
    paiements: Paiement[];
}

@Injectable({
    providedIn: 'root'
})
export class GasoilService {
    private apiUrl = 'http://localhost:8099/api/gasoils';
    private voitureApiUrl = 'http://localhost:8099/api/voitures';

    constructor(private http: HttpClient) {}

    // === Méthodes pour Gasoil ===
    getAll(): Observable<Gasoil[]> {
        return this.http.get<Gasoil[]>(this.apiUrl);
    }

    create(gasoil: Gasoil): Observable<Gasoil> {
        if (!gasoil.voiture || !gasoil.voiture.id) {
            throw new Error('ID de la voiture requis');
        }

        const voitureId = gasoil.voiture.id;
        const gasoilToSend = {
            paiements: gasoil.paiements,
            total: gasoil.total
        };

        console.log('Envoi vers URL:', `${this.apiUrl}/${voitureId}`);
        console.log('Données envoyées:', gasoilToSend);

        return this.http.post<Gasoil>(`${this.apiUrl}/${voitureId}`, gasoilToSend);
    }

    update(id: string, gasoil: Gasoil): Observable<Gasoil> {
        if (!gasoil.voiture || !gasoil.voiture.id) {
            throw new Error('ID de la voiture requis pour la modification');
        }

        const voitureId = gasoil.voiture.id;
        const gasoilToSend = {
            paiements: gasoil.paiements,
            total: gasoil.total
        };

        console.log('Modification - URL:', `${this.apiUrl}/${id}/${voitureId}`);
        console.log('Modification - Données:', gasoilToSend);

        return this.http.put<Gasoil>(`${this.apiUrl}/${id}/${voitureId}`, gasoilToSend);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }

    // === Méthodes pour récupérer les voitures ===
    getAllVoitures(): Observable<Voiture[]> {
        return this.http.get<Voiture[]>(this.voitureApiUrl);
    }
}
