import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import {
  AgmCoreModule
} from '@agm/core';
import {MatTabsModule} from '@angular/material/tabs';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import {environment} from 'environments/environment';
import {AngularFireDatabaseModule} from '@angular/fire/database'
import { AngularFireModule } from '@angular/fire';
import {AngularFirestore} from '@angular/fire/firestore';

import {ToastrModule} from 'ngx-toastr'

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    MatTabsModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'YOUR_GOOGLE_MAPS_API_KEY'
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(), 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent
  ],
  providers: [AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
