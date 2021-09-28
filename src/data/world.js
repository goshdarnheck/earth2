const TILE_SIZE = 32;

const NORTH_TELEPORT_POS = { x: TILE_SIZE * 2, y: TILE_SIZE + 8, w: TILE_SIZE * 24, h: 10 };
const SOUTH_TELEPORT_POS = { x: TILE_SIZE * 2, y: TILE_SIZE * 14 + 6, w: TILE_SIZE * 24, h: 10 };
const EAST_TELEPORT_POS = { x: TILE_SIZE * 26 + 10, y: 60, w: 10, h: TILE_SIZE * 12 };
const WEST_TELEPORT_POS = { x: TILE_SIZE * 2 - 20, y: 60, w: 10, h: TILE_SIZE * 12 };

const PLAYER_TOP = TILE_SIZE + 40;
const PLAYER_RIGHT = TILE_SIZE * 26 - 16;
const PLAYER_BOTTOM = TILE_SIZE * 14 - 16;
const PLAYER_LEFT = TILE_SIZE * 2 + 16;

export default [
  [
    {
      name: "0 0 START",
      colour: 0x676d53,
      objects: [
        { type: 'Tree', x: 200, y: 100 },
        { type: 'Tree', x: 232, y: 100 },
        { type: 'Rock', x: 400, y: 350 },
        { type: 'Wand', x: 450, y: 350 },
        { type: 'Teleport', ...NORTH_TELEPORT_POS, to: { x: 0, y: 1, py: PLAYER_BOTTOM }},
        { type: 'Teleport', ...EAST_TELEPORT_POS, to: { x: 1, y: 0, px: PLAYER_LEFT }}
      ]
    },
    {
      name: "0 1",
      colour: 0xff6600,
      objects: [
        { type: 'Tree', x: 150, y: 100 },
        { type: 'Tree', x: 200, y: 100 },
        { type: 'Tree', x: 300, y: 300 },
        { type: 'Teleport', ...SOUTH_TELEPORT_POS, to: { x: 0, y: 0, py: PLAYER_TOP }},
        { type: 'Teleport', ...NORTH_TELEPORT_POS, to: { x: 0, y: 2, py: PLAYER_BOTTOM }},
        { type: 'Teleport', ...EAST_TELEPORT_POS, to: { x: 1, y: 1, px: PLAYER_LEFT }}
      ]
    },
    {
      name: "0 2",
      colour: 0xff3300,
      objects: [
        { type: 'Teleport', ...SOUTH_TELEPORT_POS, to: { x: 0, y: 1, py: PLAYER_TOP }},
        { type: 'Teleport', ...EAST_TELEPORT_POS, to: { x: 1, y: 2, px: PLAYER_LEFT }}
      ]
    }
  ],
  [
    {
      name: "1 0",
      colour: 0x0000ff,
      objects: [
        { type: 'Teleport', ...NORTH_TELEPORT_POS, to: { x: 1, y: 1, py: PLAYER_BOTTOM }},
        { type: 'Teleport', ...WEST_TELEPORT_POS, to: { x: 0, y: 0, px: PLAYER_RIGHT }},
      ]
    },
    {
      name: "1 1",
      colour: 0x3300ff,
      objects: [
        { type: 'Teleport', ...NORTH_TELEPORT_POS, to: { x: 1, y: 2, py: PLAYER_BOTTOM }},
        { type: 'Teleport', ...WEST_TELEPORT_POS, to: { x: 0, y: 1, px: PLAYER_RIGHT }},
        { type: 'Teleport', ...SOUTH_TELEPORT_POS, to: { x: 1, y: 0, py: PLAYER_TOP }},
      ]
    },
    {
      name: "1 2",
      colour: 0x003366,
      objects: [
        { type: 'Teleport', ...WEST_TELEPORT_POS, to: { x: 0, y: 2, px: PLAYER_RIGHT }},
        { type: 'Teleport', ...SOUTH_TELEPORT_POS, to: { x: 1, y: 1, py: PLAYER_TOP }},
      ]
    }
  ]
]