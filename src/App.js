import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    numberOfFlies: 1,
    minSpeed: 1,
    maxSpeed: 6
  };

  level2 = {
    number: 2,
    countdown: 40,
    imageIndex: 0,
    numberOfFlies: 1,
    minSpeed: 5,
    maxSpeed: 10
  };

  level3 = {
    number: 3,
    countdown: 5,
    imageIndex: 0,
    numberOfFlies: 1,
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
    //hide modal
    document.querySelector("#start-screen").classList.add("hidden");
    document.querySelector("#youLost-screen").classList.add("hidden");
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
          document.querySelector("#youLost-screen").classList.remove("hidden");
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
    document.querySelector("#signup-screen").classList.add("hidden");
    document.querySelector("#youWon-screen").classList.add("hidden");
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
      if (this.state.level.number === 1) {
        document.querySelector("#signup-screen").classList.remove("hidden");
      } else {
        document.querySelector("#youWon-screen").classList.remove("hidden");
      }
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
        <StartButton startClicked={this.startLevel} />

        {this.state.level.number === this.levels.length ? null : (
          <>
            <NextLevelButton nextLevelClicked={this.nextLevel} />
            <YouWonButton youWonClicked={this.nextLevel} />
          </>
        )}
        <YouLostButton youLostClicked={this.tryAgain} />
      </div>
    );
  }
}
//Overlay buttons trigger React functions
function StartButton(props) {
  return ReactDOM.createPortal(
    <button onClick={props.startClicked}>Start Game</button>,
    document.querySelector("#start-screen .startBtn")
  );
}
function NextLevelButton(props) {
  return ReactDOM.createPortal(
    <button onClick={props.nextLevelClicked}>Next Level</button>,
    document.querySelector("#signup-screen .react-button-holder")
  );
}

function YouWonButton(props) {
  return ReactDOM.createPortal(
    <button onClick={props.youWonClicked}>Play next level</button>,
    document.querySelector("#youWon-screen .youWonBtn")
  );
}

function YouLostButton(props) {
  return ReactDOM.createPortal(
    <button onClick={props.youLostClicked}>Replay</button>,
    document.querySelector("#youLost-screen .youLostBtn")
  );
}
export default App;
