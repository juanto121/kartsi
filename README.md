Kartsi Server
=============
Este es el servidor que coordina varias de las tareas de kartsi.

Flujo de mensajes
-----------------
EL servidor hace 3 cosas básicas:
- Gestión de karts.
- Coordinar power-ups.
- Mostrar informacion de la carrera.

###Gestion de Karts
La gestion de karts es simplemente hacerle saber al servidor que karts hay emparejados con algun dispositivo. Al conectar un despositivo con algun kart, se realiza un POST al servidor en la ruta `kartsi/karts` y se agrega la mac del kart a la carrera.

###Coordinar Powerups
Para coordinar los powerups, se realiza un PUT a la ruta `kartsi/karts/:kart_mac`, donde `kart_mac` es la mac del kart formateado para que no tenga el separador dos puntos ( : ). En esta peticion se encuentran los karts que no tengan `kart_mac` y se les aplica el power-up STOP.

Para mejor entendimiento de como se configuran las peticiones en el servidor ver [Guia routing express](http://expressjs.com/guide/routing.html).

###Información de la carrera
Los request para agregar kart y aplicar power-up provocan que los sockets conectados al servidor reciban un mensaje. Este mecanismo es usado para actualizar la informacion de la carrera en una pantalla o en cualquier navegador que tenga acceso al servidor.


La informacion de la carrera se obtiene accediendo desde un navegador a `/kartsi/gamemode/sprint`.

Uso básico
----------
Para usar el servidor se debe tener instalado [nodejs](https://nodejs.org/). Hay que tener en cuenta que la version de windows y raspbian difieren y configuración extra puede ser necesaria para ejecutarlo en cada sistema operativo. Al instalar node, tambien se instalara la herramienta [npm](https://www.npmjs.com/).
No olvidar clonar este repositorio con [Git](http://git-scm.com/) o descargarlo como zip.

Acceder al directorio del proyecto y en la consola:
```
> npm install
> node app.js
```
Y el servidor queda esperando peticiones.