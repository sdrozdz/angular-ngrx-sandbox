import { Component, OnInit } from '@angular/core';
import { UserFormService } from './user-form.service';
import { formatCurrency } from '@angular/common';
import { Store } from '@ngrx/store';
import { UserFormActions } from './store/user-form.actions';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  providers: [
    UserFormService
  ]
})
export class UserFormComponent implements OnInit {

  constructor(readonly userForm: UserFormService, private store: Store) {}

  ngOnInit(): void {
    this.userForm.connect(); 
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
