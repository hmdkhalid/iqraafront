import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Paiement {
    mois?: string;
    montant?: number;
    datePaiement?: string | null;
}

export interface One {
    id?: string;
    nom: string;
    numero: string;
    total?: number;
    paiements: Paiement[];
}

export interface Onep {
    id?: string;
    nom: string;
    numero: string;
    total?: number;
    paiements: Paiement[];
}

@Injectable({
    providedIn: 'root'
})
export class OneOnepsService {
    private apiUrlOne = 'http://localhost:8099/api/ones';
    private apiUrlOnep = 'http://localhost:8099/api/oneps';

    constructor(private http: HttpClient) {}

    // === Méthodes pour ONE ===
    getAllOnes(): Observable<One[]> {
        return this.http.get<One[]>(this.apiUrlOne);
    }

    createOne(one: One): Observable<One> {
        return this.http.post<One>(this.apiUrlOne, one);
    }

    updateOne(id: string, one: One): Observable<One> {
        return this.http.put<One>(`${this.apiUrlOne}/${id}`, one);
    }

    deleteOne(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrlOne}/${id}`);
    }

    deleteManyOnes(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrlOne}/deleteMany`, ids);
    }

    // === Méthodes pour ONEP ===
    getAllOneps(): Observable<Onep[]> {
        return this.http.get<Onep[]>(this.apiUrlOnep);
    }

    createOnep(onep: Onep): Observable<Onep> {
        return this.http.post<Onep>(this.apiUrlOnep, onep);
    }

    updateOnep(id: string, onep: Onep): Observable<Onep> {
        return this.http.put<Onep>(`${this.apiUrlOnep}/${id}`, onep);
    }

    deleteOnep(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrlOnep}/${id}`);
    }

    deleteManyOneps(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrlOnep}/deleteMany`, ids);
    }
}
