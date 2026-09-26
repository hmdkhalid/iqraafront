import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Voiture {
    id?: string;
    matricule: string;
    marque?: string;
    modele?: string;
}

@Injectable({
    providedIn: 'root'
})
export class VoituresService {
    private apiUrl = 'http://localhost:8099/api/voitures';

    constructor(private http: HttpClient) {}

    // Récupérer toutes les voitures
    getAll(): Observable<Voiture[]> {
        return this.http.get<Voiture[]>(this.apiUrl);
    }

    // Récupérer uniquement les matricules
    getMatricules(): Observable<string[]> {
        return this.http.get<string[]>(`${this.apiUrl}/matricules`);
    }

    create(voiture: Voiture): Observable<Voiture> {
        return this.http.post<Voiture>(this.apiUrl, voiture);
    }

    update(id: string, voiture: Voiture): Observable<Voiture> {
        return this.http.put<Voiture>(`${this.apiUrl}/${id}`, voiture);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
