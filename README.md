# RF2 – Recuperación de contraseña

1. Inicio de sesión

Agregar un enlace o botón con el texto “He olvidado mi contraseña”.

Al hacer clic, redirige a la vista /forgot-password.jsx

2. Vista 1: “Olvidé mi contraseña” (ForgotPassword.jsx)

Muestra un formulario con un solo campo: Correo(identifier).

Botón “Enviar código” que realiza:

POST /api/auth/recover-request

Mostrar mensaje neutro tras enviar:

“Si existe una cuenta con ese correo, te enviaremos un código de recuperación.”

No mostrar si el usuario existe o no (para seguridad).

Estados a manejar:

Enviando (spinner)

Mensaje de éxito

Error genérico si algo falla (sin revelar detalles)

3. Vista 2: “Verificar código” (VerifyCode.jsx)

Formulario con:

Campo para código de 6 dígitos.

Botón “Verificar”: POST /api/auth/recover-verify

Si el código es correcto:

Guardar el token temporal que devuelve el backend (por ejemplo, en sessionStorage).

Redirigir a /reset-password.jsx

Si el código es incorrecto:

Mostrar mensaje “Código incorrecto.”.

Si se bloquea:

Mostrar “Cuenta bloqueada. Intenta de nuevo más tarde.”

4. Vista 3: “Cambiar contraseña” (ResetPassword.jsx)

Formulario con:

Nueva contraseña

Confirmar contraseña

Validaciones en el front (mínimo 8 caracteres, coincidencia)

Botón “Cambiar contraseña” → POST /api/auth/reset-password con:

{
  "identifier": "<correo>",
  "token": "<token temporal>",
  "newPassword": "<contraseña>"
}


Si el cambio es exitoso:

Mostrar mensaje: “Tu contraseña ha sido cambiada con éxito.”

Redirigir al login.

Flujo resumido

    Usuario hace clic en “He olvidado mi contraseña”.
    Ingresa su correo → recover-request
    Recibe un código → Ingresa el código → recover-verify
    Si el código es válido → Va a pantalla de cambio de contraseña → reset-password
    Contraseña actualizada → Redirige al login.

🧪 Checklist de QA 

 Botón “He olvidado mi contraseña” redirige correctamente.

 ForgotPassword muestra mensaje genérico al enviar.

 VerifyCode permite varios intentos y muestra errores correctamente.

 ResetPassword valida campos y muestra confirmación.

 Al final del flujo, el usuario puede iniciar sesión con la nueva contraseña.

 Todas las respuestas del backend se manejan con mensajes amigables.

# RF3 – Eliminación de cuenta del usuario 

1. Acceso desde el perfil

El usuario inicia sesión y navega al módulo “Perfil”.

Dentro del perfil, selecciona “Ajustes y privacidad”.

En esa sección, accede a la pestaña o bloque “Cuenta”.

2. Vista / Sección de eliminación (AccountSettings.jsx)

Muestra opciones como:

“Desactivar cuenta” (solo la vas a poner no la vamos a utilizar)

“Eliminar cuenta de forma irreversible” (principal)

Al hacer clic en “Eliminar cuenta”, abrir un modal de confirmación.

3. Modal de confirmación (DeleteAccountModal.jsx)

Contenido del modal:

Mensaje de advertencia, por ejemplo:

“Si eliminas tu cuenta, perderás permanentemente tu información, libros guardados y progreso. Esta acción no se puede deshacer.”

Casilla de verificación:

Estoy de acuerdo en eliminar mi cuenta de forma irreversible

Botones:

Cancelar → Cierra el modal

Eliminar cuenta → Deshabilitado hasta marcar la casilla

Al confirmar:

Llamar al endpoint del backend:

DELETE /api/users/me

4. Comportamiento tras la acción

Si la eliminación es exitosa:

Mostrar notificación: “Tu cuenta ha sido eliminada correctamente.”

Cerrar sesión y redirigir al inicio de sesión (/login).

Si ocurre un error:

Mostrar mensaje: “No se pudo eliminar la cuenta. Intenta de nuevo más tarde.”

Estados y validaciones

El botón “Eliminar cuenta” debe permanecer deshabilitado hasta que el usuario marque la casilla de confirmación.

Mostrar indicador de carga (loading) mientras se realiza la petición.

🧠 Flujo resumido visualmente

 Perfil 
 Ajustes y privacidad 
 Cuenta 
 Eliminar cuenta 
 Confirmar en modal 
 Backend borra cuenta 
 Mensaje de confirmación 
 Redirección al login

🧪 Checklist de QA 

 Desde el perfil se puede acceder al panel de “Ajustes y privacidad”.

 El botón “Eliminar cuenta” abre un modal de confirmación.

 El botón se activa solo al marcar la casilla de confirmación.

 Tras eliminar, el usuario es redirigido al login con mensaje de éxito.

 En caso de error, se muestra un mensaje claro y se puede reintentar.

 No hay forma de volver a acceder con esa cuenta después de eliminarla.
# RF4 – Penalizaciones por incumplimientos de normas 

1. Detección y notificación automática

El sistema detecta una infracción (por backend).

Se envía un correo al usuario (fuera del frontend) informando la penalización y el tiempo para apelar.

El frontend debe poder mostrar esa penalización en la sección del perfil del usuario.

2. Vista para el usuario – “Mis penalizaciones” (UserPenalties.jsx)

Ubicación: dentro del módulo Perfil → “Penalizaciones”.

El usuario ve una lista de sus sanciones:

Tipo o motivo (ej. “Lenguaje inapropiado”, “Contenido reportado”)

Fecha

Estado: Activa, En apelación, Resuelta

Tiempo restante (si aplica)

Botón “Apelar” (solo disponible si está dentro del plazo).

Comportamientos:

Al hacer clic en “Apelar”, abrir modal (AppealModal.jsx):

Formulario con un campo de texto para explicar su apelación.

Botón Enviar apelación → hace POST /api/penalties/appeal (según API).

Mostrar mensaje de confirmación: “Tu apelación ha sido enviada. Recibirás una respuesta por correo.”

3. Vista para el administrador – “ modulo de gestión de penalizaciones” (AdminPenalties.jsx)

Panel accesible solo para el rol Administrador.

Tabla con las penalizaciones activas y en apelación: (mira el vaino ese del diagrama de clases esos campos vas a poner)

Usuario infractor

descripción

Nivel de gravedad

Estado actual

Fecha de inicio y fin

Acciones:

Modificar sanción (abrir modal de edición)

Levantar sanción

Ver apelación del usuario

Flujo visual:

Al modificar o levantar una sanción, mostrar notificación:

“Sanción actualizada correctamente.”
“No se pudo modificar la sanción. Intente más tarde.”

4. Notificaciones en el sistema

Cuando el usuario inicia sesión y tiene penalizaciones activas, mostrar:

Un banner de advertencia o alerta en el dashboard:

“Tienes penalizaciones activas. Revisa los detalles en tu perfil.”

Estas notificaciones pueden venir desde un endpoint como /api/penalties/user

Estados y validaciones

Mostrar visualmente los estados de las sanciones:

Pendiente / En apelación

Activa

Resuelta / Levantada

El botón “Apelar” se desactiva si el plazo ya expiró.

Mostrar spinner o estado “Cargando…” mientras se obtienen las sanciones.

Flujo resumido

    Sistema detecta infracción → notifica al usuario (correo)
    Usuario inicia sesión → ve aviso en su perfil
    En “Mis penalizaciones”, puede revisar o apelar
    El administrador revisa la apelación y ajusta la sanción desde su panel
    Sistema notifica al usuario sobre los cambios (correo o mensaje en app)

🧪 Checklist de QA 

 En el perfil del usuario aparece la pestaña “Penalizaciones”.

 El usuario puede ver detalles claros de cada sanción.

 El botón “Apelar” funciona solo si hay tiempo disponible.

 El modal de apelación envía correctamente la solicitud.

 El administrador puede ver y modificar sanciones desde su panel.

 Los estados y colores de cada sanción son consistentes (activa, en apelación, resuelta).

 Se muestran notificaciones visuales claras (éxito, error, advertencia).