# Manual de usuario — SIGEH

**Sistema Integral de Gestión Hospitalaria**  
Hospital Regional SIGEH · Morelia, Michoacán

---

## 1. Introducción

SIGEH es una aplicación web que centraliza la administración de información del hospital: pacientes, médicos, consultas, expedientes clínicos, farmacia, laboratorio, hospitalizaciones, facturación, usuarios y auditoría.

Este manual está dirigido al personal que utiliza la interfaz web (recepción, médicos, administración y auditoría). No describe la instalación del servidor ni la base de datos; para eso consulte el manual técnico del proyecto.

### 1.1 ¿Qué puede hacer con SIGEH?

- Consultar un panel resumen con indicadores del hospital.
- Registrar y actualizar pacientes y su expediente clínico.
- Administrar médicos, especialidades y la agenda de consultas.
- Gestionar medicamentos, recetas, estudios de laboratorio e internamientos.
- Emitir facturas y registrar pagos.
- Revisar bitácoras de acceso, cambios en datos y respaldos (según su rol).

---

## 2. Requisitos para usar la aplicación

| Requisito | Detalle |
|-----------|---------|
| Navegador | Chrome, Edge o Firefox actualizado |
| Conexión | Acceso a la red donde esté publicada la aplicación |
| Credenciales | Usuario y contraseña asignados por el administrador |
| Resolución | Mínimo 1024×768; en móvil/tablet el menú lateral se abre con el icono ☰ |

### 2.1 Acceso a la aplicación

1. Abra el navegador e ingrese la dirección que le proporcionó el área de sistemas (por ejemplo: `http://localhost:3000` en entorno de pruebas).
2. Si ya tiene sesión iniciada, el sistema lo llevará al panel principal; si no, verá la pantalla de **Iniciar sesión**.

---

## 3. Inicio y cierre de sesión

### 3.1 Iniciar sesión

1. En la pantalla de login, escriba su **Usuario**.
2. Escriba su **Contraseña** (puede usar el icono del ojo para mostrarla u ocultarla).
3. Pulse **Ingresar**.
4. Si las credenciales son correctas, verá el mensaje de bienvenida y entrará al **Dashboard**.
5. Si son incorrectas, aparecerá el aviso *Credenciales inválidas*; verifique mayúsculas y que su cuenta esté activa.

#### Usuarios de demostración (modo de prueba)

Cuando la aplicación funciona con datos simulados (sin backend conectado), puede usar:

| Usuario | Contraseña | Rol |
|---------|------------|-----|
| admin | admin123 | Administrador |
| medico1 | medico123 | Médico |
| recepcion | recep123 | Recepcionista |
| auditor | audit123 | Auditor |

> En producción use únicamente las cuentas reales que le asigne el administrador. No comparta contraseñas.

### 3.2 Cerrar sesión

1. En la esquina superior derecha, pulse **Salir** (icono de puerta).
2. El sistema cerrará su sesión y lo regresará a la pantalla de login.

**Recomendación:** cierre sesión al terminar su turno, especialmente en equipos compartidos.

---

## 4. Conocer la interfaz

Después de iniciar sesión verá tres zonas principales:

```
┌─────────────────────────────────────────────────────────────┐
│  Barra superior: menú (móvil), usuario, rol, Salir          │
├──────────────┬──────────────────────────────────────────────┤
│              │                                              │
│  Menú        │  Área de trabajo (listas, formularios,      │
│  lateral     │  tablas, mensajes)                           │
│              │                                              │
│  (módulos    │                                              │
│   según rol) │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

- **Menú lateral (izquierda):** lista solo los módulos permitidos para su rol. En pantallas pequeñas, abra el menú con el botón ☰ de la barra superior.
- **Barra superior:** muestra su nombre de usuario, rol y el botón para cerrar sesión.
- **Área central:** contenido del módulo seleccionado (tablas, botones de acción, formularios en ventanas emergentes).

### 4.1 Elementos comunes

| Elemento | Uso |
|----------|-----|
| Tabla de datos | Lista registros; suele incluir un cuadro de **búsqueda** para filtrar por nombre u otros campos. |
| Botón **+ Nuevo…** | Abre un formulario para crear un registro. |
| Icono lápiz | Editar el registro de esa fila. |
| Icono ojo | Ver detalle (por ejemplo, una consulta). |
| Icono papel / expediente | Ir al expediente clínico del paciente. |
| Ventana emergente (modal) | Formulario que se abre sobre la pantalla; al terminar pulse **Guardar** o cierre la ventana. |
| Mensajes (toast) | Avisos breves en pantalla: éxito (verde) o error (rojo). |

---

## 5. Roles y permisos

El sistema controla qué módulos ve cada persona según su rol. Si intenta entrar a una ruta no permitida, el sistema lo redirige al inicio.

| Módulo | Administrador | Médico | Recepcionista | Auditor |
|--------|:-------------:|:------:|:-------------:|:-------:|
| Dashboard | ✓ | ✓ | ✓ | ✓ |
| Usuarios | ✓ | — | — | — |
| Pacientes | ✓ | ✓ | ✓ | — |
| Expediente clínico | ✓ | ✓ | ✓ | — |
| Médicos | ✓ | — | ✓ | — |
| Especialidades | ✓ | — | — | — |
| Consultas | ✓ | ✓ | ✓ | — |
| Medicamentos | ✓ | ✓ | — | — |
| Recetas | ✓ | ✓ | — | — |
| Laboratorio | ✓ | ✓ | — | — |
| Hospitalizaciones | ✓ | ✓ | ✓ | — |
| Facturación y pagos | ✓ | — | ✓ | — |
| Bitácora de accesos | ✓ | — | — | ✓ |
| Auditoría de cambios | ✓ | — | — | ✓ |
| Respaldos | ✓ (registrar) / ✓ (consultar) | — | — | ✓ (consultar) |

**Resumen por rol:**

- **Administrador:** acceso completo; único rol que gestiona usuarios, especialidades, elimina pacientes y registra respaldos.
- **Médico:** atención clínica: consultas, diagnósticos, expedientes, farmacia, laboratorio y hospitalizaciones.
- **Recepcionista:** registro de pacientes, agenda, médicos, hospitalizaciones y facturación.
- **Auditor:** solo consulta de bitácoras, auditoría de cambios y listado de respaldos (sin modificar datos clínicos).

---

## 6. Panel principal (Dashboard)

**Ruta en el menú:** Dashboard (inicio)

Al entrar al sistema verá:

1. **Tarjetas de resumen:** total de pacientes, consultas del día, facturas pendientes y medicamentos con stock bajo.
2. **Accesos rápidos:** enlaces a los módulos que su rol puede usar.

**Uso típico:** revise las alertas (facturas pendientes, stock bajo) al iniciar el turno y use los accesos rápidos para ir al módulo que necesite.

---

## 7. Módulo: Usuarios del sistema

**Quién puede usarlo:** solo **administrador**.

### 7.1 Consultar usuarios

1. Menú → **Usuarios**.
2. Revise la tabla: nombre de usuario, rol y estado (activo/inactivo).
3. Use la búsqueda para localizar un usuario por nombre.

### 7.2 Crear un usuario

1. Pulse **Nuevo usuario**.
2. Complete: **Usuario**, **Contraseña** (obligatoria al crear), **Rol** y marque **Activo** si debe poder entrar.
3. Pulse **Guardar**.

### 7.3 Editar o desactivar

1. En la fila del usuario, pulse el icono de **lápiz** para cambiar rol o nombre.
2. Use la acción de **activar/desactivar** para impedir el acceso sin borrar el registro.

---

## 8. Módulo: Pacientes

**Quién puede usarlo:** administrador, médico y recepcionista (registro y edición: administrador y recepcionista; el médico consulta y accede al expediente).

### 8.1 Listar y buscar pacientes

1. Menú → **Pacientes**.
2. Use el buscador para filtrar por nombre o teléfono.

### 8.2 Registrar un paciente nuevo

1. Pulse **Nuevo paciente**.
2. Complete: nombre completo, fecha de nacimiento, tipo de sangre, teléfono y dirección (opcionales según el formulario).
3. Pulse **Guardar**. Aparecerá el mensaje *Paciente registrado*.

### 8.3 Editar un paciente

1. En la fila del paciente, pulse el icono de **lápiz**.
2. Modifique los datos y **Guarde**.

### 8.4 Eliminar un paciente

Solo el **administrador** ve el icono de eliminar. El sistema pedirá confirmación antes de borrar.

### 8.5 Tipos de sangre (solo administrador)

1. Pulse **Tipo de sangre**.
2. Indique el tipo (por ejemplo: `O+`) y guarde.
3. Los nuevos tipos estarán disponibles al registrar pacientes.

### 8.6 Expediente clínico

1. En la fila del paciente, pulse el icono de **expediente** (documento).
2. Verá o podrá crear el expediente con:
   - **Antecedentes familiares**
   - **Alergias**
3. Pulse **Guardar expediente**.

Para volver a la lista: **Volver a pacientes**.

---

## 9. Módulo: Médicos y especialidades

### 9.1 Médicos

**Quién puede usarlo:** administrador y recepcionista.

1. Menú → **Médicos**.
2. **Nuevo:** pulse el botón de alta, capture nombre, cédula profesional, especialidad y datos vinculados al usuario del sistema si aplica.
3. **Editar:** use el lápiz en la fila correspondiente.

### 9.2 Especialidades

**Quién puede usarlo:** solo **administrador**.

1. Menú → **Especialidades**.
2. Registre nombre y descripción de cada especialidad médica.
3. Estas especialidades se asignan al dar de alta médicos.

---

## 10. Módulo: Consultas médicas

**Quién puede usarlo:** administrador, médico y recepcionista.

### 10.1 Ver agenda de consultas

1. Menú → **Consultas**.
2. La tabla muestra fecha/hora, paciente, médico, estado y motivo.
3. Los estados pueden ser, entre otros: *pendiente*, *atendida*, *cancelada*, *finalizada* (según catálogo del sistema).

### 10.2 Agendar una consulta

1. Pulse **Agendar consulta**.
2. Seleccione **Paciente**, **Médico**, **Estado** y **Fecha y hora**.
3. Escriba el **Motivo** de la cita.
4. Pulse **Guardar**.

### 10.3 Editar una consulta

1. Pulse el **lápiz** en la fila.
2. Puede cambiar paciente, médico, estado, fecha y motivo; si ya existe la consulta, también podrá indicar **Diagnóstico** en el mismo formulario.

### 10.4 Ver detalle y registrar diagnóstico

1. Pulse el icono de **ojo** para abrir el detalle de la consulta.
2. **Médico** y **administrador** pueden escribir o actualizar el **Diagnóstico** en el panel derecho y pulsar **Guardar diagnóstico**.
3. Use **Volver** para regresar a la lista.

---

## 11. Módulo: Farmacia

### 11.1 Medicamentos

**Quién puede usarlo:** administrador y médico.

1. Menú → **Medicamentos**.
2. Revise el inventario: nombre, sustancia activa y **stock**.
3. El sistema resalta en color cuando el stock es bajo (menor a 10 unidades).
4. **Alta/edición:** use **Nuevo** o el lápiz; indique nombre, sustancia activa y cantidad en stock.

### 11.2 Recetas

**Quién puede usarlo:** administrador y médico.

1. Menú → **Recetas**.
2. Asocie una receta a una **consulta** y a un **medicamento**.
3. Indique **dosis** y **duración** del tratamiento.
4. Guarde el registro; podrá consultarlo en la tabla y editarlo si tiene permisos.

---

## 12. Módulo: Laboratorio

**Quién puede usarlo:** administrador y médico.

La pantalla tiene dos pestañas:

### 12.1 Solicitudes y resultados

1. Menú → **Laboratorio** → pestaña **Solicitudes y resultados**.
2. Pulse **Nueva solicitud** (o equivalente).
3. Elija paciente, estudio del catálogo, médico solicitante y fecha.
4. Cuando lleguen los resultados, edite la solicitud y capture el texto en **Resultados**.

### 12.2 Catálogo de estudios

1. Cambie a la pestaña **Catálogo de estudios**.
2. Pulse **Nuevo estudio** para registrar nombre y descripción (por ejemplo: *Biometría hemática*).
3. Esos estudios aparecerán al crear solicitudes.

---

## 13. Módulo: Hospitalizaciones

**Quién puede usarlo:** administrador, médico y recepcionista.

1. Menú → **Hospitalizaciones**.
2. Pulse **Nueva** para registrar un ingreso.
3. Complete: paciente, fecha de ingreso, habitación, motivo y, si ya hubo egreso, fecha de egreso.
4. Guarde. La tabla muestra el historial de internamientos.

---

## 14. Módulo: Facturación y pagos

**Quién puede usarlo:** administrador y recepcionista.

### 14.1 Generar una factura

1. Menú → **Facturación**.
2. Pulse **Nueva factura**.
3. Seleccione el **Paciente**, el **Monto total** y el **Estado** inicial (normalmente *pendiente*).
4. Pulse **Generar**.

### 14.2 Registrar un pago

1. En la tabla, localice una factura con estado **pendiente**.
2. Pulse **Pagar** en esa fila.
3. En la pantalla de pagos indique monto, fecha y **método de pago** (*efectivo*, *tarjeta* o *transferencia*).
4. Guarde. La factura pasará a estado **pagada** cuando el monto quede cubierto según las reglas del sistema.

### 14.3 Estados de factura

| Estado | Significado |
|--------|-------------|
| pendiente | Aún no se ha liquidado |
| pagada | Se registró el pago correspondiente |
| cancelada | Factura anulada |

---

## 15. Módulo: Auditoría y respaldos

**Quién puede usarlo:** administrador y auditor (consulta); solo el administrador registra nuevos respaldos.

### 15.1 Bitácora de accesos

1. Menú → **Bitácora accesos**.
2. Consulte fecha/hora, usuario, dirección IP y si el intento fue **exitoso** o **fallido**.
3. Use la búsqueda por IP si necesita rastrear un equipo.

### 15.2 Auditoría de cambios

1. Menú → **Auditoría cambios**.
2. Revise operaciones registradas (INSERT, UPDATE, DELETE) sobre tablas del sistema: tabla afectada, usuario de base de datos, fecha y datos anteriores/nuevos cuando aplique.

### 15.3 Respaldos realizados

1. Menú → **Respaldos**.
2. Consulte el historial: fechas, tipo de respaldo, ruta del archivo, tamaño y estatus.
3. **Administrador:** puede pulsar **Registrar** para documentar un respaldo ejecutado (tipo, ruta, estatus).

> La ejecución real del respaldo de PostgreSQL la realiza el administrador de bases de datos; esta pantalla documenta y consulta esos eventos.

---

## 16. Flujos de trabajo recomendados

### 16.1 Recepción: paciente nuevo con cita

1. Inicie sesión como recepcionista.
2. **Pacientes** → **Nuevo paciente** → guarde datos.
3. Abra el **Expediente** y capture alergias o antecedentes si el paciente los proporciona.
4. **Consultas** → **Agendar consulta** → asigne médico, fecha y motivo.
5. Si aplica cobro, **Facturación** → **Nueva factura**.

### 16.2 Médico: atención de consulta del día

1. Inicie sesión como médico.
2. En el **Dashboard**, revise consultas del día.
3. **Consultas** → abra el detalle (ojo) del paciente.
4. Registre el **Diagnóstico** y guarde.
5. Si prescribe medicamento: **Recetas** → nueva receta vinculada a la consulta.
6. Si solicita estudios: **Laboratorio** → nueva solicitud.

### 16.3 Administrador: nuevo usuario de personal

1. Inicie sesión como administrador.
2. **Usuarios** → **Nuevo usuario** → asigne rol (médico, recepcionista, etc.).
3. Comunique al colaborador su usuario y contraseña temporal.
4. Verifique en **Bitácora accesos** que el primer ingreso sea exitoso.

### 16.4 Auditor: revisión de seguridad

1. Inicie sesión como auditor.
2. Revise **Bitácora accesos** (intentos fallidos).
3. Revise **Auditoría cambios** en tablas sensibles.
4. Confirme en **Respaldos** que existan respaldos recientes con estatus exitoso.

---

## 17. Mensajes y situaciones frecuentes

| Situación | Qué hacer |
|-----------|-----------|
| *Credenciales inválidas* | Verifique usuario/contraseña; contacte al administrador si la cuenta está inactiva. |
| No ve un módulo en el menú | Su rol no tiene permiso; solicite el acceso al administrador. |
| *Error al guardar* | Revise que todos los campos obligatorios estén completos; si persiste, reporte a sistemas. |
| Tabla vacía | Puede no haber registros aún; use el botón de alta si su rol lo permite. |
| Confirmación al eliminar | Solo administrador elimina pacientes; confirme solo si es correcto. |
| Stock bajo en medicamentos | Coordine resurtido con farmacia; el Dashboard también muestra el conteo. |

---

## 18. Buenas prácticas de uso

1. **Cierre sesión** al terminar.
2. **No comparta** su usuario; cada persona debe usar su propia cuenta para que la auditoría sea confiable.
3. **Verifique** paciente y fecha antes de agendar consultas o facturar.
4. **Actualice el expediente** cuando el paciente reporte nuevas alergias.
5. **Registre el diagnóstico** al finalizar la consulta, no al agendarla.
6. En equipos compartidos, no guarde la contraseña en el navegador.

---

## 19. Glosario breve

| Término | Significado |
|---------|-------------|
| SIGEH | Sistema Integral de Gestión Hospitalaria |
| Dashboard | Panel principal con resumen e indicadores |
| Expediente clínico | Historial médico administrativo del paciente (antecedentes, alergias) |
| Rol | Perfil de acceso (administrador, médico, recepcionista, auditor) |
| Mock / demostración | Modo de prueba con datos simulados sin servidor backend |
| Bitácora | Registro cronológico de eventos (accesos o cambios) |

---

## 20. Soporte

Para problemas de acceso, permisos o errores persistentes, contacte al **administrador del sistema** o al área de **Tecnologías de la Información** del hospital.

Para instalación, respaldos de base de datos y configuración del servidor, consulte el **Manual técnico** y la documentación del proyecto en `Final ABD.md`.

---

*Documento: Manual de usuario SIGEH — Anexo F del proyecto integrador ABD.*
