# InterfazAdministrador

Pagina para el manejo de usuarios y envios de la pagina "TodoIT", puede Modificar/Baja/Alta de clientes y tambien puede modificar los viajes (Tenga en cuenta que la base de datos no permite algunos movimientos)

# Iniciar

Para instalar toda las dependencias use "npm i", y para correr el proyecto utilice "npm start"

# Usuario

Puede ingresar como invitado presionando el boton "Ingresar como invitado" en la pantalla del Login o use el usuario de prueba: administrador@gmail.com, contraseña: 123456

# Funcionamiento

Esta aplicacion esta diseñada para llevar un control sobre los usuarios y los envios/equipos de la pagina TodoIT
Esta posee 5 pestañas

### Overview

En esta pestaña tienes 3 graficos en donde se ven la cantidad de usuarios, los equipos recolectados en los ultimos 7 dias y los envios realizados durante el dia

### Registro

En esta pestaña puedes crear un usuario final o un cadete

### Viajes

En esta pestaña veras todos los viajes menos los fianlizados (acpetados por el cliente) y podras modificar su estado, tenga en cuenta que la base de datos no permite ciertos movimientos y que debe elegir un cadete para los movimientos

### Historial

En esta pestaña solo veras los viajes completados

### Usuarios

En esta pestaña puedes ver los usuarios registrados y puede aceptarlos (usuario aceptado = true) o modificar cualquier otro campo disponible
