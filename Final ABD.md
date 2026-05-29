                                              

		               
			  

	       

       MORELIA, MICHOACÁN                                 **28 DE MAYO DE 2026**

Índice

[**1\. Introducción	4**](#1.-introducción)

[**2\. Objetivo	5**](#2.-objetivo)

[Objetivo general	5](#objetivo-general)

[Objetivos específicos	5](#objetivos-específicos)

[**3\. Problemática	5**](#3.-problemática)

[**4\. Justificación	6**](#4.-justificación)

[**5\. Análisis del sistema	6**](#5.-análisis-del-sistema)

[5.1 Requerimientos funcionales	6](#5.1-requerimientos-funcionales)

[5.2 Requerimientos no funcionales	13](#5.2-requerimientos-no-funcionales)

[5.3 Casos de uso principales	16](#5.3-casos-de-uso-principales)

[5.4 Reglas de negocio	17](#5.4-reglas-de-negocio)

[**6\. Diseño de la base de datos	17**](#6.-diseño-de-la-base-de-datos)

[6.1 Modelo entidad-relación	17](#6.1-modelo-entidad-relación)

[6.2 Modelo relacional	17](#6.2-modelo-relacional)

[6.3 Diccionario de datos	19](#6.3-diccionario-de-datos)

[6.4 Normalización	27](#6.4-normalización)

[**7\. Arquitectura del sistema	28**](#7.-arquitectura-del-sistema)

[7.1 Arquitectura general	28](#7.1-arquitectura-general)

[7.2 Tecnologías utilizadas	28](#7.2-tecnologías-utilizadas)

[7.3 Distribución de almacenamiento	28](#7.3-distribución-de-almacenamiento)

[8.1 Requisitos de hardware	29](#8.1-requisitos-de-hardware)

[8.2 Requisitos de software	30](#8.2-requisitos-de-software)

[8.3 Instalación de PostgreSQL	31](#8.3-instalación-de-postgresql)

[8.4 Configuración inicial	31](#8.4-configuración-inicial)

[8.5 Alta, baja y reinicio del servicio	32](#8.5-alta,-baja-y-reinicio-del-servicio)

[**9\. Seguridad	33**](#9.-seguridad)

[9.1 Roles del sistema	33](#9.1-roles-del-sistema)

[9.2 Usuarios de base de datos	33](#9.2-usuarios-de-base-de-datos)

[9.3 Permisos	34](#9.3-permisos)

[**10\. Respaldos y recuperación	34**](#10.-respaldos-y-recuperación)

[10.1 Respaldo completo	35](#10.1-respaldo-completo)

[10.2 Respaldo automático	35](#10.2-respaldo-automático)

[10.3 Recuperación de información	35](#10.3-recuperación-de-información)

[**11\. Replicación	36**](#11.-replicación)

[**12\. Monitoreo y auditoría	36**](#12.-monitoreo-y-auditoría)

[12.1 Monitoreo	36](#12.1-monitoreo)

[12.2 Auditoría de accesos	37](#12.2-auditoría-de-accesos)

[12.3 Auditoría de cambios	38](#12.3-auditoría-de-cambios)

[**13\. Optimización	38**](#13.-optimización)

[13.1 Índices	38](#13.1-índices)

[13.2 Consultas lentas y EXPLAIN	39](#13.2-consultas-lentas-y-explain)

[13.3 Comparativa de rendimiento	40](#13.3-comparativa-de-rendimiento)

[**14\. Aplicación funcional	41**](#14.-aplicación-funcional)

[14.1 Descripción de la aplicación	41](#14.1-descripción-de-la-aplicación)

[14.2 Módulos implementados	41](#14.2-módulos-implementados)

[14.3 Evidencias de la aplicación	42](#14.3-evidencias-de-la-aplicación)

[**15\. Evidencias generales	43**](#15.-evidencias-generales)

[15.1 Evidencia de base de datos	43](#15.1-evidencia-de-base-de-datos)

[15.2 Evidencia de tablas	43](#15.2-evidencia-de-tablas)

[15.3 Evidencia de vistas	43](#15.3-evidencia-de-vistas)

[15.4 Evidencia de procedimientos almacenados	43](#15.4-evidencia-de-procedimientos-almacenados)

[15.5 Evidencia de triggers	43](#15.5-evidencia-de-triggers)

[**16\. Conclusiones	44**](#16.-conclusiones)

[**17\. Anexos	44**](#17.-anexos)

[Anexo A. Scripts SQL	44](#anexo-a.-scripts-sql)

[Anexo B. Scripts de roles y permisos	45](#anexo-b.-scripts-de-roles-y-permisos)

[Anexo C. Scripts de respaldos	45](#anexo-c.-scripts-de-respaldos)

[Anexo D. Scripts de auditoría	45](#anexo-d.-scripts-de-auditoría)

[Anexo E. Código fuente	45](#anexo-e.-código-fuente)

[Anexo F. Manual de usuario	45](#anexo-f.-manual-de-usuario)

[Anexo G. Manual técnico	46](#anexo-g.-manual-técnico)

# 

# 1\. Introducción {#1.-introducción}

El presente proyecto integrador tiene como finalidad diseñar, implementar y administrar una base de datos empresarial para una plataforma de gestión hospitalaria llamada SIGEH. Este sistema está orientado a la administración de información relacionada con pacientes, médicos, especialidades, consultas, expedientes clínicos, hospitalizaciones, farmacia, laboratorios, facturación, usuarios, roles y auditoría.

Durante el desarrollo del proyecto se aplican los temas vistos durante el curso de Administración de Bases de Datos, tales como instalación de un sistema gestor de bases de datos, configuración de almacenamiento, seguridad, respaldos, monitoreo, auditoría, replicación y recuperación ante fallos.

Para este proyecto se seleccionó PostgreSQL como sistema gestor de bases de datos, debido a que es una herramienta robusta, gratuita, de código abierto y ampliamente utilizada en entornos empresariales. Además, se utilizará Node.js con Express para el desarrollo del backend y React para el frontend de la aplicación.

# 2\. Objetivo {#2.-objetivo}

## Objetivo general {#objetivo-general}

Diseñar, implementar, administrar y documentar una base de datos para una plataforma hospitalaria, utilizando PostgreSQL como sistema gestor de bases de datos y una aplicación web desarrollada con React y Node.js.

## Objetivos específicos {#objetivos-específicos}

* Diseñar el modelo entidad-relación de la base de datos.

* Implementar una base de datos con al menos 15 tablas.

* Crear vistas, procedimientos almacenados, triggers e índices.

* Configurar roles, usuarios y permisos dentro de PostgreSQL.

* Implementar mecanismos de auditoría para registrar accesos y cambios importantes.

* Realizar respaldos y pruebas de recuperación.

* Implementar monitoreo básico del SGBD.

* Desarrollar una aplicación funcional conectada a PostgreSQL.

* Documentar la instalación, configuración y administración del sistema.

# 3\. Problemática {#3.-problemática}

El Hospital Regional SIGEH requiere una plataforma que permita administrar de manera organizada la información generada en sus diferentes áreas. Actualmente, la información hospitalaria puede encontrarse dispersa en distintos archivos, registros manuales o sistemas no integrados, lo que puede provocar pérdida de información, duplicidad de datos, dificultad para consultar expedientes y problemas en el control de pacientes, médicos, consultas y pagos.

Además, al tratarse de información médica y administrativa, es necesario contar con mecanismos de seguridad, respaldo, recuperación y auditoría, con el fin de proteger los datos y garantizar su disponibilidad.

# 4\. Justificación {#4.-justificación}

La implementación de una base de datos hospitalaria permite centralizar la información del hospital y mejorar la administración de sus procesos principales. El uso de PostgreSQL facilita la creación de una base de datos segura, estable y escalable, capaz de manejar información crítica.

El proyecto también permite aplicar los conocimientos adquiridos durante el curso, ya que no solo se diseña una base de datos, sino que también se administra el SGBD mediante roles, permisos, respaldos, monitoreo, auditoría, optimización y recuperación ante fallos.

La aplicación web desarrollada con React y Node.js permitirá interactuar con la base de datos de una manera más sencilla, simulando un sistema real utilizado por personal administrativo, médicos y usuarios autorizados.

# 5\. Análisis del sistema {#5.-análisis-del-sistema}

## 5.1 Requerimientos funcionales {#5.1-requerimientos-funcionales}

5.1.1 Usuarios y roles

| Número de requisito | RF01 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de usuarios del sistema  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Cliente / Equipo de desarrollo |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad, 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite registrar usuarios dentro de la plataforma hospitalaria, almacenando información de acceso como nombre de usuario, contraseña protegida, rol asignado y estado activo o inactivo.  |  |  |

| Número de requisito | RF02 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Asignación de roles de usuario  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad |  |  |
| Descripción | El sistema permite asignar roles a los usuarios registrados, con la finalidad de diferenciar los permisos y funcionalidades disponibles para administradores, médicos y personal autorizado.  |  |  |

| Número de requisito | RF03 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Control de acceso por rol  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 02 \- Seguridad  |  |  |
| Descripción | El sistema restringe el acceso a las funciones de la plataforma según el rol del usuario autenticado, evitando que usuarios no autorizados consulten, modifiquen o eliminen información sensible. |  |  |

| Número de requisito | RF04 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Activación e inactivación de usuarios  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 02 \- Seguridad, 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite activar o desactivar cuentas de usuario sin eliminarlas de la base de datos, conservando su información para fines administrativos y de auditoría.  |  |  |

5.1.2 Médicos y especialidades 

| Número de requisito | RF05 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de médicos  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 01 \- Rendimiento, 03 \- Fiabilidad   |  |  |
| Descripción | El sistema permite registrar médicos dentro de la plataforma, asociándolos con una cuenta de usuario, una especialidad médica, nombre completo y cédula profesional.  |  |  |

| Número de requisito | RF06 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Gestión de especialidades médicas  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite registrar, modificar y consultar especialidades médicas disponibles en el hospital, incluyendo su nombre y descripción. |  |  |

| Número de requisito | RF07 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Consulta de médicos por especialidad  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo / Usuario autorizado  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 01 \- Rendimiento  |  |  |
| Descripción | El sistema permite consultar el listado de médicos registrados y filtrarlos de acuerdo con su especialidad médica.  |  |  |

5.1.2 Pacientes y expedientes 

| Número de requisito | RF08 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de pacientes  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite registrar pacientes almacenando información básica como nombre completo, fecha de nacimiento, teléfono, dirección y tipo de sangre.   |  |  |

| Número de requisito | RF09 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Gestión de tipos de sangre  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite registrar y consultar los tipos de sangre disponibles para asociarlos correctamente con los pacientes registrados.  |  |  |

| Número de requisito | RF10 |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Creación de expediente clínico  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico / Personal autorizado  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite crear un expediente clínico para cada paciente, registrando fecha de creación, antecedentes familiares y alergias. |  |  |

| Número de requisito | RF11  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Activación e inactivación de usuarios  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 01 \- Rendimiento, 02 \- Seguridad  |  |  |
| Descripción | El sistema permite al médico consultar el expediente clínico de un paciente para revisar información relevante antes o durante una consulta médica.   |  |  |

5.1.3. Consultas médicas 

| Número de requisito | RF12  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de consultas médicas  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico / Personal administrativo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 01 \- Rendimiento, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite registrar consultas médicas asociando un paciente, un médico, fecha y hora, estado de la consulta, motivo y diagnóstico   |  |  |

| Número de requisito | RF13  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Gestión de estados de consulta  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite definir los estados disponibles para una consulta médica, como pendiente, atendida, cancelada o finalizada.   |  |  |

| Número de requisito | RF14  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Consulta del historial médico del paciente  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 01 \- Rendimiento, 02 \- Seguridad  |  |  |
| Descripción | El sistema permite consultar el historial de consultas médicas de un paciente, incluyendo diagnósticos, motivos de atención y fechas registradas.  |  |  |

| Número de requisito | RF15  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Actualización del diagnóstico de consulta  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico   |  |  |
| Prioridad del requisito | ▨ Alta/Esencial   |  |  |
| RNF relacionado | 03 \- Fiabilidad, 02 \- Seguridad  |  |  |
| Descripción | El sistema permite al médico registrar o actualizar el diagnóstico correspondiente a una consulta médica, siempre que cuente con permisos autorizados.   |  |  |

5.1.4 Recetas y medicamentos 

| Número de requisito | RF16  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de medicamentos  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador / Personal autorizado  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 03 \- Fiabilidad, 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite registrar medicamentos disponibles en el hospital, incluyendo nombre, sustancia activa y cantidad en stock.  |  |  |

| Número de requisito | RF17  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Generación de recetas médicas  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite generar recetas médicas asociadas a una consulta, indicando el medicamento prescrito, dosis y duración del tratamiento.  |  |  |

| Número de requisito | RF18  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Consulta de medicamentos recetados  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico / Personal autorizado  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 01 \- Rendimiento  |  |  |
| Descripción | El sistema permite consultar los medicamentos prescritos a un paciente mediante las recetas generadas durante sus consultas médicas.  |  |  |

| Número de requisito | RF19  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Control de stock de medicamentos |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador / Farmacia  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial   |  |  |
| RNF relacionado | 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite visualizar y actualizar el stock de medicamentos disponibles, evitando inconsistencias entre las recetas generadas y la disponibilidad del medicamento.   |  |  |

5.1.5 Laboratorios y estudios clínicos

| Número de requisito | RF20  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de laboratorios  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema permite registrar estudios de laboratorio disponibles, incluyendo nombre del estudio y descripción general.  |  |  |

| Número de requisito | RF21  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Solicitud de estudios de laboratorio  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 01 \- Rendimiento, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite al médico solicitar estudios de laboratorio para un paciente, asociando el estudio con el paciente, médico solicitante, laboratorio y fecha de solicitud.   |  |  |

| Número de requisito | RF22  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de resultados de laboratorio  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Laboratorio / Personal autorizado  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 03 \- Fiabilidad, 02 \- Seguridad  |  |  |
| Descripción | El sistema permite registrar los resultados de los estudios de laboratorio solicitados, conservando la relación con el paciente, médico y laboratorio correspondiente.  |  |  |

| Número de requisito | RF23  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Consulta de estudios de laboratorio del paciente  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico / Personal autorizado  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial   |  |  |
| RNF relacionado | 01 \- Rendimiento, 02 \- Seguridad   |  |  |
| Descripción | El sistema permite consultar los estudios de laboratorio realizados a un paciente, incluyendo fecha de solicitud y resultados registrados   |  |  |

 5.1.6 Hospitalizaciones 

| Número de requisito | RF24  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de hospitalizaciones  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo / Médico  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite registrar hospitalizaciones de pacientes, indicando fecha de ingreso, fecha de egreso, habitación asignada y motivo de hospitalización.  |  |  |

| Número de requisito | RF25  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Consulta de hospitalizaciones del paciente   |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Médico / Personal administrativo   |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 01 \- Rendimiento, 02 \- Seguridad  |  |  |
| Descripción | El sistema permite consultar el historial de hospitalizaciones de un paciente para conocer ingresos previos, motivos de atención y fechas de estancia.  |  |  |

5.1.7 Facturación y pagos 

| Número de requisito | RF26  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Generación de facturas   |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite generar facturas asociadas a pacientes, registrando fecha de emisión, monto total y estado de la factura.  |  |  |

| Número de requisito | RF27  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de pagos   |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo / Caja  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite registrar pagos asociados a una factura, indicando fecha de pago, monto y método de pago utilizado.   |  |  |

| Número de requisito | RF28  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Consulta de estado de factura  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo   |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 01 \- Rendimiento, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema permite consultar el estado de las facturas generadas para identificar si se encuentran pendientes, pagadas o canceladas.  |  |  |

| Número de requisito | RF29  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Historial de pagos por paciente  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Personal administrativo  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 01 \- Rendimiento, 02 \- Seguridad   |  |  |
| Descripción | El sistema permite consultar el historial de pagos realizados por un paciente, mostrando las facturas asociadas, montos, fechas y métodos de pago.  |  |  |

5.1.8 Seguridad, auditoría y respaldos 

| Número de requisito | RF30  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de accesos al sistema  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo / Administrador  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema registra los accesos realizados por los usuarios, almacenando usuario, fecha y hora, dirección IP de origen y si el acceso fue exitoso o no. .  |  |  |

| Número de requisito | RF31  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Auditoría de cambios en la base de datos  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo / Administrador   |  |  |
| Prioridad del requisito | ▨ Alta/Esencial |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema registra las operaciones realizadas sobre la información de la plataforma, almacenando nombre de tabla, tipo de operación, usuario responsable, fecha y hora, datos anteriores y datos nuevos.  |  |  |

| Número de requisito | RF32  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Registro de respaldos realizados   |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador / Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 03 \- Fiabilidad, 04 \- Disponibilidad  |  |  |
| Descripción | El sistema permite registrar los respaldos realizados, incluyendo fecha de inicio, fecha de finalización, tipo de respaldo, ruta del archivo, tamaño y estatus.  |  |  |

| Número de requisito | RF33  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Almacenamiento físico de respaldos  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Administrador / Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Media/Deseado  |  |  |
| RNF relacionado | 02 \- Seguridad, 05 \- Mantenibilidad  |  |  |
| Descripción | El sistema debe contemplar un esquema de almacenamiento físico para los respaldos de la base de datos, permitiendo identificar la ubicación definida para los archivos de respaldo.  |  |  |

| Número de requisito | RF34  |  |  |
| :---- | :---- | :---- | :---- |
| Nombre de requisito | Validación de campos obligatorios  |  |  |
| Tipo | ☐ Requisito |  |  |
| Fuente del requisito | Equipo de desarrollo  |  |  |
| Prioridad del requisito | ▨ Alta/Esencial  |  |  |
| RNF relacionado | 02 \- Seguridad, 03 \- Fiabilidad  |  |  |
| Descripción | El sistema valida que los campos obligatorios sean capturados correctamente antes de guardar información relacionada con usuarios, pacientes, médicos, consultas, recetas, facturas y pagos.  |  |  |

## 5.2 Requerimientos no funcionales {#5.2-requerimientos-no-funcionales}

### **5.2.1. Rendimiento**

El sistema deberá permitir la consulta, registro y actualización de información hospitalaria de manera eficiente, evitando tiempos de espera excesivos durante operaciones frecuentes como búsqueda de pacientes, registro de consultas, generación de recetas, consulta de expedientes y registro de pagos.

Las operaciones principales del sistema, como inicio de sesión, consulta de pacientes, registro de consultas médicas y búsqueda de expedientes, deberán completarse en un tiempo razonable para el usuario, incluso cuando existan múltiples usuarios conectados simultáneamente.

### **5.2.2. Seguridad**

El sistema deberá proteger la información personal, médica y administrativa de los pacientes mediante mecanismos de autenticación segura, control de acceso por roles y almacenamiento protegido de contraseñas.

El acceso a expedientes, consultas, diagnósticos, recetas, estudios de laboratorio, facturas y pagos deberá estar restringido únicamente a usuarios autorizados según su rol dentro de la plataforma.

El sistema deberá registrar accesos y cambios relevantes en la base de datos mediante bitácoras y auditoría, con la finalidad de facilitar el seguimiento de actividades y detectar posibles accesos no autorizados.

El manejo de datos personales y clínicos deberá realizarse considerando la normativa aplicable de protección de datos personales en México.

### **5.2.3. Fiabilidad**

El sistema deberá mantener la integridad de la información almacenada, evitando inconsistencias entre pacientes, médicos, consultas, recetas, medicamentos, estudios de laboratorio, facturas y pagos.

Las operaciones críticas, como registro de consultas, generación de recetas, actualización de resultados de laboratorio, registro de pagos y generación de respaldos, deberán ejecutarse de forma confiable.

En caso de error del sistema, fallo de conexión o interrupción inesperada, la información previamente almacenada deberá mantenerse íntegra y recuperable mediante los mecanismos de respaldo disponibles.

### **5.2.4. Disponibilidad**

El sistema deberá estar disponible durante los horarios de operación del hospital, permitiendo que médicos, administradores y personal autorizado puedan acceder a la información necesaria para la atención de pacientes.

Las tareas de mantenimiento, actualización o respaldo deberán realizarse preferentemente en horarios de baja actividad para reducir el impacto en la operación hospitalaria.

El sistema deberá contar con mecanismos de respaldo que permitan recuperar la información en caso de fallos técnicos, pérdida de datos o errores en la base de datos.

### **5.2.5. Mantenibilidad**

El sistema deberá contar con una estructura modular que facilite la corrección de errores, actualización de funciones y ampliación de nuevos módulos relacionados con la gestión hospitalaria.

La base de datos deberá mantener relaciones claras entre sus entidades principales, como pacientes, médicos, consultas, recetas, estudios de laboratorio, hospitalizaciones, facturas y pagos, facilitando su comprensión y mantenimiento por parte del equipo de desarrollo.

La documentación técnica deberá mantenerse actualizada para permitir futuras modificaciones, integración de nuevas funcionalidades y soporte del sistema.

### **5.2.6. Portabilidad**

El sistema deberá ser accesible desde navegadores web modernos como Chrome, Edge, Firefox y Safari, sin requerir la instalación de software adicional por parte del usuario final.

La plataforma deberá adaptarse a distintos tamaños de pantalla mediante un diseño responsivo, permitiendo su uso en computadoras de escritorio, laptops y dispositivos móviles compatibles.

### **5.2.7. Usabilidad**

El sistema deberá contar con una interfaz clara e intuitiva que permita al personal hospitalario realizar operaciones frecuentes de forma sencilla, como registrar pacientes, buscar expedientes, generar consultas, emitir recetas y registrar pagos.

Los formularios deberán mostrar mensajes de confirmación, advertencia o error cuando el usuario realice acciones importantes, omita campos obligatorios o intente guardar información inválida.

### **5.2.8. Integridad de datos**

El sistema deberá garantizar que los registros relacionados mantengan coherencia entre sí, evitando la creación de consultas sin paciente o médico asociado, recetas sin consulta médica, pagos sin factura o estudios de laboratorio sin paciente registrado.

Las claves primarias y foráneas de la base de datos deberán conservar la relación lógica entre las tablas para asegurar la correcta trazabilidad de la información hospitalaria.

## 5.3 Casos de uso principales {#5.3-casos-de-uso-principales}

| Caso de uso | Descripción | Actor principal |
| :---: | ----- | :---: |
| Iniciar sesión | Permite que un usuario autorizado acceda al sistema. | Usuario |
| Registrar paciente | Permite guardar los datos personales de un paciente. | Administrador / Recepcionista |
| Registrar médico | Permite dar de alta médicos y asignarles una especialidad. | Administrador |
| Agendar consulta | Permite registrar una consulta médica para un paciente. | Recepcionista |
| Registrar expediente | Permite almacenar información médica del paciente. | Médico |
| Generar receta | Permite registrar medicamentos indicados al paciente. | Médico |
| Registrar pago | Permite guardar información de pagos realizados. | Caja / Administración |
| Consultar auditoría | Permite revisar accesos y cambios realizados en el sistema. | Administrador |

## 

## 5.4 Reglas de negocio {#5.4-reglas-de-negocio}

* Un paciente puede tener una o varias consultas.

* Un médico puede atender muchas consultas.

* Cada médico debe pertenecer a una especialidad.

* Una consulta puede generar una receta médica.

* Un paciente puede tener un expediente clínico.

* Una hospitalización debe estar relacionada con un paciente.

* Los usuarios del sistema deben tener un rol asignado.

* Solo los usuarios autorizados podrán acceder a funciones administrativas.

* Los cambios importantes deberán registrarse en la tabla de auditoría.

* Los respaldos deberán ser registrados para llevar control de mantenimiento.

# 6\. Diseño de la base de datos {#6.-diseño-de-la-base-de-datos}

## 6.1 Modelo entidad-relación {#6.1-modelo-entidad-relación}

En esta sección se debe colocar el diagrama entidad-relación de la base de datos, mostrando las tablas principales y sus relaciones.

**\[ESPACIO PARA INSERTAR IMAGEN DEL MODELO ENTIDAD-RELACIÓN\]**

**Figura 1\. Modelo entidad-relación de la base de datos SIGEH.**

*Sugerencia:* aquí pueden colocar una captura del diagrama generado en pgAdmin, DBeaver, Draw.io, Lucidchart o cualquier herramienta de modelado.

## 6.2 Modelo relacional {#6.2-modelo-relacional}

La base de datos está conformada por las siguientes tablas principales:

| Tabla | Descripción |
| ----- | ----- |
| pacientes | Almacena la información personal de los pacientes, como nombre, fecha de nacimiento, teléfono, dirección y tipo de sangre. |
| tipos\_sangre | Contiene los tipos de sangre disponibles que pueden asignarse a los pacientes. |
| medicos | Almacena los datos de los médicos registrados, incluyendo su usuario relacionado, especialidad y cédula profesional. |
| especialidades | Contiene las especialidades médicas disponibles dentro del sistema. |
| usuarios | Almacena los usuarios que pueden acceder al sistema, junto con su rol, nombre de usuario, contraseña cifrada y estado activo. |
| roles | Define los tipos de usuario dentro del sistema, como administrador, médico u otros perfiles de acceso. |
| consultas | Registra las citas o consultas médicas realizadas entre pacientes y médicos, incluyendo fecha, motivo, diagnóstico y estado de la consulta. |
| estados\_consulta | Define los posibles estados de una consulta, por ejemplo pendiente, realizada o cancelada. |
| expedientes | Guarda información clínica del paciente, como antecedentes familiares, alergias y fecha de creación del expediente. |
| recetas | Registra las recetas generadas en las consultas médicas, indicando medicamento, dosis y duración del tratamiento. |
| medicamentos | Almacena información de los medicamentos disponibles, como nombre, sustancia activa y stock. |
| hospitalizaciones | Registra las hospitalizaciones de los pacientes, incluyendo fecha de ingreso, fecha de egreso, habitación y motivo. |
| laboratorios | Registra los laboratorios o estudios disponibles para análisis clínicos. |
| estudios\_laboratorio | Guarda los estudios de laboratorio solicitados o realizados a los pacientes, relacionando al paciente, médico y laboratorio correspondiente. |
| facturas | Registra la información de facturación generada a los pacientes, como fecha de emisión, monto total y estado de la factura. |
| pagos | Registra los pagos realizados por los pacientes, asociados a una factura, incluyendo monto, fecha y método de pago. |
| bitacora\_accesos | Registra los accesos realizados al sistema por los usuarios, indicando fecha, hora, dirección IP y si el acceso fue exitoso. |
| auditoria\_cambios | Registra los cambios realizados en tablas importantes, almacenando la operación, usuario de base de datos, fecha y datos anteriores o nuevos. |
| respaldos\_realizados | Guarda el historial de respaldos ejecutados, incluyendo fecha de inicio, fecha de fin, tipo, ruta del archivo, tamaño y estatus. |
| ts\_backup | Representa el espacio físico o ubicación donde se almacenan los respaldos de la base de datos. |

En este modelo, las tablas se encuentran relacionadas mediante llaves foráneas. Por ejemplo, la tabla pacientes se relaciona con tipos\_sangre mediante el campo id\_tipo\_sangre; la tabla consultas se relaciona con pacientes, medicos y estados\_consulta; mientras que la tabla recetas se relaciona con consultas y medicamentos. De esta manera, se evita la duplicidad de información y se mantiene una estructura organizada para el manejo de los datos del sistema.

También se incluyen tablas de control y administración, como usuarios, roles, bitacora\_accesos, auditoria\_cambios y respaldos\_realizados, las cuales permiten gestionar el acceso al sistema, registrar actividades importantes y mantener un historial de respaldos. Esto ayuda a mejorar la seguridad, trazabilidad y mantenimiento de la base de datos.

### 6.3 Diccionario de datos {#6.3-diccionario-de-datos}

En esta sección se presenta el diccionario de datos correspondiente a la base de datos del sistema SIGEH. El diccionario permite describir cada una de las tablas, sus campos, tipos de datos, restricciones principales y la función que cumple cada atributo dentro del sistema.

**Tabla: tipos\_sangre**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_tipo\_sangre | int | PRIMARY KEY | Identificador único del tipo de sangre. |
| tipo | varchar | NOT NULL | Tipo de sangre del paciente, por ejemplo A+, O-, AB+, entre otros. |

**Tabla: paciente**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_paciente | int | PRIMARY KEY | Identificador único del paciente. |
| id\_tipo\_sangre | int | FOREIGN KEY | Relación con la tabla tipos\_sangre. |
| nombre\_completo | varchar | NOT NULL | Nombre completo del paciente. |
| fecha\_nacimiento | date | NOT NULL | Fecha de nacimiento del paciente. |
| telefono | varchar | NULL | Número telefónico de contacto del paciente. |
| direccion | text | NULL | Dirección del paciente. |

**Tabla: expedientes**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_expediente | int | PRIMARY KEY | Identificador único del expediente clínico. |
| id\_paciente | int | FOREIGN KEY | Relación con la tabla pacientes. |
| fecha\_creacion | timestamp | NOT NULL | Fecha y hora en que se creó el expediente. |
| antecedentes\_familiares | text | NULL | Información sobre antecedentes familiares del paciente. |
| alergias | text | NULL | Registro de alergias conocidas del paciente. |

**Tabla: facturas**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_factura | int | PRIMARY KEY | Identificador único de la factura. |
| id\_paciente | int | FOREIGN KEY | Relación con la tabla pacientes. |
| fecha\_emision | timestamp | NOT NULL | Fecha y hora en que se emitió la factura. |
| monto\_total | decimal | NOT NULL | Monto total de la factura. |
| estado | varchar | NOT NULL | Estado de la factura, por ejemplo pagada, pendiente o cancelada. |

**Tabla: pagos**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_pago | int | PRIMARY KEY | Identificador único del pago. |
| id\_factura | int | FOREIGN KEY | Relación con la tabla facturas. |
| fecha\_pago | timestamp | NOT NULL | Fecha y hora en que se realizó el pago. |
| monto | decimal | NOT NULL | Monto pagado. |
| metodo\_pago | varchar | NOT NULL | Método de pago utilizado, por ejemplo efectivo, tarjeta o transferencia. |

**Tabla: hospitalizaciones**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_hospitalizacion | int | PRIMARY KEY | Identificador único de la hospitalización. |
| id\_paciente | int | FOREIGN KEY | Relación con la tabla pacientes. |
| fecha\_ingreso | timestamp | NOT NULL | Fecha y hora de ingreso del paciente. |
| fecha\_egreso | timestamp | NULL | Fecha y hora de egreso del paciente. |
| habitacion | varchar | NOT NULL | Número o nombre de la habitación asignada. |
| motivo | text | NULL | Motivo de la hospitalización. |

**Tabla: laboratorios**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_laboratorio | int | PRIMARY KEY | Identificador único del laboratorio o tipo de estudio. |
| nombre\_estudio | varchar | NOT NULL | Nombre del estudio de laboratorio. |
| descripcion | text | NULL | Descripción general del estudio. |

**Tabla: estudios\_laboratorio**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_estudio | int | PRIMARY KEY | Identificador único del estudio realizado o solicitado. |
| id\_paciente | int | FOREIGN KEY | Relación con la tabla pacientes. |
| id\_laboratorio | int | FOREIGN KEY | Relación con la tabla laboratorios. |
| id\_medico | int | FOREIGN KEY | Relación con la tabla médicos. |
| fecha\_solicitud | timestamp | NOT NULL | Fecha y hora en que se solicitó el estudio. |
| resultados | text | NULL | Resultados obtenidos del estudio de laboratorio. |

**Tabla: roles**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_rol | int | PRIMARY KEY | Identificador único del rol. |
| nombre | varchar | NOT NULL | Nombre del rol asignado al usuario. |
| descripcion | text | NULL | Descripción de las funciones o permisos del rol. |

**Tabla: usuarios**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_usuario | int | PRIMARY KEY | Identificador único del usuario. |
| id\_rol | int | FOREIGN KEY | Relación con la tabla roles. |
| username | varchar | NOT NULL | Nombre de usuario utilizado para iniciar sesión. |
| password\_hash | varchar | NOT NULL | Contraseña cifrada del usuario. |
| activo | boolean | NOT NULL | Indica si el usuario se encuentra activo en el sistema. |

**Tabla: especialidades**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_especialidad | int | PRIMARY KEY | Identificador único de la especialidad médica. |
| nombre | varchar | NOT NULL | Nombre de la especialidad. |
| descripcion | text | NULL | Descripción de la especialidad médica. |

**Tabla: médicos**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_medico | int | PRIMARY KEY | Identificador único del médico. |
| id\_usuario | int | FOREIGN KEY | Relación con la tabla usuarios. |
| id\_especialidad | int | FOREIGN KEY | Relación con la tabla especialidades. |
| nombre\_completo | varchar | NOT NULL | Nombre completo del médico. |
| cedula\_profesional | varchar | NOT NULL | Cédula profesional del médico. |

**Tabla: estados\_consulta**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_estado | int | PRIMARY KEY | Identificador único del estado de consulta. |
| estado | varchar | NOT NULL | Estado de la consulta, por ejemplo programada, atendida o cancelada. |

**Tabla: consultas**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_consulta | int | PRIMARY KEY | Identificador único de la consulta médica. |
| id\_paciente | int | FOREIGN KEY | Relación con la tabla pacientes. |
| id\_medico | int | FOREIGN KEY | Relación con la tabla médicos. |
| id\_estado | int | FOREIGN KEY | Relación con la tabla estados\_consulta. |
| fecha\_hora | timestamp | NOT NULL | Fecha y hora programada para la consulta. |
| motivo | text | NULL | Motivo por el cual el paciente solicita la consulta. |
| diagnostico | text | NULL | Diagnóstico registrado por el médico. |

**Tabla: medicamentos**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_medicamento | int | PRIMARY KEY | Identificador único del medicamento. |
| nombre | varchar | NOT NULL | Nombre comercial o general del medicamento. |
| sustancia\_activa | varchar | NOT NULL | Sustancia activa del medicamento. |
| stock | int | NOT NULL | Cantidad disponible del medicamento en farmacia. |

**Tabla: recetas**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_receta | int | PRIMARY KEY | Identificador único de la receta médica. |
| id\_consulta | int | FOREIGN KEY | Relación con la tabla consultas. |
| id\_medicamento | int | FOREIGN KEY | Relación con la tabla medicamentos. |
| dosis | varchar | NOT NULL | Dosis indicada por el médico. |
| duracion | varchar | NOT NULL | Duración del tratamiento indicado. |

**Tabla: bitacora\_accesos**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_acceso | int | PRIMARY KEY | Identificador único del registro de acceso. |
| id\_usuario | int | FOREIGN KEY | Relación con la tabla usuarios. |
| fecha\_hora | timestamp | NOT NULL | Fecha y hora del intento de acceso. |
| ip\_origen | varchar | NULL | Dirección IP desde la cual se realizó el acceso. |
| exitoso | boolean | NOT NULL | Indica si el inicio de sesión fue exitoso o fallido. |

**Tablespace: TS\_BACKUP**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| tablespace\_name | string | NOT NULL | Nombre del espacio de almacenamiento utilizado para respaldos. |
| location | string | NOT NULL | Ruta física donde se almacenan los respaldos. |
| description | string | NULL | Descripción del propósito del tablespace. |

**Tabla: auditoria\_cambios**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_auditoria | int | PRIMARY KEY | Identificador único del registro de auditoría. |
| nombre\_tabla | varchar | NOT NULL | Nombre de la tabla donde ocurrió el cambio. |
| operacion | varchar | NOT NULL | Tipo de operación realizada, por ejemplo INSERT, UPDATE o DELETE. |
| usuario\_db | varchar | NOT NULL | Usuario de base de datos que realizó la operación. |
| fecha\_hora | timestamp | NOT NULL | Fecha y hora en que se realizó el cambio. |
| datos\_anteriores | jsonb | NULL | Información anterior al cambio realizado. |
| datos\_nuevos | jsonb | NULL | Información nueva registrada después del cambio. |

**Tabla: respaldos\_realizados**

| Campo | Tipo de dato | Restricción | Descripción |
| ----- | ----- | ----- | ----- |
| id\_respaldo | int | PRIMARY KEY | Identificador único del respaldo realizado. |
| fecha\_inicio | timestamp | NOT NULL | Fecha y hora en que inició el respaldo. |
| fecha\_fin | timestamp | NULL | Fecha y hora en que finalizó el respaldo. |
| tipo | varchar | NOT NULL | Tipo de respaldo realizado, por ejemplo completo, incremental o diferencial. |
| ruta\_archivo | text | NOT NULL | Ruta donde se almacenó el archivo de respaldo. |
| tamano\_mb | decimal | NULL | Tamaño del archivo de respaldo en megabytes. |
| estatus | varchar | NOT NULL | Estado del respaldo, por ejemplo exitoso o fallido. |

### 6.4 Normalización {#6.4-normalización}

La base de datos fue diseñada considerando reglas de normalización para evitar la duplicidad de información y mantener la integridad de los datos. Se separaron los catálogos principales, como especialidades, medicamentos, laboratorios y tipos de sangre, de las tablas operativas, como pacientes, médicos, consultas y expedientes.

De esta forma, la información se organiza en tablas relacionadas por medio de llaves primarias y foráneas, permitiendo que los datos sean consistentes y fáciles de consultar.

En cuanto a la Primera Forma Normal 1FN, la base de datos cumple con esta regla porque cada tabla contiene campos atómicos, es decir, cada columna almacena un solo tipo de dato y no se incluyen listas o valores repetidos dentro de un mismo campo. Por ejemplo, los datos de los pacientes, médicos, medicamentos, consultas y pagos se encuentran separados en atributos individuales, lo que permite registrar y consultar la información de manera ordenada.

Respecto a la Segunda Forma Normal 2FN, la base de datos también cumple con esta forma, ya que cada tabla cuenta con una llave primaria que identifica de manera única a cada registro, y los demás campos dependen directamente de dicha llave. Por ejemplo, en la tabla de pacientes, los datos como nombre, fecha de nacimiento, teléfono y dirección dependen del identificador del paciente. De igual forma, en la tabla de consultas, la fecha, motivo y diagnóstico dependen del identificador de la consulta.

Finalmente, se aplicó la Tercera Forma Normal 3FN, debido a que se evitaron dependencias innecesarias entre campos que no son llaves primarias. Para ello, se separaron datos que podrían repetirse en catálogos independientes, como roles, especialidades, tipos de sangre, estados de consulta y medicamentos. De esta forma, la tabla de médicos no almacena directamente el nombre de la especialidad como texto repetido, sino que se relaciona con la tabla de especialidades mediante una llave foránea. Esto permite reducir la duplicidad, facilitar futuras modificaciones y mantener la consistencia de la información.

# 7\. Arquitectura del sistema {#7.-arquitectura-del-sistema}

## 7.1 Arquitectura general {#7.1-arquitectura-general}

El sistema SIGEH estará basado en una arquitectura cliente-servidor. El frontend será desarrollado con React, el backend con Node.js y Express, y la base de datos será administrada mediante PostgreSQL.

El usuario interactúa con la aplicación desde el navegador web. Las peticiones son enviadas al servidor backend, el cual se encarga de validar la información, aplicar reglas de negocio y comunicarse con la base de datos PostgreSQL.

**\[ESPACIO PARA INSERTAR DIAGRAMA DE ARQUITECTURA\]**

**Figura 2\. Arquitectura general del sistema SIGEH.**

*Sugerencia:* el diagrama puede mostrar: Usuario → React → Node.js/Express → PostgreSQL.

## 7.2 Tecnologías utilizadas {#7.2-tecnologías-utilizadas}

| Tecnología | Uso dentro del proyecto |
| ----- | ----- |
| PostgreSQL | Sistema gestor de base de datos. |
| React | Desarrollo del frontend. |
| Node.js | Entorno de ejecución del backend. |
| Express | Framework para crear la API del sistema. |
| pgAdmin | Administración visual de PostgreSQL. |
| Postman | Prueba de endpoints del backend. |
| GitHub | Control de versiones del proyecto. |

## 7.3 Distribución de almacenamiento {#7.3-distribución-de-almacenamiento}

Para cumplir con la administración del espacio en disco, se propone dividir la información en diferentes espacios de almacenamiento dentro de PostgreSQL.

| Espacio | Contenido | Descripción |
| ----- | ----- | ----- |
| TS\_DATOS | Tablas principales | Almacenamiento de información operativa. |
| TS\_INDEX | Índices | Almacenamiento de índices para optimización. |
| TS\_LOGS | Logs | Almacenamiento de logs o archivos relacionados con auditoría. |
| TS\_BACKUP | Respaldos | Ubicación destinada para copias de seguridad. |

\[ESPACIO PARA INSERTAR CAPTURA DE TABLESPACES O CARPETAS DE ALMACENAMIENTO\]

Figura 3\. Distribución de almacenamiento utilizada en PostgreSQL.

Sugerencia: aquí pueden poner capturas de las carpetas creadas para los tablespaces o de pgAdmin mostrando los tablespaces.

---

**8\. Instalación y configuración del SGBD**

## **8.1 Requisitos de hardware** {#8.1-requisitos-de-hardware}

| Recurso | Requisito utilizado |
| ----- | ----- |
| Procesador | \[Escribir procesador del equipo o máquina virtual\] |
| Memoria RAM | \[Escribir cantidad de RAM\] |
| Almacenamiento | \[Escribir espacio disponible\] |
| Sistema operativo | \[Windows / Linux / macOS\] |

---

## **8.2 Requisitos de software** {#8.2-requisitos-de-software}

| Software | Versión |
| ----- | ----- |
| PostgreSQL | \[Versión utilizada\] |
| pgAdmin | \[Versión utilizada\] |
| Node.js | \[Versión utilizada\] |
| npm | \[Versión utilizada\] |
| React | \[Versión utilizada\] |
| Visual Studio Code | \[Versión utilizada\] |

---

## **8.3 Instalación de PostgreSQL** {#8.3-instalación-de-postgresql}

En esta sección se documenta el proceso de instalación de PostgreSQL utilizado para el proyecto. Durante la instalación se configuró el puerto del servicio, el usuario administrador y la contraseña correspondiente.

**Puerto utilizado:** 5432  
**Usuario administrador:** postgres  
**Base de datos del proyecto:** sigeh\_db

**\[ESPACIO PARA INSERTAR CAPTURA DE INSTALACIÓN DE POSTGRESQL\]**

**Figura 4\. Instalación de PostgreSQL.**

**\[ESPACIO PARA INSERTAR CAPTURA DE PGADMIN O CONSOLA CON POSTGRESQL FUNCIONANDO\]**

**Figura 5\. Verificación del funcionamiento de PostgreSQL.**

---

## **8.4 Configuración inicial** {#8.4-configuración-inicial}

La configuración inicial del SGBD incluyó la creación de la base de datos, usuarios, roles y permisos necesarios para el proyecto.

**\[ESPACIO PARA PEGAR SCRIPT DE CREACIÓN DE BASE DE DATOS\]**

\-- Script pendiente

\-- CREATE DATABASE sigeh\_db;

\-- CREATE USER usuario\_app WITH PASSWORD 'contraseña';

\-- GRANT ...;

---

## **8.5 Alta, baja y reinicio del servicio** {#8.5-alta,-baja-y-reinicio-del-servicio}

Se realizaron pruebas para verificar el control del servicio de PostgreSQL, incluyendo inicio, detención y reinicio.

| Acción | Comando utilizado | Resultado |
| ----- | ----- | ----- |
| Iniciar servicio | \[Comando utilizado\] | \[Resultado\] |
| Detener servicio | \[Comando utilizado\] | \[Resultado\] |
| Reiniciar servicio | \[Comando utilizado\] | \[Resultado\] |
| Verificar estado | \[Comando utilizado\] | \[Resultado\] |

**\[ESPACIO PARA INSERTAR CAPTURAS DEL SERVICIO DE POSTGRESQL\]**

**Figura 6\. Verificación del servicio de PostgreSQL.**

*Sugerencia:* en Windows pueden usar Servicios o comandos como `net start postgresql-x64-XX`. En Linux pueden usar `systemctl status postgresql`.

---

# 

# **9\. Seguridad** {#9.-seguridad}

## **9.1 Roles del sistema** {#9.1-roles-del-sistema}

Se definieron roles para controlar el acceso de los usuarios al sistema y a la base de datos.

| Rol | Descripción |
| ----- | ----- |
| administrador | Tiene acceso completo a la administración del sistema. |
| medico | Puede consultar pacientes, registrar consultas y expedientes. |
| recepcionista | Puede registrar pacientes y agendar consultas. |
| auditor | Puede consultar bitácoras y registros de auditoría. |

---

## **9.2 Usuarios de base de datos** {#9.2-usuarios-de-base-de-datos}

**\[ESPACIO PARA DOCUMENTAR LOS USUARIOS CREADOS EN POSTGRESQL\]**

| Usuario | Rol asignado | Permisos |
| ----- | ----- | ----- |
| \[usuario\_1\] | \[rol\] | \[permisos\] |
| \[usuario\_2\] | \[rol\] | \[permisos\] |
| \[usuario\_3\] | \[rol\] | \[permisos\] |

---

## **9.3 Permisos** {#9.3-permisos}

Los permisos fueron asignados de acuerdo con el rol de cada usuario. Esto permite limitar el acceso a la información y evitar modificaciones no autorizadas.

**\[ESPACIO PARA PEGAR SCRIPT DE ROLES Y PERMISOS\]**

\-- Script pendiente

\-- CREATE ROLE administrador;

\-- CREATE ROLE medico;

\-- CREATE ROLE recepcionista;

\-- GRANT SELECT, INSERT, UPDATE ON ... TO ...;

**\[ESPACIO PARA INSERTAR CAPTURA DE ROLES EN PGADMIN\]**

**Figura 7\. Roles y permisos configurados en PostgreSQL.**

---

# **10\. Respaldos y recuperación** {#10.-respaldos-y-recuperación}

## **10.1 Respaldo completo** {#10.1-respaldo-completo}

Se realizó un respaldo completo de la base de datos con el objetivo de proteger la información del sistema.

**\[ESPACIO PARA PEGAR COMANDO O SCRIPT DE RESPALDO COMPLETO\]**

\# Comando pendiente

\# pg\_dump \-U postgres \-d sigeh\_db \-F c \-f respaldo\_completo.backup

**\[ESPACIO PARA INSERTAR CAPTURA DEL RESPALDO GENERADO\]**

**Figura 8\. Respaldo completo de la base de datos.**

## **10.2 Respaldo automático** {#10.2-respaldo-automático}

Se propone programar respaldos automáticos para garantizar que la información se copie de forma periódica.

**\[ESPACIO PARA EXPLICAR SI USARON CRON, TASK SCHEDULER O SCRIPT MANUAL\]**

**\[ESPACIO PARA INSERTAR CAPTURA DEL RESPALDO PROGRAMADO\]**

**Figura 9\. Programación del respaldo automático.**

## **10.3 Recuperación de información** {#10.3-recuperación-de-información}

Para comprobar la recuperación de información, se simulará la pérdida de una tabla o registros y posteriormente se restaurará el respaldo generado.

**\[ESPACIO PARA DESCRIBIR LA PRUEBA DE RECUPERACIÓN\]**

Ejemplo de redacción:

Se simuló la pérdida de información eliminando una tabla de prueba. Posteriormente, se restauró la base de datos a partir del respaldo previamente generado, verificando que los datos fueran recuperados correctamente.

**\[ESPACIO PARA INSERTAR CAPTURA DE LA TABLA ANTES DE ELIMINARLA\]**

**Figura 10\. Información antes de la simulación de fallo.**

**\[ESPACIO PARA INSERTAR CAPTURA DE LA RESTAURACIÓN\]**

**Figura 11\. Restauración de la base de datos.**

# **11\. Replicación** {#11.-replicación}

La replicación permite mantener una copia de la base de datos en otro servidor o instancia, con el objetivo de mejorar la disponibilidad de la información.

Para este proyecto se utilizará replicación en PostgreSQL mediante:

**Tipo de replicación:** \[Streaming Replication / Replicación lógica / Pendiente por definir\]

**Servidor principal:** \[IP o nombre del servidor principal\]  
**Servidor secundario:** \[IP o nombre del servidor secundario\]

**\[ESPACIO PARA EXPLICAR EL PROCESO DE CONFIGURACIÓN DE REPLICACIÓN\]**

**\[ESPACIO PARA INSERTAR CAPTURA DEL SERVIDOR PRINCIPAL\]**

**Figura 12\. Configuración del servidor principal de PostgreSQL.**

**\[ESPACIO PARA INSERTAR CAPTURA DEL SERVIDOR SECUNDARIO\]**

**Figura 13\. Configuración del servidor secundario de PostgreSQL.**

**\[ESPACIO PARA INSERTAR CAPTURA DE LA PRUEBA DE REPLICACIÓN\]**

**Figura 14\. Verificación de replicación funcional.**

*Sugerencia:* aquí pueden mostrar que insertan un registro en la base principal y aparece en la secundaria.

# **12\. Monitoreo y auditoría** {#12.-monitoreo-y-auditoría}

## **12.1 Monitoreo** {#12.1-monitoreo}

El monitoreo permite revisar el comportamiento del SGBD y detectar posibles problemas de rendimiento o disponibilidad. En PostgreSQL se pueden monitorear conexiones activas, consultas lentas, uso de disco, locks y sesiones activas.

**Herramienta utilizada:** \[pgAdmin / Grafana / Prometheus / Zabbix / otra\]

| Métrica | Herramienta utilizada | Evidencia |
| ----- | ----- | ----- |
| Conexiones activas | \[Herramienta\] | \[Captura\] |
| Consultas lentas | \[Herramienta\] | \[Captura\] |
| Uso de disco | \[Herramienta\] | \[Captura\] |
| Locks | \[Herramienta\] | \[Captura\] |
| Sesiones activas | \[Herramienta\] | \[Captura\] |

**\[ESPACIO PARA INSERTAR CAPTURA DEL MONITOREO\]**

**Figura 15\. Monitoreo de PostgreSQL.**

## **12.2 Auditoría de accesos** {#12.2-auditoría-de-accesos}

La auditoría de accesos permite registrar qué usuarios ingresan al sistema y en qué momento lo hacen.

**Tabla sugerida:** bitacora\_accesos

**\[ESPACIO PARA PEGAR SCRIPT DE TABLA BITACORA\_ACCESOS\]**

\-- Script pendiente

\-- CREATE TABLE bitacora\_accesos (...);

**\[ESPACIO PARA INSERTAR CAPTURA DE REGISTROS DE ACCESO\]**

**Figura 16\. Bitácora de accesos del sistema.**

## **12.3 Auditoría de cambios** {#12.3-auditoría-de-cambios}

La auditoría de cambios permite registrar operaciones importantes realizadas sobre la información, como inserciones, actualizaciones y eliminaciones.

**Tabla sugerida:** auditoria\_cambios

**\[ESPACIO PARA PEGAR SCRIPT DE TRIGGER DE AUDITORÍA\]**

\-- Script pendiente

\-- CREATE OR REPLACE FUNCTION registrar\_auditoria()

\-- RETURNS TRIGGER AS $$

\-- ...

\-- $$ LANGUAGE plpgsql;

**\[ESPACIO PARA INSERTAR CAPTURA DE AUDITORÍA DE CAMBIOS\]**

**Figura 17\. Registros de auditoría de cambios.**

# **13\. Optimización** {#13.-optimización}

## **13.1 Índices** {#13.1-índices}

Para mejorar el rendimiento de las consultas se implementaron índices en campos utilizados frecuentemente en búsquedas, relaciones y filtros.

**\[ESPACIO PARA DOCUMENTAR LOS 10 ÍNDICES CREADOS\]**

| Índice | Tabla | Campo | Objetivo |
| ----- | ----- | ----- | ----- |
| \[nombre\_indice\_1\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_2\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_3\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_4\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_5\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_6\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_7\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_8\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_9\] | \[tabla\] | \[campo\] | \[objetivo\] |
| \[nombre\_indice\_10\] | \[tabla\] | \[campo\] | \[objetivo\] |

## **13.2 Consultas lentas y EXPLAIN** {#13.2-consultas-lentas-y-explain}

Se analizaron consultas mediante `EXPLAIN` o `EXPLAIN ANALYZE` para identificar su costo y mejorar su rendimiento.

**\[ESPACIO PARA PEGAR CONSULTA ANTES DE OPTIMIZAR\]**

\-- Consulta pendiente

**\[ESPACIO PARA INSERTAR CAPTURA DE EXPLAIN ANTES DE OPTIMIZAR\]**

**Figura 18\. Resultado de EXPLAIN antes de la optimización.**

**\[ESPACIO PARA PEGAR CONSULTA OPTIMIZADA\]**

\-- Consulta optimizada pendiente

**\[ESPACIO PARA INSERTAR CAPTURA DE EXPLAIN DESPUÉS DE OPTIMIZAR\]**

**Figura 19\. Resultado de EXPLAIN después de la optimización.**

## **13.3 Comparativa de rendimiento** {#13.3-comparativa-de-rendimiento}

| Consulta | Tiempo antes | Tiempo después | Mejora observada |
| ----- | ----- | ----- | ----- |
| \[Consulta 1\] | \[tiempo\] | \[tiempo\] | \[descripción\] |
| \[Consulta 2\] | \[tiempo\] | \[tiempo\] | \[descripción\] |

**\[ESPACIO PARA INSERTAR GRÁFICA O TABLA DE COMPARACIÓN\]**

**Figura 20\. Comparativa de rendimiento antes y después de la optimización.**

# **14\. Aplicación funcional** {#14.-aplicación-funcional}

## **14.1 Descripción de la aplicación** {#14.1-descripción-de-la-aplicación}

La aplicación SIGEH fue desarrollada con React para el frontend y Node.js con Express para el backend. Su objetivo es permitir la administración de la información hospitalaria mediante una interfaz web conectada a la base de datos PostgreSQL.

El frontend permite que el usuario interactúe con el sistema mediante formularios, tablas y pantallas de consulta. El backend se encarga de recibir las peticiones, procesar la información, validar los datos y comunicarse con PostgreSQL.

## **14.2 Módulos implementados** {#14.2-módulos-implementados}

| Módulo | Estado | Descripción |
| ----- | ----- | ----- |
| Login | \[Pendiente / Completo\] | Permite el acceso de usuarios autorizados. |
| Pacientes | \[Pendiente / Completo\] | Permite registrar, consultar, editar y eliminar pacientes. |
| Médicos | \[Pendiente / Completo\] | Permite administrar médicos y especialidades. |
| Consultas | \[Pendiente / Completo\] | Permite agendar y consultar citas médicas. |
| Expedientes | \[Pendiente / Completo\] | Permite registrar información clínica. |
| Reportes | \[Pendiente / Completo\] | Permite consultar información general del sistema. |
| Auditoría | \[Pendiente / Completo\] | Permite visualizar accesos y cambios. |
| Usuarios | \[Pendiente / Completo\] | Permite administrar usuarios y roles. |

## **14.3 Evidencias de la aplicación** {#14.3-evidencias-de-la-aplicación}

**\[ESPACIO PARA INSERTAR CAPTURA DEL LOGIN\]**

**Figura 21\. Pantalla de inicio de sesión.**

**\[ESPACIO PARA INSERTAR CAPTURA DEL MÓDULO DE PACIENTES\]**

**Figura 22\. Administración de pacientes.**

**\[ESPACIO PARA INSERTAR CAPTURA DEL MÓDULO DE MÉDICOS\]**

**Figura 23\. Administración de médicos.**

**\[ESPACIO PARA INSERTAR CAPTURA DEL MÓDULO DE CONSULTAS\]**

**Figura 24\. Agenda de consultas.**

**\[ESPACIO PARA INSERTAR CAPTURA DEL MÓDULO DE AUDITORÍA\]**

**Figura 25\. Módulo de auditoría.**

# **15\. Evidencias generales** {#15.-evidencias-generales}

En esta sección se colocan las capturas principales del funcionamiento del proyecto.

## **15.1 Evidencia de base de datos** {#15.1-evidencia-de-base-de-datos}

**\[ESPACIO PARA INSERTAR CAPTURA DE LA BASE DE DATOS EN PGADMIN\]**

**Figura 26\. Base de datos SIGEH creada en PostgreSQL.**

## **15.2 Evidencia de tablas** {#15.2-evidencia-de-tablas}

**\[ESPACIO PARA INSERTAR CAPTURA DE LAS TABLAS CREADAS\]**

**Figura 27\. Tablas principales de la base de datos.**

## **15.3 Evidencia de vistas** {#15.3-evidencia-de-vistas}

**\[ESPACIO PARA INSERTAR CAPTURA DE LAS VISTAS CREADAS\]**

**Figura 28\. Vistas implementadas en PostgreSQL.**

## **15.4 Evidencia de procedimientos almacenados** {#15.4-evidencia-de-procedimientos-almacenados}

**\[ESPACIO PARA INSERTAR CAPTURA DE PROCEDIMIENTOS ALMACENADOS\]**

**Figura 29\. Procedimientos almacenados implementados.**

## **15.5 Evidencia de triggers** {#15.5-evidencia-de-triggers}

**\[ESPACIO PARA INSERTAR CAPTURA DE TRIGGERS\]**

**Figura 30\. Triggers implementados para auditoría y control de datos.**

---

# **16\. Conclusiones** {#16.-conclusiones}

Con el desarrollo del proyecto integrador SIGEH se logró aplicar de forma práctica la administración de bases de datos utilizando PostgreSQL como SGBD principal. El proyecto permitió comprender la importancia de diseñar correctamente una base de datos, administrar usuarios, asignar permisos, crear respaldos y registrar eventos importantes mediante auditoría.

También se reforzó el uso de tecnologías de desarrollo web como React y Node.js, ya que la base de datos no se trabajó de forma aislada, sino conectada a una aplicación funcional. Esto permitió simular un entorno más cercano a un sistema real, donde el frontend, backend y base de datos trabajan en conjunto.

Finalmente, este proyecto permitió integrar los temas vistos durante el semestre, incluyendo instalación, almacenamiento, seguridad, monitoreo, auditoría, optimización, respaldos y recuperación ante fallos. Gracias a esto se obtuvo una visión más completa del trabajo que realiza un administrador de bases de datos dentro de un sistema empresarial.

# **17\. Anexos** {#17.-anexos}

## **Anexo A. Scripts SQL** {#anexo-a.-scripts-sql}

**\[PEGAR AQUÍ SCRIPT COMPLETO DE CREACIÓN DE BASE DE DATOS\]**

\-- Script pendiente

---

## **Anexo B. Scripts de roles y permisos** {#anexo-b.-scripts-de-roles-y-permisos}

**\[PEGAR AQUÍ SCRIPT DE USUARIOS, ROLES Y PERMISOS\]**

\-- Script pendiente

---

## **Anexo C. Scripts de respaldos** {#anexo-c.-scripts-de-respaldos}

**\[PEGAR AQUÍ SCRIPT O COMANDOS DE RESPALDO\]**

\# Script pendiente

---

## **Anexo D. Scripts de auditoría** {#anexo-d.-scripts-de-auditoría}

**\[PEGAR AQUÍ SCRIPT DE TABLAS, FUNCIONES Y TRIGGERS DE AUDITORÍA\]**

\-- Script pendiente

---

## **Anexo E. Código fuente** {#anexo-e.-código-fuente}

**Frontend:** React  
**Backend:** Node.js \+ Express  
**Base de datos:** PostgreSQL

**Repositorio:** \[Pegar enlace de GitHub si lo usan\]

---

## **Anexo F. Manual de usuario** {#anexo-f.-manual-de-usuario}

**\[ESPACIO PARA EXPLICAR DE FORMA SENCILLA CÓMO USAR EL SISTEMA\]**

Ejemplo:

1. Ingresar al sistema con usuario y contraseña.

2. Seleccionar el módulo deseado.

3. Registrar o consultar información.

4. Guardar los cambios.

5. Cerrar sesión al finalizar.

---

## **Anexo G. Manual técnico** {#anexo-g.-manual-técnico}

**\[ESPACIO PARA EXPLICAR CÓMO INSTALAR Y EJECUTAR EL PROYECTO\]**

Ejemplo:

1. Instalar PostgreSQL.

2. Crear la base de datos.

3. Ejecutar los scripts SQL.

4. Instalar dependencias del backend con `npm install`.

5. Configurar el archivo `.env`.

6. Ejecutar el backend con `npm run dev`.

7. Instalar dependencias del frontend con `npm install`.

8. Ejecutar React con `npm run dev`.

9. Verificar la conexión entre la aplicación y la base de datos.

