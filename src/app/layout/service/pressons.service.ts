import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paiement {
    mois?: string;
    montant?: number;
    datePaiement?: string | null; // autorise null pour les dates non saisies
}

export interface Presson {
    id?: string;
    nomComplet: string;
    paiements: Paiement[];
}

@Injectable({
    providedIn: 'root'
})
export class PressonsService {
    private apiUrl = 'http://localhost:8099/api/pressons'; // adapte selon ton backend

    constructor(private http: HttpClient) {}

    getAll(): Observable<Presson[]> {
        return this.http.get<Presson[]>(this.apiUrl);
    }

    create(p: Presson): Observable<Presson> {
        return this.http.post<Presson>(this.apiUrl, p);
    }

    update(id: string, p: Presson): Observable<Presson> {
        return this.http.put<Presson>(`${this.apiUrl}/${id}`, p);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.request<void>('delete', `${this.apiUrl}/many`, { body: { ids } });
    }
}
