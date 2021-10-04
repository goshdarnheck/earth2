// TODO: player needs a "state" of being hit
const Player = (scene) => {
  const sprite = scene.add.image(600, 200, 'player');

  const MAX_SPEED = 400;
  const DEFEND_MP_COST = 20;
  let angle = 0;
  let maxMp = 100;
  let hp = 50;
  let mp = maxMp;
  let speed = 200;
  let drag = speed * 5;
  let items = [];
  let invincibleTimer = 0;
  let playerInputTimer = 0;
  let defaultVelocity = { x: 0, y: 0 };
  let isDefending = false;
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
  sprite.name = 'player';
  sprite.body.setCircle(16);
  sprite.body.setOffset(0, 0);
  sprite.body.setDrag(drag, drag);
  sprite.body.setCollideWorldBounds(true, 0, 0);
  sprite.body.setMaxSpeed(MAX_SPEED);

  // okay clean this up please lol
  sprite.defend = scene.add.circle(600, 200, 20, 0xff9900).setOrigin(0.5, 0.5);
  sprite.defend.setDepth(9);
  sprite.defend.setVisible(true);
  
  sprite.setInvincible = (seconds) => invincibleTimer = seconds;
  sprite.getInvincible = () => invincibleTimer > 0;
  sprite.setPlayerInput = (seconds) => playerInputTimer = seconds;
  sprite.getPlayerInput = () => playerInputTimer > 0;
  sprite.reduceHp = (damage) => { hp = Math.max(0, hp - damage) }
  sprite.getHp = () => hp;
  sprite.getMp = () => mp;
  sprite.addItem = (item) => { items.push(item) }
  sprite.getItems = () => items;
  sprite.setDefaultVelocity = (vector2) => { defaultVelocity = vector2 };
  sprite.setDefaultVelocityX = (x) => { defaultVelocity.x = x };
  sprite.setDefaultVelocityY = (y) => { defaultVelocity.y = y };
  sprite.collideWith = (other) => {
    if (other.name === 'rat') {
      if (!sprite.getInvincible() && !isDefending) {
        const radBetweenObjects = Phaser.Math.Angle.Between(sprite.x, sprite.y, other.x, other.y);
        const velocityAwayFromObject = scene.physics.velocityFromAngle(Phaser.Math.RadToDeg(radBetweenObjects) - 180, 200);
        sprite.setDefaultVelocity(velocityAwayFromObject);
        sprite.angle = Phaser.Math.RadToDeg(radBetweenObjects) + 90;
        sprite.setInvincible(300);
        sprite.setPlayerInput(300);
        sprite.reduceHp(other.collisionDamage);
      }
    }
  }
  sprite.update = (delta) => {
    let currentSpeed = speed;
    let boost = 1
    let slow = 1

    mpRefreshCooldown -= delta;
    if (mpRefreshCooldown <= 0) {
      mp = Math.min(maxMp, mp + 1);
      mpRefreshCooldown = 2000;
    }

    const isAlive = hp > 0;

    if (isAlive) {
      // DEFEND ABILITY
      if (keySpace.isDown) {
        if (mp >= DEFEND_MP_COST * delta / 1000) {
          isDefending = true;
          mp = mp - DEFEND_MP_COST * delta / 1000;
          const them = scene.physics.overlapCirc(sprite.x, sprite.y, 20, true, true);

          // TODO: make this hit move than rats!
          if (them && them.length > 0) {
            const hitObjects = them.filter(object => object && object.gameObject && object.gameObject.name === 'rat')

            hitObjects.forEach(hitObject => {
              // hitObject.gameObject.destroy();
              if (hitObject.gameObject && hitObject.gameObject.hitWith) {
                hitObject.gameObject.hitWith(1, 'magic');
              }
            })
          }
          sprite.defend.setVisible(true);
        } else {
          sprite.defend.setVisible(false);
          isDefending = false;
        }
      } else {
        sprite.defend.setVisible(false);
        isDefending = false;
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
        let moving = false;
        if (keyW.isDown) {
          sprite.body.velocity.y = -Math.abs(currentSpeed);
          moving = true;
        }
    
        if (keyS.isDown) {
          sprite.body.velocity.y = Math.abs(currentSpeed);
          moving = true;
        }
    
        if (keyA.isDown) {
          sprite.body.velocity.x = -Math.abs(currentSpeed);
          moving = true;
        }
        
        if (keyD.isDown) {
          sprite.body.velocity.x = Math.abs(currentSpeed);
          moving = true;
        }

        // SET SPRITE ANGLE TO THE ANGLE OF THE VELOCITY - PLAYER MOVEMENT DIRECTION
        if (moving) {
          angle = Phaser.Math.RadToDeg(Math.atan2(sprite.body.velocity.y, sprite.body.velocity.x) + Math.PI/2)
        }
      }
    } else {
      // DEAD
      sprite.setAlpha(0);
      sprite.body.enable = false;
    }

    sprite.angle = angle;
    sprite.defend.setPosition(sprite.x, sprite.y);
  }

  return sprite
}

export default Player;
