const Rat = (scene, obj) => {
  const sprite = scene.add.image(obj.x, obj.y, 'rat');
  const speed = 70;
  let randomMoveToCooldown = 0;
  let randomMoveTo = { x: 0, y: 0 };
  let followMoveTo = null;

  scene.add.existing(sprite);
  scene.physics.add.existing(sprite);

  sprite.name = 'rat';
  sprite.body.setCircle(16);
  sprite.body.setOffset(0, 0);
  sprite.body.setCollideWorldBounds(true, 0, 0);

  sprite.collisionDamage = 5;

  sprite.update = (delta) => {
    sprite.body.setVelocity(0, 0);

    const them = scene.physics.overlapCirc(sprite.x, sprite.y, 128, true, false);

    if (randomMoveToCooldown === 0) {
      randomMoveTo = { x: Phaser.Math.Between(0, 500), y: Phaser.Math.Between(0, 500) };
      randomMoveToCooldown = 1000;
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
  }

  return sprite;
}

export default Rat;
