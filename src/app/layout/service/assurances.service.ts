import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Assurance {
    id?: string;
    date: string;
    type: string;
    prix: number;
}

@Injectable({
    providedIn: 'root'
})
export class AssuranceService {
    private apiUrl = 'http://localhost:8099/api/assurances';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Assurance[]> {
        return this.http.get<Assurance[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(assurance: Assurance): Observable<Assurance> {
        return this.http.post<Assurance>(this.apiUrl, assurance);
    }

    update(id: string, assurance: Assurance): Observable<Assurance> {
        return this.http.put<Assurance>(`${this.apiUrl}/${id}`, assurance);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
