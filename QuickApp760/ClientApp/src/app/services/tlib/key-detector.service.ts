// https://stackoverflow.com/questions/39592972/is-it-possible-to-use-hostlistener-in-a-service-or-how-to-use-dom-events-in-an
import { Injectable, OnDestroy, Renderer2, RendererFactory2, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Observable, Subject, fromEventPattern, takeUntil, of } from 'rxjs';

// To detect for shortcut keys. 
const shortcut: any = require('src/app/assets/scripts/our_shortcut.js');

@Injectable({
  providedIn: 'root'
})
export class KeyDetectorService {  // implements OnDestroy

  // private _destroy$ = new Subject<void>();
  // public on_keydown$: Observable<Event>;
  // public emit_callback$: Observable<any>;

  // constructor(private rendererFactory2: RendererFactory2) { 
  //   const renderer = this.rendererFactory2.createRenderer(null, null);
  //   this.handle_events(renderer);
  // }

  // ngOnDestroy(): void {
  //   this._destroy$.next();
  //   this._destroy$.complete();
  // }

  // handle_events(renderer: Renderer2) {
  //   let remove_listener: () => void;

  //   // This seems like React type of function that I never understand how it works. 
  //   // But it works so I don't care. 
  //   const create_listener = (
  //     handler: (e: Event) => boolean | void
  //   ) => {
  //     remove_listener = renderer.listen("document", "keydown", handler);
  //   };

  //   this.on_keydown$ = fromEventPattern<Event>(
  //     create_listener, 
  //     () => remove_listener()
  //   ).pipe(takeUntil(this._destroy$));

  // }

  private _curr_string: string;
  private _curr_string_modal: string;
  constructor() {
    shortcut.add("ctrl+m", () => this._set_string("search"));
    shortcut.add("shift+?", () => this._set_string("show_secret"));
  }

  // 
  // event_handler(event: KeyboardEvent): Observable<any> {
  //   // if (event.ctrlKey && event.key == "m") { return of({ty: "search"}); }
  //   // shortcut.add("ctrl+m", () => of({ty: "search"}));
  //   // shortcut.add("alt+s", function() { return of({ty: "search"}); });
  //   return of("meh");
  // }

  map_shortcut(type = "index"): Observable<any> {
    // console.log(this._curr_string);
    if (this._curr_string != "" || this._curr_string_modal != "") { 
      var temp_str = type == "index" ? this._curr_string : this._curr_string_modal;
      this._reset_string(type);
      return of({ty: temp_str});
    };
    return of("none");
  }

  _reset_string(type = "index"): void {
    if (type == "index") {
      this._curr_string = "";
    } else if (type == "modal") {
      this._curr_string_modal  = "";
    }
  }

  _set_string(str): void {
    this._curr_string = str;
    this._curr_string_modal = str;
  }

}
