/* Refresh map - controls */

var mapRefreshState = false;

function refreshMap(){
      world.turn();
      document.getElementById("world").innerHTML = world
        .toString()
        .replace( new RegExp(" ", "g"), "🌫")
        .replace( new RegExp("#", "g"), "⬛️")
        .replace( new RegExp("\\*", "g"), "🌿")
        .replace( new RegExp("o", "g"), "🐰")
        .replace( new RegExp("Ö", "g"), "🐍");
}

function setMapInterval(){
      if(!mapRefreshState)
            int = setInterval(refreshMap,200);
            mapRefreshState = true;
}

setMapInterval();

/*Start world*/

var world = new LifelikeWorld(
  ["#####################################################################",
   "#                 ####         ****                          *  *  ##",
   "#   *  Ö  ##                 ########       oo                     ##",
   "#   *    ##        o o                 ****                ###     *#",
   "#       ##*                        ##########         Ö      ##*   *#",
   "#      ##***  *         ****                                 ##*  **#",
   "#* **  #  *  ***      #########       Ö                       ### **#",
   "#* **  #      *               #   *         ##         Ö          **#",
   "#     ##              #   o   #  ***         ###              #    ##",
   "#*            Ö       #       #   *        o  ##             ###    #",
   "#*                    #  ######                             ###     #",
   "###          ****          ***                                      #",
   "#       o                                  o       # ###      **    #",
   "#   *     ##  ##  ##  ##               ###         #########  ***   #",
   "#   **         #              *       #####  o     *****####        #",
   "##  **  o   o  #  #    ***  ***   Ö    ###              ****       o#",
   "###               #   *****                                         #",
   "#####################################################################"],
  {"#": Wall,
   "o": SmartPlantEater,
   "Ö": Tiger,
   "*": Plant}
);
