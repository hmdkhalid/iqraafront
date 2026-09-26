import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Cnss {
    id?: string;
    date: string;
    type: string;
    prix: number;
}

@Injectable({
    providedIn: 'root'
})
export class CnssService {
    private apiUrl = 'http://localhost:8099/api/cnss';

    constructor(private http: HttpClient) {}

    getAll(): Observable<Cnss[]> {
        return this.http.get<Cnss[]>(this.apiUrl);
    }

    getTotal(): Observable<number> {
        return this.http.get<number>(`${this.apiUrl}/total`);
    }

    create(cnss: Cnss): Observable<Cnss> {
        return this.http.post<Cnss>(this.apiUrl, cnss);
    }

    update(id: string, cnss: Cnss): Observable<Cnss> {
        return this.http.put<Cnss>(`${this.apiUrl}/${id}`, cnss);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
