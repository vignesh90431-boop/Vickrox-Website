# VICKROX Website

A responsive business website built with React, TypeScript, Vite, Tailwind CSS,
and locally generated shadcn/ui components.

## Getting started

Use a Node.js version supported by Vite 8.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project commands

| Command                | Purpose                                                       |
| ---------------------- | ------------------------------------------------------------- |
| `npm run dev`          | Start the local development server.                           |
| `npm run build`        | Type-check and build the production site in `dist/`.          |
| `npm run lint`         | Run ESLint.                                                   |
| `npm run format`       | Format application source, styles, and project documentation. |
| `npm run format:check` | Check formatting without changing files.                      |
| `npm run typecheck`    | Run the TypeScript type checker.                              |

## Project structure

- `src/components/site/` contains the website sections and interactions.
- `src/components/ui/` contains the reusable shadcn/ui components.
- `src/App.tsx` assembles the page.
- `src/index.css` contains the application theme and imports the shared
  `styles.css` design system.
- `components.json` configures shadcn/ui.

The workspace-level VS Code MCP configuration is in
`../.vscode/mcp.json`.

## React Bits Pro

The React Bits Starter and Pro registries are configured in `components.json`.
To install a licensed component, create `.env.local` beside `package.json` with
your license key:

```env
REACTBITS_LICENSE_KEY=your-license-key-here
```

Keep the real key private; `.env.local` is excluded by `.gitignore`. Then run
the requested install:

```bash
npx shadcn@latest add @reactbits-starter/ribbon-type-tw
```

## Visitor features and privacy

- Website options include one-page, business, online store, portfolio, landing
  page, and booking sites. Pricing starts at ₹500; final quotes depend on scope.
- The enquiry form validates input and opens an email draft for the visitor to
  review and send. It does not submit or store form data.
- The FAQ chatbot uses preset responses; it does not connect to an AI service.
  Chat messages remain in the browser.
- Contact options: WhatsApp and phone at +91 90431 04853, and
  vickyvigneshcoc99@gmail.com.
- The highlights section uses a GSAP-driven TextLoop by default and can be
  switched to the classic moving bands. The React Bits Pro Ribbon Type
  component requires a valid license key before it can be installed.

Before publishing, verify the contact details and configure the hosting
provider's security headers for the production domain.
