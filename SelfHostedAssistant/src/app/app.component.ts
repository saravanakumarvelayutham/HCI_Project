import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent } from 'angular-calendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SelfHostedAssistant';
  view: string = 'month';

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];
}
