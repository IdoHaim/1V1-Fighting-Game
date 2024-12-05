//import { playerTypes } from "./player.js";      for next version
import { inputStates, InputController } from "./input.js";

export class MainMenu {
    constructor(game) {
      this.game = game;
      this.selectedOption = null;
      this.backgroundImage = document.getElementById('mainMenuImg');
      
      this.startButton = document.createElement("button");
      this.startButton.id = "Button1";
      this.startButton.innerHTML = "Start";

      this.startButton.addEventListener("mouseover", () => {
        this.startButton.style.backgroundColor = "darkgreen";
      });
      this.startButton.addEventListener("mouseout", () => {
        this.startButton.style.backgroundColor = "green";
      });
  

      document.body.appendChild(this.startButton);
  
    // Option 1
    this.option1Button = document.createElement("button");
    this.option1Button.id = "option1Button";
    this.option1Button.classList.add("menu-button");
    this.option1Button.innerHTML = "1 V 1";
    document.body.appendChild(this.option1Button);

    // Option 2
    this.option2Button = document.createElement("button");
    this.option2Button.id = "option2Button";
    this.option2Button.classList.add("menu-button");
    this.option2Button.innerHTML = "AI";
    document.body.appendChild(this.option2Button);

    // Events
    this.startButton.addEventListener("click", () => {
        if(this.selectedOption != null){
            this.game.startGame();
            this.game.inputPlayer_2 = new InputController(this.game, this.selectedOption);
            this.hide(); 
        }
      });

    this.option1Button.addEventListener("click", () => {
      this.selectButton(this.option1Button, this.option2Button);
      this.selectedOption = inputStates.PLAYER_2;
    });

    this.option2Button.addEventListener("click", () => {
      this.selectButton(this.option2Button, this.option1Button);
      //this.selectedOption = inputStates.AI;       switch when ai the version is ready
      this.selectedOption = inputStates.PLAYER_2;
    });


    }

    selectButton(selectedButton, otherButton) {
        selectedButton.classList.add("selected");
        otherButton.classList.remove("selected");
    }
  
    hide() {
      this.startButton.style.display = "none";
      this.option1Button.style.display = "none";
      this.option2Button.style.display = "none";
    }
  
    show() {
      this.startButton.style.display = "block";
      this.option1Button.style.display = "block";
      this.option2Button.style.display = "block";
    }
  
    draw(context) {
     // Main Menu Background 
     context.drawImage(this.backgroundImage, 0, 0, this.game.width, this.game.height);
   
     // Game Headline
     context.font = '80px Roboto';
     context.fillStyle = 'white';
     context.textAlign = 'center';     
     context.shadowOffsetX = 2;
     context.shadowOffsetY = 2;
     context.shadowColor = 'black';
     context.fillText('Fighting Game', this.game.width / 2, this.game.height / 4);
    }
  }
  
  export class PauseMenu {
    constructor(game) {
      this.game = game;
  
      // Resume
      this.resumeButton = document.createElement("button");
      this.resumeButton.id = "resumeButton";
      this.resumeButton.innerHTML = "Resume";
      document.body.appendChild(this.resumeButton);
  
      // Main Menu
      this.mainMenuButton = document.createElement("button");
      this.mainMenuButton.id = "mainMenuButton";
      this.mainMenuButton.innerHTML = "Main Menu";
      document.body.appendChild(this.mainMenuButton);
  
      // events
      this.resumeButton.addEventListener("click", () => {
        this.game.resumeGame();
        this.hide();
      });
  
      this.mainMenuButton.addEventListener("click", () => {
        this.game.goToMainMenu();
        this.hide();
      });
  
      this.hide(); 
    }
  
    hide() {
      this.resumeButton.style.display = "none";
      this.mainMenuButton.style.display = "none";
    }
  
    show() {
      this.resumeButton.style.display = "block";
      this.mainMenuButton.style.display = "block";
      
      // location update
      this.resumeButton.style.position = "absolute";
      this.resumeButton.style.top = `${this.game.height / 2 - 30}px`;
      this.resumeButton.style.left = "50%";
      this.resumeButton.style.transform = "translateX(-50%)";
  
      this.mainMenuButton.style.position = "absolute";
      this.mainMenuButton.style.top = `${this.game.height / 2 + 50}px`;
      this.mainMenuButton.style.left = "50%";
      this.mainMenuButton.style.transform = "translateX(-50%)";
    }
  
    draw(context) {
      // seethrough background
      this.game.background.draw(context);
      this.game.ui.draw(context);
      this.game.player1.draw(context);
      this.game.player2.draw(context);
      context.fillStyle = "rgba(0, 0, 0, 0.5)";
      context.fillRect(0, 0, this.game.width, this.game.height);
  
      // headline
      context.font = "48px Arial";
      context.fillStyle = "white";
      context.textAlign = "center";
      context.fillText("Pause", this.game.width / 2, this.game.height / 4);
  
      this.show();
    }
  }
  




/*export class PauseMenu {
    constructor(game) {
      this.game = game;
      this.resumeButton = { x: game.width / 2 - 100, y: game.height / 2 - 30, width: 200, height: 60 };
      this.mainMenuButton = { x: game.width / 2 - 100, y: game.height / 2 + 40, width: 200, height: 60 };
    }
  
    draw(context) {
      // backgrounf
      this.game.background.draw(context);
      this.game.ui.draw(context);
      this.game.player1.draw(context);
      this.game.player2.draw(context);
      
      // visible
      context.fillStyle = 'rgba(0, 0, 0, 0.5)'; 
      context.fillRect(0, 0, this.game.width, this.game.height);
  
      // headline "Pause"
      context.font = '48px Arial';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText('Pause', this.game.width / 2, this.game.height / 4);
  
      // Resume customization
      context.fillStyle = '#6200EE';  
      context.shadowColor = 'rgba(0, 0, 0, 0.3)';
      context.shadowBlur = 10;
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.beginPath();
      context.moveTo(this.resumeButton.x + 15, this.resumeButton.y);  
      context.lineTo(this.resumeButton.x + this.resumeButton.width - 15, this.resumeButton.y);
      context.lineTo(this.resumeButton.x + this.resumeButton.width, this.resumeButton.y + this.resumeButton.height - 15);
      context.lineTo(this.resumeButton.x + 15, this.resumeButton.y + this.resumeButton.height);
      context.closePath();
      context.fill();
      context.shadowColor = 'transparent';  
  
      // Resume text
      context.fillStyle = 'white';
      context.font = '24px Arial';
      context.fillText('Resume', this.game.width / 2, this.game.height / 2 + 10);
  
      // Main Menu customization
      context.fillStyle = '#FF4081'; 
      context.shadowColor = 'rgba(0, 0, 0, 0.3)';
      context.shadowBlur = 10;
      context.shadowOffsetX = 4;
      context.shadowOffsetY = 4;
      context.beginPath();
      context.moveTo(this.mainMenuButton.x + 15, this.mainMenuButton.y);  
      context.lineTo(this.mainMenuButton.x + this.mainMenuButton.width - 15, this.mainMenuButton.y);
      context.lineTo(this.mainMenuButton.x + this.mainMenuButton.width, this.mainMenuButton.y + this.mainMenuButton.height - 15);
      context.lineTo(this.mainMenuButton.x + 15, this.mainMenuButton.y + this.mainMenuButton.height);
      context.closePath();
      context.fill();
      context.shadowColor = 'transparent';  
  
      // Main Menu text
      context.fillStyle = 'white';
      context.fillText('Main Menu', this.game.width / 2, this.game.height / 2 + 80);
    }
  
    handleInput() {
      // Resume
      if (this.game.input.mouseX >= this.resumeButton.x && 
        this.game.input.mouseX <= this.resumeButton.x + this.resumeButton.width &&
          this.game.input.mouseY >= this.resumeButton.y - this.game.groundMargin/2 && 
          this.game.input.mouseY <= this.resumeButton.y + this.resumeButton.height - this.game.groundMargin/2) {
        if (this.game.input.isMousePressed) {
          this.game.resumeGame();
        }
      }
  
      // Main Menu
      if (this.game.input.mouseX >= this.mainMenuButton.x && 
          this.game.input.mouseX <= this.mainMenuButton.x + this.mainMenuButton.width &&
          this.game.input.mouseY >= this.mainMenuButton.y - this.game.groundMargin/2 && 
          this.game.input.mouseY <= this.mainMenuButton.y + this.mainMenuButton.height - this.game.groundMargin/2) {
        if (this.game.input.isMousePressed) {
          this.game.goToMainMenu();
        }
      }
    }
}*/
  