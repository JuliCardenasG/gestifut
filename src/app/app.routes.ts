import { Route } from '@angular/router';
import { LoginActivateGuard } from './guards/login-activate.guard';

export const APP_ROUTES: Route[] = [
    {
        path: '',
        loadChildren: './public/public.module#PublicModule'
    },
    {
        path: 'private',
        loadChildren: './private/private.module#PrivateModule',
        canActivate: [LoginActivateGuard]
    },
    {
        path: '',
        redirectTo: '/',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: '/',
        pathMatch: 'full'
    }
];
