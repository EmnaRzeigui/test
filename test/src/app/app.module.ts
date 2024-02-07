import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { FormComponent } from './form/form.component';
import { FormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { EmailService } from './email.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    HistoryComponent,
    FormComponent
  ],
  imports: [
    
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [EmailService],
  bootstrap: [AppComponent]
})
export class AppModule { }
