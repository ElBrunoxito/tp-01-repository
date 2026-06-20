import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ResultadosKaufman } from '../model/Kaufman';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class KaufmanService {

  data :ResultadosKaufman = {
  "idc": 90,
  "classification": 100,
  "logicalSequencing": 100,
  "association": 67,
  "memory": 100,
  "visual": 100,
  "attention": 100
}
  private http = inject(HttpClient)



  saveResult(data:any){
    this.data = data
  }

  getResultById(id:any):Observable<ResultadosKaufman>{
    return  of(this.data)
  }
}
