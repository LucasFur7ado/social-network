# Es 
### Red social minimalista desarrollada con SvelteKit, NodeJS, MySQL y TailwindCSS.

### Set up
- Clona el repositorio en tu equipo:

~~~
git clone https://github.com/LucasFur7ado/social-network.git
~~~
- Una vez dentro de la carpeta raíz, instala las dependencias dentro de **/server** y **/client**

~~~
cd server
npm install 
~~~
~~~
cd ..
cd client
npm install
~~~
- Renombra el archivo **/server/.env.template** a **.env** y establece las variables de entorno

~~~
# JWT 
LOGIN_SECRET=
# DB
DB_PASS=
DB_USER=
DB_HOST=
DB_NAME=
# NODEMAILER 
EMAIL_USER=
EMAIL_PASS=
~~~
La base de datos deberá ser **MySQL** y los datos en **#NODEMAILER** corresponden a un correo electrónico que enviará al usuario un código de verificación. <br/>
(Solo es necesario para el registro de usuarios) <br/><br/>
Para obtener estos datos puedes seguir los pasos que [aquí](https://support.google.com/mail/answer/185833?hl=es-419) se explican.
- Para crear el esquema de la base de datos copia el contenido en **/server/sql/squeme.sql** y ejecútalo en cualquier manejador.
- Lo mismo con los datos de prueba **/server/sql/data.sql**
- Finalmente ejecuta el siguiente comando en ambas carpetas **/server** y **/client**

~~~
npm run dev
~~~
Para usar la aplicación puedes usar el siguiente usuario de prueba: <br/><br/> 
**Email: test@gmail.com<br/>**
**Contraseña: 123**


# En
### Minimalistic social network developed with SvelteKit, NodeJS, MySQL and TailwindCSS.

### Set up
- Clone the repository:

~~~
git clone https://github.com/LucasFur7ado/social-network.git
~~~
- In the root folder install dependencies inside **/server** y **/client**

~~~
cd server
npm install 
~~~
~~~
cd ..
cd client
npm install
~~~
- Rename **/server/.env.template** file to **.env** and set the variables

~~~
# JWT 
LOGIN_SECRET=
# DB
DB_PASS=
DB_USER=
DB_HOST=
DB_NAME=
# NODEMAILER 
EMAIL_USER=
EMAIL_PASS=
~~~
The database should be **MySQL** and **#NODEMAILER** variables corresponds to a gmail account that will send verification code to users. <br/>
(Only necessary for user register) <br/><br/>
To get this data you can follow [this steps.](https://support.google.com/mail/answer/185833?hl=es-419)
- To create the database squeme just copy the content in **/server/sql/squeme.sql** and execute it in any DBMS.
- Same with the test data **/server/sql/data.sql**
- Finally execute the following command in both **/server** and **/client** folders

~~~
npm run dev
~~~
To try the app you can use a test user: <br/><br/> 
**Email: test@gmail.com<br/>**
**Contraseña: 123**
