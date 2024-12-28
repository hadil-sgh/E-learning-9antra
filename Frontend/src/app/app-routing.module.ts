import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AllTemplateComponent } from './AdminInterface/all-template/all-template.component';

const routes: Routes = [
  { path: 'layout',
     component: LayoutComponent },
  { path: 'Admin', component: AllTemplateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
