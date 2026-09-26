import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Reunion {
    id?: string;        // id est bien optionnel
    type: string;
    date: Date;
    montant?: number;   // 🔹 devient optionnel
}


export interface ReunionResponse {
    reunions: Reunion[];
    total: number;
}

@Injectable({
    providedIn: 'root',
})
export class ReunionService {
    private apiUrl = 'http://localhost:8099/api/reunions';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Reunion[]> {
        return this.http.get<Reunion[]>(this.apiUrl);
    }

    getAllWithTotal(): Observable<ReunionResponse> {
        return this.http.get<ReunionResponse>(`${this.apiUrl}/with-total`);
    }

    getById(id: string): Observable<Reunion> {
        return this.http.get<Reunion>(`${this.apiUrl}/${id}`);
    }

    create(reunion: Reunion): Observable<Reunion> {
        return this.http.post<Reunion>(this.apiUrl, reunion);
    }

    update(id: string, reunion: Reunion): Observable<Reunion> {
        return this.http.put<Reunion>(`${this.apiUrl}/${id}`, reunion);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
