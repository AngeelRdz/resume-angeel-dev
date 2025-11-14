# resume-angeel-dev

Currículum interactivo desarrollado con **Next.js 16**, **TypeScript** y **Tailwind CSS v4**, siguiendo principios de **arquitectura limpia**, **diseño atómico** y **SOLID**.

## 🚀 Características principales

- App Router con selector de idioma (ES/EN) que persiste en `localStorage` (`app_language_resume`).
- Internacionalización gestionada con `i18next`, `react-i18next` y detección automática del idioma del navegador.
- Arquitectura en capas (domain, application, infrastructure, presentation).
- Componentes UI organizados con Atomic Design (átomos → moléculas → organismos → templates).
- Datos normalizados en SQLite a través de **Prisma ORM**, expuestos mediante API (`/api/profile`).
- Tailwind CSS v4 con variables de diseño y tokens temáticos.

## 🧱 Estructura del proyecto

```
src/
 ├─ app/                # Entradas de Next.js (layouts, páginas)
 ├─ config/             # Configuración transversal (i18n, constantes)
 ├─ core/               # Dominio + casos de uso + infraestructura
 │   ├─ application/    # Use cases y puertos
 │   ├─ di/             # Contenedor de dependencias
 │   ├─ domain/         # Entidades puras
 │   └─ infrastructure/ # Adaptadores (Prisma, repositorios)
 ├─ presentation/
 │   ├─ components/     # Componentes atómicos, secciones y templates
 │   ├─ hooks/          # Hooks reutilizables (useI18n, etc.)
 │   ├─ i18n/           # Configuración de i18next y recursos de idioma
 │   ├─ pages/          # Páginas/compuestos de UI basados en componentes
 │   └─ view-models/    # Mapeo dominio → UI
 └─ shared/             # Utilidades y tipos compartidos

prisma/
 ├─ migrations/         # Historial de migraciones
 ├─ schema.prisma       # Definición del modelo de datos
 └─ seed.ts             # Script de seed con la información del CV
```

## 🛠️ Scripts disponibles

- `npm run dev` – inicia el servidor de desarrollo.
- `npm run build` – genera la build de producción.
- `npm run start` – ejecuta la build compilada.
- `npm run lint` – ejecuta las reglas de ESLint.
- `npm run prisma:migrate` – crea/aplica migraciones (`prisma migrate dev`).
- `npm run prisma:generate` – regenera el cliente de Prisma.
- `npm run db:seed` – repuebla la base de datos con la información del CV.

## 📦 Requerimientos previos

- Node.js 18.17 o superior.
- npm 9+ (o pnpm/yarn si prefieres ajustar los scripts).

## ▶️ Puesta en marcha

```bash
npm install
npm run dev
```

La aplicación quedará disponible en `http://localhost:3000`.
