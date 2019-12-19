import React, { useEffect } from "react";
import GSAP, { MotionPathPlugin } from "gsap/all";
const Level = props => {
  //FLIES IMAGES FROM DOM
  let DOMFlies = [];
  //FLYING PATHS
  let movementPath = [];
  GSAP.registerPlugin(MotionPathPlugin);
  //GET RANDOM INTEGER IN RANGE
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };
  //GET RANDOM PATH FROM PATHS ARRAY
  const getRandomPath = () => {
    return movementPath[Math.floor(Math.random() * movementPath.length)];
  };

  useEffect(() => {
    //ITERATE OVER ALL DOM FLIES AND ADD ANIMATION
    if (props.renderNewLevel === true) {
      DOMFlies.forEach(fly => {
        GSAP.to(fly, {
          duration: getRandomIntInclusive(
            props.level.minSpeed,
            props.level.maxSpeed
          ),
          repeat: -1,
          repeatDelay: 0,
          yoyo: true,
          ease: "power1.inOut",
          motionPath: {
            path: getRandomPath()
          }
        });
        if (fly.id === "fly1")
          fly.src = require(`../images/flies/gold_fly.png`);
        else fly.src = require(`../images/flies/fly.png`);
      });
      props.setRenderNewLevel(false);
    }

    //ITERATE OVER ALL DOM FLIES AND ADD CLICK LISTENER
    DOMFlies.forEach((fly, index) => {
      fly.addEventListener("click", () => {
        //KILL THE ANIMATION
        GSAP.killTweensOf(fly);
        //CHANGE THE IMAGE SOURCE
        if (fly.id === "fly1")
          fly.src = require(`../images/flies/gold_dead_fly.png`);
        else fly.src = require(`../images/flies/dead_fly.png`);
        //INCREASE SCORE
        props.increaseScore(`${fly.id}`);
      });
    });
  });
  //CREATE DOM FLIES
  let flies = [];
  flies.push(
    <img
      id={`fly1`}
      className="fly"
      src={require(`../images/flies/gold_fly.png`)}
      ref={element => DOMFlies.push(element)}
      key={`fly1`}
      alt={`fly1`}
    />
  );
  for (let i = 1; i < props.level.numberOfFlies; i++) {
    flies.push(
      <img
        id={`fly${i + 1}`}
        className="fly"
        src={require(`../images/flies/fly.png`)}
        ref={element => DOMFlies.push(element)}
        key={`fly${i + 1}`}
        alt={`fly${i + 1}`}
      />
    );
  }
  return (
    <div>
      <div>{flies}</div>
      <svg>
        <path
          id="path1"
          className="movementPath"
          ref={element => movementPath.push(element)}
          d="M363.49,72.36c-5.86.21-12.12-1-16.87-2.07-13.29-2.87-26.36-7-39.88-8.69-17.43-2.16-36.86.4-49.18,12.92-10.4,10.59-14,26.49-24.57,36.94-9.34,9.25-23.35,13-36.4,11.31s-25.13-8.3-34.87-17.14c-9.49-8.6-16.95-19.23-26.28-28S114,61.76,101.2,62.84C78,64.8,62.52,92.09,39.27,92.52,24.84,92.79,11.6,81.17,8.35,67.11c-9.71-42,46.16-61.37,78.15-62,20.87-.44,43.6,6.41,54.9,24,4.84,7.51,7.52,17.06,15.76,21.74,5.53,3.14,12.29,3.24,18.57,2.24,37.59-6,69.94-26.1,105.69-37.77,19.34-6.31,40.41-9.75,60-4.16,18.24,5.22,50,31.14,37.24,53.67C375.51,70.27,369.72,72.14,363.49,72.36Z"
          fill="transparent"
        />
        <path
          id="path2"
          className="movementPath"
          ref={element => movementPath.push(element)}
          d="M350.52,95.68a123.43,123.43,0,0,0,4.53-21c2.39-17.21,6.88-46.68-6.75-60.22C314.48-19.18,294,40.32,274.08,57c-8,6.68-19.37,10.49-28.58,4.06-14.09-9.82-12.64-31-25.39-42.3-8-7-20-7.45-26.7,1.48-8,10.73-5.38,25.3-14.94,36.11-12.46,14.1-31.19,15-47.69,8-17-7.25-26.76-22.18-39.43-34.73C78.89,17.26,63.16,12,47.13,21.51,28.78,32.44,15.28,59.22,10.56,79.36,6.07,98.54,11.68,124,31.49,132.53,49.57,140.28,55.1,119,53.68,105.22c-.72-6.93-2.11-14-.73-20.78,2-9.86,11.4-17,21.5-13.87,18.49,5.75,7.4,28.15,13.07,41.58,7.52,17.86,29.78,16.65,45.53,21,23.36,6.48,44.83,13,69.53,8.41,12.08-2.25,23.79-7.31,33-15.54,7.77-7,12.65-18.26,22.57-22.53,9.44-4.07,20.31.17,29.2,5.33,12.62,7.31,30.72,17.36,45.46,10.58C341.86,115.25,347.22,105.81,350.52,95.68Z"
          fill="transparent"
        />
        <path
          id="path3"
          className="movementPath"
          ref={element => movementPath.push(element)}
          d="M345.15,86.41l.43-.23C357,80,366.71,69.52,369.18,56.77s-3.76-27.43-15.8-32.31c-6.29-2.54-13.32-2.32-20.08-1.75-30.59,2.57-79.48,20.07-106.24-1.36-13-10.4-25.57-21.11-43-11.81-13,6.93-20,20.74-35.9,23.3-24.63,4-47.56-19.81-71.52-4.59C62.3,37.36,59.32,54.11,49,66.42c-8,9.54-19.65,15-31,20.21-31.73,14.5,1.89,34.05,20.33,39.62,14.94,4.51,31.5,3.68,44.28-6C102.85,105,120,69,149.15,93.69c8.68,7.35,15.17,8.61,25.37,4,10-4.57,19.19-5.38,30-4.51,34.5,2.77,69.19,6.22,103.63,2.81C320.88,94.68,333.81,92.39,345.15,86.41Z"
          fill="transparent"
        />
        <path
          id="path4"
          className="movementPath"
          ref={element => movementPath.push(element)}
          d="M239.06,51.18A55.9,55.9,0,0,1,220.79,46c-16.71-8.31-20.53-27.36-34.94-37.92-4.08-3-8.65-3.84-12.93-.55a19.79,19.79,0,0,0-5.24,6.86C161.86,25.74,161.2,39,157.47,51.22c-6.63,21.72-48,18.07-63.42,7.46-11.54-8-16-22.51-26-31.93-2.3-2.15-5.17-4.1-8.31-3.89-4.89.32-7.79,5.41-10,9.76a149.29,149.29,0,0,1-22,31.7C16.05,77.17-5,85.74,13.18,103.48l19.21,18.76c4.34,4.24,8.81,8.57,14.34,11.08,11.35,5.16,21-1.45,28.73-9.42,3.61-3.68,14.44-18.17,20.14-11,1.73,2.19,2.07,5.13,2.84,7.82,2.83,9.77,11.37,15.07,20.78,17.26,46.24,10.77,92.88-13.61,140.18-17.84,8.3-.74,17.22-1,24.67-5.18s10.79-11.87,16.8-17.5c5-4.68,11.65-7.29,18.4-8.39,15.8-2.59,31.79,2.5,47.56-.44S395.5,75,406.28,63.55c7.31-7.78,24.7-25.8,5.1-30.4-15.22-3.57-35.48-.06-50.74,1.93-31.37,4.08-62,12.84-93.53,15.76C258,51.69,248.36,52.3,239.06,51.18Z"
          fill="transparent"
        />
      </svg>
      <div
        className="imageDiv"
        style={{
          width: "300px",
          height: "400px",
          position: "relative",
          margin: "auto"
        }}
      >
        <img
          src={require(`../${props.cakeImage}`)}
          style={{
            maxWidth: "100%",
            maxHeight: "100%",
            display: "block",
            left: "0",
            bottom: "0",
            position: "absolute"
          }}
          alt="cake"
        />
      </div>
    </div>
  );
};

export default Level;
