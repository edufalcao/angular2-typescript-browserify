import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'header',
  template: require('./header.component.html'),
  styles: [require('./header.component.scss')]
})
export class HeaderComponent implements OnInit {
  text: string;

  constructor() {
    this.text = "Sample Header";
  }

  ngOnInit() { }
}
  