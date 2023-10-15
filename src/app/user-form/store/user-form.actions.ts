import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { FormFieldState, State } from './user-form.reducer';

export const UserFormActions = createActionGroup({
  source: 'UserForm',
  events: {
    'AddControl': props<{ control: keyof State['form'], controlState: FormFieldState<any> }>(),
    'UppercaseFirstName': emptyProps()
    
  }
});
