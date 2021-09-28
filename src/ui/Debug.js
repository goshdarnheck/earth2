import { DEBUG } from '../config';

const Debug = (scene, cell) => {
  const cellName = scene.add.text(0, 490, cell.name, {
    fontSize: "16px",
    fill: "#fff",
  });

  if (!DEBUG) {
    cellName.setVisible(false);
  }

  return {
    update: (cell) => {
      cellName.setText(cell.name)
    }
  };
}

export default Debug;