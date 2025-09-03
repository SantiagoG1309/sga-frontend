# SGA Frontend - SAGA Abogados y Asociados

Frontend del Sistema de Gestión de Abogados desarrollado con Angular.

## Requisitos

- Node.js (versión LTS recomendada)
- npm (incluido con Node.js)
- Angular CLI

## Instalación y Configuración

### 1. Instalar Angular CLI globalmente

```bash
npm install -g @angular/cli
```

### 2. Navegar a la carpeta del frontend

```bash
cd sga-frontend
```

### 3. Instalar dependencias

```bash
npm install
```

### 4. Ejecutar el servidor de desarrollo

Para ejecutar el frontend, navega a la carpeta `src` y ejecuta:
```bash
cd src
ng serve
```

La aplicación estará disponible en `http://localhost:4200`

## Estructura del Proyecto

```
sga-frontend/
├── src/
│   ├── app/
│   │   ├── components/     # Componentes de Angular
│   │   ├── services/       # Servicios para API calls
│   │   ├── models/         # Interfaces y modelos
│   │   ├── guards/         # Guards de autenticación
│   │   ├── app.component.* # Componente principal
│   │   ├── app.config.ts   # Configuración de la aplicación
│   │   └── app.routes.ts   # Definición de rutas
│   ├── assets/            # Recursos estáticos
│   ├── environments/      # Configuraciones de entorno
│   ├── index.html         # Página HTML principal
│   ├── main.ts           # Punto de entrada de la aplicación
│   └── styles.css        # Estilos globales
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

## Scripts Disponibles

- `ng serve` - Inicia el servidor de desarrollo
- `ng build` - Construye la aplicación para producción
- `ng test` - Ejecuta las pruebas unitarias
- `ng e2e` - Ejecuta las pruebas end-to-end

## Funcionalidades Principales

### Dashboard
- Panel de control con estadísticas generales
- Vista de casos recientes
- Métricas de rendimiento

### Gestión de Casos
- Crear, editar y eliminar casos
- Asignar casos a abogados
- Seguimiento de estado de casos

### Gestión de Clientes
- Registro de clientes
- Historial de casos por cliente
- Información de contacto

### Reportes
- Reportes de casos por período
- Estadísticas de productividad
- Exportación de datos

## Configuración de Entornos

### Desarrollo
Archivo: `src/environments/environment.ts`
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000'
};
```

### Producción
Archivo: `src/environments/environment.prod.ts`
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://your-production-api.com'
};
```

## Estilos y UI

El proyecto utiliza:
- Bootstrap 5 para componentes UI
- Font Awesome para iconos
- CSS personalizado para estilos específicos

## Contribución

1. Haz fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Soporte

Para soporte técnico, contacta al equipo de desarrollo de SAGA Abogados y Asociados.
