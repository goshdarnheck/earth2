const Player = (scene) => {
  const sprite = scene.add.image(200, 200, 'player');
  let speed = 200;
  let drag = speed * 4;
  let boost = 1
  let slow = 1

  const keyW = scene.input.keyboard.addKey('W');
  const keyA = scene.input.keyboard.addKey('A');
  const keyS = scene.input.keyboard.addKey('S');
  const keyD = scene.input.keyboard.addKey('D');
  const keySpace = scene.input.keyboard.addKey('SPACE');
  const keyEnter = scene.input.keyboard.addKey('ENTER');

  scene.add.existing(sprite);
  scene.physics.add.existing(sprite);

  sprite.body.setSize(32, 32);
  sprite.body.setOffset(0, 0);
  sprite.body.setDrag(drag, drag);
  sprite.body.setCollideWorldBounds(true, 0, 0);

  return {
    update: (delta) => {
      let currentSpeed = speed * boost - (speed * slow - speed);
      boost = 1
      slow = 1

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

      // dash
      if (keySpace.isDown) {
        boost = 1.6
      }

      // melee
      if (keyEnter.isDown) {
        slow = 1.6
      }
    },
    getBody: () => sprite.body,
    getSprite: () => sprite
  }
}

export default Player;
