import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroComponent } from '../../components/hero/hero.component';
import { AboutUsComponent } from '../../components/about-us/about-us.component';
import { ServicesComponent } from '../../components/services/services.component';
import { TeamSectionComponent } from '../../components/team-section/team-section.component';
import { LegalCasesComponent } from '../../components/legal-cases/legal-cases.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    HeroComponent,
    AboutUsComponent,
    ServicesComponent,
    TeamSectionComponent,
    LegalCasesComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

}
