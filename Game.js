class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
  }
  // creating 4 cars and putting it in a array..
car1 = createSprite(100,200);
car2 = createSprite(300,200);
car3 = createSprite(500,200);
car4 = createSprite(700,200);
cars = [car1,car2,car3,car4];
  play(){
    form.hide();
    //textSize(30);
    //text("Game Start", 120, 100)
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
      //index of the array
     var index = 0;
     //x and y position of the cars
     var x = 0;
     var y;
      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1;
        //placing them equal apart from each other(cars)
        x = x+200;
         //use data form the database to display the cars in y direction
        console.log("Index " + index)
        y= displayHeight - allPlayers[plr].distance;
        if(index<= 4){
        cars[index-1].x = x 
        cars[index-1].y = y
        }
        if(index === player.index){
        cars[index-1].shapeColor="red";
       
        }
        /*if (plr === "player" + player.index)
          fill("red")
        else
          fill("black");

        display_position+=20;
        textSize(15);
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
        */
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    drawSprites();
  }
}
