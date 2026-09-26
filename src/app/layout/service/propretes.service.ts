import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Proprete {
    id?: string;
    date: string;
    type: string;
    prix: number;
}

@Injectable({
    providedIn: 'root'
})
export class PropreteService {
    private apiUrl = 'http://localhost:8099/api/proprete';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Proprete[]> {
        return this.http.get<Proprete[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(p: Proprete): Observable<Proprete> {
        return this.http.post<Proprete>(this.apiUrl, p);
    }

    update(id: string, p: Proprete): Observable<Proprete> {
        return this.http.put<Proprete>(`${this.apiUrl}/${id}`, p);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
