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
    numberOfFlies: 4,
    minSpeed: 8,
    maxSpeed: 10
  };

  level2 = {
    number: 2,
    countdown: 40,
    imageIndex: 0,
    numberOfFlies: 6,
    minSpeed: 4,
    maxSpeed: 8
  };

  level3 = {
    number: 3,
    countdown: 20,
    imageIndex: 0,
    numberOfFlies: 10,
    minSpeed: 1,
    maxSpeed: 4
  };

  //LEVELS ARRAY
  levels = [this.level1, this.level2, this.level3];

  //STATE
  state = {
    level: this.levels[0],
    score: 0,
    lastScore: 0,
    smackedFlies: new Set(),
    renderNewLevel: true
  };

  setRenderNewLevel = status => {
    this.setState({
      renderNewLevel: status
    });
  };

  //START LEVEL FUNCTION
  startLevel = () => {
    document.querySelector("#start-screen").classList.add("hidden");
    document.querySelector("#youLost-screen").classList.add("hidden");
    document.querySelector("#login-screen").classList.add("hidden");
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
        if (this.state.level.numberOfFlies === this.state.smackedFlies.size) {
          if (this.state.level.number === 1) {
            document.querySelector("#signup-screen").classList.remove("hidden");
          } else {
            document.querySelector("#youWon-screen").classList.remove("hidden");
          }
          //STOPS TIME
          clearInterval(this.myInterval);
          //IF THE CURRENT TIME IS 0 THEN IT FAILED
        } else if (this.state.level.countdown === 0) {
          clearInterval(this.myInterval);
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
    this.setState(
      {
        level: this.levels[this.state.level.number],
        smackedFlies: new Set(),
        lastScore: this.state.score
      },
      () => {
        this.startLevel();
        this.setRenderNewLevel(true);
        document.querySelector("#signup-screen").classList.add("hidden");
        document.querySelector("#youWon-screen").classList.add("hidden");
        document.querySelector("#login-screen").classList.add("hidden");
      }
    );
  };

  //TRY AGAIN FUNCTION
  tryAgain = () => {
    this.setState(
      {
        level: this.levels[this.state.level.number - 1],
        score: this.state.lastScore,
        smackedFlies: new Set()
      },
      () => {
        this.startLevel();
        this.setRenderNewLevel(true);
      }
    );
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

  render() {
    return (
      <div className="App">
        <h1 className="inline">Level: {this.state.level.number}</h1>
        <h3 className="inline">Score: {this.state.score}</h3>
        <h3 className="inline">
          Time left: {this.state.level.countdown} seconds
        </h3>
        <Level
          setRenderNewLevel={this.setRenderNewLevel}
          renderNewLevel={this.state.renderNewLevel}
          level={this.state.level}
          cakeImage={this.cakeImages[this.state.level.imageIndex]}
          score={this.state.score}
          increaseScore={this.increaseScore}
        />
        <YouLostButton youLostClicked={this.tryAgain} />
        <StartButton startClicked={this.startLevel} />
        {this.state.level.number === this.levels.length ? null : (
          <>
            <NextLevelButton nextLevelClicked={this.nextLevel} />
            {this.state.level.number === 1 && this.state.score === 0 ? (
              <NextLevelAfterLogin nextLevelClicked={this.startLevel} />
            ) : (
              <NextLevelAfterLogin nextLevelClicked={this.nextLevel} />
            )}

            <YouWonButton youWonClicked={this.nextLevel} />
          </>
        )}
      </div>
    );
  }
}
//Create portals to inserts buttons into different locations in the DOM
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
function NextLevelAfterLogin(props) {
  return ReactDOM.createPortal(
    <button onClick={props.nextLevelClicked}>Next Level</button>,
    document.querySelector("#login-screen .react-button-holder")
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
    <button className="mutedBtn" onClick={props.youLostClicked}>
      Replay
    </button>,
    document.querySelector("#youLost-screen .youLostBtn")
  );
}
export default App;
