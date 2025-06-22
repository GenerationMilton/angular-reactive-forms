import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-page',
  imports: [JsonPipe, ReactiveFormsModule],
  templateUrl: './basic-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicPageComponent { 

  private formBuilder =inject(FormBuilder);

  myForm = this.formBuilder.group({
    name:['', []  /**Validadores síncronos y validadores asíncronos */],
    price:[0],
    inStorate:[0],
  })


  //import FormControl y FormGroup and init properties
  // myForm =new FormGroup({
  //   name: new FormControl(''),
  //   price: new FormControl(0),
  //   inStorage: new FormControl(0),
  // });

}
