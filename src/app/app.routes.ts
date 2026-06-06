import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { RecuperContrasenaSolicitar } from './components/auth/recuper-contrasena-solicitar/recuper-contrasena-solicitar';
import { RecuperContrasenaConfirmar } from './components/auth/recuper-contrasena-confirmar/recuper-contrasena-confirmar';
import { RecuperContrasenaNueva } from './components/auth/recuper-contrasena-nueva/recuper-contrasena-nueva';
import { Main } from './components/main/main/main';
import { Dashboard } from './components/main/dashboard/dashboard';
import { TestTea } from './components/main/test-tea/test-tea';
import { History } from './components/main/history/history';
import { Kaufman } from './components/main/kaufman/kaufman';
import { TestTeaForms } from './components/main/test-tea-forms/test-tea-forms';
import { Load } from './components/load/load';
import { ResultTestTea } from './components/main/result-test-tea/result-test-tea';
import { KaufmanTest } from './components/main/kaufman-test/kaufman-test';
import { KaufmanResult } from './components/main/kaufman-result/kaufman-result';

export const routes: Routes = [
    {
        path:'',redirectTo:'app',pathMatch:'full'
    },
    /*{
        path:'load',
        component: Load
    },*/
    {
        path:'login', 
        component: Login
    },
    {
        path:'register', 
        component: Register
    },
    {
        path:'recuperar-contrasena', 
        component: RecuperContrasenaSolicitar
    },
    {
        path:'recuperar-contrasena/confirmar', 
        component: RecuperContrasenaConfirmar
    },
    {
        path:'recuperar-contrasena/nueva', 
        component: RecuperContrasenaNueva
    },
    {
        path:'app', 
        component: Main,
        children: [   
           {
            path:'' , 
            component: Dashboard,
            pathMatch:'full'
           },
           {
            path:'test-tea' ,
            component: TestTea
           },
           {
            path:'history' ,
            component: History
           },
           {
            path:'kaufman' ,
            component: Kaufman
           }
        ]
    },

    //TEST-TEA
    {
        path:'app/test-tea-forms',
        component: TestTeaForms
    },
    {
        path:'app/resultados/:id',
        component: ResultTestTea
    },
    //KAUFMAN
    {
        path:'app/kaufman/test',
        component: KaufmanTest
    },
    {
        path:'app/kaufman/result',
        component: KaufmanResult
    }



];
