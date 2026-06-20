import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetTestTeaDTO } from '../model/TestTea';

@Injectable({
  providedIn: 'root',
})
export class TestTeaService {
  
  data :GetTestTeaDTO = {
    id: "1",
    levelTEA:3,
    createdDate: "2026-06-01 17:05",
    obs: "",
    points:15
  }
  saveResult(data:any){
    this.data = data
  }

  getTestById(id:any):Observable<GetTestTeaDTO>{
    return  of(this.data)
  }
}
