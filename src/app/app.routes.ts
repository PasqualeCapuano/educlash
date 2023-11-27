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

export const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, children: [
      { path: 'sidebar', component: SidebarComponent },
      { path: 'homepage', component: HomepageComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'challenge', component: ChallengeComponent },
      { path: 'challenge/:id', component: ChallengeDetailComponent },
      { path: 'tutorial', component: TutorialComponent },
      { path: 'ticketing', component: TicketingComponent },
      { path: 'ticketing/:id', component: TicketingDetailComponent },
      { path: 'admin', component: AdminComponent}
    ]
  },

];
