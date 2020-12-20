import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from "@angular/forms";

@Component({
  selector: 'app-form-field-error',
  template: `
    <p  class="text-danger">
      {{ errorMessage }}
    </p>
  `,
  styleUrls: ['./form-field-error.component.css']
})
export class FormFieldErrorComponent implements OnInit {

  @Input('form-control') fromControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

  public get errorMessage(): string | null {
    if(this.mustShowErrorMessage()){
      return this.getErrorMessage();
    }else{
      return null;
    }
  }

  private mustShowErrorMessage(): boolean {
    return this.fromControl.invalid && this.fromControl.touched;
  }

  private getErrorMessage(): string | null {
    if(this.fromControl.errors.required){
      return "Campo obrigatório";
    }
    else if(this.fromControl.errors.email){
      return "Email inválido.";
    }
    else if(this.fromControl.errors.minlength){
      const requiredLength = this.fromControl.errors.minlength.requiredLength;
      return `Mínimo ${requiredLength} caracteres.`;
    }
    else if(this.fromControl.errors.maxlength){
      const requiredLength = this.fromControl.errors.maxlength.requiredLength;
      return `Máximo ${requiredLength} caracteres.`;
    }
  }

}
