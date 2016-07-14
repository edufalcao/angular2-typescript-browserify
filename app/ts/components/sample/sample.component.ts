import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sample',
  template: require('./sample.component.html'),
  styles: [require('./sample.component.scss')]
})
export class SampleComponent implements OnInit {
  text: string;

  constructor() {
    this.text = "Hello, world! Sample Angular 2 app!";
  }

  ngOnInit() { }
}
  