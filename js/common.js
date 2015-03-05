/* Refresh map - controls */

var mapRefreshState = false;

function refreshMap(){
      world.turn();
      document.getElementById("world").innerHTML = world.toString();
}

function setMapInterval(){
      if(!mapRefreshState)
            int = setInterval(refreshMap,200);
            mapRefreshState = true;
}

setMapInterval();

/*Start world*/

var world = new LifelikeWorld(
  ["########################################################################################################",
   "#                 ####         ****                          *  *  **                ***      o      ###",                                                  
   "#   *  Ö  ##                 ########       oo                                       ****             ##",
   "#   *    ##        o o                 ****                ###               ###     * *   ###        *#",
   "#       ##*                        ##########         Ö      ##*       ##     ###          ### o      *#",
   "#      ##***  *         ****                                 ##*       ***          Ö     ##         **#",
   "#* **  #  *  ***      #########                               ###                        ##          **#",
   "#* **  #      *               #   *         ##         Ö                     o                       **#",
   "#     ##              #   o   #  ***         ###              #                                   ######",
   "#*            Ö       #       #   *        o  ##             ###      o    ####                   #    #",
   "#*                    #  ######                             ###              ***#####     o         ** #",
   "###          ****          ***                                                                      ** #",
   "#       o                                  o       # ###      **                                       #",
   "#   *     ##  ##  ##  ##               ###         #########  ***        ####        ##             *  #",
   "#   **         #              *       #####  o     *****####             ####****   ###   o            #",
   "##  **  o   o  #  #    ***  ***        ###              ****       o       ######                   ** #",
   "###               #   *****                                                                        ****#",
   "########################################################################################################"],
  {"#": Wall,
   "o": SmartPlantEater,
   "Ö": Tiger,
   "*": Plant}
);