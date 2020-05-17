Renju
===========

[![Build Status](https://travis-ci.org/danielmartinezvigo/renju.svg?branch=master)](https://travis-ci.org/danielmartinezvigo/renju)
[![Coverage Status](https://coveralls.io/repos/github/danielmartinezvigo/renju/badge.svg?branch=master)](https://coveralls.io/github/danielmartinezvigo/renju?branch=master)

> A [Renju](http://renju.net/study/rules.php) game engine.

![](https://raw.githubusercontent.com/danielmartinezvigo/renju/master/renju.png)

# Installation

`npm i renju`

# Usage

## Quick Start

```javascript
const Renju = require('./renju');

const game = new Renju();

// B
game.play(7, 7);
// W
game.play(7, 8);
// B
game.play(6, 7);
// W
game.play(8, 8);
// B
game.play(5, 6);
// W
game.play(9, 8);
// B
game.play(5, 8);
// W
game.play(10, 8);

game.print();

/*
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
. . . . . . B 3 B . . . . . .
. . . . . . . B . . . . . . .
. . . . . . . B W . . . . . .
. . . . . . . . W . . . . . .
. . . . . . . . W . . . . . .
. . . . . . . . W . . . . . .
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
. . . . . . . . . . . . . . .
*/
```

# License

MIT
