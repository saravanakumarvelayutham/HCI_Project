import { NgModule } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import {
  BrowserModule,
  HAMMER_GESTURE_CONFIG
} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  NgbTabsetModule,
  NgbCollapseModule,
  NgbTooltipModule
} from '@ng-bootstrap/ng-bootstrap';
import { Angulartics2Module } from 'angulartics2';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DragAndDropModule } from 'angular-draggable-droppable';
import { DemoAppComponent } from './demo-app.component';
import { DemoComponent as DefaultDemoComponent } from './components/kitchen-sink/component';
import { DemoModule as DefaultDemoModule } from './components/kitchen-sink/module';
import { environment } from '../environments/environment';
import { CustomHammerConfig } from './hammer-config';
import { FormsModule } from '@angular/forms';
import { ClipboardModule } from 'ngx-clipboard';
import {NguiAutoCompleteModule} from '@ngui/auto-complete';
import { ServiceWorkerModule } from '@angular/service-worker';
import {HttpClientModule} from '@angular/common/http';
import { LandingpageComponent } from './components/landingpage/component';
import { LandingPageModule } from './components/landingpage/module';
import { SlimLoadingBarModule, SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { NavigationCancel,
  Event,
  NavigationEnd,
  NavigationError,
  NavigationStart } from '@angular/router';

@NgModule({
  declarations: [DemoAppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    NgbTabsetModule,
    NgbCollapseModule,
    NgbTooltipModule,
    DragAndDropModule,
    LandingPageModule,
    Angulartics2Module.forRoot({
      developerMode: !environment.production
    }),
    PerfectScrollbarModule,
    ClipboardModule,
    DefaultDemoModule,
    SlimLoadingBarModule,
    RouterModule.forRoot(
      [
        {
          path: 'kitchen-sink',
          component: DefaultDemoComponent,
          data: {
            label: 'Self Hosted Assistant'
          }
        },
        {
          path: 'landing',
          component: LandingpageComponent,
          data: {
            label: 'Self Hosted Assistant'
          }
        },
        {
          path: '**',
          redirectTo: 'kitchen-sink'
        }
      ],
      {
        useHash: true
      }
    ),
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    HttpClientModule,
    NguiAutoCompleteModule,
    FormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: CustomHammerConfig
    }
  ],
  bootstrap: [DemoAppComponent]
})
export class DemoAppModule {
  constructor(private _loadingBar: SlimLoadingBarService, private _router: Router) {
    this._router.events.subscribe((event: Event) => {
      this.navigationInterceptor(event);
    });
  }

  private navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this._loadingBar.start();
    }
    if (event instanceof NavigationEnd) {
      this._loadingBar.complete();
    }
    if (event instanceof NavigationCancel) {
      this._loadingBar.stop();
    }
    if (event instanceof NavigationError) {
      this._loadingBar.stop();
    }
  }
}
