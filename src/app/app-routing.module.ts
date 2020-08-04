import { AuthGuard } from './core/services/auth.guard';
import { AddressListComponent } from './core/components/address-list/address-list.component';
import { AddAddressComponent } from './core/components/add-address/add-address.component';
import { AddressComponent } from './core/components/address/address.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'address-list',
    component: AddressListComponent
  },
  {
    path: 'address/:id',
    component: AddAddressComponent
  },
  {
    path: 'login',
    loadChildren: () => import('./core/modules/user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'address-list',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
