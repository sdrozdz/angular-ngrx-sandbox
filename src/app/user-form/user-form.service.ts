import { Injectable, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormFieldState, State, State as UserFormState } from './store/user-form.reducer';
import { Observable, Subscription, debounce, debounceTime, distinctUntilChanged, filter, merge, tap } from 'rxjs';
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
    this.sub = merge(
      this.createSyncObservable('firstName', this.fields.controls.firstName),
      this.createSyncObservable('lastName', this.fields.controls.lastName),
      this.createSyncObservable('email', this.fields.controls.email),
      this.createSyncObservable('age', this.fields.controls.age),
    ).subscribe();
  }

  private createSyncObservable<T>(controlName: keyof UserFormFields, control: FormControl<T>): Observable<any> {
    return control.valueChanges.pipe(
      distinctUntilChanged(),
      tap((value) => this.store.dispatch(UserFormActions.addControl({ control: controlName, controlState: this.getControlState(control) })))
    );
  }

  private getControlState<T>(control: FormControl<T>): FormFieldState<T> {
    return {
      value: control.value,
      valid: control.valid,
      dirty: control.dirty,
      errors: control.errors  
    };
  }
}
