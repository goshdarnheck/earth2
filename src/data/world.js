const NORTH_TELEPORT_POS = { x: 100, y: 100, w: 600, h: 10 };
const SOUTH_TELEPORT_POS = { x: 100, y: 500, w: 600, h: 10 };
const WEST_TELEPORT_POS = { x: 690, y: 100, w: 10, h: 400 };
const EAST_TELEPORT_POS = { x: 100, y: 100, w: 10, h: 400 };

export default [
  [
    {
      name: "0 0 START",
      colour: 0x676d53,
      objects: [
        { type: 'Tree', x: 200, y: 100 },
        { type: 'Tree', x: 232, y: 100 },
        { type: 'Teleport', ...NORTH_TELEPORT_POS, to: { x: 0, y: 1, py: 420 }},
        { type: 'Teleport', ...WEST_TELEPORT_POS, to: { x: 1, y: 0, px: 120 }}
      ]
    },
    {
      name: "0 1",
      colour: 0xff6600,
      objects: [
        { type: 'Tree', x: 150, y: 100 },
        { type: 'Tree', x: 200, y: 100 },
        { type: 'Tree', x: 300, y: 300 },
        { type: 'Teleport', ...SOUTH_TELEPORT_POS, to: { x: 0, y: 0, py: 120 }},
        { type: 'Teleport', ...NORTH_TELEPORT_POS, to: { x: 0, y: 2, py: 480 }}
      ]
    },
    {
      name: "0 2",
      colour: 0xff3300,
      objects: [
        { type: 'Teleport', ...SOUTH_TELEPORT_POS, to: { x: 0, y: 1, py: 120 }},
      ]
    }
  ],
  [
    {
      name: "1 0",
      colour: 0x0000ff,
      objects: [
        { type: 'Teleport', ...EAST_TELEPORT_POS, to: { x: 0, y: 0, px: 500 }},
      ]
    },
    {
      name: "1 1",
      colour: 0x3300ff
    },
    {
      name: "1 2",
      colour: 0x003366
    }
  ]
]