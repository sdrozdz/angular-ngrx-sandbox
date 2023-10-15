import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormFieldState, State, State as UserFormState } from './store/user-form.reducer';
import { Subscription, debounce, debounceTime, distinctUntilChanged, filter, merge, tap } from 'rxjs';
import { UserFormActions } from './store/user-form.actions';

export interface UserFormFields {
  firstName: FormControl<string | null>;
  lastName: FormControl<string | null>;
  email: FormControl<string | null>;
  age: FormControl<number | null>;
}

@Injectable()
export class UserFormService implements OnDestroy {

  readonly fields = new FormGroup<UserFormFields>({
    firstName: new FormControl<string | null>('', { validators: Validators.required }),
    lastName: new FormControl<string | null>('', { validators: Validators.required }),
    email: new FormControl<string | null>('', { validators: [Validators.required, Validators.email] }),
    age: new FormControl<number | null>(null, { validators: [Validators.required, Validators.min(8), Validators.max(150)] }),
  });

  private sub = Subscription.EMPTY;

  constructor(private store: Store<{ userForm: State }>) {
    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  connect() {

    const firstNameSync$ = this.fields.controls.firstName.valueChanges.pipe(
      distinctUntilChanged(),
      tap((value) => this.store.dispatch(UserFormActions.addControl({ control: 'firstName', controlState: this.getControlState(this.fields.controls.firstName) })))
    );

    const firstNameLoad$ = this.store.select((state) => state.userForm.form.firstName.value).pipe(
      tap(console.log),
      tap(value => this.fields.controls.firstName.setValue(value, { emitEvent: false, onlySelf: true }))
    );


    this.sub = merge(
      firstNameSync$,
      firstNameLoad$
    ).subscribe();

  }

  private getControlState<T>(control: FormControl<T>): FormFieldState<T> {
    return {
      value: control.value,
      valid: control.valid,
      dirty: control.dirty
    };
  }
}
