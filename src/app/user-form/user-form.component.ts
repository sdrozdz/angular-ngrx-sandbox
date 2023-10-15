import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserFormService } from './user-form.service';
import { formatCurrency } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserFormActions } from './store/user-form.actions';
import { State } from './store/user-form.reducer';
import { Subscription, map } from 'rxjs';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [
    UserFormService
  ]
})
export class UserFormComponent implements OnInit, OnDestroy {

  formValue$ = this.store.select((state) => state.userForm.form).pipe(
    map((formState) => ({
      firstName: formState.firstName.value,
      lastName: formState.lastName.value,
      email: formState.email.value,
      age: formState.age.value,
    }))
  );

  private sub = Subscription.EMPTY;

  constructor(readonly userForm: UserFormService, private store: Store<{ userForm: State }>) {}

  ngOnInit(): void {
    this.userForm.connect(); 
    this.sub = this.formValue$.subscribe(value => this.userForm.fields.patchValue(value));
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  handleUppercaseFirstName() {
    this.store.dispatch(UserFormActions.uppercaseFirstName());
  }

  handleSubmit() {
    console.log('submit', this.userForm.fields.value);
  }

  handleReset() {
    this.userForm.fields.reset();
  }

}
