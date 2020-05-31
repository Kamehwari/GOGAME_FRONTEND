import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: 'games',
    loadChildren: () => import('../app/components/games/games.module').then(m => m.GamesModule)
  },
  {
    path: 'signin',
    loadChildren: () => import('../app/components/user/user.module').then(m => m.UsersModule)
  },
  {
    path: 'register',
    loadChildren: () => import('../app/components/registration/registration.module').then(m => m.RegistrationsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
