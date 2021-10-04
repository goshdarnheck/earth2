const Teleport = (scene, obj) => {
  const zone = scene.add.zone(obj.x, obj.y).setSize(obj.w, obj.h).setOrigin(0, 0) 

  scene.add.existing(zone, 1);
  scene.physics.world.enable(zone);

  zone.body.setAllowGravity(false);
  zone.body.moves = false;

  zone.to = obj.to;

  return zone;
}

export default Teleport;
