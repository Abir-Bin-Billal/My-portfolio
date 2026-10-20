# Tally — Business Ledger & Inventory Management

A production-grade Flutter app that helps small merchants (Bangladesh-first) run their
day-to-day business: track customers and suppliers, keep a running ledger (*dibo / pabo* —
"gave / received"), manage inventory, run a cashbox, and generate PDF reports — all
**offline-first** with automatic **bi-directional sync** to a cloud backend.

Built with **Clean Architecture**, **BLoC/Cubit** state management, **SQLite** local
persistence, and a **FastAPI + PostgreSQL** backend.

![Flutter](https://img.shields.io/badge/Flutter-3.47-02569B?logo=flutter&logoColor=white)
![Dart](https://img.shields.io/badge/Dart-3.13-0175C2?logo=dart&logoColor=white)
![BLoC](https://img.shields.io/badge/State-BLoC%20%2F%20Cubit-2F6FED)
![SQLite](https://img.shields.io/badge/Storage-SQLite-003B57?logo=sqlite&logoColor=white)
![Backend](https://img.shields.io/badge/Backend-FastAPI%20%2B%20PostgreSQL-009688?logo=fastapi&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Portfolio Highlights](#portfolio-highlights)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [State Management](#state-management)
- [Offline-First Storage](#offline-first-storage)
- [Data Sync Engine](#data-sync-engine)
- [Features](#features)
- [Localization, Theming & Currency](#localization-theming--currency)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Building & Releasing](#building--releasing)
- [Testing](#testing)
- [Roadmap](#roadmap)

---

## Overview

| | |
|---|---|
| **App name** | Tally |
| **Package** | `com.tally.abir` |
| **Platforms** | Android & iOS (Flutter) |
| **Language / SDK** | Dart `^3.9.2` · Flutter 3.47 |
| **State management** | `flutter_bloc` (BLoC + Cubit) |
| **Local storage** | `sqflite` (SQLite) + `flutter_secure_storage` + `shared_preferences` |
| **Backend** | FastAPI + PostgreSQL (async SQLAlchemy 2.0, JWT), deployed on Render |
| **Localization** | English 🇬🇧 + Bengali 🇧🇩 |

Tally is designed around a simple reality: small shops often operate with unreliable
internet. Every screen reads from and writes to a **local SQLite database** first, so the
app is fully usable with no connection. When connectivity returns, changes are reconciled
with the server automatically.

---

## Portfolio Highlights

Things worth calling out about this build:

- **Offline-first architecture** — SQLite is the single source of truth; the UI never blocks
  on the network. Writes are stamped (`dirty`, `updated_at`) and deletes are tombstoned so
  every change is sync-visible.
- **Custom bi-directional sync engine** — push-then-pull reconciliation with a monotonic
  **revision cursor**, **last-write-wins** conflict resolution, soft-delete tombstones, and
  cursor safety that avoids missing concurrent writes from other devices.
- **Reactive auto-sync** — a global `BlocObserver` watches for mutation-success states and
  triggers sync automatically (with a 5s cooldown), plus a throttled sync-on-app-resume.
- **Clean Architecture at scale** — 13 feature modules, each split into `data` / `domain` /
  `presentation`, with repositories returning `Either<Failure, T>` (`dartz`) and 100+ use
  cases.
- **36 blocs + 5 cubits** organized one-folder-per-action, wired through **get_it** DI.
- **Authentication done properly** — JWT access/refresh tokens in secure storage, automatic
  **401 → refresh → retry** interceptor with request de-duplication, Google Sign-In, and
  email/phone OTP flows.
- **Real documents** — customer lists, ledger statements, cashbox, expense and cash reports
  exported to **PDF** via `pdf` + `printing`.
- **Full localisation + theming** — runtime English/Bengali switching, light/dark themes and
  a currency selector (৳ / $) that drive the entire UI.

---

## Tech Stack

**Framework & language**
- Flutter 3.47 · Dart 3.13

**State & architecture**
- `flutter_bloc` / `bloc` — BLoC + Cubit state management
- `get_it` — manual service-locator dependency injection
- `dartz` — `Either<Failure, T>` functional error handling
- `equatable` — value equality for states/entities

**Data & storage**
- `sqflite` — SQLite local database
- `flutter_secure_storage` — encrypted tokens, identity, sync cursor
- `shared_preferences` — lightweight UI preferences
- `dio` — HTTP client, with `dio_cache_interceptor` + Hive cache store

**Navigation & UI**
- `go_router` — declarative routing, shell route, typed page args
- `shimmer` — skeleton loaders
- `flutter_svg`, `lottie`, `carousel_slider`, `flutter_staggered_animations`
- Material 3 theming

**Documents & media**
- `pdf` + `printing` — report generation and sharing
- `file_picker`, `flutter_contacts`, `permission_handler`, `image_picker`

**Utilities**
- `intl` — i18n and number/date formatting
- `uuid` — client-generated server IDs for sync
- `device_info_plus` — stable per-device sync identity
- `internet_connection_checker` — connectivity gating
- `logger` / `pretty_dio_logger` — logging

---

## Architecture

Tally follows **Clean Architecture** with a **feature-first** layout. Each feature under
`lib/features/<feature>/` is split into three independent layers:

```
lib/features/stock/
├── data/                       # Framework & I/O details
│   ├── datasources/            # stock_local_data_source.dart (SQLite)
│   ├── model/                  # stock_product_model.dart (fromMap / toMap / fromEntity)
│   └── repositories/           # stock_repository_impl.dart
├── domain/                     # Pure business rules — no Flutter, no I/O
│   ├── entities/               # stock_product.dart (Equatable)
│   ├── repositories/           # stock_repository.dart (abstract contract)
│   └── usecases/               # add_stock_product_use_case.dart (17+ use cases)
└── presentation/               # UI + state
    ├── bloc/                   # stock_bloc.dart + one folder per action
    ├── pages/                  # stock_page.dart
    └── widgets/                # shared widgets, typed args
```

**Data flow**

```
        UI (Widget / Page)
              ↕
     BLoC / Cubit  (event → state)
              ↕
        Use Case        (single responsibility)
              ↕
   Repository Interface (domain)
              ↕
  Repository Impl.      (data)
              ↕
 Local DataSource (SQLite)  ⇄  Remote (Dio) → FastAPI
```

- **Failures, not exceptions, at boundaries** — datasources throw; repositories translate to
  typed `Failure`s (`CacheFailure`, `ValidationFailure`, `ServerFailure`, `DatabaseFailure`)
  returned inside `Either`. Blocs fold over the result and emit states.
- **Dependency injection** — `lib/di/injection_container.dart` registers core singletons and
  delegates to 12 feature modules (`auth_modules`, `stock_module`, …). Datasources and
  repositories are lazy singletons; blocs are factories so each screen gets a fresh instance.

---

## State Management

The app is built entirely on **BLoC and Cubit** (`flutter_bloc`).

- **App-wide blocs** are provided once in `main.dart` via `MultiBlocProvider` — e.g.
  `AuthBloc`, `GetBusinessesBloc`, `BusinessIdCubit`, shared `ThemeBloc` / `LanguageBloc` /
  `CurrencyBloc`.
- **Scoped blocs** are provided per-route so their lifecycle matches the screen.
- **Multi-business re-keying** — `BusinessIdCubit` drives the app: when the active business
  changes, `MyApp` is rebuilt with `ValueKey('business-<id>')`, resetting all feature state
  for the new context.
- **Global `BlocObserver`** — `SyncBlocObserver` (registered in `main()`) observes every
  state change and auto-triggers a sync when a mutation succeeds.

Illustrative wiring:

```dart
// Observation → automatic sync
Bloc.observer = di.sl<SyncBlocObserver>();

// Feature screen gets its own bloc via DI
BlocProvider(create: (_) => GetFaqBloc(sl()), child: const HelpSupportPage());
```

---

## Offline-First Storage

The app uses **four coordinated storage layers**, each with a distinct responsibility.

### 1. SQLite — the source of truth
`lib/helpers/database_helper.dart` · database `inventory.db` (schema v4, `PRAGMA foreign_keys = ON`).

| Table | Purpose |
|---|---|
| `users` | Local user identity (owned by the auth flow) |
| `businesses` | One row per business; FK → `users` |
| `customer_supplier` | Customers & suppliers (`type` ∈ {customer, supplier}) |
| `transactions` | Ledger entries (`dibo` / `pabo`) |
| `ledger_summary` | Derived running balance per contact *(local-only, not synced)* |
| `notes` | Business notes with tags |
| `daily_transaction` | Cashbox entries (cash in/out, expense, owner in/out) |
| `cash_summary` | Daily cashbox opening balance (unique per business + date) |
| `stock_products` | Products with purchase/selling price, unit, thresholds |
| `stock_batches` | Buy batches consumed FIFO to compute remaining quantity |
| `stock_transactions` | Stock movements (BUY / SELL) |
| `categories` | Product categories |

Every synced table carries `server_id` (UUID), `updated_at`, `dirty` and `deleted_at`
columns for change tracking. Migrations are versioned in `onUpgrade` (v1→v4).

### 2. Secure storage — identity & credentials
`flutter_secure_storage` holds `access_token`, `refresh_token`, `user_data`, `user_id`,
the selected `business_id`, `last_backup_time`, and the sync `sync_revision` cursor.

### 3. Shared preferences — UI preferences
Theme mode, language code, currency, and number-formatting preferences.

### 4. HTTP response cache — transient API data
`dio_cache_interceptor` backed by a Hive store (`<documents>/dio_cache`) with 7-day
`maxStale` and `hitCacheOnErrorExcept: [401, 403]`.

**Offline-first write model:** repositories write directly to SQLite. Each write is stamped
via `SyncStamps.stamp()` (`updated_at` + `dirty = 1`) and deletes are **soft**
(`deleted_at` + `dirty = 1`), making every change syncable while keeping the UI instant.

---

## Data Sync Engine

`backup` and `sync` are the *same* operation: a full bi-directional reconciliation against
the backend, orchestrated by `SyncCoordinator` (`lib/core/sync/`).

### Flow — push first, then pull

```
 mutation success ─┐
 manual "Backup" ──┼─► SyncCoordinator.syncNow()   (deduped while in-flight)
 sync on resume ───┘        │
                            ├─► SyncPushService.push()  POST /api/v1/sync/upload
                            └─► SyncPullService.pull()  GET  /api/v1/sync/all?since=<cursor>
```

**Why push-then-pull:** uploading first means our writes are already on the server when the
pull reads, so they come back as no-ops; the cursor only advances after a *successful pull*,
so concurrent writes from other devices are never skipped.

**Push** (`sync_push_service.dart`)
- Assigns a UUID `server_id` to any row missing one.
- Collects rows where `dirty = 1 AND deleted_at IS NULL`, plus tombstones (`deleted_at`
  set) reported by `server_id`.
- Translates local integer FKs into server UUIDs (`SyncPayloadBuilder`), and merges
  `stock_batches` + `stock_transactions` into a single `stock_movements` stream.
- `POST /sync/upload` with `{ device_id, cursor, records, deleted_records }`. On ack, clears
  `dirty` and hard-deletes acknowledged tombstones.

**Pull** (`sync_pull_service.dart`)
- `GET /sync/all?since=<sync_revision>`.
- Applies rows **parent-first** (businesses → contacts → categories → products → movements →
  transactions → notes → cash) so foreign keys always resolve.
- Rows are matched on `server_id` (cash summaries match on `business_id + date`).

### Conflict resolution — last-write-wins
On both directions, the newer `updated_at` wins. The server rejects older uploads and reports
them as `conflicts`; the client keeps a newer *dirty* local edit instead of being overwritten.
The next cycle converges both sides.

### Triggers
1. **Automatic** — `SyncBlocObserver` fires a sync when a mutation-success state is emitted
   (customers, notes, stock, categories, cashbox…), guarded by a **5-second cooldown**.
2. **On resume** — `ShellWrapper` triggers a sync when the app returns to the foreground
   (throttled to once every 5 minutes).
3. **Manual** — the *Data Backup* and *Data Sync* screens drive the same coordinator.

### Backend (FastAPI + PostgreSQL)
Deployed from `backend/` via `render.yaml` (Render Blueprint, `rootDir: backend`,
health check `/health`).

- **Stack:** Python 3.12, FastAPI, async SQLAlchemy 2.0 + psycopg, JWT (HS256), Alembic.
- **Endpoints:**

  | Method | Path | Purpose |
  |---|---|---|
  | `POST` | `/api/v1/sync/upload` | Apply pushed records + tombstones |
  | `GET`  | `/api/v1/sync/all?since=<rev>` | Pull all rows with `revision > since` |
  | `POST` | `/api/v1/auth/sign-in/email` · `/auth/sign-up/email` · `/auth/refresh` | Auth |
  | `GET`  | `/health` | Health check |

- **Revision counter:** a monotonic `sync_counters` row allocates revisions; the pull reads a
  watermark under a row lock so no write can slip between the watermark and the query.
- Every synced table uses a `SyncMixin` (`updated_at`, `deleted_at`, indexed `revision`).

---

## Features

### 🔐 Authentication & Onboarding
- Animated **splash / auth gate** that restores a session and routes to dashboard or login.
- **Email + password** and **phone (+880) + password** login in one adaptive screen.
- **Registration** with carousel onboarding and confirm-password validation.
- **Phone OTP** and **email OTP** (6-digit `Pinput`, 60s resend timer).
- **Forgot / reset password** flow.
- **Google Sign-In**.
- Session handling via JWT with automatic refresh.

### 🏢 Multi-Business
- Business switcher bottom sheet with per-business customer/supplier counts.
- **Create business** wizard: name, industry, currency, logo upload, and a
  **Division → District → Upazila** address cascade driven by `assets/bangladesh.json`.

### 👥 Customers & Suppliers (Ledger)
- Searchable customer & supplier lists; create/edit with phone/email uniqueness checks.
- **Ledger detail** per contact with live balance and *Dilam / Pelam* (gave/received) entries,
  optional product attachment, date and description.
- **Receipt-style transaction success** screen (previous → new balance).
- **Report** screen with day-by-day navigation and totals, plus **PDF export**.
- **Quick Sell** — one-screen sale (product, quantity, price, customer).
- Filtering by balance and recency.

### 📦 Stock / Inventory
- Product list with search, category filter and status filter (All / Available / Low / Out).
- Create/edit product with opening stock, unit, pricing, low-stock warning, SKU and image.
- **FIFO batch costing** — remaining quantity and value derived from consumed batches.
- **Buy / Sell** transactions and full per-product transaction history.
- **Category management** (full CRUD).
- Stock summary blocs (total quantity/value, remaining qty/price) and daily stock reports.

### 💰 Cashbox
- Live cashbox balance with a **privacy (eye) toggle** to mask amounts.
- Daily transactions by type: Cash In (sell), Cash Out (buy), Expense, Owner In, Owner Out —
  each with today's type-wise total.
- **Reconcile / match cashbox** — compare counted cash vs. system balance (exact / extra /
  shortage).

### 📊 Reports (with PDF export)
- **Cash report** (cashbox + cash tabs), **expense**, **owner in/out**, and **day-wise cash**
  reports, each with day/month toggles and date navigation.
- PDF generators for cashbox, cash, expense and cash-in/out reports.

### 🗒️ Notes & 🏷️ Group Tag
- Business notes with tags, multi-select, edit and delete.
- **Group Tag** — list of *pabo* (receivable) customers with outstanding amounts, multi-select,
  and a ready message template to send payment reminders (consumes Tally message credits).

### 💳 Subscription & Message Packs
- Free-trial / current-subscription banners, plan cards and purchase sheet.
- Tally **message packs** with balance card and bKash-style purchase flow.

### 🆘 Help & Support
- Emergency WhatsApp contact, searchable **FAQ**, and a notifications **inbox** with detail
  view.

### 👤 Profile & Settings
- Business profile with logo upload and inline-edit info cards.
- Edit profile, update business address (Division/District/Upazila).
- Settings: number formatting, notification sound/voice, PIN, privacy mode.
- End drawer as the navigation hub, with **Log Out**.

### 🏠 Dashboard
- Summary cards ("You Will Get" / "You Will Give") with contact counts.
- Shortcut grid (Multi-Business, Quick Sell, Stocks, Notes, Group Tag, Backup, Tally Message,
  Cashbox).
- Tabbed customer/supplier list with search, filter and PDF export.

---

## Localization, Theming & Currency

- **Localization** — `flutter gen-l10n` with ARB sources (`app_en.arb`, `app_bn.arb`);
  English and Bengali are switchable at runtime from login, settings and the drawer. A
  custom number formatter localises digits.
- **Theming** — Material 3 light/dark themes applied at the app root via `ThemeBloc`.
- **Currency** — `CurrencyBloc` drives the ৳ / $ symbol across the entire app.

---

## Project Structure

```
lib/
├── core/                    # Cross-cutting concerns
│   ├── error/               # Failures & exceptions
│   ├── model/               # Shared domain models (geo, currency, language)
│   ├── navigation/          # Shell wrapper, bottom-nav config
│   ├── network/             # Dio client, interceptors, cache, network info
│   ├── observers/           # SyncBlocObserver
│   ├── router/              # go_router config, route names, navigation helper
│   ├── services/            # Secure storage, Google auth, geo, backup scheduler
│   ├── sync/                # SyncCoordinator, push/pull services, stamps, models
│   ├── theme/               # Light & dark themes
│   ├── usecase/             # Base UseCase<Type, Params>
│   ├── utils/               # Formatters, validators, extensions, end drawer
│   └── widgets/             # Reusable loading / empty / error widgets
│
├── di/                      # get_it DI container + feature modules
├── features/                # 13 feature modules (data / domain / presentation)
│   ├── auth/  business/  customer_supplier/  stock/  cashbox/
│   ├── reports/  note/  group_tag/  subscription/
│   ├── help_and_support/  profile/  dashboard/  backup_sync/
├── helpers/                 # DatabaseHelper (sqflite)
├── l10n/                    # ARB files + generated localizations
├── shared/                  # Shared blocs (theme/language/currency), widgets, assets
├── main.dart                # Bootstrap: DI → BlocObserver → runApp
└── my_app.dart              # MaterialApp.router (theme + locale + router)

backend/                     # FastAPI + PostgreSQL sync/API server
```

---

## Getting Started

### Prerequisites
- Flutter SDK 3.47+ (Dart 3.9+)
- Xcode (iOS) and/or Android Studio + SDK
- A running Tally backend (local `backend/` or the deployed instance)

### Run the app

```bash
# 1. Install dependencies
flutter pub get

# 2. Generate localizations
flutter gen-l10n

# 3. Run (point at your backend)
flutter run --dart-define=API_BASE_URL=http://10.0.2.2:8000/api/v1
```

`API_BASE_URL` defaults to `https://api.tally.bd/api/v1` when not provided.

### Run the backend

```bash
cd backend
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

---

## Building & Releasing

```bash
# Debug APK (installable, no signing required)
flutter build apk --debug

# Signed release APK / App Bundle (requires android/key.properties + keystore)
flutter build apk --release
flutter build appbundle --release

# iOS
flutter build ios --release
```

Release signing reads `android/key.properties` (`storeFile`, `storePassword`, `keyAlias`,
`keyPassword`). Both the properties file and the keystore are gitignored — generate them
before shipping to Google Play.

---

## Testing

```bash
flutter test                       # unit + widget tests
flutter analyze                    # static analysis
flutter test --coverage            # coverage report
```

---

## Roadmap

- Background/periodic sync via WorkManager (currently foreground + on-demand only).
- Attach receipt photos to cashbox transactions (placeholder UI present).
- Additional report types and shareable PDF templates.
- Broader locale support.

---

## License

Released under the MIT License — see [LICENSE](LICENSE) if present.

## Author

**Your Name** — Flutter Developer
[GitHub](https://github.com/yourusername) · [LinkedIn](https://linkedin.com/in/yourusername)

---

<p align="center"><b>Tally</b> — ledger, inventory and cashflow for small merchants, online or off.</p>
