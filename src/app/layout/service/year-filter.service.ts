import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class YearFilterService {
    private selectedYearSource = new BehaviorSubject<number>(new Date().getFullYear());
    selectedYear$ = this.selectedYearSource.asObservable();

    setYear(year: number) {
        this.selectedYearSource.next(year);
    }
}
