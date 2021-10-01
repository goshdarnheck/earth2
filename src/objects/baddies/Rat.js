const Rat = (scene, obj, detectGroup) => {
  const sprite = scene.add.image(obj.x, obj.y, 'rat');
  let moveTo = null
  const speed = 70

  scene.add.existing(sprite);
  scene.physics.add.existing(sprite);

  sprite.body.setCircle(16);
  sprite.body.setOffset(0, 0);
  sprite.body.setCollideWorldBounds(true, 0, 0);

  sprite.collisionDamage = 5;

  sprite.update = (delta) => {
    sprite.body.setVelocity(0, 0);

    const them = scene.physics.overlapCirc(sprite.x, sprite.y, 128, true, false);

    if (them && them.length > 0) {
      const playerInFollowRange = them.filter(object => object && object.gameObject.id === 'Player')
      if (playerInFollowRange && playerInFollowRange.length > 0) {
        scene.physics.moveToObject(sprite, playerInFollowRange[0].gameObject, speed);
      }
    }
  }

  return sprite;
}

export default Rat;
