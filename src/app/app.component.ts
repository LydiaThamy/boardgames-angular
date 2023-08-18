import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Bookstore';

  limit: number = 25
  offset: number = 0

  fb = inject(FormBuilder)
  form : FormGroup

  ngOnInit() {
    this.createForm()
  }

  setLimit() {
    this.limit = Number.parseInt(this.form.value['limit'])
  }

  createForm() {
    this.form = this.fb.group({
      limit: this.fb.control<number>(this.limit, Validators.required)
    })
  }

  previous() {
    this.offset -= this.limit
    console.log("limit: " + this.limit)
    console.log("offset: " + this.offset)
  }

  next() {
    this.offset += this.limit
    console.log("limit: " + this.limit)
    console.log("offset: " + this.offset)
  }

}
