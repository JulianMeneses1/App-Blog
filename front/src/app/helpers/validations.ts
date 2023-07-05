import { FormControl } from '@angular/forms';

// Clase para validar campo created en los formularios

export class specialValidators {
    public static validateDate(element:FormControl) {
      let text = element.value;
      let invalid: boolean = false;
      let aux:Date = new Date(text);
      let selectedDate:Date = new Date(aux.getUTCFullYear(),aux.getUTCMonth(),aux.getUTCDate());
      invalid = (selectedDate > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()));
      return invalid ? {invalid:true}:null;
    }
  }
  