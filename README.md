# Do `npm i` just to install node modules 

# If needed Install Angular Material by runnning 
`ng add @angular/material`

# Data is hosted on JSON server:
A data file db.json has been included in the src folder to host on the server.
You just have to run `json-server -p 5000 --watch db.json` before `ng serve` 

# To run production please do `ng serve --prod`

# If you have to run as airline staff then Inside services/signin.services and header.component.ts file change adminEmail as '' otherwise because of auth gaurd it will not allow you to login as airlinestaff.

# If you have to login as admin then Inside services/signin.services and header.component.ts file give your email Id as adminEmail otherwise because of auth gaurd it will not allow you to login as admin.

# AirlineApp
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.9.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

