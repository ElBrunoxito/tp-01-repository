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
import { T31 } from './components/main/routines/level-3/t31/t31';
import { T32 } from './components/main/routines/level-3/t32/t32';
import { T33 } from './components/main/routines/level-3/t33/t33';
import { T34 } from './components/main/routines/level-3/t34/t34';
import { T35 } from './components/main/routines/level-3/t35/t35';
import { T36 } from './components/main/routines/level-3/t36/t36';
import { T37 } from './components/main/routines/level-3/t37/t37';
import { T38 } from './components/main/routines/level-3/t38/t38';
import { T39 } from './components/main/routines/level-3/t39/t39';
import { T310 } from './components/main/routines/level-3/t310/t310';
import { T21 } from './components/main/routines/level-2/t21/t21';
import { T22 } from './components/main/routines/level-2/t22/t22';
import { T23 } from './components/main/routines/level-2/t23/t23';
import { T24 } from './components/main/routines/level-2/t24/t24';
import { T25 } from './components/main/routines/level-2/t25/t25';
import { T26 } from './components/main/routines/level-2/t26/t26';
import { T27 } from './components/main/routines/level-2/t27/t27';
import { T28 } from './components/main/routines/level-2/t28/t28';
import { T29 } from './components/main/routines/level-2/t29/t29';
import { T210 } from './components/main/routines/level-2/t210/t210';
import { T11 } from './components/main/routines/level-1/t11/t11';
import { T12 } from './components/main/routines/level-1/t12/t12';
import { T13 } from './components/main/routines/level-1/t13/t13';
import { T14 } from './components/main/routines/level-1/t14/t14';
import { T15 } from './components/main/routines/level-1/t15/t15';
import { T16 } from './components/main/routines/level-1/t16/t16';
import { T17 } from './components/main/routines/level-1/t17/t17';
import { T18 } from './components/main/routines/level-1/t18/t18';
import { T19 } from './components/main/routines/level-1/t19/t19';
import { T110 } from './components/main/routines/level-1/t110/t110';
import { Nav } from './components/main/routines/level-1/nav/nav';

export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:'full'
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
    },
    {
        path:'app/routine/level-1',
        component: Nav,
        children: [
            
            {
                path:'',redirectTo:'1',pathMatch:'full'
            },
            { path:'1',component: T11},
            { path:'2',component: T12},
            { path:'3',component: T13},
            { path:'4',component: T14},
            { path:'5',component: T15},
            { path:'6',component: T16},
            { path:'7',component: T17},
            { path:'8',component: T18},
            { path:'9',component: T19},
            { path:'10',component: T110}


        ]
    },
    {
        path:'app/routine/level-2',
        children: [
            
            {
                path:'',redirectTo:'1',pathMatch:'full'
            },
            { path:'1',component: T21},
            { path:'2',component: T22},
            { path:'3',component: T23},
            { path:'4',component: T24},
            { path:'5',component: T25},
            { path:'6',component: T26},
            { path:'7',component: T27},
            { path:'8',component: T28},
            { path:'9',component: T29},
            { path:'10',component: T210}


        ]
    },
    {
        path:'app/routine/level-3',
        children: [
            
            {
                path:'',redirectTo:'1',pathMatch:'full'
            },
            {
                path:'1',component: T31
            },
            {
                path:'2',component: T32
            },
            {
                path:'3',component: T33
            },
            {
                path:'4',component: T34
            },
            {
                path:'5',component: T35
            },
            {
                path:'6',component: T36
            },
            {
                path:'7',component: T37
            },
            {
                path:'8',component: T38
            },
            {
                path:'9',component: T39
            },
            {
                path:'10',component: T310
            }

        ]
    }



];
