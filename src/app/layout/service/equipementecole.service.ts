import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface EquipementEcole {
    id?: string;
    nom: string;     // <-- bien garder "nom"
    prix: number;
    date: string;    // <-- LocalDate côté Spring
    ecole: string;
    total?: number;  // <-- champ optionnel si besoin
}

@Injectable({
    providedIn: 'root'
})
export class EquipementEcoleService {
    private apiUrl = 'http://localhost:8099/api/equipements-ecole';

    constructor(private http: HttpClient) {}

    getByEcole(ecole: string): Observable<EquipementEcole[]> {
        return this.http.get<EquipementEcole[]>(`${this.apiUrl}/ecole/${ecole}`);
    }

    create(equipement: EquipementEcole): Observable<EquipementEcole> {
        return this.http.post<EquipementEcole>(this.apiUrl, equipement);
    }

    update(id: string, equipement: EquipementEcole): Observable<EquipementEcole> {
        return this.http.put<EquipementEcole>(`${this.apiUrl}/${id}`, equipement);
    }

    delete(id: string): Observable<void> {
        return this.http.delete<void>(`${this.apiUrl}/${id}`);
    }

    deleteMany(ids: string[]): Observable<void> {
        return this.http.post<void>(`${this.apiUrl}/deleteMany`, ids);
    }
}
