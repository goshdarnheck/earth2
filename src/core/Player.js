const Player = (scene) => {
  const sprite = scene.add.image(600, 200, 'player');

  const MAX_SPEED = 400;
  const DEFEND_MP_COST = 10;
  const MAX_MP = 100;
  let hp = 10;
  let mp = 100;
  let speed = 200;
  let drag = speed * 4;
  let items = [];
  let invincibleTimer = 0;
  let playerInputTimer = 0;
  let defaultVelocity = { x: 0, y: 0 };
  let defendCooldown = 0;
  let mpRefreshCooldown = 0;

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
  sprite.reduceHp = (damage) => { hp = Math.max(0, hp - damage) }
  sprite.getHp = () => hp;
  sprite.getMp = () => mp;
  sprite.addItem = (item) => { items.push(item) }
  sprite.getItems = () => items;
  sprite.setDefaultVelocity = (x, y) => { defaultVelocity = { x: x, y: y } };
  sprite.setDefaultVelocityX = (x) => { defaultVelocity.x = x };
  sprite.setDefaultVelocityY = (y) => { defaultVelocity.y = y };
  sprite.collideWith = (other) => {
    if (other.name === 'rat') {
      if (!sprite.getInvincible()) {
        sprite.setInvincible(300);
        sprite.setPlayerInput(300);
        sprite.reduceHp(other.collisionDamage);
      }
    }
  }

  sprite.defend = scene.add.circle(600, 200, 64, 0xff9900).setOrigin(0.5, 0.5);
  sprite.defend.setDepth(9);
  sprite.defend.setVisible(true);
  
  scene.add.existing(sprite.defend);
  scene.physics.add.existing(sprite.defend);

  sprite.defend.body.setCircle(64);

  sprite.update = (delta) => {
    let currentSpeed = speed;
    let boost = 1
    let slow = 1

    mpRefreshCooldown -= delta;
    if (mpRefreshCooldown <= 0) {
      mp = Math.min(MAX_MP, mp + 1);
      mpRefreshCooldown = 500;
    }

    if (defendCooldown) {
      defendCooldown = Math.max(0, defendCooldown - delta);
    }

    const isAlive = hp > 0;

    if (isAlive) {
      // DEFEND ABILITY
      if (keySpace.isDown) {
        if (mp > DEFEND_MP_COST && defendCooldown === 0) {
          defendCooldown = 300;
          mp = mp - DEFEND_MP_COST;
          const them = scene.physics.overlapCirc(sprite.x, sprite.y, 64, true, true);

          // TODO: make this hit move than rats!
          if (them && them.length > 0) {
            const hitObjects = them.filter(object => object && object.gameObject && object.gameObject.name === 'rat')

            hitObjects.forEach(hitObject => {
              hitObject.gameObject.destroy();
            })
          }
          sprite.defend.setPosition(sprite.x, sprite.y);
          sprite.defend.setVisible(true);
        } else {
          sprite.defend.setVisible(false);
        }
      } else {
        sprite.defend.setVisible(false);
      }

      // GO FAST
      if (keyEnter.isDown) {
        // slow = 2
        boost = 1.6
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
    } else {
      // DEAD
      sprite.setAlpha(0);
      sprite.body.enable = false;
    }

    sprite.defend.setPosition(sprite.x, sprite.y);
  }

  return sprite
}

export default Player;
