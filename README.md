# SIGEH — Sistema Integral de Gestión Hospitalaria

Proyecto integrador para el Hospital Regional. Frontend en **React + TypeScript** (Create React App) con **Tailwind CSS**, preparado para conectarse a un backend **Node.js/Express** y base de datos **PostgreSQL** (local o AWS RDS).

## Requisitos

- Node.js 18+
- npm 9+

## Instalación

```bash
cd frontend
npm install
cp .env.example .env
npm start
```

La aplicación se abre en [http://localhost:3000](http://localhost:3000).

## Variables de entorno

| Variable | Descripción |
|----------|-------------|
| `REACT_APP_API_URL` | URL base del API (ej. `http://localhost:3001/api`) |
| `REACT_APP_USE_MOCK` | `true` = datos simulados sin backend; `false` = API real |

## Usuarios de prueba (modo mock)

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | administrador |
| medico1 | medico123 | medico |
| recepcion | recep123 | recepcionista |
| auditor | audit123 | auditor |

## Módulos

- Dashboard, usuarios y roles
- Pacientes, expedientes clínicos, tipos de sangre
- Médicos y especialidades
- Consultas médicas y diagnósticos
- Farmacia (medicamentos, recetas, stock)
- Laboratorio (catálogo, solicitudes, resultados)
- Hospitalizaciones
- Facturación y pagos
- Auditoría (accesos, cambios, respaldos)

## Conexión a base de datos (AWS / PostgreSQL)

El frontend **no** se conecta directamente a la base de datos. Configure un backend Express que use PostgreSQL (o AWS RDS) y establezca:

```env
REACT_APP_USE_MOCK=false
REACT_APP_API_URL=https://su-api.amazonaws.com/api
```

Los endpoints esperados están documentados en `frontend/src/api/index.ts`.

## Build de producción

```bash
cd frontend
npm run build
```

Los archivos estáticos quedan en `frontend/build/`.

## Documentación del proyecto

Ver [Final ABD.md](Final%20ABD.md) para requerimientos funcionales, modelo de datos y arquitectura completa.
