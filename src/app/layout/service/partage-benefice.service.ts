import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PartageBenefice {
    id?: string;
    montant: number;
    datePartage?: string; // ✅ ajout
}

@Injectable({
    providedIn: 'root'
})
export class PartageBeneficeService {
    private apiUrl = 'http://localhost:8099/api/partage-benefices';

    constructor(private http: HttpClient) {}

    getAll(): Observable<PartageBenefice[]> {
        return this.http.get<PartageBenefice[]>(this.apiUrl);
    }

    getById(id: string): Observable<PartageBenefice> {
        return this.http.get<PartageBenefice>(`${this.apiUrl}/${id}`);
    }

    create(p: PartageBenefice): Observable<PartageBenefice> {
        return this.http.post<PartageBenefice>(this.apiUrl, p);
    }

    update(id: string, p: PartageBenefice): Observable<PartageBenefice> {
        return this.http.put<PartageBenefice>(`${this.apiUrl}/${id}`, p);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }
}
