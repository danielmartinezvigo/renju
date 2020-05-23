/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-nested-ternary */
const ERRORS = {
  CONSTRUCTOR: {
    SIZE_MUST_BE_INTEGER: 'size must be integer',
    BAD_SIZE: 'size must be >= 6 and <= 100',
    BAD_ROWS: 'rows must be string[]',
    SIZE_NEQ_ROWS_LENGTH: 'size !== rows.length',
    ROWS_ITEM_LENGTH_NEQ_ROWS_LENGTH: 'rows[i].length !== rows.length',
    INVALID_ROWS_ITEM: 'rows[i] contains invalid characters',
    INVALID_GAME: 'invalid game',
  },
};

const PATTERNS = {
  blackPlayerWins: /(\[B\(\d+,\d+\)\]){5}/,
  whitePlayerWins: /(\[W\(\d+,\d+\)\]){5}/,
  emptyPoint: /(\[\.\(\d+,\d+\)\])/g,
  forbidden6: [
    // B(_|6|4|3)BBBB
    /((?:\[B\(\d+,\d+\)\]){1}(?:\[(?:\.|4|3)\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){4})/g,
    // BB(_|6|4|3)BBB
    /((?:\[B\(\d+,\d+\)\]){2}(?:\[(?:\.|4|3)\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){3})/g,
    // BBB(_|6|4|3)BB
    /((?:\[B\(\d+,\d+\)\]){3}(?:\[(?:\.|4|3)\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){2})/g,
    // BBBB(_|6|4|3)B
    /((?:\[B\(\d+,\d+\)\]){4}(?:\[(?:\.|4|3)\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){1})/g,
  ],
  open4: [
    // (^|W|6|4|3)_BBBB_($|W|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){4}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
  ],
  halfOpen4: [
    // (^|W|_|6|4|3)BB_BB($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){2}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)BBB_B($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){3}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)B_BBB($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){1}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){3})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|6|4|3)BBBB_($|W|_|6|4|3)
    /(?:^|\[(?:W|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){4}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_BBBB($|W|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){4})(?:$|\[(?:W|6|4|3)\(\d+,\d+\)\])/g,
  ],
  open3: [
    // (^|W|_|6|4|3)_BBB__($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){3}(?:\[\.\(\d+,\d+\)\]){1})(?:\[\.\(\d+,\d+\)\]){1}(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)__BBB_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(?:\[\.\(\d+,\d+\)\]){1}((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){3}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_BB_B_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_B_BB_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){2}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
  ],
  halfOpen3: [
    // (^|W|_|6|4|3)(_B_BB)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){1}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(B__BB)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(BB__B)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(BB_B_)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,

    // (^|W|_|6|4|3)(_BB_B)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){2}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(B_B_B)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(BBB__)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){3}(?:\[\.\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,

    // (^|W|_|6|4|3)(__BBB)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){3})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(B__BB)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\])(?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(B_BB_)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\])(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,

    // (^|W|6|4|3)(_BBB_)($|W|_|6|4|3)
    /(?:^|\[(?:W|6|4|3)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){3}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|6|4|3)(B_BB_)($|W|_|6|4|3)
    /(?:^|\[(?:W|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\])\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){2}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|6|4|3)(BB_B_)($|W|_|6|4|3)
    /(?:^|\[(?:W|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){2}\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\])\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|6|4|3)(BBB__)($|W|_|6|4|3)
    /(?:^|\[(?:W|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){3}(?:\[\.\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,

    // (^|W|_|6|4|3)(__BBB)($|W|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){3})(?:$|\[(?:W|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(_B_BB)($|W|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){2})(?:$|\[(?:W|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(_BB_B)($|W|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\])(?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|6|4|3)\(\d+,\d+\)\])/g,
  ],
  open2: [
    // (^|W|_|6|4|3)_(BB__)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){2})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(_BB_)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(B_B_)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(__BB)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){2})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(_B_B)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(B__B)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
  ],
  halfOpen2: [
    // (^|W|_|6|4|3)(BB__)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){2})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(BB__)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(_BB_)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(_BB_)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){2}(?:\[\.\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(B_B_)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(B_B_)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(__BB)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){2})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(__BB)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(_B_B)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(_B_B)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){1}(?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(B__B)_($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){1})\[\.\(\d+,\d+\)\](?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)_(B__B)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])\[\.\(\d+,\d+\)\]((?:\[B\(\d+,\d+\)\]){1}(?:\[\.\(\d+,\d+\)\]){2}(?:\[B\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
  ],
  halfOpen1: [
    // (^|W|_|6|4|3)(B____)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){0}\[B\(\d+,\d+\)\](?:\[\.\(\d+,\d+\)\]){4})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(_B___)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){1}\[B\(\d+,\d+\)\](?:\[\.\(\d+,\d+\)\]){3})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(__B__)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){2}\[B\(\d+,\d+\)\](?:\[\.\(\d+,\d+\)\]){2})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(___B_)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){3}\[B\(\d+,\d+\)\](?:\[\.\(\d+,\d+\)\]){1})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
    // (^|W|_|6|4|3)(____B)($|W|_|6|4|3)
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])((?:\[\.\(\d+,\d+\)\]){4}\[B\(\d+,\d+\)\](?:\[\.\(\d+,\d+\)\]){0})(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
  ],
  newLine: [
    /(?:^|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])(?:\[\.\(\d+,\d+\)\]){5}(?:$|\[(?:W|\.|6|4|3)\(\d+,\d+\)\])/g,
  ],
};

const utils = {
  getDiagonals: (rows) => {
    const result = [];
    const { length } = rows;
    let tmp;
    for (let k = 0; k <= 2 * (length - 1); k += 1) {
      tmp = [];
      for (let y = length - 1; y >= 0; y -= 1) {
        const x = k - y;
        if (x >= 0 && x < length) {
          tmp.push(rows[y][x]);
        }
      }
      if (tmp.length > 0) {
        result.push(tmp.join(''));
      }
    }
    return result;
  },
  match: (pattern, string) => {
    const result = [];
    let aux;
    // eslint-disable-next-line no-cond-assign
    while ((aux = pattern.exec(string)) != null) {
      result.push(aux[1]);
    }
    return result;
  },
};

class Renju {
  /**
   * @constructs
   * @param {Object} [board]
   * @param {number} [board.size=15] Board size, default 15
   * @param {string[]} [board.rows] Rows, i.e.: 6x6 board
   * [
   *    '..W.B.',
   *    '......',
   *    '..WB..',
   *    '..B.W.',
   *    '......',
   *    '......'
   * ]
   */
  constructor(board = {}) {
    // TO DO: check for 6, 4x4 and 3x3, winner and draw.
    const { rows } = board;
    const size = board && board.size !== undefined ? board.size : (rows ? rows.length : 15);
    const errors = [];
    if (size !== undefined && !Number.isInteger(size)) {
      errors.push(ERRORS.CONSTRUCTOR.SIZE_MUST_BE_INTEGER);
    }
    if (size !== undefined && (size < 6 || size > 100)) {
      errors.push(ERRORS.CONSTRUCTOR.BAD_SIZE);
    }

    if (rows !== undefined) {
      if (
        size !== undefined
        && Number.isInteger(size)
        && rows instanceof Array
        && size !== rows.length
      ) {
        errors.push(ERRORS.CONSTRUCTOR.SIZE_NEQ_ROWS_LENGTH);
      }
      if (
        !(rows instanceof Array)
        || rows.some(item => typeof item !== 'string')
      ) {
        errors.push(ERRORS.CONSTRUCTOR.BAD_ROWS);
      } else {
        rows.forEach((item, index) => {
          if (item.length !== rows.length) {
            errors.push(ERRORS.CONSTRUCTOR.ROWS_ITEM_LENGTH_NEQ_ROWS_LENGTH.replace('[i]', `[${index}]`));
          }
          if (item.split('').some(char => ['.', 'B', 'W'].indexOf(char) === -1)) {
            errors.push(ERRORS.CONSTRUCTOR.INVALID_ROWS_ITEM.replace('[i]', `[${index}]`));
          }
        });
      }
    }

    if (errors.length > 0) {
      const error = `${errors.join(', ')}`;
      throw new Error(error);
    }

    this.size = size;

    if (rows) {
      this.rows = rows;
      let bs = 0;
      let ws = 0;
      this.rows.forEach((row) => {
        const celds = row.split('');
        celds.forEach((celd) => {
          if (celd === 'B') {
            bs += 1;
          } else if (celd === 'W') {
            ws += 1;
          }
        });
      });
      if (bs - ws > 1) {
        errors.push(ERRORS.CONSTRUCTOR.INVALID_GAME);
      }
      if (ws - bs > 0) {
        errors.push(ERRORS.CONSTRUCTOR.INVALID_GAME);
      }
      this.plays = ws === bs ? 'B' : 'W';
    } else {
      const emptyRows = [];
      for (let i = 0; i < size; i += 1) {
        emptyRows.push('.'.repeat(size));
      }
      emptyRows[7] = '.......B.......';
      this.rows = emptyRows;
      this.plays = 'W';
    }

    if (errors.length > 0) {
      const error = `${errors.join(', ')}`;
      throw new Error(error);
    }

    this.internal = this.rows.map((row, i) => row.split('').map((item, j) => `[${item}(${i},${j})]`).join(''));
    this.marked = JSON.parse(JSON.stringify(this.internal));
    this.internalLinesHalfMarked = this.getInternalLines(true); // init.

    if (this.plays === 'B') {
      this.mark();
    }

    this.winner = null;
    this.draw = false;
  }

  getInternalMatrix(array) {
    return (array || this.internal).map(row => row
      .split(/\[/)
      .join('')
      .split(/\]/)
      .reverse()
      .splice(1)
      .reverse())
      .map(row => row.map(item => `[${item}]`));
  }

  getMarkedMatrix(array) {
    return (array || this.marked).map(row => row
      .split(/\[/)
      .join('')
      .split(/\]/)
      .reverse()
      .splice(1)
      .reverse())
      .map(row => row.map(item => `[${item}]`));
  }

  rotateInternal(marked = false) {
    const matrix = marked ? this.getMarkedMatrix() : this.getInternalMatrix();
    return (matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())).map(row => row.join(''));
  }

  getInternalHorizontals(marked = false) {
    return marked ? this.marked : this.internal;
  }

  getInternalVerticals(marked = false) {
    return this.rotateInternal(marked);
  }

  getInternalDiagonals(marked = false) {
    if (marked) {
      // eslint-disable-next-line max-len
      return utils.getDiagonals(this.getMarkedMatrix()).concat(utils.getDiagonals(this.getMarkedMatrix(this.rotateInternal(marked))));
    }
    return utils.getDiagonals(this.getInternalMatrix())
      .concat(utils.getDiagonals(this.getInternalMatrix(this.rotateInternal())));
  }

  getInternalLines(marked = false) {
    return this.getInternalHorizontals(marked)
      .concat(this.getInternalVerticals(marked).concat(this.getInternalDiagonals(marked)));
  }

  get6(marked = false, lines) {
    const patterns = PATTERNS.forbidden6;
    let result = [];
    (lines || this.getInternalLines(marked)).forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }

  getOpen4(marked = false, lines) {
    const patterns = PATTERNS.open4;
    let result = [];
    (lines || this.getInternalLines(marked)).forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }

  getHalfOpen4(marked = false, lines) {
    const patterns = PATTERNS.halfOpen4;
    let result = [];
    (lines || this.getInternalLines(marked)).forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }

  getOpen3(marked = false, lines) {
    const patterns = PATTERNS.open3;
    let result = [];
    (lines || this.getInternalLines(marked)).forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }

  getHalfOpen3(marked = false, lines) {
    const patterns = PATTERNS.halfOpen3;
    let result = [];
    (lines || this.getInternalLines(marked)).forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }

  getOpen2(marked = false, lines) {
    const patterns = PATTERNS.open2;
    let result = [];
    (lines || this.getInternalLines(marked)).forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }

  blackPlayerCanWin() {
    let patterns = [];
    patterns = patterns.concat(PATTERNS.newLine);
    patterns = patterns.concat(PATTERNS.halfOpen1);
    patterns = patterns.concat(PATTERNS.halfOpen2);
    patterns = patterns.concat(PATTERNS.open2);
    patterns = patterns.concat(PATTERNS.halfOpen3);
    patterns = patterns.concat(PATTERNS.open3);
    patterns = patterns.concat(PATTERNS.halfOpen4);
    patterns = patterns.concat(PATTERNS.open4);
    return this.internalLinesHalfMarked.some(line => patterns.some(pattern => pattern.test(line)));
  }

  whitePlayerCanWin(marked = false, lines) {
    return (lines || this.getInternalLines(marked)).some((line) => {
      const l = line.replace(/\(\d+,\d+\)/g, '').replace(/\[/g, '').replace(/\]/g, '');
      return l.split('').reduce((acc, char) => {
        if (acc.length === 5) {
          return acc;
        }
        if (char !== 'B') {
          return `${acc}${char}`;
        }
        return '';
      }, '').length === 5;
    });
  }

  blackPlayerWins(marked = false, lines) {
    return (lines || this.getInternalLines(marked)).some(line => PATTERNS.blackPlayerWins.test(line));
  }

  whitePlayerWins(marked = false, lines) {
    return (lines || this.getInternalLines(marked)).some(line => PATTERNS.whitePlayerWins.test(line));
  }

  mark() {
    // 6
    const _6 = this.get6();
    const _6Celds = [];
    _6.forEach((item) => {
      const match = item.match(PATTERNS.emptyPoint);
      if (match[0]) {
        _6Celds.push({
          i: parseInt(match[0].split('(')[1].split(',')[0], 10),
          j: parseInt(match[0].split(',')[1].split(')')[0], 10),
        });
      }
    });
    _6Celds.forEach((item) => {
      const row = this.marked[item.i];
      const newRow = row.replace(`[.(${item.i},${item.j})]`, `[6(${item.i},${item.j})]`);
      this.marked[item.i] = newRow;
    });

    this.internalLinesHalfMarked = this.getInternalLines(this.marked);

    // 4x4
    let _4 = (this.getOpen4(true)).concat(this.getHalfOpen4(true));
    _4 = _4.filter((item, index) => _4.indexOf(item) === index);

    let _4ForkCandidates = (this.getHalfOpen3(true)).concat(this.getOpen3(true));
    _4ForkCandidates = _4ForkCandidates.filter((item, index) => _4ForkCandidates.indexOf(item) === index);
    _4ForkCandidates = utils.match(PATTERNS.emptyPoint, _4ForkCandidates.join(''));
    _4ForkCandidates = _4ForkCandidates.filter((item, index) => _4ForkCandidates.indexOf(item) === index);

    _4ForkCandidates.forEach((item) => {
      const i = parseInt(item.split('(')[1].split(',')[0], 10);
      const j = parseInt(item.split(',')[1].split(')')[0], 10);
      this.marked[i] = this.marked[i].replace(`[.(${i},${j})]`, `[B(${i},${j})]`);
      const lines = this.getInternalLines(true);
      let new4 = (this.getOpen4(true, lines)).concat(this.getHalfOpen4(true, lines));
      new4 = new4.filter((item2, index) => new4.indexOf(item2) === index);
      new4 = new4.filter(item2 => _4.indexOf(item2) === -1);
      if (new4.length > 1) {
        this.marked[i] = this.marked[i].replace(`[B(${i},${j})]`, `[4(${i},${j})]`);
      } else {
        this.marked[i] = this.marked[i].replace(`[B(${i},${j})]`, `[.(${i},${j})]`);
      }
    });

    // 3x3
    let _3 = this.getOpen3(true);
    _3 = _3.filter((item, index) => _3.indexOf(item) === index);

    let _3ForkCandidates = this.getOpen2(true);
    _3ForkCandidates = _3ForkCandidates.filter((item, index) => _3ForkCandidates.indexOf(item) === index);
    _3ForkCandidates = utils.match(PATTERNS.emptyPoint, _3ForkCandidates.join(''));
    _3ForkCandidates = _3ForkCandidates.filter((item, index) => _3ForkCandidates.indexOf(item) === index);

    _3ForkCandidates.forEach((item) => {
      const i = parseInt(item.split('(')[1].split(',')[0], 10);
      const j = parseInt(item.split(',')[1].split(')')[0], 10);
      this.marked[i] = this.marked[i].replace(`[.(${i},${j})]`, `[B(${i},${j})]`);
      const lines = this.getInternalLines(true);
      let new3 = this.getOpen3(true, lines);
      new3 = new3.filter((item3, index) => new3.indexOf(item3) === index);
      new3 = new3.filter(item3 => _3.indexOf(item3) === -1);
      if (new3.length > 1) {
        this.marked[i] = this.marked[i].replace(`[B(${i},${j})]`, `[3(${i},${j})]`);
      } else {
        this.marked[i] = this.marked[i].replace(`[B(${i},${j})]`, `[.(${i},${j})]`);
      }
    });
  }

  /**
   * @param {number} i Row
   * @param {number} j Colum
   * @return {number} -1 Forbidden, 0 Accepted, 1 Game is over
   */
  play(i, j) {
    if (this.winner !== null || this.draw) {
      return 1;
    }

    const row = this.rows[i];
    const celds = row.split('');
    const markedMatrix = this.getMarkedMatrix();
    if (
      (this.plays === 'B' && /\[\./.test(markedMatrix[i][j]))
      || (this.plays === 'W' && /\[(\.|6|4|3)/.test(markedMatrix[i][j]))
    ) {
      celds[j] = this.plays;
      const newRow = celds.join('');
      this.rows[i] = newRow;
      this.plays = this.plays === 'B' ? 'W' : 'B';
      this.internal = this.rows.map((row2, k) => row2.split('').map((item, l) => `[${item}(${k},${l})]`).join(''));
      this.marked = JSON.parse(JSON.stringify(this.internal));

      if (this.plays === 'B') {
        this.mark();
      }

      if (this.plays === 'B' && this.whitePlayerWins()) {
        this.winner = 'W';
        return 1;
      }

      if (this.plays === 'W' && this.blackPlayerWins()) {
        this.winner = 'B';
        return 1;
      }

      if (!this.whitePlayerCanWin() && !this.blackPlayerCanWin()) {
        this.draw = true;
        return 1;
      }
      return 0;
    }
    return -1;
  }

  print() {
    const markedMatrix = this.getMarkedMatrix();
    markedMatrix.forEach((row) => {
      // eslint-disable-next-line no-console
      console.log(row
        .join('')
        .replace(/\(\d+,\d+\)/g, '')
        .replace(/\[/g, '')
        .replace(/\]/g, '')
        .split('')
        .join(' '));
    });
  }
}

module.exports = Renju;
