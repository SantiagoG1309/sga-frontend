import { Component } from '@angular/core';

@Component({
  selector: 'app-about-us',
  standalone: true,
  imports: [],
  templateUrl: './about-us.component.html',
  styleUrl: './about-us.component.css'
})
export class AboutUsComponent {
  mainExpanded = false;
  missionExpanded = false;
  visionExpanded = false;

  toggleMain(): void {
    this.mainExpanded = !this.mainExpanded;
  }

  toggleMission(): void {
    this.missionExpanded = !this.missionExpanded;
  }

  toggleVision(): void {
    this.visionExpanded = !this.visionExpanded;
  }
}
