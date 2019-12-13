import React, { useEffect } from 'react';
import GSAP, { MotionPathPlugin } from 'gsap/all';
const Level = props => {
  //FLIES IMAGES FROM DOM
  let DOMFlies = [];
  //FLYING PATHS
  let movementPath = [];
  //REGISTER MotionPathPlugin
  GSAP.registerPlugin(MotionPathPlugin);
  //GET RANDOM INTEGER IN RANGE
  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
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
          ease: 'power1.inOut',
          motionPath: {
            path: getRandomPath()
          }
        });
        if (fly.id === 'fly1')
          fly.src = require(`../images/flies/gold_fly.png`);
        else fly.src = require(`../images/flies/fly.png`);
      });
      props.setRenderNewLevel(false);
    }

    //ITERATE OVER ALL DOM FLIES AND ADD CLICK LISTENER
    DOMFlies.forEach((fly, index) => {
      fly.addEventListener('click', () => {
        //KILL THE ANIMATION
        GSAP.killTweensOf(fly);
        //CHANGE THE IMAGE SOURCE
        if (fly.id === 'fly1')
          fly.src = require(`../images/flies/gold_dead_fly.png`);
        else fly.src = require(`../images/flies/dead_fly.png`);
        //INCREASE SCORE
        props.increaseScore(`${fly.id}`);
      });
    });
  });

  //CREATE DOM FLIES
  //TODO IF LEVEL NUMBER CHANGES DELETE EVERY FLY AND DO THIS
  let flies = [];
  flies.push(
    <img
      id={`fly1`}
      className='fly'
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
        className='fly'
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
          id='path'
          className='movementPath'
          ref={element => movementPath.push(element)}
          d='M9,100c0,0,18.53-41.58,49.91-65.11c30-22.5,65.81-24.88,77.39-24.88c33.87,0,57.55,11.71,77.05,28.47c23.09,19.85,40.33,46.79,61.71,69.77c24.09,25.89,53.44,46.75,102.37,46.75c22.23,0,40.62-2.83,55.84-7.43c27.97-8.45,44.21-22.88,54.78-36.7c14.35-18.75,16.43-36.37,16.43-36.37'
          fill='transparent'
        />
      </svg>
      <div
        className='imageDiv'
        style={{
          width: '300px',
          height: '400px',
          position: 'relative',
          margin: 'auto'
        }}
      >
        <img
          src={require(`../${props.cakeImage}`)}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            display: 'block',
            left: '0',
            bottom: '0',
            position: 'absolute'
          }}
          alt='cake'
        />
      </div>
    </div>
  );
};

export default Level;
