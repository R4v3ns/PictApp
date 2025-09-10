# PictApp

## Descripción
Proyecto en clases a seguir de backend para nuestra aplicación similar a instagram.

## Dependencias o Liberías a instalar
```
    npm install express express-validator cors sequelize sequelize-cli sqlite3 bcryptjs jsonwebtoken dotenv nodemon
```

## Dependencia de desarrollo

```
    npm install --save-dev morgan
```

## Pasos a seguir

* Crear una carpeta inicial dentro de nuestro proyecto llamada src
* Añadir un archivo llamado .env para subir nuestra información de desarrollo.
* Crear un archivo .gitignore para escribir los elementos que no serán subidos a github.

* Para instalar las librerias
```
    npm install
```
* Para crear una migración
```
    npx sequelize-cli migration:generate --name <nombre creacion de tabla ej: create-user>
```
* Para correr el proyecto
```
    npm run dev
```
* Adicional
```
    npm start
```