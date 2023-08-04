const config = {
  type: Phaser.AUTO,
  width: 800, // Set the desired width of the game canvas
  height: 600, // Set the desired height of the game canvas
  parent: 'game-container', // The ID of the HTML element to attach the game canvas to
  scene: {
    preload: preload, // Function for preloading game assets
    create: create, // Function for initializing game objects
    update: update, // Function for game logic and updates
  },
  physics: {
    default: 'arcade', // Set the default physics system to Arcade Physics
    arcade: {
      // Configure the Arcade Physics settings
      gravity: { y: 0 }, // Disable gravity for a top-down maze game
      debug: false, // Set to true for debugging collision boundaries
    },
  },
};

let character;
let direction;
function idleDirection(direction) {
  switch (direction) {
    case 'up':
      return 10;
    case 'down':
      return 1;
    case 'left':
      return 4;
    case 'right':
      return 7;
  }
}

function preload() {
  // Preload game assets...
  // this.load.image('player');
  this.load.spritesheet('character', './src/images/spritesheet.png', {
    frameWidth: 48,
    frameHeight: 48,
  });
}

function create() {
  this.cameras.main.setBackgroundColor('#0000FF');
  character = this.physics.add.sprite(48, 48, 'character');
  this.physics.world.setBoundsCollision(true, true, true, true);
  character.setCollideWorldBounds(true);

  character.setInteractive();

  this.anims.create({
    key: 'up',
    frames: this.anims.generateFrameNumbers('character', { start: 9, end: 11 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'down',
    frames: this.anims.generateFrameNumbers('character', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('character', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1,
  });

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('character', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  character.x += 300;
  // Set up the game world...
}

function update() {
  // Update the game state...

  let cursors = this.input.keyboard.createCursorKeys();

  if (cursors.left.isDown) {
    character.anims.play('left', true); // Play 'left' animation
    character.x -= 5;
    direction = 'left';
  } else if (cursors.right.isDown) {
    character.anims.play('right', true); // Play 'left' animation
    character.x += 5;
    direction = 'right';
  } else if (cursors.up.isDown) {
    character.anims.play('up', true); // Play 'left' animation
    character.y -= 5;
    direction = 'up';
  } else if (cursors.down.isDown) {
    character.anims.play('down', true); // Play 'left' animation
    character.y += 5;
    direction = 'down';
  } else {
    character.anims.stop(); // Stop the animation
    character.setTexture('character', idleDirection(direction)); // Set a specific frame for idle state
  }
  //winning condition was met{load map 2}
}

const game = new Phaser.Game(config);
