const defendAbility = (scene, size) => {
  const defend = scene.add.circle(600, 200, 20, 0xff9900).setOrigin(0.5, 0.5);
  defend.setDepth(9);
  defend.setVisible(false);
  
  const ability = {
    update: (active, x, y) => {
      if (active) {
        const overlappedObjects = scene.physics.overlapCirc(x, y, size, true, true);

        // TODO: make this hit move than rats!
        if (overlappedObjects && overlappedObjects.length > 0) {
          const hitObjects = overlappedObjects.filter(object => object && object.gameObject && object.gameObject.name === 'rat')
  
          hitObjects.forEach(hitObject => {
            if (hitObject.gameObject && hitObject.gameObject.hitWith) {
              hitObject.gameObject.hitWith(1, 'magic');
            }
          })
        }
        defend.setVisible(true);
      } else {
        defend.setVisible(false);
      }

      defend.setPosition(x, y);
    }
  };

  return ability;
}

export default defendAbility;
