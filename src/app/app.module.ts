import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './core/components/address/address.component';
import { AddAddressComponent } from './core/components/add-address/add-address.component';
import { AddressListComponent } from './core/components/address-list/address-list.component';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    AddAddressComponent,
    AddressListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
