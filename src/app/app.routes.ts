import { Routes } from '@angular/router';
import { ErrorPageComponent } from './features/error-page/error-page.component';
import { NoFrameComponent } from './features/no-frame/no-frame.component';
import { FrameComponent } from './features/frame/frame.component';
import { LoginComponent } from './features/login/login.component';
import { PadreComponent } from './features/padre/padre.component';
import { CameraListComponent } from './pages/camera-list/camera-list.component';
import { AuthGuard } from './guards/auth.guard';
import { CameraEditComponent } from './camera-edit/camera-edit.component';

export const routes: Routes = [
    {path: "", component: NoFrameComponent, children:[
        {path: "", redirectTo: "/login", pathMatch: "full"},
        {path: "login", component: LoginComponent},
        {path: "error", component: ErrorPageComponent},
    ]},
    {path: "logged", component: FrameComponent,canActivate: [AuthGuard], children:[
        {path:"", redirectTo: "padre", pathMatch: 'full'},
        {path:"padre", component: PadreComponent},
        { path:'camere', component: CameraListComponent },
        { path: 'camere/modifica/:id', component: CameraEditComponent }
        
    ]},
    {path:"**", redirectTo: "/error", pathMatch: 'full'}
];
