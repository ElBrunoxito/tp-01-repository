import { inject, Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { GetTestTeaDTO, TestTeaDTO } from '../model/TestTea';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TestTeaService {
  

  private readonly baseUrl = "http://localhost:8080/test-tea"
  private http = inject(HttpClient)

  saveResult(data:TestTeaDTO){
    return this.http.post<GetTestTeaDTO>(`${this.baseUrl}/process`,data)
  }

  getTestById(id:any){
    return this.http.get<GetTestTeaDTO>(`${this.baseUrl}/${id}`)
  }
  getChildTestsTea(idChild:any){
    return this.http.get<GetTestTeaDTO[]>(`${this.baseUrl}/list/${idChild}`).pipe(
      map((res) => {
        return [...res].sort((a, b) => {
          return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
          });
        })
    )

  }
}
