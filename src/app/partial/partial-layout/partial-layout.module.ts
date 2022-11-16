import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartialLayoutRoutingModule } from './partial-layout-routing.module';
import { PartialLayoutComponent } from './partial-layout.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SideBarComponent } from './side-bar/side-bar.component';


@NgModule({
  declarations: [
    PartialLayoutComponent,
    HeaderComponent,
    FooterComponent,
    SideBarComponent
  ],
  imports: [
    CommonModule,
    PartialLayoutRoutingModule
  ]
})
export class PartialLayoutModule { }
