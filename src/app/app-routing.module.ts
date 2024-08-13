import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { StatisticPageComponent } from './pages/statistic-page/statistic-page.component';
import { ContactPageComponent } from './pages/contact-page/contact-page.component';
import { ContactDetailsComponent } from './pages/contact-details/contact-details.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ContactEditComponent } from './pages/contact-edit/contact-edit.component';
import { authGuard } from './guards/auth.guard';
import { contactResolver } from './resolvers/contact.resolver';
import { SignupPageComponent } from './pages/signup-page/signup-page.component';

const routes: Routes = [
  { path: 'home', component: HomePageComponent },
  { path: 'signup', component: SignupPageComponent },
  { path: 'statistics', component: StatisticPageComponent },
  { path: 'contact', component: ContactPageComponent, children: [
    {path: 'edit', component: ContactEditComponent},
    {path: 'edit/:id', component: ContactEditComponent, resolve: { contact: contactResolver }} 
  ]},
  { path: 'contact/:id', component: ContactDetailsComponent, canActivate: [authGuard],  resolve: { contact: contactResolver }},
  { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
