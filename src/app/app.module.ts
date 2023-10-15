import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { counterReducer } from './store/counter.reducer';
import { MyCounterComponent } from './my-counter/my-counter.component';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CreateUserPageComponent } from './create-user-page/create-user-page.component';
import { UserFormComponent } from './user-form/user-form.component';
import { UserFormEffects } from './user-form/store/user-form.effects';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { userFormReducer } from './user-form/store/user-form.reducer';

@NgModule({
  declarations: [
    AppComponent,
    MyCounterComponent,
    CreateUserPageComponent,
    UserFormComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    StoreModule.forRoot({
      count: counterReducer,
      userForm: userFormReducer
    }, {}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode(), trace: true }),
    EffectsModule.forFeature([UserFormEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
