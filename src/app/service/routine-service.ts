import { HttpClient } from '@angular/common/http';
import { inject, Injectable, NgZone } from '@angular/core';
import { StorageService } from './storage-service';
import { ResponseUserDTO } from '../model/User';
import { Router } from '@angular/router';
import pa from '@angular/common/locales/pa';

@Injectable({
  providedIn: 'root',
})
export class RoutineService {
  private http = inject(HttpClient)
  private readonly baseUrl = "http://localhost:8080/routine"

  constructor(){
  }

  getRoutinesByIdChild(idChild:any){
    return this.http.get<RoutineGetDTO[]>(`${this.baseUrl}/${idChild}`)
  }
  registerRoutine(idChild:any, idRoutine:any){
    return this.http.post<RoutineGetDTO>(`${this.baseUrl}/${idChild}/${idRoutine}`,null)
  }
}
