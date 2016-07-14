import { Component } from "@angular/core";
import { HTTP_PROVIDERS } from "@angular/http";
import { MockBackend } from "@angular/http/testing";
import "rxjs/Rx";

import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { SampleComponent } from "./sample/sample.component";

@Component({
  selector: 'my-app',
  directives: [HeaderComponent, FooterComponent, SampleComponent],
  template:
  `
    <header></header>
    <sample></sample>
    <footer></footer>
  `
})

export class AppComponent {
  pageTitle: string = "Sample Angular 2 Application";

  constructor(private backend: MockBackend) { }
}