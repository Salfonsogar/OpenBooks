# Arquitectura de Componentes - OpenBooks

## Resumen de Cambios Realizados

### ✅ Problemas Corregidos

1. **Panel de Admin**: Ahora se muestra correctamente el NavbarAdmin y AdminNotifications cuando un usuario admin accede a rutas de admin
2. **Lector de libros**: El Reader ahora se muestra como overlay y oculta automáticamente el navbar/footer
3. **Routing**: Sistema simplificado con rutas públicas, protegidas y de admin separadas

---

## Estructura Actual

```
src/
├── app/                         # Configuración de la app (respaldo)
├── components/                  # Componentes existentes (compatibilidad)
│   ├── auth/                   # Componentes de auth
│   ├── layout/                 # Navbar, Footer
│   ├── ui/                     # Componentes UI
│   ├── profile/                # Componentes de perfil
│   ├── catalog/                # Componentes de catálogo
│   └── admin/                  # Componentes de admin
│
├── features/                    # Feature-Based Architecture (en desarrollo)
│   ├── auth/
│   ├── books/
│   ├── reader/
│   ├── user/
│   └── admin/
│
├── hooks/                      # Hooks personalizados
├── layouts/                    # Layouts (respaldo)
├── reader/                     # Lector de libros
├── routes/                     # Configuración de rutas
│   └── routeConfig.jsx        # Rutas organizadas
├── store/                      # Redux store
├── pages/                      # Páginas existentes
└── assets/styles/
    ├── index.css              # Estilos globales + modernizados
    └── tokens.css             # Tokens de diseño
```

---

## Sistema de Rutas

### Rutas Públicas
- `/` - Catálogo
- `/catalog` - Catálogo
- `/book/:id` - Página de libro
- `/Login` - Login/Registro
- `/forgot-password` - Recuperar contraseña
- `/verify-code` - Verificar código
- `/reset-password` - Nueva contraseña

### Rutas Protegidas (Usuario)
- `/library` - Biblioteca personal
- `/profile` - Perfil de usuario
- `/profile-settings` - Configuración
- `/profile-form` - Editar perfil
- `/change-password` - Cambiar contraseña

### Rutas de Admin
- `/Admin` - Dashboard admin
- `/Upload` - Subir libros
- `/usuarios` - Gestión de usuarios
- `/categorias` - Gestión de categorías
- `/reportes` - Reportes
- `/denuncias` - Denuncias
- `/sugerencias` - Sugerencias
- `/penalizacion-page` - Penalizaciones
- `/libros` - Monitor de libros
- `/libros/editar/:id` - Editar libro

---

## Estilos Modernizados

### Paleta de Colores (Indigo Moderno)
```css
:root {
  --primary: #6366F1;
  --primary-dark: #4F46E5;
  --primary-light: #818CF8;
  --background: #F8FAFC;
  --text-main: #1E293B;
  --text-secondary: #64748B;
  --border: #E2E8F0;
}
```

### Componentes Actualizados
- Navbar: Fondo oscuro (#1E293B), acentos en indigo
- Botones: Bordes redondeados, gradientes, transiciones
- Cards: Sombras suaves, hover effects
- Inputs: Bordes redondeados, focus states
- Modal de Auth: Gradiente indigo

---

## Reader Overlay

El lector de libros se muestra como un overlay que:
- Ocupa toda la pantalla (position: fixed)
- Tiene z-index alto (1050)
- Oculta automáticamente navbar y footer via CSS `:has()`
- Soporta temas: light, dark, sepia

---

## Lazy Loading

Todas las páginas usan lazy loading:
```javascript
const Catalog = lazy(() => import('../pages/Catalog'));
const AdminPage = lazy(() => import('../pages/Admin'));
// etc.
```

---

## Optimización Vite

### Alias configurados
```javascript
alias: {
  '@': './src',
  '@features': './src/features',
  '@shared': './src/shared',
  '@layouts': './src/layouts',
  '@routes': './src/routes',
}
```

### Code Splitting
- vendor chunk: React, React-DOM, React-Router
- redux chunk: Redux Toolkit, React-Redux
- Por página: chunks individuales

---

## Pendiente: Migración a Feature-Based

Los componentes aún están en `components/` para mantener compatibilidad.
Próximos pasos:
1. Mover componentes a `features/` progresivamente
2. Crear nuevos componentes en la estructura feature-based
3. Eliminar `components/` cuando la migración esté completa
