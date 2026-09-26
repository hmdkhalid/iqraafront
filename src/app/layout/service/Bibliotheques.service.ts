import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Bibliotheque {
    id?: string;
    date: string;
    type: string;
    prix: number;
}

@Injectable({
    providedIn: 'root'
})
export class BibliothequesService {
    private apiUrl = 'http://localhost:8099/api/bibliotheques';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Bibliotheque[]> {
        return this.http.get<Bibliotheque[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(biblio: Bibliotheque): Observable<Bibliotheque> {
        return this.http.post<Bibliotheque>(this.apiUrl, biblio);
    }

    update(id: string, biblio: Bibliotheque): Observable<Bibliotheque> {
        return this.http.put<Bibliotheque>(`${this.apiUrl}/${id}`, biblio);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
