const Player = (scene) => {
  const sprite = scene.add.image(600, 200, 'player');

  const MAX_SPEED = 400;
  let health = 100;
  let speed = 200;
  let drag = speed * 4;
  let items = [];
  let invincibleTimer = 0;
  let playerInputTimer = 0;
  let defaultVelocity = { x: 0, y: 0 }
  let defending = false;

  const keyW = scene.input.keyboard.addKey('W');
  const keyA = scene.input.keyboard.addKey('A');
  const keyS = scene.input.keyboard.addKey('S');
  const keyD = scene.input.keyboard.addKey('D');
  const keySpace = scene.input.keyboard.addKey('SPACE');
  const keyEnter = scene.input.keyboard.addKey('ENTER');

  scene.add.existing(sprite);
  scene.physics.add.existing(sprite);
  
  sprite.setDepth(10);
  sprite.id = 'Player';
  sprite.body.setCircle(16);
  sprite.body.setOffset(0, 0);
  sprite.body.setDrag(drag, drag);
  sprite.body.setCollideWorldBounds(true, 0, 0);
  sprite.body.setMaxSpeed(MAX_SPEED);
  
  sprite.setInvincible = (seconds) => invincibleTimer = seconds;
  sprite.getInvincible = () => invincibleTimer > 0;
  sprite.setPlayerInput = (seconds) => playerInputTimer = seconds;
  sprite.getPlayerInput = () => playerInputTimer > 0;
  sprite.reduceHealth = (damage) => { health = health - damage }
  sprite.getHealth = () => health;
  sprite.addItem = (item) => { items.push(item) }
  sprite.getItems = () => items;
  sprite.setDefaultVelocity = (x, y) => { defaultVelocity = { x: x, y: y } };
  sprite.setDefaultVelocityX = (x) => { defaultVelocity.x = x };
  sprite.setDefaultVelocityY = (y) => { defaultVelocity.y = y };
  sprite.setDefending = (value) => { defending = value }
  sprite.getDefending = () => defending
  sprite.collideWith = (other) => {
    if (other.name === 'rat') {
      if (!sprite.getInvincible()) {
        sprite.setInvincible(300);
        sprite.setPlayerInput(300);
        sprite.reduceHealth(other.collisionDamage);
      }
    }
  }

  sprite.defend = scene.add.circle(600, 200, 64, 0xff9900).setOrigin(0.5, 0.5);
  sprite.defend.setDepth(9);
  sprite.defend.setVisible(false);
  
  scene.add.existing(sprite.defend);
  scene.physics.add.existing(sprite.defend);

  sprite.defend.body.setCircle(64);

  sprite.update = (delta) => {
    let currentSpeed = speed;
    let boost = 1
    let slow = 1

    // attack
    if (keySpace.isDown) {
      sprite.setDefending(true);
      sprite.defend.setVisible(true);
    } else {
      sprite.setDefending(false);
      sprite.defend.setVisible(false);
    }

    if (defending)

    // GO FAST
    if (keyEnter.isDown) {
      // slow = 2
      // boost = 1.6
    }

    currentSpeed = speed * boost - (speed * slow - speed);

    if (invincibleTimer > 0) {
      invincibleTimer = Math.max(invincibleTimer - delta, 0);
      sprite.setAlpha(0.5);
    } else {
      sprite.setAlpha(1);
    }

    if (playerInputTimer > 0) {
      playerInputTimer = Math.max(playerInputTimer - delta, 0);
      sprite.body.setVelocity(defaultVelocity.x, defaultVelocity.y)
    } else {
      if (keyW.isDown) {
        sprite.body.velocity.y = -Math.abs(currentSpeed);
      }
  
      if (keyS.isDown) {
        sprite.body.velocity.y = Math.abs(currentSpeed);
      }
  
      if (keyA.isDown) {
        sprite.body.velocity.x = -Math.abs(currentSpeed);
      }
      
      if (keyD.isDown) {
        sprite.body.velocity.x = Math.abs(currentSpeed);
      }
    }

    sprite.defend.setPosition(sprite.x, sprite.y);
  }

  return sprite
}

export default Player;
