//Wall
function Wall(){}

//BouncingCritter (basic world)
function BouncingCritter(){
      this.direction = randomElement(directionNames);
}
BouncingCritter.prototype.act = function(view){
      if(view.look(this.direction) != " ")
            this.direction = view.find(" ") || "s";
      return {type: "move", direction: this.direction}
}

//WallFollower (basic world)
function WallFollower(){
      this.dir = "s";
}

WallFollower.prototype.act = function(view){
      var start = this.dir;
      if(view.look(dirPlus(this.dir, -3)) != " ")
            start = this.dir = dirPlus(this.dir, -2);
      while(view.look(this.dir) != " "){
            this.dir = dirPlus(this.dir, 1);
            if (this.dir == start) break;
      }

      return {type:"move", direction: this.dir};
}

function dirPlus(dir, n){
      var index = directionNames.indexOf(dir);
      return directionNames[(index + n + 8) % 8];
}


/********************************************/

//Lifelike World

//Plant
function Plant(){
  this.energy = 3 + Math.random() * 4;
}
Plant.prototype.act = function(context){
  if(this.energy > 20){
    var space = context.find(" ");
    if(space)
      return {type: "reproduce", direction: space};
  }
  if(this.energy < 20){
    return {type: "grow"};
  }
};

//PlantEater
function PlantEater(){
  this.energy = 20;
}
PlantEater.prototype.act = function(context){
  var space = context.find(" ");
  if(this.energy > 60 && space)
    return {type: "reproduce", direction: space};

  var plant = context.find("*");

  if(plant)
    return {type:"eat", direction: plant};

  if(space)
    return {type: "move", direction: space}
};

//SmartPlantEater
function SmartPlantEater(){
  this.energy = 30;
  this.direction = "s";
}
SmartPlantEater.prototype.act = function(context){
  var space = context.find(" ");

  if(this.energy > 100 && space)
    return {type: "reproduce", direction: space};

  var plants = context.findAll("*");
  if(plants.length > 1)
    return {type: "eat", direction: randomElement(plants)}

  if (context.look(this.direction) != " ")
    this.direction = context.find(" ") || "s";

  return {type: "move", direction: this.direction} 
}

//Tiger
function Tiger(){
  this.energy = 40;
  this.direction = "s";
  this.totalFood = [];
}
Tiger.prototype.act = function(context){
  var space = context.find(" ");

  var food = context.findAll("o");
  this.totalFood.push(food.length);

  var foodInTurns = this.totalFood.reduce(function(a, b){
    return a + b;
  }) / this.totalFood.length;

  if(this.totalFood.length > 6)
    this.totalFood.shift();

  if(this.energy > 200 && space){
    return {type:"reproduce", direction: space}
  }

  if(food.length && foodInTurns > 0.25){
    return {type: "eat", direction: randomElement(food)}
  }

  if(context.look(this.direction) != " ")
    this.direction = space || "s";

  return {type: "move", direction: this.direction};
}

//Action handler
var actionTypes = Object.create(null);

actionTypes.grow = function(critter){
  critter.energy += 0.5;
  return true;
};

actionTypes.move = function(critter, vector, action){
  var dest = this.checkDestination(action, vector);
  if(dest == null ||
    critter.energy <= 1 ||
    this.grid.get(dest) != null)
    return false;

  critter.energy -= 1;
  this.grid.set(vector, null);
  this.grid.set(dest, critter);
  return true;
};

actionTypes.eat = function(critter, vector, action) {
  var dest = this.checkDestination(action, vector);
  var atDest = dest != null && this.grid.get(dest);
  if (!atDest || atDest.energy == null)
    return false;
  critter.energy += atDest.energy;
  this.grid.set(dest, null);
  return true;
};

actionTypes.reproduce = function(critter, vector, action){
  var baby = elementFromChar(this.legend, critter.originChar);
  var dest = this.checkDestination(action, vector);

  if(dest == null ||
    critter.energy <= 2 * baby.energy ||
    this.grid.set(dest) != null)
    return false;

  critter.energy -= 2 * baby.energy;
  this.grid.set(dest, baby);
  return true;
};