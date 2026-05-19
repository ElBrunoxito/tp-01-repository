import { Routes } from '@angular/router';
import { Login } from './components/auth/login/login';
import { Register } from './components/auth/register/register';
import { RecuperContrasenaSolicitar } from './components/auth/recuper-contrasena-solicitar/recuper-contrasena-solicitar';
import { RecuperContrasenaConfirmar } from './components/auth/recuper-contrasena-confirmar/recuper-contrasena-confirmar';
import { RecuperContrasenaNueva } from './components/auth/recuper-contrasena-nueva/recuper-contrasena-nueva';

export const routes: Routes = [
    {
        path:'',redirectTo:'login',pathMatch:'full'
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
    }

];
