import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import "rxjs/Rx";

@Component({
  selector: 'my-app',
  template:
  `
    <div>
      <h1>{{pageTitle}}</h1>
     </div>
   `
})

export class AppComponent {
  pageTitle: string = "Sample Angular 2 Application";

  constructor(private backend: MockBackend) { }
}