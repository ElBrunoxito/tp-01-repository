import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResultadosKaufman } from '../model/Kaufman';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KaufmanService {

  private http = inject(HttpClient)
  private readonly baseUrl = "http://localhost:8080/kaufman"

  getResultById(id:any){
    return this.http.get<ResultadosKaufman>(`${this.baseUrl}/${id}`)
  }
  
  getLastKaufmanLog(idChild:any){
    return this.http.get<ResultadosKaufman>(`${this.baseUrl}/${idChild}/getLast`)
  }

  getKaufmanLogs(idChild:any){
    return this.http.get<ResultadosKaufman[]>(`${this.baseUrl}/child/${idChild}`)
  }
  saveResult(idChild:any, data:ResultadosKaufman){
    return this.http.post<ResultadosKaufman>(`${this.baseUrl}/${idChild}`,data)
  }
}
