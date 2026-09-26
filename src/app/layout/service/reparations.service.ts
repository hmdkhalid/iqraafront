import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Reparation {
    id?: string;
    matricule: string;
    type: string;
    date: string;
    montant: number;
}

@Injectable({
    providedIn: 'root'
})
export class ReparationsService {
    private apiUrl = 'http://localhost:8099/api/reparations';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Reparation[]> {
        return this.http.get<Reparation[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(rep: Reparation): Observable<Reparation> {
        return this.http.post<Reparation>(this.apiUrl, rep);
    }

    update(id: string, rep: Reparation): Observable<void> {
        return this.http.put<void>(`${this.apiUrl}/${id}`, rep);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
