import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'

import { AppRoutingModule } from './app-routing.module'
import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component'
import { HeroeComponent } from './pages/heroe/heroe.component'
import { HeroesComponent } from './pages/heroes/heroes.component'

@NgModule({
  declarations: [
    AppComponent,
    HeroeComponent,
    HeroesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
