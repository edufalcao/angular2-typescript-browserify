import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'sample',
  template: require('./sample.component.html')
})
export class SampleComponent implements OnInit {
  text: string;

  constructor() {
    this.text = "Hello, world! Sample Angular 2 app!";
  }

  ngOnInit() { }
}
  