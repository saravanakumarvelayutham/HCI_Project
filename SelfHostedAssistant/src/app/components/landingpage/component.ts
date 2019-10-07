import { Component, OnInit, ChangeDetectionStrategy, Input } from '@angular/core';
import { UiService } from 'src/app/services/ui/ui.service';

@Component({
  selector: 'app-landingpage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['styles.css'],
  templateUrl: 'template.html'
})
export class LandingpageComponent implements OnInit {
  darkModeActive: Boolean;
  sub1;

  constructor(private ui:UiService) {  
  }
  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });
  }
}
