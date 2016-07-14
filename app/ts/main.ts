/// <reference path="../../typings/browser.d.ts" />
/// <reference path="./common.d.ts" />

import 'reflect-metadata';
import 'zone.js/dist/zone';
import { bootstrap }    from '@angular/platform-browser-dynamic';
import { provide } from '@angular/core';
import { MockBackend } from '@angular/http/testing';
import { HTTP_PROVIDERS, Http, BaseRequestOptions } from '@angular/http';
import { ROUTER_PROVIDERS } from '@angular/router-deprecated';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';

// Our main component
import { AppComponent } from './components/app.component';

bootstrap(AppComponent, [ROUTER_PROVIDERS, HTTP_PROVIDERS, BaseRequestOptions, MockBackend,
  provide(Http, {
    useFactory: (backend, options) => {
      return new Http(backend, options);
    },
    deps: [MockBackend, BaseRequestOptions]
  }),
  provide(LocationStrategy, { useClass: HashLocationStrategy })
]);