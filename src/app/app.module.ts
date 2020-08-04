import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddressComponent } from './core/components/address/address.component';
import { AddAddressComponent } from './core/components/add-address/add-address.component';
import { AddressListComponent } from './core/components/address-list/address-list.component';
import { CustomButtonDirective } from './shared/directives/custom-button.directive';
import { UpperFirstLetterPipe } from './shared/pipes/upper-first-letter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddressComponent,
    AddAddressComponent,
    AddressListComponent,
    CustomButtonDirective,
    UpperFirstLetterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
