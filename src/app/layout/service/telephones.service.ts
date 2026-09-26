import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paiement {
    mois?: string;
    montant?: number;
    datePaiement?: string | null; // ✅ autorise null
}

export interface Telephone {
    id?: string;
    numero: string;
    total?: number;
    paiements: Paiement[];
}

@Injectable({
    providedIn: 'root'
})
export class TelephoneService {
    private apiUrl = 'http://localhost:8099/api/telephones';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Telephone[]> {
        return this.http.get<Telephone[]>(this.apiUrl);
    }

    create(t: Telephone): Observable<Telephone> {
        return this.http.post<Telephone>(this.apiUrl, t);
    }

    update(id: string, t: Telephone): Observable<Telephone> {
        return this.http.put<Telephone>(`${this.apiUrl}/${id}`, t);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
