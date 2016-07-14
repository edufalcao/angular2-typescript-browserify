import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'footer',
  template: require('./footer.component.html'),
  styles: [require('./footer.component.scss')]
})
export class FooterComponent implements OnInit {
  text: string;

  constructor() {
    this.text = "Eduardo Falcão Lima - 2016";
  }

  ngOnInit() { }
}
  