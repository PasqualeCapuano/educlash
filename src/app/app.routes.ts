import { Routes } from '@angular/router';
import {LandingPageComponent} from "./components/landing-page/landing-page.component";
import {LoginComponent} from "./components/login/login.component";
import {SidebarComponent} from "./components/home/sidebar/sidebar.component";
import {HomeComponent} from "./components/home/home.component";
import {TutorialComponent} from "./components/home/tutorial/tutorial.component";
import {TicketingComponent} from "./components/home/ticketing/ticketing.component";
import {AdminComponent} from "./components/home/admin/admin.component";
import {HomepageComponent} from "./components/home/homepage/homepage.component";
import {TicketingDetailComponent} from "./components/home/ticketing-detail/ticketing-detail.component";
import {ProfileComponent} from "./components/home/profile/profile.component";
import {ChallengeComponent} from "./components/home/challenge/challenge.component";
import {ChallengeDetailComponent} from "./components/home/challenge-detail/challenge-detail.component";
import { PrivacyPolicyComponent } from './components/footer/privacy-policy/privacy-policy.component';
import {SettingsComponent} from "./components/home/settings/settings.component";
import { UserManagementComponent } from './components/home/admin/user-management/user-management.component';
import { ChallengeManagementComponent } from './components/home/admin/challenge-management/challenge-management.component';
import {AuthGuard} from "./guards/auth.guard";
import { Error404Component } from './components/error-404/error-404.component';

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard],  children: [
      { path: 'sidebar', component: SidebarComponent, },
      { path: 'settings', component: SettingsComponent, },
      { path: 'homepage', component: HomepageComponent, },
      { path: 'profile', component: ProfileComponent,},
      { path: 'challenge', component: ChallengeComponent },
      { path: 'challenge/:id', component: ChallengeDetailComponent },
      { path: 'tutorial', component: TutorialComponent },
      { path: 'ticketing', component: TicketingComponent },
      { path: 'ticketing/:id', component: TicketingDetailComponent },
      { path: 'admin', component: AdminComponent},
      {path: 'admin/user-management', component: UserManagementComponent},
      {path: 'admin/challenge-management', component: ChallengeManagementComponent},
    ]
  },
  { path: 'privacy', component: PrivacyPolicyComponent },
  { path: '**', component: Error404Component }

];
