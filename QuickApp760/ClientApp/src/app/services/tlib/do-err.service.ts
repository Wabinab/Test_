import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DoErrService {

  constructor() { }

  err_msg: string = '';
  index_err_msg: string = '';
  // modal_err_msg: string = '';  ???

  // These are the error code that's repeated. 
  // ONLY WORKS IF error.error is AN OBJECT. 
  // In other cases, it may be a string. 
  set_err(error: any, type: string="modal", handle_fivehundred = true) {
    if (typeof error == 'string') {
      this.set_str(error, type)
      return;
    }

    if (error.error instanceof Blob) {
      error.error.text().then(output => this.set_str(output, type));
      return;
    }

    if (error.status == 500 && handle_fivehundred) {
      if (error.error['split']) this.set_str(error.error.split(" at")[0].split("--->").at(-1), type);
      // else if (error.message) this.set_str(error.message, type);
      return;
    }

    var temp_err = '';
    if (error.error == undefined) {
      temp_err = JSON.stringify(error);
    } else if (error.error.errors == undefined) {
      temp_err = error.error
    } else {
      temp_err = JSON.stringify(error.error.errors)
    };

    var message = "&#9888; Error: " + (error.error 
      ? temp_err
      : error.statusText + " (" + error.status + ")");

    this.set_str(message, type);
  }

  set_str(message: string, type: string="modal") {
    if (type == "modal") {
      this.err_msg = message;
    } else if (type == 'index') {
      this.index_err_msg = message;
    } else if (type == 'all') {
      this.err_msg = message;
      this.index_err_msg = message;
    }
  }

  clear(type: string="modal") {
    this.set_str('', type);
  }
}
