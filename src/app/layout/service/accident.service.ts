import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Accident {
    id?: string; // UUID ou String
    nomPersonne: string;
    type: string;
    date: Date;
    montant: number;
}

@Injectable({
    providedIn: 'root',
})
export class AccidentService {
    private apiUrl = 'http://localhost:8099/api/accidents';

    constructor(private http: HttpClient) {}

    // Récupérer tous les accidents avec total général
    // AccidentService
    getAllWithTotal(): Observable<{ accidents: Accident[]; total: number }> {
        return this.http.get<{ accidents: Accident[]; total: number }>(`${this.apiUrl}/with-total`);
    }


    // Ajouter un accident
    create(accident: Accident): Observable<Accident> {
        return this.http.post<Accident>(this.apiUrl, accident);
    }

    // Modifier un accident
    update(id: string, accident: Accident): Observable<Accident> {
        return this.http.put<Accident>(`${this.apiUrl}/${id}`, accident);
    }

    // Supprimer un accident
    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }
}
