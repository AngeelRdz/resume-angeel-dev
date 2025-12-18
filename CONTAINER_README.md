# Dependency Container - Guía Completa

## 📋 Tabla de Contenidos

1. [Introducción](#introducción)
2. [Patrón Singleton](#patrón-singleton)
3. [Estrategia de Instancias](#estrategia-de-instancias)
4. [Arquitectura del Container](#arquitectura-del-container)
5. [Uso del Container](#uso-del-container)
6. [Testing](#testing)
7. [Mejores Prácticas](#mejores-prácticas)

---

## 🎯 Introducción

El `DependencyContainer` es el corazón del sistema de inyección de dependencias de la aplicación. Centraliza la creación y gestión de todas las dependencias, siguiendo los principios de **Clean Architecture** y **SOLID**.

### ¿Por qué usar un Container?

- ✅ **Centralización**: Todas las dependencias se crean en un solo lugar
- ✅ **Testeable**: Fácil de mockear para tests
- ✅ **Mantenible**: Cambios en una dependencia solo afectan el container
- ✅ **Eficiente**: Optimiza la creación de instancias según su naturaleza
- ✅ **Escalable**: Fácil agregar nuevas dependencias

---

## 🔒 Patrón Singleton

### ¿Qué es el Patrón Singleton?

El **Singleton** es un patrón de diseño que garantiza que una clase tenga **solo una instancia** en toda la aplicación y proporciona un punto de acceso global a esa instancia.

### Implementación en el Container

```typescript
export class DependencyContainer {
	// 1. Variable estática privada para almacenar la única instancia
	private static instance: DependencyContainer;

	// 2. Constructor PRIVADO - previene creación con "new"
	private constructor() {}

	// 3. Método estático público para obtener la instancia
	static getInstance(): DependencyContainer {
		// Si no existe, la crea
		if (!DependencyContainer.instance) {
			DependencyContainer.instance = new DependencyContainer();
		}
		// Si ya existe, retorna la misma instancia
		return DependencyContainer.instance;
	}
}
```

### ¿Cómo funciona?

```typescript
// ❌ Esto NO funciona (constructor privado)
const container1 = new DependencyContainer();
// Error: Constructor of class 'DependencyContainer' is private

// ✅ Esto SÍ funciona
const container1 = DependencyContainer.getInstance();
const container2 = DependencyContainer.getInstance();

// container1 === container2 (son la MISMA instancia)
console.log(container1 === container2); // true
```

### Ventajas del Singleton

1. **Control de Instancias**: Garantiza una sola instancia del container
2. **Ahorro de Memoria**: No crea múltiples contenedores innecesarios
3. **Estado Global**: Permite compartir estado entre diferentes partes de la app
4. **Punto de Acceso Único**: Facilita el acceso desde cualquier parte del código

### Exportación del Singleton

```typescript
// Exportar singleton para uso en producción
export const container = DependencyContainer.getInstance();

// Función helper para mantener compatibilidad
export function getContainer(): DependencyContainer {
	return DependencyContainer.getInstance();
}
```

---

## 🎨 Estrategia de Instancias

La estrategia de instancias determina **cuándo crear una nueva instancia** y **cuándo reutilizar una existente**. Esta decisión se basa en el costo de creación, el estado interno y la frecuencia de uso.

### Diagrama de Decisión

```
┌─────────────────────────────────────────────┐
│  ¿Es costoso crear? (DB, HTTP, File I/O)   │
│              ↓                              │
│         ┌────┴────┐                        │
│         │   SÍ    │                        │
│         └────┬────┘                        │
│              ↓                              │
│    ┌─────────────────────┐                 │
│    │  SINGLETON          │                 │
│    │  (Reutilizar)       │                 │
│    └─────────────────────┘                 │
│                                              │
│              ↓                              │
│         ┌────┴────┐                        │
│         │   NO    │                        │
│         └────┬────┘                        │
│              ↓                              │
│  ¿Mantiene estado interno?                 │
│         ┌────┴────┐                        │
│         │   SÍ    │                        │
│         └────┬────┘                        │
│              ↓                              │
│    ┌─────────────────────┐                 │
│    │  SINGLETON          │                 │
│    │  (Reutilizar)       │                 │
│    └─────────────────────┘                 │
│                                              │
│              ↓                              │
│         ┌────┴────┐                        │
│         │   NO    │                        │
│         └────┬────┘                        │
│              ↓                              │
│    ┌─────────────────────┐                 │
│    │  NUEVA INSTANCIA    │                 │
│    │  (Crear cada vez)   │                 │
│    └─────────────────────┘                 │
└─────────────────────────────────────────────┘
```

---

## 📦 Tipos de Instancias

### 1. Repositorios Costosos (DB) → **Singleton**

#### Ejemplo: `PrismaProfileRepository`

```typescript
getProfileRepository(): ProfileRepository {
    // Si ya existe, la reutiliza
    if (!this.profileRepository) {
        // Solo la crea la primera vez
        this.profileRepository = new PrismaProfileRepository(this.getPrisma());
    }
    return this.profileRepository; // Siempre retorna la MISMA instancia
}
```

#### ¿Por qué Singleton?

- 🔌 **Conexión a Base de Datos**: Abrir una conexión es costoso en términos de recursos
- ⚡ **Rendimiento**: Reutilizar la conexión es más eficiente
- 🚫 **Límites de Conexión**: Evita exceder el límite de conexiones simultáneas
- 💰 **Costo**: Cada conexión consume memoria y recursos del servidor

#### Ejemplo Práctico

```typescript
// Primera llamada - crea la instancia
const repo1 = container.getProfileRepository();
// Se crea: PrismaProfileRepository + conexión DB

// Segunda llamada - reutiliza la misma instancia
const repo2 = container.getProfileRepository();
// Reutiliza: La misma PrismaProfileRepository + misma conexión DB

console.log(repo1 === repo2); // true (misma instancia)
```

#### Flujo de Ejecución

```
Llamada 1: getProfileRepository()
    ↓
¿this.profileRepository existe? → NO
    ↓
Crear nueva instancia: new PrismaProfileRepository()
    ↓
Guardar en: this.profileRepository
    ↓
Retornar instancia

Llamada 2: getProfileRepository()
    ↓
¿this.profileRepository existe? → SÍ
    ↓
Retornar instancia existente (sin crear nueva)
```

---

### 2. Repositorios Stateless → **Nueva Instancia Cada Vez**

#### Ejemplo: `LocalStorageLanguageRepository`

```typescript
getLanguageRepository(): ILanguageRepository {
    // Siempre crea una NUEVA instancia
    return new LocalStorageLanguageRepository();
}
```

#### ¿Por qué Nueva Instancia?

- 📝 **Sin Estado Interno**: No mantiene información entre llamadas
- 💾 **Acceso Directo**: Solo lee/escribe en `localStorage` (API del navegador)
- ⚡ **Creación Barata**: Crear una nueva instancia es muy rápido
- 🔒 **Sin Efectos Secundarios**: No hay riesgo de estado compartido
- 🧪 **Testeable**: Cada test puede tener su propia instancia limpia

#### Ejemplo Práctico

```typescript
// Primera llamada - crea nueva instancia
const repo1 = container.getLanguageRepository();
// Se crea: LocalStorageLanguageRepository (nueva)

// Segunda llamada - crea OTRA nueva instancia
const repo2 = container.getLanguageRepository();
// Se crea: LocalStorageLanguageRepository (nueva, diferente)

console.log(repo1 === repo2); // false (instancias diferentes)
// Pero ambas funcionan igual porque no tienen estado
```

#### Comparación de Comportamiento

```typescript
// Singleton (PrismaProfileRepository)
const repo1 = container.getProfileRepository();
const repo2 = container.getProfileRepository();
repo1 === repo2; // true - Misma instancia

// Nueva Instancia (LocalStorageLanguageRepository)
const repo3 = container.getLanguageRepository();
const repo4 = container.getLanguageRepository();
repo3 === repo4; // false - Instancias diferentes
```

---

### 3. Servicios → **Singleton**

#### Ejemplo: `I18nService`

```typescript
getI18nService(): II18nService {
    if (!this.i18nService) {
        this.i18nService = new I18nService(
            this.getGetCurrentLanguageUseCase(),
            this.getSetCurrentLanguageUseCase()
        );
    }
    return this.i18nService; // Siempre la misma instancia
}
```

#### ¿Por qué Singleton?

- 🔄 **Uso Frecuente**: Se utiliza constantemente en toda la aplicación
- 💾 **Estado Potencial**: Puede mantener estado interno (configuración, cache)
- ⚡ **Eficiencia**: Evita crear múltiples servicios innecesarios
- 🎯 **Consistencia**: Garantiza que toda la app use la misma configuración

#### Ejemplo Práctico

```typescript
// En diferentes componentes
const service1 = container.getI18nService(); // Primera vez - se crea
const service2 = container.getI18nService(); // Reutiliza la misma

service1 === service2; // true

// Ambos comparten el mismo estado y configuración
service1.changeLanguage("en");
// service2 también refleja el cambio
```

---

### 4. Casos de Uso → **Nueva Instancia Cada Vez**

#### Ejemplo: `GetCurrentLanguageUseCase`

```typescript
getGetCurrentLanguageUseCase(): GetCurrentLanguageUseCase {
    // Siempre crea una nueva instancia
    return new GetCurrentLanguageUseCase(this.getLanguageRepository());
}
```

#### ¿Por qué Nueva Instancia?

- 🪶 **Ligeros**: Son objetos simples que solo contienen lógica
- 🚫 **Sin Estado**: No mantienen información entre ejecuciones
- 🔄 **Independientes**: Cada operación es completamente independiente
- 🧪 **Testeable**: Fácil de testear sin preocuparse por estado previo
- ⚡ **Rápido**: Crear una nueva instancia es muy rápido

#### Ejemplo Práctico

```typescript
// Cada llamada crea una nueva instancia
const useCase1 = container.getGetCurrentLanguageUseCase();
const useCase2 = container.getGetCurrentLanguageUseCase();

useCase1 === useCase2; // false (instancias diferentes)

// Pero ambas funcionan igual porque son stateless
const lang1 = await useCase1.execute();
const lang2 = await useCase2.execute();
// lang1 === lang2 (mismo resultado)
```

---

## 🏗️ Arquitectura del Container

### Resumen Visual Completo

```
┌─────────────────────────────────────────────────────────────┐
│           DependencyContainer (Singleton)                    │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  PrismaProfileRepository                            │   │
│  │  ────────────────────────────────────────────────   │   │
│  │  Tipo: Singleton                                    │   │
│  │  Razón: Costoso (conexión DB)                      │   │
│  │  Estado: Mantiene conexión activa                  │   │
│  │  Reutiliza: ✅ Misma instancia siempre             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  LocalStorageLanguageRepository                      │   │
│  │  ────────────────────────────────────────────────   │   │
│  │  Tipo: Nueva Instancia                               │   │
│  │  Razón: Stateless (solo lee/escribe localStorage)   │   │
│  │  Estado: Sin estado interno                          │   │
│  │  Reutiliza: ❌ Nueva instancia cada vez             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  I18nService                                         │   │
│  │  ────────────────────────────────────────────────   │   │
│  │  Tipo: Singleton                                     │   │
│  │  Razón: Uso frecuente + puede tener estado         │   │
│  │  Estado: Puede mantener configuración               │   │
│  │  Reutiliza: ✅ Misma instancia siempre             │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  GetCurrentLanguageUseCase                           │   │
│  │  ────────────────────────────────────────────────   │   │
│  │  Tipo: Nueva Instancia                               │   │
│  │  Razón: Ligero + stateless                          │   │
│  │  Estado: Sin estado interno                         │   │
│  │  Reutiliza: ❌ Nueva instancia cada vez            │   │
│  └──────────────────────────────────────────────────────┘   │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  SetCurrentLanguageUseCase                            │   │
│  │  ────────────────────────────────────────────────   │   │
│  │  Tipo: Nueva Instancia                               │   │
│  │  Razón: Ligero + stateless                          │   │
│  │  Estado: Sin estado interno                         │   │
│  │  Reutiliza: ❌ Nueva instancia cada vez            │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### Tabla Comparativa

| Componente                       | Tipo            | Razón              | Estado             | Reutiliza |
| -------------------------------- | --------------- | ------------------ | ------------------ | --------- |
| `PrismaProfileRepository`        | Singleton       | Costoso (DB)       | Mantiene conexión  | ✅        |
| `LocalStorageLanguageRepository` | Nueva Instancia | Stateless          | Sin estado         | ❌        |
| `I18nService`                    | Singleton       | Frecuente + Estado | Puede tener estado | ✅        |
| `GetCurrentLanguageUseCase`      | Nueva Instancia | Ligero + Stateless | Sin estado         | ❌        |
| `SetCurrentLanguageUseCase`      | Nueva Instancia | Ligero + Stateless | Sin estado         | ❌        |

---

## 💻 Uso del Container

### Importación

```typescript
// Opción 1: Importar el singleton directamente
import { container } from "@/core/di/container";

// Opción 2: Usar la función helper
import { getContainer } from "@/core/di/container";
const container = getContainer();
```

### Ejemplos de Uso

#### 1. Obtener un Caso de Uso

```typescript
// En un Server Component (Next.js)
import { getContainer } from "@/core/di/container";

export default async function ProfilePage() {
	const container = getContainer();
	const getProfileUseCase = container.resolveGetProfileUseCase();
	const profile = await getProfileUseCase.execute();

	return <ProfileView profile={profile} />;
}
```

#### 2. Obtener un Servicio

```typescript
// En un Client Component
"use client";
import { getContainer } from "@/core/di/container";

export function LanguageSwitcher() {
	const handleLanguageChange = async (lang: string) => {
		const container = getContainer();
		const i18nService = container.resolveI18nService();
		await i18nService.changeLanguage(lang);
	};

	return <button onClick={() => handleLanguageChange("en")}>EN</button>;
}
```

#### 3. Obtener un Repositorio

```typescript
// Acceso directo a repositorios (menos común)
const container = getContainer();
const profileRepo = container.getProfileRepository();
const languageRepo = container.getLanguageRepository();
```

### Métodos Disponibles

#### Métodos Principales (Recomendados)

```typescript
// Casos de uso
container.getGetProfileUseCase(): GetProfileUseCase
container.getGetCurrentLanguageUseCase(): GetCurrentLanguageUseCase
container.getSetCurrentLanguageUseCase(): SetCurrentLanguageUseCase

// Servicios
container.getI18nService(): II18nService

// Repositorios
container.getProfileRepository(): ProfileRepository
container.getLanguageRepository(): ILanguageRepository
container.getPrisma(): PrismaClient
```

#### Métodos de Compatibilidad

```typescript
// Mantienen compatibilidad con código existente
container.resolveGetProfileUseCase(): GetProfileUseCase
container.resolveGetCurrentLanguageUseCase(): GetCurrentLanguageUseCase
container.resolveSetCurrentLanguageUseCase(): SetCurrentLanguageUseCase
container.resolveI18nService(): II18nService
```

---

## 🧪 Testing

### Mockear el Container

```typescript
import { getContainer } from "@/core/di/container";

describe("MiComponente", () => {
	it("debe usar el servicio correctamente", () => {
		const container = getContainer();
		const mockI18nService = {
			changeLanguage: jest.fn(),
			getCurrentLanguage: jest.fn().mockResolvedValue("es"),
		};

		// Mockear el método del container
		jest.spyOn(container, "getI18nService").mockReturnValue(mockI18nService);

		// Tu código de test aquí
		const service = container.getI18nService();
		expect(service.getCurrentLanguage()).resolves.toBe("es");
	});
});
```

### Limpiar el Container

```typescript
import { getContainer } from "@/core/di/container";

afterEach(() => {
	const container = getContainer();
	container.clear(); // Limpia todas las dependencias
});
```

### Crear Container de Test

```typescript
import { createContainer } from "@/core/di/container";

// Nota: createContainer() actualmente retorna el singleton
// Para tests más aislados, se recomienda mockear los métodos
const testContainer = createContainer();
```

---

## 📚 Mejores Prácticas

### ✅ DO (Hacer)

1. **Usar el container para todas las dependencias**

   ```typescript
   // ✅ Bien
   const useCase = container.getGetProfileUseCase();

   // ❌ Mal
   const repo = new PrismaProfileRepository(prisma);
   const useCase = new GetProfileUseCase(repo);
   ```

2. **Usar métodos `resolve*` para mantener compatibilidad**

   ```typescript
   // ✅ Bien
   const useCase = container.resolveGetProfileUseCase();
   ```

3. **Limpiar el container en tests**

   ```typescript
   afterEach(() => {
   	container.clear();
   });
   ```

4. **Documentar nuevas dependencias**
   ```typescript
   /**
    * Obtener nuevo servicio
    * @returns Nueva instancia del servicio
    */
   getNewService(): NewService {
       return new NewService();
   }
   ```

### ❌ DON'T (No Hacer)

1. **No crear instancias directamente**

   ```typescript
   // ❌ Mal
   const repo = new PrismaProfileRepository(prisma);

   // ✅ Bien
   const repo = container.getProfileRepository();
   ```

2. **No modificar el container en producción**

   ```typescript
   // ❌ Mal - solo para testing
   container.clear();
   ```

3. **No crear múltiples containers**

   ```typescript
   // ❌ Mal
   const container1 = DependencyContainer.getInstance();
   const container2 = DependencyContainer.getInstance();
   // Aunque funcione, usa el singleton exportado

   // ✅ Bien
   import { container } from "@/core/di/container";
   ```

---

## 🔍 Regla General de Decisión

### ¿Singleton o Nueva Instancia?

```
┌─────────────────────────────────────────────────┐
│  ¿Es costoso crear?                            │
│  (DB, HTTP, File I/O, procesos pesados)       │
│              ↓                                 │
│         ┌────┴────┐                           │
│         │   SÍ    │ → SINGLETON ✅            │
│         └─────────┘                           │
│              ↓                                 │
│         ┌────┴────┐                           │
│         │   NO    │                           │
│         └────┬────┘                           │
│              ↓                                 │
│  ¿Mantiene estado interno?                    │
│         ┌────┴────┐                           │
│         │   SÍ    │ → SINGLETON ✅            │
│         └─────────┘                           │
│              ↓                                 │
│         ┌────┴────┐                           │
│         │   NO    │                           │
│         └────┬────┘                           │
│              ↓                                 │
│  ¿Se usa muy frecuentemente?                  │
│         ┌────┴────┐                           │
│         │   SÍ    │ → SINGLETON ✅            │
│         └─────────┘                           │
│              ↓                                 │
│         ┌────┴────┐                           │
│         │   NO    │ → NUEVA INSTANCIA ✅      │
│         └─────────┘                           │
└─────────────────────────────────────────────────┘
```

### Checklist de Decisión

- [ ] ¿Requiere conexión a base de datos? → **Singleton**
- [ ] ¿Hace llamadas HTTP costosas? → **Singleton**
- [ ] ¿Mantiene estado interno? → **Singleton**
- [ ] ¿Se usa en múltiples lugares frecuentemente? → **Singleton**
- [ ] ¿Es solo lógica sin estado? → **Nueva Instancia**
- [ ] ¿Es barato crear? → **Nueva Instancia**
- [ ] ¿Cada operación es independiente? → **Nueva Instancia**

---

## 📝 Resumen

### Patrón Singleton

- **Qué**: Garantiza una sola instancia de la clase
- **Cómo**: Constructor privado + método estático `getInstance()`
- **Por qué**: Control, eficiencia y punto de acceso único

### Estrategia de Instancias

- **Singleton**: Para recursos costosos, con estado o de uso frecuente
- **Nueva Instancia**: Para objetos ligeros, stateless e independientes

### Uso del Container

- Siempre usar el container para obtener dependencias
- Preferir métodos `resolve*` para compatibilidad
- Mockear en tests, no crear instancias reales

---

## 🔗 Referencias

- [Clean Architecture - Robert C. Martin](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
- [Dependency Injection Pattern](https://en.wikipedia.org/wiki/Dependency_injection)
- [Singleton Pattern](https://en.wikipedia.org/wiki/Singleton_pattern)

---

**Última actualización**: 2024
