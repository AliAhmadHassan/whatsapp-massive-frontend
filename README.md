# WhatsAppMassive Frontend

This Angular / TypeScript single-page application is the user-facing control panel for a WhatsApp-based mass messaging service. Its goal is to let an internal team define campaigns, assemble lots, and publish batched messages to the backend automation engine without touching the underlying APIs or message scripts.

## What it delivers
- Secure entry point: a single login screen (`src/app/components/security/login`) authenticates against the HTTP backend and populates a singleton `SharedService`, which in turn unlocks the dashboard template (header, sidebar, footer, and the guarded routes defined in `src/app/app.routes.ts`).
- Campaign/lote lifecycle: users create campaigns, associate a message, and spin up lots that model scheduled send windows; each lot can import contacts, review status, and push batches for processing by the WhatsApp worker.
- Message and asset management: every message corresponds to a reusable text + optional multimedia payload (`src/app/components/mensagem-*` and `src/app/services/mensagem`), typed against `Mensagem` / `TipoArquivo` models, with client-side validation and `FileReader`-based attachments.
- Contact intelligence: `ContatoService` drives CRUD plus lifecycle operations such as single-check/double-check flags, while `ContatoImportarComponent` processes CSV/Excel-style uploads, keeps them under 2 MB, and stitches the payload to a lot for batch delivery.
- Administrative control: user, company, and status management components let administrators onboard new operators, tag contacts with `ContatoStatus`, and keep everything scoped to the currently authenticated `Empresa`.

## Stack & Tooling
- **Angular CLI + TypeScript** for a modern component/service architecture (`package.json`, `angular.json`, `tsconfig.json`).
- **RxJS + HttpClient** to wrap every backend call (follow `WHATSAPPMASSIVE_API` in `src/app/services/whats-app-massive.api.ts`), keeping the HTTP surface declarative (`createOrUpdate`, `findBy…`, `delete` helpers in each service).
- **Forms + validation helpers** (`NgForm`, `getFormGroupClass`) ensure UX feedback on every `usuario`, `campanha`, `mensagem`, `lote`, and `contato` form.
- **AdminLTE-powered UI** with icons, skins, and the `assets/css/AdminLTE.min.css` + `assets/js/adminlte.min.js` bundle, so the dashboard looks consistent across sections.
- **npm scripts** enable `npm start` (`ng serve`), `npm run build`, `npm test` (Karma), `npm run lint`, and `npm run e2e` (Protractor), making CI-ready development straightforward.

## Architecture & Collaboration Patterns
- **AppModule as the composition root**: imports `BrowserModule`, `FormsModule`, `HttpClientModule`, and routes, declares every major component, and registers the shared services and guards to keep DI centralized (`src/app/app.module.ts`).
- **Route guards & shared state**: `AuthGuard` blocks every feature route unless `SharedService.isLoggedIn()` returns true, while `SharedService.showTemplate` emits layout visibility events so the login screen controls whether header/menu/footer render.
- **Service-first data layer**: each resource (`usuario`, `campanha`, `mensagem`, `lote`, `contato`, etc.) gets a dedicated service responsible for `WHATSAPPMASSIVE_API` CRUD calls, pagination, and auxiliary REST endpoints (e.g., `findByEmpresaId`, `setDoubleCheck`, `loteParaEnvio`).
- **Reusable dialogs & feedback**: `DialogService.confirm` standardizes user confirmation dialogs, and every list/edit component uses shared message-builders (`showMessage` + `buildClasses`) for consistent alerts.
- **Model-driven domain**: classes such as `Usuario`, `Mensagem`, `Campanha`, `Lote`, `Contato`, and `ContatoImportar` keep the client-side contract aligned with the backend payloads, making serialization predictable.

## Key User Flows
1. **Launch & authenticate** – Users hit the `/login` route, submit credentials from `UsuarioService.login`, and the application stores the JWT, user info, and company in `SharedService`, then navigates to the guarded home page.
2. **Define campaigns and messages** – Through `CampanhaNew` and `MensagemNew`, teams edit reusable messages (with optional file attachments up to 5 MB) and link them to campaigns that will later feed lots.
3. **Create lots and import contacts** – `LoteNew` lets schedulers point lots at campaigns, define expected send dates, then `ContatoImportar` uploads contacts (base64-encoded attachments) and binds them to the lot for batch processing.
4. **Manage users, contacts, and statuses** – Dedicated list views (`UsuarioList`, `ContatoList`, `CampanhaList`, `MensagemList`, `LoteList`) enable pagination + delete confirmations while ensuring that every query respects the authenticated `Empresa`.
5. **Delivery controls** – `ContatoService` exposes `loteParaEnvio`, `setSingleCheck`, `setDoubleCheck`, and `setEnviadoProcedure` helpers for orchestrating the backend send pipeline (these hooks can be wired into buttons/controls when the operator is ready).

## Data Model & Domain Contracts
- `Usuario`, `Empresa`, `CurrentUser`, and `SharedService` orchestrate authentication and multi-tenant awareness.
- `Mensagem`, `TipoArquivo`, `Campanha`, `Lote`, `ContatoStatus`, and `Contato` capture campaign, scheduling, and compliance state, while `ContatoImportar` tracks bulk upload progress.
- `ResponseApi` standardizes how services interpret backend responses (`data` + `errors` arrays).

## Testing & Quality
- **Linting** – `tslint.json` enforces stylistic consistency alongside Angular CLI defaults.
- **Unit & integration scaffolding** – `karma.conf.js`, `test.ts`, and the default `app.component.spec.ts`/`shared.service.spec.ts` provide starter coverage, while `e2e/` contains Protractor configuration (`protractor.conf.js`, `app.e2e-spec.ts`) to keep the UI regression-tested.

## Running & Extending
1. `npm install` to restore node modules (Angular CLI + DevKit, RxJS, Karma, Protractor, etc.).
2. `npm start` to fire up `ng serve` and watch the `/src` tree for changes; the AdminLTE assets already live under `src/assets`.
3. `npm run build -- --prod` to create a production bundle compatible with the backend that hosts `WHATSAPPMASSIVE_API`.

## Recruiter-Ready Highlights
- Built a feature-rich admin dashboard on Angular 6 that mirrors enterprise workflows for user, campaign, message, lot, and contact management.
- Created a service-driven frontend that respects single-source-of-truth models, propagates alerts, and confirms destructive actions through a lightweight `DialogService`.
- Connected to a live REST backend (http://201.52.225.182:8090) with a global API constant, `HttpClient` wrappers, and an `AuthInterceptor` that is ready to inject the shared JWT into every outgoing request once registered.
- Styled the experience with the popular AdminLTE template, supporting responsive sidebars, icons, and a polished layout that recruiters can immediately recognize.
- Maintained npm scripts for linting, testing, and e2e automation so the project ships with an auditable, CI-friendly workflow.

## Suggested Next Steps
1. Wire the existing `AuthInterceptor` into `AppModule` so every request is authenticated automatically.
2. Extend the contact list to show delivery progress from `ContatoService` helpers and provide direct batch-release actions.
3. Add rich unit/e2e coverage against critical paths (login, campaign creation, contact import) to demonstrate test discipline.
