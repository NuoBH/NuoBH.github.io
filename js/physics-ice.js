//PHYSICS BACKGROUND
const Engine = Matter.Engine,
      Render = Matter.Render,
      Runner = Matter.Runner,
      Bodies = Matter.Bodies,
      Body = Matter.Body,
      Vector = Matter.Vector,
      Composite = Matter.Composite,
      Composites = Matter.Composites,
      Events = Matter.Events,
      Mouse = Matter.Mouse;

//============
//CREATE ENGINE
let engine = Engine.create();
engine.timing.isFixed = false;

//CREATE RENER
let renderOptions = {
  height: window.innerHeight,
  width: window.innerWidth,
  pixelRatio: window.devicePixelRatio,
  background: 'transparent',
  wireframes: true,
  wireframeBackground: `transparent`,
  showVelocity: true,
  showPositions: true,
  showBounds: true,
  showBroadphase: true,
  showVertexNumbers: true,
  showAngleIndicator: true
};
let render = Render.create({
  canvas: document.getElementById(`matter`),
  engine: engine,
  options: renderOptions
});

//============
//CREATE OBJECTS
// let mouse = Mouse.create(render.canvas);
// mouse.pixelRatio = window.devicePixelRatio;
// let mouseConstraint = Matter.MouseConstraint.create(engine,{
//   mouse: mouse,
//   constraint:{
//     stiffness: 0.0003,
//     render: {visible: true}
//   }
// })
// render.mouse = mouse;

//boundary
let initialWindow = {
  width: window.innerWidth,
  height: window.innerHeight
}
let boundThickness = Math.max(Math.min(Math.max(window.innerHeight, window.innerWidth) * 0.015, 60), 15);
let leftBound = Bodies.rectangle(0, initialWindow.height / 2, boundThickness, initialWindow.height + boundThickness, { isStatic: true });
let rightBound = Bodies.rectangle(initialWindow.width, initialWindow.height / 2, boundThickness, initialWindow.height + boundThickness, { isStatic: true });
let topBound = Bodies.rectangle(initialWindow.width / 2, 0, initialWindow.width + boundThickness, boundThickness, { isStatic: true });
let bottomBound = Bodies.rectangle(initialWindow.width / 2, initialWindow.height, initialWindow.width + boundThickness, boundThickness, { isStatic: true });
leftBound.label = "left-boundary";
rightBound.label = "right-boundary";
topBound.label = "top-boundary";
bottomBound.label = "bottom-boundary";

//ice cubes
let eachWidth = Math.max(window.innerHeight, window.innerWidth) * 0.075;
let row = 3;
let col = 8;
let posX = (window.innerWidth - col * (eachWidth + eachWidth / 2.55)) / 2;
let posY = 0;
let iceOptions = {
  density: 0.5,
  restitution: 0.5,
  friction: 0,
  frictionStatic: 0,
  frictionAir: 0
};

let iceCubes = Composites.stack(posX, posY, col, row, eachWidth / 3, eachWidth / 3, function(x,y){ 
  let size = Math.random() * eachWidth/6 + eachWidth;
  let ice = Matter.Bodies.rectangle(x,y, size, size, iceOptions);
  let angle = Math.random()*0.01;
  angle = Math.random() >= 0.5 ? angle : -1 * angle;
  ice.angle = angle;
  return ice;
})

//============
//ADD BODIES
Composite.add(engine.world, [iceCubes, leftBound, rightBound, topBound, bottomBound]);

//============
//RUN + CREATE RUNNER
// run the renderer
Render.run(render);
// create runner
let runner = Runner.create();
// run the engine
Runner.run(runner, engine);

//===============
//ON RESIZE
let lastLeftPos = Vector.create(0, initialWindow.height / 2);
let lastRightPos = Vector.create(initialWindow.width, initialWindow.height / 2);
let lastTopPos = Vector.create(initialWindow.width / 2, 0);
let lastBottomPos = Vector.create(initialWindow.width / 2, initialWindow.height);

let lastLRheight = initialWindow.height + boundThickness;
let lastTBwidth = initialWindow.width + boundThickness;
//
function windowOnResize(){
  render.options.height = window.innerHeight;
  render.options.width = window.innerWidth;
  Render.setPixelRatio(render, window.devicePixelRatio);
  //mouse.pixelRatio = window.devicePixelRatio;
  
  //change boundary size and position
  let leftPos = Vector.create(- 1 * boundThickness, window.innerHeight/2);
  let rightPos = Vector.create(window.innerWidth, window.innerHeight / 2);
  let topPos = Vector.create(window.innerWidth / 2 - 0.5 * boundThickness, 0);
  let bottomPos = Vector.create(window.innerWidth / 2 - 0.5 * boundThickness, window.innerHeight);

  Body.translate(leftBound, Vector.sub(leftPos, lastLeftPos));
  Body.translate(rightBound, Vector.sub(rightPos, lastRightPos));
  Body.translate(topBound, Vector.sub(topPos, lastTopPos));
  Body.translate(bottomBound, Vector.sub(bottomPos, lastBottomPos));

  lastLeftPos = leftPos;
  lastRightPos = rightPos;
  lastTopPos = topPos;
  lastBottomPos = bottomPos;

  //
  let newLRheight = window.innerHeight + boundThickness;
  let newTBwidth = window.innerWidth + boundThickness * 2;
  let LRScaleFactorY = newLRheight / lastLRheight;
  let TBScaleFactorX = newTBwidth / lastTBwidth;

  Body.scale(leftBound, 1, LRScaleFactorY);
  Body.scale(rightBound, 1, LRScaleFactorY);
  Body.scale(topBound, TBScaleFactorX, 1);
  Body.scale(bottomBound, TBScaleFactorX, 1);

  lastLRheight = newLRheight;
  lastTBwidth = newTBwidth;

  Render.lookAt(render, [leftBound, rightBound, topBound, bottomBound]);
}

windowOnResize();
window.addEventListener(`resize`, windowOnResize);

//DELETE OFFSCREEN + READD
Events.on(runner, `afterUpdate`, function(){
  let ices = Composite.allBodies(iceCubes);
  let toRemove = [];
  for(let i = 0; i < ices.length; i++){
    if(ices[i].position.y > window.innerHeight * 1.5 ||
       ices[i].position.x > window.innerWidth * 1.5 ||
       ices[i].position.x < 0 - window.innerHeight * 0.5){
      toRemove.push(ices[i]);
    }
  }

  for(let i = 0; i < toRemove.length; i++){
    Composite.remove(iceCubes, toRemove[i]);
  }
});

Events.on(iceCubes, "afterRemove", function(e){
  if(iceCubes.bodies.length < 24){
    let sideWidth = Math.max(window.innerHeight, window.innerWidth) * 0.085;
    let size = Math.random() * sideWidth/6 + sideWidth;
    let angle = Math.random()*0.01;
    angle = Math.random() >= 0.5 ? angle : -1 * angle;
    let x = Math.random()*(window.innerWidth - boundThickness * 2 - sideWidth);
    let y = Math.random()*(window.innerHeight - boundThickness * 2 - sideWidth);
    if (y < 0) y=0;

    let ice = Matter.Bodies.rectangle(x,y, size, size, iceOptions);
    ice.angle = angle;
    Composite.add(iceCubes, [ice]);
  }
});

//CHANGE GRAVITY
let collisionCount = 0;

function firstCollision(e){
  var pairs = e.pairs;
  for (var i = 0; i < pairs.length; i++) {
    var pair = pairs[i];
    if(pair.bodyA.label == "bottom-boundary" || pair.bodyB.label == "bottom-boundary"){
      collisionCount += 1;
      if(collisionCount == 1){
        window.dispatchEvent(firstCollideEvent);
        //chat-cube appear
        expandChatCube(chatCubeDOM);
        //zero gravity
        requestTimeout(function(){
          engine.gravity.x = 0;
          engine.gravity.y = 0;
          //mouseConstraint.constraint.stiffness = 0.000002;

          Events.off(engine, `collisionEnd`, firstCollision);
        }, 1000);
      }   
    }
  }
//
}

Events.on(engine, `collisionEnd`, firstCollision);

