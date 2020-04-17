var score = 0;
var scoreText;
var time = 30;
var timeText;
var gameOver = false;
var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1000 },
      debug: false,
    },
  },
  scene: { preload, create, update },
};
var game = new Phaser.Game(config);
function preload() {
  this.load.image("background", "assets/skyhill.png");
  this.load.image("lava", "assets/Tiles/liquidLavaTop.png");
  this.load.image("ground", "assets/Tiles/grass.png");
  this.load.image("midPlatform", "assets/Tiles/stoneHalf.png");
  this.load.image("rock", "assets/Items/rock.png");
  this.load.spritesheet("player1", "assets/Player/p1_walk/p1_walk.png", {
    frameWidth: 66,
    frameHeight: 93,
  });
}
function create() {
  //add background
  this.add.image(400, 300, "background");
  //group platforms
  platforms = this.physics.add.staticGroup();
  lava = this.physics.add.staticGroup();
  //create platforms and lava
  platforms.create(35, 568, "ground");
  platforms.create(105, 568, "ground");
  lava.create(175, 586, "lava");
  lava.create(245, 586, "lava");
  lava.create(315, 586, "lava");
  lava.create(385, 586, "lava");
  lava.create(455, 586, "lava");
  lava.create(525, 586, "lava");
  lava.create(595, 586, "lava");
  lava.create(665, 586, "lava");
  platforms.create(765, 568, "ground");
  platforms.create(695, 568, "ground");
  //player sprite
  player = this.physics.add.sprite(100, 300, "player1");
  player.setBounce(0.2);
  player.setCollideWorldBounds(true);
  // rock sprite
  rocks = this.physics.add.group();
  rock1 = rocks.create(700, 16, "rock");
  rock1.setBounce(1);
  rock1.setCollideWorldBounds(true);
  rock1.setVelocity(Phaser.Math.Between(-400, 400), 20);
  // rock2 = rocks.create(700, 16, 'rock');
  // rock2.setBounce(1);
  // rock2.setCollideWorldBounds(true);
  // rock2.setVelocity(Phaser.Math.Between(-400, 400), 20);
  //middle platform
  midPlatform = this.physics.add.sprite(400, 586, "midPlatform");
  midPlatform.scaleX = 2;
  midPlatform.body.setAllowGravity(false);
  midPlatform.body.immovable = true;
  midPlatform.body.velocity.x = -150;
  midPlatform.setBounce(1);
  midPlatform.setCollideWorldBounds(true);
  midPlatform.body.onColide = true;
  //colliders
  this.physics.add.collider(player, platforms, touchGround, null, this);
  this.physics.add.collider(player, lava, touchLava, null, this);
  this.physics.add.collider(rocks, platforms);
  this.physics.add.collider(player, rock1, playerHitRock, null, this);
  this.physics.add.collider(player, midPlatform, touchMidPlatform, null, this);
  this.physics.add.collider(midPlatform, platforms);
  //Score text variables
  scoreText = this.add.text(16, 16, "Score: 0", {
    fontSize: "32px",
    fill: "#000",
  });
  //creates cursor keys
  cursors = this.input.keyboard.createCursorKeys();
  //animations
  this.anims.create({
    key: "left",
    frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  this.anims.create({
    key: "stop",
    frames: [{ key: "player1", frame: 0 }],
    frameRate: 20,
  });
  this.anims.create({
    key: "right",
    frames: this.anims.generateFrameNumbers("player1", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });
  //timer
  // this.initialTime = 30;
  text = this.add.text(500, 32, "Countdown: " + formatTime(time), {
    fontSize: "32px",
    fill: "#000",
  });
  timedEvent = this.time.addEvent({
    delay: 1000,
    callback: onEvent,
    callbackScope: this,
    loop: true,
  });
}
function update() {
  if (gameOver) {
    timedEvent.paused = true;
    console.log(User.all);
    console.log(score, time);
    scene.stop();
  }
  if (cursors.left.isDown) {
    player.flipX = true;
    player.setVelocityX(-400);
    player.anims.play("left", true);
  } else if (cursors.right.isDown) {
    player.flipX = false;
    player.setVelocityX(400);
    player.anims.play("right", true);
  } else {
    player.setVelocityX(0);
    player.anims.play("stop");
  }
  if (cursors.space.isDown) {
    // && player.body.touching.down
    player.setVelocityY(-300);
    player.setTint();
  }
  if (midPlatform.x < 210) {
    midPlatform.body.velocity.x = 100;
  }
  if (midPlatform.x > 590) {
    midPlatform.body.velocity.x = -100;
  }
}
// collision functions
function touchLava(player, lava) {
  this.physics.pause();
  player.setTint("0xff0000");
  player.anims.play("stop");
  gameOver = true;
}
function touchGround(player, platforms) {
  player.setTint();
}
function touchMidPlatform(player, midPlatform) {
  player.setTint("0x00ff00");
  score += 1;
  scoreText.setText("Score: " + score);
}
function playerHitRock(player, rock) {
  this.physics.pause();
  player.setTint("0xff0000");
  player.anims.play("stop");
  // this.scene.start("titleScene")
  gameOver = true;
}
function resetRockPosition(rock) {
  var randomX = Phaser.Math.Between(0, config.width);
  rock.x = randomX;
}
function formatTime(seconds) {
  var minutes = Math.floor(seconds / 60);
  var partInSeconds = seconds % 60;
  partInSeconds = partInSeconds.toString().padStart(2, "0");
  return `${minutes}:${partInSeconds}`;
}
onEvent = () => {
  if (time === 0) {
    this.physics.pause();
    player.anims.play("stop");
  } else {
    time -= 1;
    text.setText("Countdown: " + formatTime(time));
  }
};
