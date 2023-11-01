import { Injectable } from '@angular/core';
import { DoErrService } from '../tlib/do-err.service';
import { combineLatest, map } from 'rxjs';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ChangelogMapperService {

  table_mapper: any;
  field_mapper: any;

  constructor(private errSvc: DoErrService) {
    this.preloadDDL(); 
    this.table_mapper = {
      // 'Dca': 'Payment'
    };

    this.field_mapper = {
      // "Ic": "IC"
    };
  }

  preloadDDL() {

  }

  map_table(table_name: string) {
    return this.table_mapper[table_name] ?? table_name;
  }

  map_field(field_name: string) {
    return this.field_mapper[field_name] ?? field_name;
  }

  map_special(value: any, field_name: string) {
    if (field_name == "DocDt") {
      const datepipe = new DatePipe('en-SG');
      return datepipe.transform(value + " +0", 'shortDate');
    }
    return value;
  }
}
