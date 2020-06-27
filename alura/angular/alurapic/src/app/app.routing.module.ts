import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: 'home',
        loadChildren: './home/home.module#HomeModule'
    },
    {
        path: 'users/:userName', 
        component: PhotoListComponent,
        resolve: {
            photos: PhotoListResolver
        }
    },
    {
        path: 'p/add', 
        component: PhotoFormComponent,
        canActivate: [AuthGuard]
    },
    {
        path: '**', 
        component: NotFoundComponent 
    }
]

@NgModule({
    /* 
    For Angular to work, the HTTP server (Apache, Tomcat, etc.) should always return the "index.html" page for any HTTP request. This configuration should be done directly on the server, but if it is not possible, the application can be executed using the HTML5 mode, which consists on using a "#" before the paths to avoid the request being redirected to the backend, so the frontend can resolve it (the browser assumes that everything after the sharp signal is an anchor to the same page). To activate it, we pass a configuration to "RouterModule.forRoot" method informing "useHash" property with "true".
    */
    imports: [RouterModule.forRoot(routes, /* {useHash: true} */)],
    exports: [RouterModule]
})
export class AppRoutingModule {

}