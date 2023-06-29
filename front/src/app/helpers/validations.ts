import { FormControl } from '@angular/forms';

// Expresiones REGEX para validar campos phone, adress y country en los formularios

export const phonePattern:string="[+]\\d{1,3}\\s\\(\\d{3}\\)\\s\\d{3}\\-\\d{4}";
export const adressPattern:string="((\\d*\\w+\\s\\w+(\\s\\w+)*)||(\\w+\\s(\\w+\\s)*\\d*))";
export const countryPattern:string="[A-Za-z]+(\\s?[A-Za-z]+)*";

// Clase para validar campo birthday en los formularios

export class specialValidators {
    public static validateDate(element:FormControl) {
      let text = element.value;
      let invalid: boolean = false;
      let aux:Date = new Date(text);
      let selectedDate:Date = new Date(aux.getUTCFullYear(),aux.getUTCMonth(),aux.getUTCDate());
      invalid = (selectedDate > new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()) ||
                 selectedDate < new Date("01-01-1930"));
      return invalid ? {invalid:true}:null;
    }
  }
  