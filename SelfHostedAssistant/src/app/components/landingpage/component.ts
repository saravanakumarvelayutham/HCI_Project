import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-landingpage',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['styles.css'],
  templateUrl: 'template.html'
})
export class LandingpageComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
