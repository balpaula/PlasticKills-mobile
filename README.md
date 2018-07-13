# PlasticKills game
Save the fish from plastic. Ironhack Project Module 1

## Descripción
El pez tiene que evitar chocar con los diferentes objetos de plástico (botellas, etc) e intentar recolectar el máximo número de estrellas (puntos).
Puede moverse de izquierda a derecha en una pantalla vertical. Los objetos y estrellas van desde abajo hacia arriba. Si choca con un objeto de plástico, el pez muere y termina la partida.

## MVP - Tecnología (DOM - CANVAS)
Tecnología usada: canvas
MVP del proyecto:
* El pez puede moverse a la derecha y a la izquierda
* Aparecen objetos desde abajo hacia arriba
* Colisiones con los objetos de plástico (game over)
* States: start, game, game over

## Backlog
* Para móviles/tablets (touch events)
* Mover el fondo (background image) para producir efecto de movimiento del pez
* Aparición de estrella desde abajo hacia arriba
* Colisiones con estrellas para conseguir puntos
* Puntuación
* Sprite sheet / gif del pez
* Vidas del pez (antes de game over)
* Sonidos para las colisiones
* Música de fondo
* Levels: aumentar la velocidad de los objetos + canviar el color del fondo
* Poder seleccionar diferentes peces en el state Start
* Animación del pez cuando el pez colisiona con una estrella

## Estructuras de datos
__Clases:__
* Main: main.js
* Game: game.js
* Fish: fish.js
* Objects: objects.js

__Métodos main:__
* buildSplash()
* destroySplash()
* buildGame()
* destroyGame()
* buildGameOver()
* destroyGameOver()

__Métodos Game:__
* _drawBoard()
* _drawFish()
* _drawObject()
* start()
* assignControlToTouchEvents()
* _generateObject() → Both for plastic and stars
* _update() → When eaten a star
* stop()

__Métodos Fish:__
* start()
* move()
* goLeft()
* goRight()
* collidesWith()
* stop()

__Métodos Objects:__
* move()

## Tasks
1) Crear canvas
2) Dibujar pez
3) Hacer que el pez se mueva a la derecha y a la izquierda
4) Hacer que aparezcan de forma aleatória los objetos de plástico y las estrellas
5) El pez muere si choca con un objeto de plástico
6) Se suman puntos si el pez choca con una estrella

## Trello
[link](https://trello.com/b/shcaDrEd/ironhack-project-my-game)

## Git

## Instrucciones del juego
