# Ritual — Flutter App

A wellness ritual tracker built in Flutter. The whole experience is wrapped in a
**liquid-glass** design language, powered by **Clean Architecture** and **BLoC / Cubit**
state management, with rich animations layered on top of a fully declarative `go_router`
navigation graph.

---

## ✨ Highlight: Liquid Glass Everywhere

Glass is not a decoration bolted on at the end — it is the design system. Every surface in
the app (cards, buttons, sheets, tabs, list tiles, snackbars, app bars) is rendered as
**liquid glass**: a frosted, refractive, light-catching tablet.

Three packages drive it:

| Package | Role |
|---------|------|
| `liquid_glass_widgets` | Core glass engine — `GlassContainer`, `LiquidGlassSettings`, superellipse/rounded shapes |
| `liquid_glass_easy` | Higher-level `LiquidGlassStyle` / shape / refraction API used for buttons |
| `glassmorphism` | Supporting frosted surfaces |

### The glass is centralized, not copy-pasted

All glass tuning lives in **`lib/shared/utils/styles/app_style.dart`** so the whole app
stays visually consistent:

- `AppStyle.glassGradient()` — the signature white gradient tint used on cards
- `AppStyle.cardGlassSettings()` — depth settings for cards (higher blur, thicker glass, stronger light)
- `AppStyle.glassSettings()` — baseline settings for generic glass components
- `AppStyle.buttonGlassStyle()` — button frost with an **optical border** (light rim),
  light direction, and chromatic refraction so buttons read as carved glass

### Reusable glass widgets

Built on top of those settings, so no screen hand-rolls its own blur:

- `CustomGlassCard` — the standard glass card (blur, radius, gradient, optional tap)
- `GlassIconCircle` — circular glass surface for icons/images, with a selected state
- `FrostedSheetSurface` — frosted rounded-top backdrop for all bottom sheets
- `FlattenedGlassButton` / `CustomButton` / `IconCircleButton` / `IconCurveButton`
- `CustomGlassListTile`, `GlowingFrostedPill`, `TimePeriodTab`, `AppSnackBar`, `CustomAppBar`

Because glass widgets render their own refraction layer, `FrostedSheetSurface` deliberately
paints *behind* its children so nested glass controls keep glowing instead of being flattened.

---

## 🎬 Fancy UI & Motion

Motion is treated as part of the UI, not an afterthought:

- **Custom animation library** in `lib/shared/animations/`: `bloom_details_animation`,
  `content_transition_animation`, `journey_animation`, `quote_carousel_animation`,
  `staggered_card_animation`, `orb_bounce_rect_tween`, `animated_child`
- **Orb** — a breathing exercise drawn with a hand-written `CustomPainter` (`orb_painter.dart`)
  and its own bounce tween
- **Media-rich content** — `lottie` for vector animations, `shimmer` for skeleton loaders,
  `carousel_slider` for swipeable content, `video_player` + `chewie` for playback
- **Interactive gestures** — `flutter_card_swiper` and `scrumlab_flutter_tindercard` for
  swipe cards, `flutter_swipe_action_cell` for swipe actions, `swipe_to_confirm_button`
- **Shareable craftsmanship** — mantra cards are composed for export via `share_plus` + `gal`

---

## 🏗️ Clean Architecture

Layered by responsibility, with a dependency rule pointing inward (presentation → domain ← data):

```
lib/
├── config/                 # Environments + build flavors
│   ├── environments/       # development · staging · production
│   ├── app_config.dart
│   └── flavor_config.dart
├── core/                   # Cross-cutting application infrastructure
│   ├── app/                # App bootstrap, root widget
│   ├── bloc/               # Generic/base BLoC building blocks
│   ├── cache/ · offline/   # Caching + local persistence
│   ├── di/                 # Dependency-injection wiring
│   ├── error/              # Failure types and error handling
│   ├── model/ · enums/     # Core models and enums
│   ├── navigation/         # go_router setup, shell, route guards
│   ├── network/            # Dio client + interceptors
│   ├── notification/       # Push/local notification plumbing
│   ├── repositories/       # Base repository contract
│   └── usecases/           # Base use case contract
├── features/               # One module per product domain
├── shared/                 # Reusable building blocks
│   ├── animations/         # Custom animation widgets/tweens
│   ├── constants/          # Colors, values, asset paths, storage keys
│   ├── models/ · page/     # Shared models and common pages
│   ├── services/           # Logger, storage, toast, IAP
│   ├── utils/              # Styles, validators, formatters, extensions
│   └── widgets/            # The glass design-system widgets
└── injection_container.dart
```

Every feature module follows the same internal shape:

```
features/<feature>/
├── data/
│   ├── datasources/     # remote + local data sources
│   ├── models/          # DTOs with JSON serialization
│   └── repositories/    # repository implementations
├── domain/
│   ├── entities/        # pure business objects
│   ├── repositories/    # abstract contracts
│   └── usecases/        # one class per business action
└── presentation/
    ├── bloc/            # events · states · bloc
    ├── pages/           # screens
    └── widgets/         # feature widgets
```

### Feature modules

| Feature | What it covers |
|---------|----------------|
| `auth` | Email OTP flow, Google & Apple social login, session/password handling |
| `home` | Daily rituals, habit tracking, rhythm creation |
| `library` | Browsable habit/ritual library, filters, adopt-a-habit flow |
| `journeys` | Guided multi-day journeys, badges, journey creation |
| `bloom` | Mantra feed, Nourish Doses, shareable mantra cards |
| `orb` | Breathing/grounding orb experience with custom painting |
| `profile` | User profile, settings, user periods, theme selection |
| `progress` | Calendar-based completion tracking |
| `ritual` | Ritual CRUD and adoption |
| `habit` | Habit creation and icon selection |
| `notification` | Notification list, unread counts, read state |

---

## 🧠 State Management — BLoC & Cubit

`flutter_bloc` is the single source of truth for app state:

- **BLoC** for domain features with rich event streams — `home_bloc`, `library_bloc`,
  `journeys_bloc`, `bloom_bloc`, `profile_bloc`, `progress_bloc`, `ritual_bloc`,
  `orb_bloc`, `notification_bloc`, `habit_bloc`, `auth_bloc`
- **Cubit** for smaller, self-contained flows — `create_rhythm_cubit`,
  `create_journey_cubit`, `user_periods_cubit`
- **Equatable** state classes for value equality and predictable rebuilds
- Every bloc triplet lives together as `*_event.dart` · `*_state.dart` · `*_bloc.dart`
- Blocs are provided at the screen/route level via `BlocProvider`, and generic handler glue
  (`bloc_listener_handler.dart`) keeps listener code clean

---

## 🔌 Core Infrastructure

- **Networking** — `dio` with a `core/network` client and interceptors
- **Dependency injection** — `get_it` service locator wired in `injection_container.dart`
- **Navigation** — `go_router` declarative routes, auth-aware routing, app shell
- **Error handling** — `dartz` `Either` for functional result handling + failure types
- **Storage** — `flutter_secure_storage` for secrets, `hive`/`hive_flutter` and `sqflite`
  for local data, `shared_preferences` for settings
- **Logging** — structured logger with console/file/network formatters and levels
- **Connectivity** — `connectivity_plus` + `internet_connection_checker` with a no-internet dialog
- **Push & notifications** — `firebase_core` / `firebase_messaging` /
  `firebase_dynamic_links` plus `flutter_local_notifications`
- **Monetization** — `iap_service` for in-app purchases with an upgrade-required modal
- **App updates** — `in_app_update` and `upgrader`

---

## 📦 Notable Packages

| Area | Packages |
|------|----------|
| State | `flutter_bloc`, `equatable`, `dartz` |
| DI & routing | `get_it`, `go_router` |
| Networking | `dio`, `connectivity_plus`, `internet_connection_checker` |
| Glass / UI | `liquid_glass_widgets`, `liquid_glass_easy`, `glassmorphism` |
| Motion | `animations`, `lottie`, `shimmer`, `loading_animation_widget` |
| Media | `cached_network_image`, `flutter_svg`, `video_player`, `chewie`, `carousel_slider` |
| Storage | `flutter_secure_storage`, `hive`, `hive_flutter`, `sqflite`, `shared_preferences` |
| Platform | `image_picker`, `file_picker`, `permission_handler`, `path_provider`, `url_launcher` |
| Firebase | `firebase_core`, `firebase_messaging`, `firebase_dynamic_links`, `flutter_local_notifications` |
| Auth | `google_sign_in`, `sign_in_with_apple`, `pinput` |
| Sharing | `share_plus`, `gal` |
| Formatting / UX | `intl`, `fluttertoast`, `dropdown_button2`, `logger` |

---

## 🛠️ Getting Started

```bash
flutter pub get

# build_runner (Hive / generated models)
dart run build_runner build --delete-conflicting-outputs
```

### Run by flavor

```bash
flutter run --target lib/main_development.dart --flavor development
flutter run --target lib/main_staging.dart     --flavor staging
flutter run --target lib/main_production.dart  --flavor production
```

Environment configuration (API base URLs, keys, flags) lives in
`lib/config/environments/`.

### Firebase

Firebase config files (`google-services.json` / `GoogleService-Info.plist`) are gitignored,
so each contributor connects their own Firebase project before push notifications work.

### Test

```bash
flutter test
flutter test --coverage
```

The project analyzes cleanly under `very_good_analysis` + `flutter_lints`.

---

## 📐 Conventions

- Follow the layer structure above — logic in blocs/usecases, not widgets.
- Build UI from the shared glass widgets; tune glass only through `AppStyle`.
- New screens register dependencies in `injection_container.dart` and routes in the
  `go_router` config.
- One use case per business action; return `Either<Failure, T>`.
