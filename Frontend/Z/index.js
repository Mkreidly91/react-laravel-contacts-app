document.body.style = 'margin:0;';

let config = {
  type: Phaser.AUTO,
  width: 500, // Set the desired width of the game canvas
  height: 500, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  //begin: scaling for game

  scale: {
    parent: 'game-container',
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    zoom: 1,
  },

  //end: scaling for game

  scene: { preload, create, update },
  physics: {
    default: 'arcade', // Set the default physics system to Arcade Physics
    arcade: {
      // Configure the Arcade Physics settings
      gravity: { y: 0 }, // Disable gravity for a top-down maze game
      debug: true, // set to true for debugging collision boundaries
    },
  },
};
var level1 = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 0, 1],
  [1, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1],
];

let level2 = [1, 1, 1];
let character;
let layer;
function preload() {
  this.load.spritesheet('character', 'spritesheet.png', {
    frameWidth: 48,
    frameHeight: 48,
  });
}
function create() {
  this.add.text(10, 10, 'Tile size\n16 x 16').setFontSize('12px');
  this.add.text(150, 10, 'Tile size\n8 x 8').setFontSize('12px');
  this.add.text(290, 10, 'Tile size\n4 x 4').setFontSize('12px');

  // Just empty tileset so that it can be overlayed over a background image
  // let g = this.make.graphics({ x: 0, y: 0, add: false });
  // g.generateTexture('empty-block', 16, 16);

  // When loading from an array, make sure to specify the tileWidth and tileHeight
  var map = this.make.tilemap({ data: level1, tileWidth: 50, tileHeight: 50 });
  var tiles = map.addTilesetImage('empty-block');
  layer = map.createStaticLayer(0, tiles, 100, 100);
  // layer.setCollision(1);
  layer.setCollisionBetween(0, 'character', true, true, layer);
  layer.setCollisionBetween(0);
  console.log(layer);
  console.log(map);

  map.setCollision(1);

  // Just to visualize the collision Tiles
  var debugGraphics = this.add.graphics();
  map.renderDebug(debugGraphics);

  character = this.physics.add.sprite(48, 48, 'character');
  character.setPosition(300, 250);
  character.setCollideWorldBounds(true);
  character.setInteractive();
  character.setDrag(100, 100);

  this.physics.world.setBoundsCollision(true, true, true, true);
  this.physics.add.collider(layer, character, () => {
    console.log('hello');
  }); //(line 127)
}

function update() {
  this.physics.collide(character, layer);
  let cursors = this.input.keyboard.createCursorKeys();
  let movementup = cursors.up.isDown;
  let movementdown = cursors.down.isDown;
  let movementleft = cursors.left.isDown;
  let movementright = cursors.right.isDown;

  if (movementup) {
    // character.anims.play('up', true); // Play 'up' animation
    // character.y -= 2;
    character.setVelocity(0, -100);
    direction = 'up';
  }
  if (movementleft) {
    // character.anims.play('up', true); // Play 'left' animation
    // character.x -= 2;
    character.setVelocity(-100, 0);
    direction = 'left';
  }
  if (movementright) {
    // character.anims.play('up', true); // Play 'right' animation
    // character.x += 2;
    character.setVelocity(100, 0);
    direction = 'right';
  } else if (movementdown) {
    // character.anims.play('down', true); // Play 'down' animation
    // character.y += 2;
    character.setVelocity(0, 100);
    direction = 'down';
  }
}
new Phaser.Game(config);
