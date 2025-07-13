# ng-ddd 🧱

> An Angular schematic for generating Domain-Driven Design (DDD) folder structures and conventions in your Angular applications.

`ng-ddd` streamlines your development workflow by scaffolding a complete, feature-rich domain structure with a single command. It handles everything from creating data-access layers and use-cases to generating feature components and automatically configuring TypeScript paths.

---

## 🤔 Why ng-ddd?

Manually setting up a proper Domain-Driven Design architecture in Angular can be tedious and error-prone. `ng-ddd` solves this by:

- **🚀 Boosting Productivity:** Generate an entire domain structure in seconds, not hours.
- **✨ Ensuring Consistency:** Enforces a standardized, battle-tested folder structure across all your domains.
- **⚙️ Automating Configuration:** Automatically configures `tsconfig.json` paths to make your domain modules easily importable.
- **✅ Following Best Practices:** Creates a clear separation of concerns by generating distinct layers for data, features, and UI.

---

## ✨ Features

- **Domain Scaffolding:** Generates a complete folder structure including `data`, `features`, `ui`, and `utils`.
- **CRUD Generation:** Automatically creates files for `Create`, `Read`, `Update`, and `Delete` use-cases and their corresponding components.
- **Smart Path Configuration:** Modifies `tsconfig.json` to include alias paths like `@domain/*` for clean imports.
- **Interactive Prompts:** Guides you through the setup process by asking for the domain name and other options.
- **Automatic Formatting:** Runs Prettier on all generated files to ensure consistent code style.

---

## 📦 Installation

The recommended way to install `ng-ddd` is by using the `ng add` command. This will automatically add the package to your project, install dependencies, and update your `tsconfig.json`.

```bash
ng add ng-ddd
```

<details>
  <summary><strong>Manual Installation</strong></summary>

You can also install the package manually via npm:

```bash
npm install ng-ddd --save-dev
```

After installation, you'll need to add the domain paths to your `tsconfig.json` file yourself:

```json
{
  "compilerOptions": {
    "paths": {
      "@domain/*": ["./src/app/domains/*"],
      "@shared/*": ["./src/app/shared/*"]
    }
  }
}
```

</details>

---

## 🚀 Usage

To generate a new domain, run the `ng generate` (or `g`) command with the `ng-ddd:domain` schematic.

```bash
ng g ng-ddd:domain
```

> **Note:** You can also use the alias `ddd` instead of `domain`.

The schematic will then prompt you for:

1.  **The domain name:** (e.g., `products`, `orders`, `users`)
2.  **The path for the domain:** The directory where the domain folder will be created.
3.  **The operations to generate:** A comma-separated list of CRUD operations. Defaults to `create,read,read-one,update,delete`.

### Generated Folder Structure

Based on your inputs, `ng-ddd` will generate a comprehensive folder structure like this:

```
domains/
└── domain-name/
    ├── data/
    │   ├── models/
    │   │   └── model.ts
    │   ├── repositories/
    │   │   └── repo.ts
    │   ├── services/
    │   │   └── service.ts
    │   ├── use-cases/
    │   │   ├── create/
    │   │   │   └── create.usecase.ts
    │   │   ├── delete/
    │   │   │   └── delete.usecase.ts
    │   │   ├── read/
    │   │   │   └── read.usecase.ts
    │   │   ├── read-one/
    │   │   │   └── read-one.usecase.ts
    │   │   └── update/
    │   │       └── update.usecase.ts
    │   └── public.api.ts
    ├── features/
    │   ├── page/
    │   │   ├── page.component.ts
    │   │   ├── page.component.html
    │   │   └── page.component.scss
    │   ├── domain-name-list/
    │   │   ├── domain-name-list.component.ts
    │   │   ├── domain-name-list.component.html
    │   │   └── domain-name-list.component.scss
    │   ├── domain-name-details/
    │   │   ├── domain-name-details.component.ts
    │   │   ├── domain-name-details.component.html
    │   │   └── domain-name-details.component.scss
    │   ├── delete-domain-name/
    │   │   ├── delete-domain-name.component.ts
    │   │   ├── delete-domain-name.component.html
    │   │   └── delete-domain-name.component.scss
    │   └── domain-name-edit/
    │       ├── domain-name-edit.component.ts
    │       ├── domain-name-edit.component.html
    │       └── domain-name-edit.component.scss
    ├── ui/
    │   └── (shared UI components)
    ├── utils/
    │   └── (utility functions/helpers)
    └── domain-name.routes.ts
```

After generating the files, the schematic will automatically run Prettier to format the code, so you're ready to start developing immediately!
