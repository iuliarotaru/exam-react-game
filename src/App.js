import React, { Component } from "react";
import "./App.css";
import Level from "./Level/Level";
class App extends Component {
  //CAKE IMAGES ARRAY
  cakeImages = [
    "images/cakes/cake1.png",
    "images/cakes/cake2.png",
    "images/cakes/cake3.png",
    "images/cakes/cake4.png",
    "images/cakes/cake5.png",
    "images/cakes/cake6.png"
  ];

  //LEVELS CONFIGURATION
  level1 = {
    number: 1,
    countdown: 60,
    imageIndex: 0,
    numberOfFlies: 4,
    minSpeed: 1,
    maxSpeed: 6
  };

  level2 = {
    number: 2,
    countdown: 40,
    imageIndex: 0,
    numberOfFlies: 5,
    minSpeed: 5,
    maxSpeed: 10
  };

  level3 = {
    number: 3,
    countdown: 20,
    imageIndex: 0,
    numberOfFlies: 10,
    minSpeed: 10,
    maxSpeed: 15
  };

  //LEVELS ARRAY
  levels = [this.level1, this.level2, this.level3];

  //-----------------------------------
  //STATES
  state = {
    level: this.levels[0],
    score: 0,
    smackedFlies: new Set(),
    renderNewLevel: true,
    levelWon: false
  };

  setRenderNewLevel = status => {
    this.setState({
      renderNewLevel: status
    });
  };

  //START LEVEL FUNCTION
  startLevel = () => {
    //CLEAR ANY INTERVAL THAT WAS STARTED BEFORE
    clearInterval(this.myInterval);
    if (this.state.level.countdown > 0) {
      this.myInterval = setInterval(() => {
        //UPDATE CURRENT TIME EVERY SECOND
        this.setState({
          level: {
            ...this.state.level,
            countdown: this.state.level.countdown - 1
          }
        });
        //IF THE CURRENT TIME IS 0 THAN IT FAILED
        if (this.state.level.countdown === 0) {
          clearInterval(this.myInterval);
          console.log(`You failed level ${this.state.level.number}`);
        }
        //IF THE CURRENT TIME % INITIAL TIME / 5 === 0 UPDATE IMAGE
        if (
          this.state.level.countdown %
            (this.levels[this.state.level.number - 1].countdown / 5) ===
          0
        )
          this.setState({
            level: {
              ...this.state.level,
              imageIndex: this.state.level.imageIndex + 1
            }
          });
      }, 1000);
    }
  };

  //NEXT LEVEL FUNCTION
  nextLevel = () => {
    this.setState({
      level: this.levels[this.state.level.number],
      smackedFlies: new Set()
    });
    this.startLevel();
    this.setRenderNewLevel(true);
  };

  //NEW GAME FUNCTION
  newGame = () => {
    this.setState({
      level: this.levels[0],
      score: 0,
      smackedFlies: new Set()
    });
    this.startLevel();
  };

  //TRY AGAIN FUNCTION
  tryAgain = () => {
    this.setState({
      level: this.levels[this.state.level.number - 1],
      score: 0,
      smackedFlies: new Set()
    });
    this.startLevel();
  };

  //INCREASE SCORE FUNCTION
  increaseScore = clickedFlyId => {
    if (!this.state.smackedFlies.has(clickedFlyId)) {
      //IF IT IS GOLD FLY
      if (clickedFlyId === "fly1") {
        this.setState({
          score: this.state.score + (5 - this.state.level.imageIndex) * 20
        });
      } else {
        this.setState({
          score: this.state.score + (5 - this.state.level.imageIndex) * 10
        });
      }

      //ADD FLY'S ID TO CLICKEDFLY SET
      this.state.smackedFlies.add(clickedFlyId);
    }
  };

  componentWillUnmount() {
    //Clear the interval
    clearInterval(this.myInterval);
  }

  componentDidUpdate() {
    //CHECKS IF NUMBER OF FLIES FROM THE LEVEL EQUALS THE NUMBER OF SMACKED FLIES FROM ARRAY TO SEE IF USER HAS SMACKED ALL OF THEM
    if (this.state.level.numberOfFlies === this.state.smackedFlies.size) {
      console.log(`You won level ${this.state.level.number}!!`);
      //STOPS TIME
      clearInterval(this.myInterval);
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Level: {this.state.level.number}</h1>
        <h3>Score: {this.state.score}</h3>
        <h3>Time left: {this.state.level.countdown} seconds</h3>
        <Level
          setRenderNewLevel={this.setRenderNewLevel}
          renderNewLevel={this.state.renderNewLevel}
          level={this.state.level}
          cakeImage={this.cakeImages[this.state.level.imageIndex]}
          score={this.state.score}
          increaseScore={this.increaseScore}
        />
        <button onClick={this.startLevel}>Start Game</button>
        <button onClick={this.newGame}>New Game</button>
        <button onClick={this.tryAgain}>Try Again</button>
        {this.state.level.number === this.levels.length ? null : (
          <button onClick={this.nextLevel}>Next Level</button>
        )}
      </div>
    );
  }
}

export default App;
