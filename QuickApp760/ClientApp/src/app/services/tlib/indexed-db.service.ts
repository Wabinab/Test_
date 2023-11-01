import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { DoErrService } from './do-err.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {

  constructor(private dbSvc: NgxIndexedDBService, private errSvc: DoErrService) { }

  /** Allow write once read many. Add multiple entries to db.
   * If already exist, will raise error. 
   * 
   * db_name: "store" name; 
   * data: data to store in json. Should be array of json. 
   * type: Are you "index" or "modal"? Default: "index".
   * only_keys: Omit storing data not included in store config. Default true. 
   * subscribe: Do we call .subscribe for you? Or you call it yourself? Default: we call for you.
   */
  add_bulk(db_name: string, data: any[], type: string = "index", 
    only_keys: boolean = true, subscribe: boolean = true,
  ) {
    if (only_keys) data = this.filter_only_keys(data, db_name);
    var output$ = this.dbSvc.bulkAdd(db_name, data);
    if (subscribe) output$.subscribe(res => { 
        console.log("success") 
      }, err => this.errSvc.set_err(err, type));
    else return output$;
  }

  /** Update multiple entry. 
   * If entry don't exist, create new entry.  
   * If entry exist (based on id value you passed in), WILL OVERWRITE EXISTING. 
   * 
   * db_name: "store" name.
   * data: data to store in json. Should be array of json. 
   * type: Are you "index" or "modal"? Default: "index".
   * only_keys: Omit storing data not included in store config. Default true. 
   * subscribe: Do we call .subscribe for you? Or you call it yourself? Default: we call for you.
   */
  update_bulk(db_name: string, data: any[], type: string = "index",
    only_keys: boolean = true, subscribe: boolean = true, 
  ) {
    if (only_keys) data = this.filter_only_keys(data, db_name);
    var output$ = this.dbSvc.bulkPut(db_name, data);
    if (subscribe) output$.subscribe(res => { 
        console.log("success") 
      }, err => this.errSvc.set_err(err, type));
    else return output$;
  }

  /** Update single entry.
   * If entry don't exist, create new entry. 
   * If entry exist (based on id value you passed in), WILL OVERWRITE EXISTING. 
   * 
   * db_name: "store" name.
   * datum: data to store in json. Should be dict/json format. 
   * type: Are you "index" or "modal"? Default: "index".
   * only_keys: Omit storing data not included in store config. Default true. 
   * subscribe: Do we call .subscribe for you? Or you call it yourself? Default: we call for you.
   */
  update_single(db_name: string, datum: any, type: string = "index",
    only_keys: boolean = true, subscribe: boolean = true,
  ) {
    if (only_keys) datum = this.filter_single_key(datum, db_name);
    var output$ = this.dbSvc.update(db_name, datum);
    if (subscribe) output$.subscribe(res => { 
        console.log("success") 
      }, err => this.errSvc.set_err(err, type));
    else return output$;
  }

  /** Delete items from store based on ids passed in.
   * 
   * db_name: "store" name.
   * ids: ARRAY of ids to delete. Example: [1, 3, 5].
   * type: Are you "index" or "modal"? Default: "index".
   * subscribe: Do we call .subscribe for you? Or you call it yourself? Default: we call for you (true).
   */
  delete_bulk(db_name: string, ids: number[], type: string = "index",
    subscribe: boolean = true,  
  ) {
    var output$ = this.dbSvc.bulkDelete(db_name, ids);
    if (subscribe) output$.subscribe(res => { 
        console.log("success") 
      }, err => this.errSvc.set_err(err, type));
    else return output$;
  }

  /**Delete single item from store based on id passed in.
   * 
   * db_name: "store" name. 
   * id: integer. 
   * type: Are you "index" or "modal"? Default: "index".
   * subscribe: Do we call .subscribe for you? Or you call it yourself? Default: you call yourself (false).
   */
  delete_single(db_name: string, id: number, type: string = "index", 
    subscribe: boolean = false
  ) {
    var output$ = this.dbSvc.deleteByKey(db_name, id);
    if (subscribe) output$.subscribe(res => {
        console.log(res)
      }, err => this.errSvc.set_err(err, type));
    else return output$;
  }


  /** CLEAR all entries from the db, given db_name. 
   * 
   * db_name: "store" name.
   * type: Are you "index" or "modal"? Default: "index".
   * subscribe: Do we call .subscribe for you? Or you call it yourself? Default: we call for you (true).
   */
  clear(db_name: string, type: string = "index", subscribe: boolean = true) {
    var output$ = this.dbSvc.clear(db_name);
    if (subscribe) output$.subscribe(successDeleted => {
        console.log("Successfully deleted all? ", successDeleted ? "Yes" : "No");
      }, err => this.errSvc.set_err(err, type));
    else return output$;
  }


  /** Get ALL data from this db.
   * 
   * db_nmae: "store" name.
   * No subscribe: you need to subscribe yourself and how to deal with it. 
   */
  get_all(db_name: string) {
    return this.dbSvc.getAll(db_name);
  }

  /** Get By Ids.
   * 
   * db_name: "store" name.
   * ids: ARRAY of ids to return. 
   * No subscribe: you need to subscribe yourself and how to deal with it. 
   */
  get_by_ids(db_name: string, ids: number[]) {
    return this.dbSvc.bulkGet(db_name, ids);
  }

  /** Get by Index. 
   * NOTE: Index must be FULL. you cannot type in partial and search. 
   * That's because Indexed DB doesn't support .Where clause, nor .Contains partial string
   * clause. 
   * 
   * P.S. There is a way to search by multiple keys; but you need lower bound and upper bound.
   * Not sure if you want it; and of course; you can't type "search for all members starting
   * with 'C', it doesn't work that way."
   * 
   * db_name: "store" name.
   * field_name: "index" name. 
   * full_value: The "full" value of the field. YOU CANNOT TYPE PARTIAL NAME, MUST BE FULL. 
   * Example. If name is "Abu bin Abas", typing "Abu" won't work. Need type "Abu bin Abas".
   */
  get_by_index(db_name: string, field_name: string, full_value: any): Observable<any> {
    return this.dbSvc.getByIndex(db_name, field_name, full_value);
    // return this.dbSvc.getAllByIndex(db_name, field_name, IDBKeyRange.only(full_value))
    // replace .only with .bound(lowerBound, upperBound) to search for multiples.
  }

  // This is used with paginator_dict after pagination. 
  // Can work on itself, but to retrieve proper lower and upper bound, requires
  // calling paginate_all manually beforehand. 
  get_all_by_index(db_name: string, lower_bound: any, upper_bound: any, 
    exclude_lower: boolean = true, index: string = 'id'
  ) {
    return this.dbSvc.getAllByIndex(db_name, index, IDBKeyRange.bound(lower_bound, upper_bound, exclude_lower));
  }

  // Count the number of data in the database
  count(db_name: string) {
    return this.dbSvc.count(db_name);
  }

  // =================================================
  // Functions to retrieve data from IndexedDB as list. 
  paginator_dict = {};
  public paginate_all(db_name: string, index: string = "id", per_page: number = 40) {
    // var lower_bound = 0;
    // var upper_bound = 1000;
    return this.dbSvc.getAllKeysByIndex(db_name, index, IDBKeyRange.lowerBound(0))
    .subscribe(keys => {
      var bounds = [];
      // bounds.push(keys[0])
      for (var i = 0; i < keys.length; i = i + per_page) {
        bounds.push(keys[i]);
      }
      this.paginator_dict[db_name] = bounds;
      // console.log(this.paginator_dict);
    });
  }


  // ==================================================
  // Helper function
  private filter_only_keys(data: any[], db_name: string) {
    // You have to define these keys yourself to match those of app.module.ts dbConfig.
    // Currently, we don't have easy way to retrieve the db name and schema in angular. 
    // Existing methods online requires indexedDB object which isn't what we do in 
    // ngx-indexed-db unless you deal with javascript. 
    // Make sure the name below MATCH BACKEND NAME. NOT FRONTEND NAME. 
    if (db_name == "prod") var keys_to_keep = ["id", "name", "oldcode", "pack", "uom", "urate", "sell", "pbnd_name", "pcat_name"];
    return data.map(datum => this._filter_special(datum, keys_to_keep));
  }

  private filter_single_key(datum: any, db_name: string) {
    if (db_name == "prod") var keys_to_keep = ["id", "name", "oldcode", "pack", "uom", "urate", "sell", "pbnd_name", "pcat_name"];
    return this._filter_special(datum, keys_to_keep);
  }

  // Can only be used on single-level loop; if multi-level like "pbnd_name", it won't work
  // unless you modify the data first to flatten it to a single level following the convention.
  // such that datum["pbnd"]["name"] could be retrieved by datum["pbnd_name"]. 
  private _filter_keys_single_entry(datum: any, keys: string[]) {
    return Object.keys(datum)
      .filter(((key) => keys.includes(key)))
      .reduce((obj, key) => {
        return Object.assign(obj, {
          [key]: datum[key]
        });
      }, {});
  }

  // For example "pbnd_name" here means we want datum["pbnd"]["name"]. 
  private _filter_special(datum: any, keys: string[]) {
    var item = {};
    keys.forEach(key => {
      var key_split = key.split("_");
      var temp_value = datum;
      key_split.forEach(k => {
        temp_value = datum[k]
      });
      item[key] = temp_value;
    });
    return item;
  }
}
