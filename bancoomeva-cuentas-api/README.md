# Bancoomeva Cuentas

Gestor de cuentas bancarias del banco Bancoomeva.

## Base de datos

Restaurar la base de datos desde el archivo script.sql desde **MySQL Workbench**, o phpMyAdmin, o desde el intérprete de comandos.


## API

La carpeta `bancoomeva-cuentas-api` contiene un proyecto Node.JS con la API que permite recuperar y almacenar datos en una base de datos tipo MySQL.

1. Instalar las dependencias con el comando desde la carpeta mencionada:

	`npm install`

2. Una vez instaladas las dependencias se debe ejecutar con el comando:

	`npm start`

## Front-End

La carpeta `bancoomeva-cuentas-frontend` contiene el front-end para facilitar la interacción del usuario en la aplicación.

1. Para la instalación de las dependencias se utiliza el comando:

    `npm install`

2. Una vez instaladas las dependencias se debe ejecutar con el comando:

	`npm start -- --port=10001`

3. Iniciar la aplicación desde el navegador ingresando a la siguiente URL:

	`http://localhost:10001/index.html`
