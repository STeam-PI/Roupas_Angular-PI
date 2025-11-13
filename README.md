# RoupasAngularPI

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

-----

## Deploy

### Deploy with GitHub Pages (Angular)

To deploy this Angular application to **GitHub Pages**, follow these steps:

1.  **Build** the application for production, making sure to specify the correct base URL (`--base-href`) which is usually the repository name:
    ```bash
    ng build --configuration production --base-href=/Roupas_Angular-PI/
    ```
2.  Install the necessary deployment tool, `angular-cli-ghpages`, if you haven't already:
    ```bash
    npm install -g angular-cli-ghpages
    ```
3.  Deploy the built artifacts from the correct distribution folder (this folder structure can vary depending on your Angular version and configuration):
    ```bash
    npx angular-cli-ghpages --dir=dist/roupas-angular-pi/browser
    ```
    This command will create and push the `gh-pages` branch with the contents of the built application.

-----

## Backend (JSON Server)

To access and simulate the product data using **JSON Server**, follow these steps:

1.  **Navigate** to the `backend` folder where the `db.json` file is located:
    ```bash
    cd backend
    ```
2.  **Start** the JSON server using the following command:
    ```bash
    npx json-server db.json
    ```
    This will start a REST API server, typically at `http://localhost:3000`, allowing your Angular application to fetch product data (e.g., from `http://localhost:3000/produtos`).

-----

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
