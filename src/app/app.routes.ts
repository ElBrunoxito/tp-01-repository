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
    },

    {
        path:'app/routine/level-3',
        children: [
            
            {
                path:'',redirectTo:'1',pathMatch:'full'
            },
            {
                path:'1',
                component: T31
            },
            {
                path:'2',
                component: T32
            },
            {
                path:'3',
                component: T33
            },
            {
                path:'4',
                component: T34
            },
            {
                path:'5',
                component: T35
            },
            {
                path:'6',
                component: T36
            },
            {
                path:'7',
                component: T37
            },
            {
                path:'8',
                component: T38
            },
            {
                path:'9',
                component: T39
            },
            {
                path:'10',
                component: T310
            }

        ]
    }



];
