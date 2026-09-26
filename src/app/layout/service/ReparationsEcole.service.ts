import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ReparationEcole {
    id?: string;
    date: string;
    type: string;
    prix: number;  // <-- ajoute ce champ

}

@Injectable({
    providedIn: 'root'
})
export class ReparationsEcoleService {
    private apiUrl = 'http://localhost:8099/api/reparations-ecole';

    constructor(private http: HttpClient) {}

    getAll(): Observable<ReparationEcole[]> {
        return this.http.get<ReparationEcole[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    getCount(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/count`);
    }

    create(rep: ReparationEcole): Observable<ReparationEcole> {
        return this.http.post<ReparationEcole>(this.apiUrl, rep);
    }

    update(id: string, rep: ReparationEcole): Observable<ReparationEcole> {
        return this.http.put<ReparationEcole>(`${this.apiUrl}/${id}`, rep);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
