import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {
  HttpModule,
  JsonpModule
} from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ToastrModule } from 'ngx-toastr';

import { AppComponent } from './app.component';
import { TestComponent } from './test/test.component';
import { AboutComponent } from './about/about.component';

import { EdserService } from './edser.service';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './admin/admin.component';

// DATATABLE COMPONENT
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LoadingModule } from 'ngx-loading';





const appRoutes: Routes = [
  { path: 'test', component: TestComponent },
  { path: 'login', component: LoginComponent },
  { path: 'about', component: AboutComponent },
  { path: 'admin', component: AdminComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    AboutComponent,
    PageNotFoundComponent,
    LoginComponent,
    AdminComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { useHash: true } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    JsonpModule,
    FormsModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added,
    NgxDatatableModule,
    LoadingModule
  ],
  providers: [EdserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
