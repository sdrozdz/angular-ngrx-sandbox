import { createReducer, on } from '@ngrx/store';
import { UserFormActions } from './user-form.actions';

export const userFormFeatureKey = 'userForm';

export interface FormFieldState<T> {
  value: T;
  dirty: boolean;
  valid: boolean;
}

export function emptyControl<T>(defaultValue: T) {
  return {
    value: defaultValue,
    dirty: false,
    valid: false
  };
}

export interface State {
  form: {
    firstName: FormFieldState<string>;
    lastName: FormFieldState<string>;
    email: FormFieldState<string>;
    age: FormFieldState<number>;
  }
}

export const initialState: State = {
  form: {
    firstName: emptyControl(''),
    lastName: emptyControl(''),
    email: emptyControl(''),
    age: emptyControl(-1)
  }
};

export const userFormReducer = createReducer(
  initialState,
  on(UserFormActions.addControl, (state, action) => {
    return {
      ...state,
      form: {
        ...state.form,
        [action.control]: action.controlState
      }
    };
  }),
  on(UserFormActions.uppercaseFirstName, (state) => {
    console.log('y0', state);
    return {
      ...state,
      form: {
        ...state.form,
        firstName: {
          ...state.form.firstName,
          value: state.form.firstName.value.toUpperCase()
        }
      }
    };
  })
);

