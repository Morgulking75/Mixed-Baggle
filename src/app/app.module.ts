import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { AppRoutingModule } from './app-routing.module';
import { DieComponent } from './die/die.component';
import { GameBoardComponent } from './game-board/game-board.component';
import { SettingsComponent } from './settings/settings.component';
import { AppComponent } from './app.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { DiceService } from './dice/dice.service';
import { DictionaryService } from './dictionary/dictionary.service';

@NgModule({
	declarations: [
		AppComponent,
		GameBoardComponent,
		SettingsComponent,
		DieComponent
	],
	imports: [
		AppRoutingModule,
		BrowserAnimationsModule,
		BrowserModule,
		FontAwesomeModule,
		FormsModule,
		MaterialModule
	],
	providers: [
		DiceService,
		DictionaryService
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
