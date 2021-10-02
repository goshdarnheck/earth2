import { GAME_WIDTH, GAME_HEIGHT } from '../../config';

const Rat = (scene, obj) => {
  const sprite = scene.add.image(obj.x, obj.y, 'rat');
  const speed = 70;
  let randomMoveToCooldown = 0;
  let randomMoveTo = { x: 0, y: 0 };
  let followMoveTo = null;
  // let hp = 10;

  scene.add.existing(sprite);
  scene.physics.add.existing(sprite);

  sprite.name = 'rat';
  sprite.body.setCircle(16);
  sprite.body.setOffset(0, 0);
  sprite.body.setCollideWorldBounds(true, 0, 0);

  sprite.collisionDamage = 5;

  sprite.collideWith = (other) => {
    if (other.name === 'player') {
      console.log("rat knows it touched player");
    }
  }

  sprite.update = (delta) => {
    sprite.body.setVelocity(0, 0);

    const them = scene.physics.overlapCirc(sprite.x, sprite.y, 128, true, false);

    // if close to randommoveto, just reset it or chill?
    const distanceToRandomMoveTo = Phaser.Math.Distance.Between(randomMoveTo.x, randomMoveTo.y, sprite.x, sprite.y);
    if (distanceToRandomMoveTo < 100) {
      randomMoveToCooldown = 0;
    }

    if (randomMoveToCooldown === 0) {
      randomMoveTo = { x: Phaser.Math.Between(0, GAME_WIDTH), y: Phaser.Math.Between(0, GAME_HEIGHT) };
      randomMoveToCooldown = Phaser.Math.Between(500, 5000);
    } else {
      randomMoveToCooldown = Math.max(0, randomMoveToCooldown - delta);
    }

    if (them && them.length > 0) {
      const playerInFollowRange = them.filter(object => object && object.gameObject.id === 'Player')
      if (playerInFollowRange && playerInFollowRange.length > 0) {
        followMoveTo = playerInFollowRange[0].gameObject
      } else {
        followMoveTo = null
      }
    }
    
    if (followMoveTo) {
      scene.physics.moveToObject(sprite, followMoveTo, speed);
    } else {
      scene.physics.moveTo(
        sprite,
        randomMoveTo.x,
        randomMoveTo.y,
        speed
      );
    }

    const angle = Math.atan2(sprite.body.velocity.y, sprite.body.velocity.x) + Math.PI/2
    sprite.angle = Phaser.Math.RadToDeg(angle);
  }

  return sprite;
}

export default Rat;
