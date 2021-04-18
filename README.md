# <div align="center"> Get The Picture! </div>
![pantalla_inicial](https://user-images.githubusercontent.com/77930436/114247128-4b232e00-998c-11eb-8621-aea9b0192902.jpg)

Play the game: https://xhaxa.github.io/MARIO/

Inspired by the all time classic Mario Bros., **Get The Picture!** is a one-player game in which internationally renowned artists need to navigate the museum to  collect fragments of their masterpieces while avoiding the immovable heaps of tourists, the cracks on the floor of the old building and being chased by the thieves that roam the galleries in search of valuable paintings.

The fragments that need collecting are in shiny display cases that only the artists can unlock by knocking from below. An empty easel awaits at the end of the level, where the artist can put all the collected fragments together, and move on to the next level.

**TECHNOLOGY EMPLOYED**

Get The Picture! has been created using JavaScript, HTML and CSS.

**KEY CODE**

- GAME OBJECT - Contains all the information relating to the visual elements i.e positions in X and Y, width, speed, etc.
- restartGame FUNCTION - Resets all the values to the initial values assigned for when the player loses and needs to restart.
-  fallDown FUNCTION - simulates the physics of gravity by operating several variables that allow the character to jump and fall back again until collision is detected with the floor.
-  updateObstacles FUNCTION - once the player/character reaches the center of the screen, all the visual elements with which there is and there is not collision move to the left to simulate that the player/character is moving forward
-  HTML elements - the floating/pop-up screens are created with HTML/CSS and become visible/invisible per JavaScript commands that add classes and id.

**COLLISION**

The one central piece of code of this videogame is the one that focuses on collisions as it's integral to the playability of the game. The player/character constantly collides with the floor, and can collide right, left and upwards. Some of the elements require collision whereas others don't. 

**FURTHER UPDATES**

At the moment, **Get The Picture!** has one level. Additional levels will be developed in the future with further obstacles and increased difficulty as well as other artists. The idea is also to create a **Get The Picture!** for other areas of knowledge such as natural sciences, literature, music, etc.

Game developed by https://github.com/xhaxa and https://github.com/jorlorsan | With the help of the teaching body @ https://reboot.academy/
