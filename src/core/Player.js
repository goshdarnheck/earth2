const Player = (scene, cursors) => {
  // const sprite = scene.add.image(200, 200, 'player').setScale(0.54).setOrigin(0);
  const sprite = scene.add.image(200, 200, 'player').setScale(0.54).setOrigin(0);
  const speed = 0.2

  return {
    update: (delta) => {
      if (cursors.up.isDown) {
        sprite.setPosition(sprite.x, sprite.y - speed * delta);
      }

      if (cursors.down.isDown) {
        sprite.setPosition(sprite.x, sprite.y + speed * delta);
      }

      if (cursors.left.isDown) {
        sprite.setPosition(sprite.x - speed * delta, sprite.y);
      }
      
      if (cursors.right.isDown) {
        sprite.setPosition(sprite.x + speed * delta, sprite.y);
      }
    }
  }
}

export default Player;
