import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Impot {
    id?: string;
    date: string;
    type: string;
    prix: number;
}

@Injectable({
    providedIn: 'root'
})
export class ImpotsService {
    private apiUrl = 'http://localhost:8099/api/impots';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Impot[]> {
        return this.http.get<Impot[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(impot: Impot): Observable<Impot> {
        return this.http.post<Impot>(this.apiUrl, impot);
    }

    update(id: string, impot: Impot): Observable<Impot> {
        return this.http.put<Impot>(`${this.apiUrl}/${id}`, impot);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
