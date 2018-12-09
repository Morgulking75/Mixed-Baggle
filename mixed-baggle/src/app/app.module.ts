import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { DieComponent } from './die/die.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { AppComponent } from './app.component';

@NgModule({
	declarations: [
		AppComponent,
		GameBoardComponent,
		DieComponent
	],
	imports: [
		BrowserModule,
		FormsModule,
		AppRoutingModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
