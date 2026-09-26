import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Revenu {
    id?: string;
    montantRevenusBureau: number;
    montantRevenusActivitesParalleles: number;
    resteAnneeDerniere: number;  // 🆕 nouveau champ
    totalGeneral: number;
}

@Injectable({
    providedIn: 'root'
})
export class RevenusService {
    private apiUrl = 'http://localhost:8099/api/revenus';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Revenu[]> {
        return this.http.get<Revenu[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(revenu: Revenu): Observable<Revenu> {
        return this.http.post<Revenu>(this.apiUrl, revenu);
    }

    update(id: string, revenu: Revenu): Observable<Revenu> {
        return this.http.put<Revenu>(`${this.apiUrl}/${id}`, revenu);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
