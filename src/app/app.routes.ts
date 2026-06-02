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

export const routes: Routes = [
    {
        path:'',redirectTo:'app',pathMatch:'full'
    },
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
    }

];
