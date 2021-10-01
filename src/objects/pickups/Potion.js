const Potion = (scene, obj) => {
  const sprite = scene.add.image(obj.x, obj.y, 'potion').setOrigin(0);

  scene.add.existing(sprite, 1);
  scene.physics.add.existing(sprite, 1);

  sprite.body.setCircle(16);
  sprite.body.setOffset(0, 0);

  sprite.isPickup = true;
  sprite.pickupItem = 'POTION';

  return sprite;
}

export default Potion;
