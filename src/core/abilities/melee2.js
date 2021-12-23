const meleeAbility = (scene, sprite, size, distance) => {
  const circle = scene.add.circle(600, 200, size, 0x00ff00).setOrigin(0.5, 0.5);
  let cooldown = 0;
  let showfor = 0;

  circle.setDepth(9);
  circle.setVisible(false);
  
  const ability = {
    destroy: () => {
      console.log("melee2 destoryied!S")
      console.log(circle.destroy)
      circle.destroy();
    },

    update: (delta, active, x, y, angle) => {
      if (active && cooldown === 0) {
        cooldown = 500;
        showfor = 100;
        const maybe = {
          x: distance * Math.cos(Phaser.Math.DegToRad(angle - 90)) + x,
          y: distance * Math.sin(Phaser.Math.DegToRad(angle - 90)) + y
        }
        
        const overlappedObjects = scene.physics.overlapCirc(maybe.x, maybe.y, size, true, true);

        if (overlappedObjects && overlappedObjects.length > 0) {
          const hitObjects = overlappedObjects.filter(object => object && object.gameObject && object.gameObject.id === 'Player')
          console.log('overlappedObjects', overlappedObjects)
          hitObjects.forEach(hitObject => {
            if (hitObject.gameObject && hitObject.gameObject.hitWith) {
              hitObject.gameObject.hitWith(2, 'physical');
            }
          })
        }
      } else {
        cooldown = Math.max(0, cooldown - delta);
      }

      if (showfor > 0) {
        const maybe = {
          x: distance * Math.cos(Phaser.Math.DegToRad(angle - 90)) + x,
          y: distance * Math.sin(Phaser.Math.DegToRad(angle - 90)) + y
        }
        
        circle.setPosition(maybe.x, maybe.y);
        circle.setVisible(true);
        showfor = Math.max(0, showfor - delta);
      } else {
        circle.setVisible(false);
      }
    }
  };

  return ability;
}

export default meleeAbility;
