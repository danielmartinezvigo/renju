/* eslint-disable no-nested-ternary */

const ERRORS = {
  CONSTRUCTOR: {
    SIZE_MUST_BE_INTEGER: 'size must be integer',
    BAD_SIZE: 'size must be >= 6 and <= 100',
    BAD_ROWS: 'rows must be string[]',
    SIZE_NEQ_ROWS_LENGTH: 'size !== rows.length',
    ROWS_ITEM_LENGTH_NEQ_ROWS_LENGTH: 'rows[i].length !== rows.length',
    INVALID_ROWS_ITEM: 'rows[i] contains invalid characters',
  },
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
      // console.log(aux)
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
    const { rows } = board;
    const size = board && board.size !== undefined ? board.size : (rows ? rows.length : 15);
    const errors = [];
    if (size !== undefined && !Number.isInteger(size)) {
      errors.push(ERRORS.CONSTRUCTOR.SIZE_MUST_BE_INTEGER);
    }
    if (size !== undefined && (size < 6 || size > 100)) {
      errors.push(ERRORS.CONSTRUCTOR.BAD_SIZE);
    }

    if (rows) {
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
    } else {
      const emptyRows = [];
      for (let i = 0; i < size; i += 1) {
        emptyRows.push('.'.repeat(size));
      }
      this.rows = emptyRows;
    }

    this.internal = this.rows.map((row, i) => row.split('').map((item, j) => `[${item}(${i},${j})]`).join(''));
  }

  getMatrix(array) {
    return (array || this.rows).map(row => row.split(''));
  }

  rotate() {
    const matrix = this.getMatrix();
    return (matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())).map(row => row.join(''));
  }

  getHorizontals() {
    return this.rows;
  }

  getVerticals() {
    return this.rotate();
  }

  getDiagonals() {
    return utils.getDiagonals(this.rows).concat(utils.getDiagonals(this.rotate()));
  }

  getLines() {
    return this.getHorizontals().concat(this.getVerticals().concat(this.getDiagonals()));
  }

  getInternalMatrix(array) {
    return (array || this.internal).map(row => row
      .split(/\[/)
      .join('')
      .split(/\]/)
      .reverse()
      .splice(1)
      .reverse());
  }

  rotateInternal() {
    const matrix = this.getInternalMatrix();
    return (matrix[0].map((val, index) => matrix.map(row => row[index]).reverse())).map(row => `[${row.join('][')}]`);
  }

  getInternalHorizontals() {
    return this.internal;
  }

  getInternalVerticals() {
    return this.rotateInternal();
  }

  getInternalDiagonals() {
    return utils.getDiagonals(this.getInternalMatrix())
      .concat(utils.getDiagonals(this.getInternalMatrix(this.rotateInternal())));
  }

  getInternalLines() {
    return this.getInternalHorizontals()
      .concat(this.getInternalVerticals().concat(this.getInternalDiagonals()));
  }

  getOpen4() {
    const patterns = [
      /(?:^|\[(?:W|\.)\(\d+,\d+\)\])(\[\.\(\d+,\d+\)\](?:\[B\(\d+,\d+\)\]){4}\[\.\(\d+,\d+\)\])(?:$|\[(?:W|\.)\(\d+,\d+\)\])/mg,
    ];
    let result = [];
    this.getInternalLines().forEach(line => (
      patterns.forEach((pattern) => {
        result = result.concat(utils.match(pattern, line));
      })
    ));
    return result;
  }
}

module.exports = Renju;
