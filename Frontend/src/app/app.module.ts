import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardDisplayComponent } from './card-display/card-display.component';
import { ContactComponent } from './contact/contact.component';
import { NavbarComponent } from './AdminInterface/navbar/navbar.component';
import { FooterComponent } from './AdminInterface/footer/footer.component';
import { AllTemplateComponent } from './AdminInterface/all-template/all-template.component';
import { LayoutComponent } from './layout/layout.component';
import { CourseManagementComponent } from './AdminInterface/course-management/course-management.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardDisplayComponent,
    ContactComponent,
    NavbarComponent,
    FooterComponent,
    AllTemplateComponent,
    LayoutComponent,
    CourseManagementComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
