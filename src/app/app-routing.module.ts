import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'statistics', component: StatisticPageComponent },
  { path: 'contact', component: ContactPageComponent, children: [
    {path: 'edit', component: ContactEditComponent},
    {path: 'edit/:id', component: ContactEditComponent} // add resolver
  ]},
  { path: 'contact/:id', component: ContactDetailsComponent, canActivate: [authGuard], },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
