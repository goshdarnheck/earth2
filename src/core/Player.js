import barrierAbility from './abilities/barrier'
import meleeAbility from './abilities/melee'

// TODO: player needs a "state" of being hit
const Player = (scene) => {
  const MAX_SPEED = 400;
  const DEFEND_MP_COST = 20;
  const keyW = scene.input.keyboard.addKey('W');
  const keyA = scene.input.keyboard.addKey('A');
  const keyS = scene.input.keyboard.addKey('S');
  const keyD = scene.input.keyboard.addKey('D');
  const keySpace = scene.input.keyboard.addKey('SPACE');
  const keyEnter = scene.input.keyboard.addKey('ENTER');
  const abilities = {
    barrier: barrierAbility(scene, 20),
    melee: meleeAbility(scene, 30, 20)
  }

  let angle = 0;
  let maxMp = 100;
  let hp = 50;
  let mp = maxMp;
  let speed = 200;
  let drag = speed * 10;
  let items = [];
  let invincibleTimer = 0;
  let playerInputTimer = 0;
  let defaultVelocity = { x: 0, y: 0 };
  let isDefending = false;
  let mpRefreshCooldown = 0;

  const sprite = scene.add.image(100, 100, 'player');
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
    if (other.type === 'enemy') {
      if (!sprite.getInvincible() && !isDefending) {
        // const radBetweenObjects = Phaser.Math.Angle.Between(sprite.x, sprite.y, other.x, other.y);
        // const velocityAwayFromObject = scene.physics.velocityFromAngle(Phaser.Math.RadToDeg(radBetweenObjects) - 180, 200);
        // sprite.setDefaultVelocity(velocityAwayFromObject);
        // sprite.angle = Phaser.Math.RadToDeg(radBetweenObjects) + 90;
        // sprite.setInvincible(300);
        // sprite.setPlayerInput(300);
        // sprite.reduceHp(other.collisionDamage);
      }
    }
  }

  sprite.hitWith = (power, type) => {
    if (!sprite.getInvincible() && !isDefending) {
        sprite.setInvincible(300);
        sprite.reduceHp(power);
    }
  }

  sprite.update = (delta) => {
    let currentSpeed = speed;

    mpRefreshCooldown -= delta;
    if (mpRefreshCooldown <= 0) {
      mp = Math.min(maxMp, mp + 1);
      mpRefreshCooldown = 2000;
    }

    const isAlive = hp > 0;

    if (isAlive) {
      // DEFEND ABILITY todo move this into defend function
      if (keySpace.isDown && mp >= DEFEND_MP_COST * delta / 1000) {
        isDefending = true;
        mp = mp - DEFEND_MP_COST * delta / 1000;
      } else {
        isDefending = false;
      }

      abilities.barrier.update(isDefending, sprite.x, sprite.y);
      abilities.melee.update(delta, keyEnter.isDown, sprite.x, sprite.y, sprite.angle);

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
      sprite.setAlpha(0.1);
      sprite.body.enable = false;
    }

    sprite.angle = angle;
  }

  return sprite
}

export default Player;
