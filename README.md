# resume-angeel-dev

Portafolio personal y currículum interactivo desarrollado con **Next.js 16**, **TypeScript** y **Tailwind CSS v4**, siguiendo principios de **arquitectura limpia**, **diseño atómico** y **SOLID**.

## 🚀 Características principales

- **App Router** de Next.js 16 con rutas tipadas y renderizado del lado del servidor.
- **Internacionalización (i18n)** con selector de idioma (ES/EN) que persiste en `localStorage` (`app_language_resume`), gestionada mediante `i18next`, `react-i18next` y detección automática del idioma del navegador.
- **Sistema de temas** dark/light con persistencia en `localStorage` (`app_theme_resume`) y transiciones suaves entre modos.
- **Navegación adaptativa** con menú transparente que cambia a fondo sólido al hacer scroll, respetando el tema actual (dark/light).
- **Arquitectura en capas** (domain, application, infrastructure, presentation) siguiendo Clean Architecture.
- **Componentes UI** organizados con Atomic Design (átomos → moléculas → organismos → templates).
- **Base de datos** normalizada en **PostgreSQL** a través de **Prisma ORM**, con datos expuestos mediante API REST (`/api/profile`).
- **Tailwind CSS v4** con variables de diseño CSS personalizadas y tokens temáticos dinámicos.
- **Paleta de colores personalizada**: púrpura (`#4424d3`) como color primario en ambos modos, con fondo oscuro (`#00002a`) en modo dark.
- **HeroSection** con fondo dinámico según el tema y divisores de onda (WaveDivider) animados.
- **Componentes interactivos**: botones con variantes (primary, secondary, ghost), badges, loaders CSS personalizados, y más.
- **Testing completo**: Suite de tests con Jest y React Testing Library, alcanzando **99.6% de cobertura** en statements, branches, functions y lines.
- **Arquitectura mejorada**: Implementación de Clean Architecture con Dependency Injection, casos de uso, y manejo de errores con excepciones de dominio.

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

- `npm run dev` – Inicia el servidor de desarrollo en modo watch.
- `npm run build` – Genera la build optimizada de producción.
- `npm run start` – Ejecuta la aplicación compilada en modo producción.
- `npm run lint` – Ejecuta las reglas de ESLint para validar el código.
- `npm test` – Ejecuta la suite de tests en modo watch.
- `npm run test:coverage` – Genera reporte de cobertura de tests (texto, HTML, JSON, LCOV).

## 📦 Requerimientos previos

- **Node.js** 18.17 o superior.
- **npm** 9+ (o pnpm/yarn si se prefiere ajustar los scripts).
- **PostgreSQL** 17 o superior (para la base de datos).

## ▶️ Puesta en marcha

```bash
# Instalar dependencias
npm install

# Iniciar el servidor de desarrollo
npm run dev
```

La aplicación quedará disponible en `http://localhost:3000`.

## 🎨 Sistema de diseño

### Paleta de colores

**Modo Light:**

- Background: `#ffffff`
- Foreground: `#171717`
- Primary: `#4424d3` (púrpura)
- Hero Background: `#4424d3`
- Social Icons: `#ffffff` (blanco sobre fondo púrpura)

**Modo Dark:**

- Background: `#00002a` (azul oscuro)
- Foreground: `#f9fafb` (blanco)
- Primary: `#4424d3` (púrpura)
- Hero Background: `#331ba9` (púrpura oscuro)
- Social Icons: `#ffffff` (blanco sobre fondo púrpura)

### Componentes principales

- **Navigation**: Menú fijo con transición transparente → fondo sólido al hacer scroll.
- **HeroSection**: Sección principal con fondo dinámico según tema y divisores de onda.
- **ThemeToggle**: Botón para alternar entre modo dark/light.
- **LanguageSwitcher**: Selector de idioma (ES/EN) con indicador visual del idioma activo.
- **ActionBar**: Barra de acciones con botones primarios y secundarios adaptativos.
- **Badge**: Componente para mostrar tecnologías, skills y etiquetas.
- **Button**: Botón reutilizable con variantes (primary, secondary, ghost) y soporte para enlaces internos/externos.

## 🏗️ Arquitectura técnica

El proyecto implementa una arquitectura limpia con separación de responsabilidades:

- **Domain Layer**: Entidades puras del dominio sin dependencias externas.
- **Application Layer**: Casos de uso y puertos (interfaces) que definen las operaciones del negocio.
- **Infrastructure Layer**: Implementaciones concretas (Prisma, repositorios) que conectan con sistemas externos.
- **Presentation Layer**: Componentes UI, hooks, y view models que transforman datos del dominio para la interfaz.

La inyección de dependencias se gestiona mediante un contenedor DI centralizado con patrón singleton, facilitando el testing y el mantenimiento del código.

### Testing y Calidad

El proyecto incluye una suite completa de tests unitarios e integración:

- **Cobertura actual**: 99.6% en statements, branches, functions y lines
- **Framework**: Jest con React Testing Library
- **Mocks**: Next.js router, framer-motion, IntersectionObserver, ResizeObserver, localStorage
- **Estrategia**: Tests para componentes atómicos, moléculas, organismos, hooks, casos de uso, repositorios y servicios

### Mejoras recientes

- ✅ Conversión de `HomePage` a Server Component para mejor SEO y rendimiento
- ✅ Refactorización del contenedor DI con patrón singleton y estrategia de instancias
- ✅ Implementación de excepciones de dominio específicas (`ProfileNotFoundException`)
- ✅ Suite completa de tests con alta cobertura
- ✅ Corrección de errores de lint en todos los archivos de test
- ✅ Sistema de variables CSS para temas dinámicos (badges, links, iconos sociales)
