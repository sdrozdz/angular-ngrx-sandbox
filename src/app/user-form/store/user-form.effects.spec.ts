import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable } from 'rxjs';

import { UserFormEffects } from './user-form.effects';

describe('UserFormEffects', () => {
  let actions$: Observable<any>;
  let effects: UserFormEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        UserFormEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.inject(UserFormEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });
});
