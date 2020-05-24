# Renju

[![Build Status](https://travis-ci.org/danielmartinezvigo/renju.svg?branch=master)](https://travis-ci.org/danielmartinezvigo/renju)
[![Coverage Status](https://coveralls.io/repos/github/danielmartinezvigo/renju/badge.svg?branch=master)](https://coveralls.io/github/danielmartinezvigo/renju?branch=master)

[![NPM](https://nodei.co/npm/renju.png)](https://nodei.co/npm/renju/)

> A [Renju](http://renju.net/study/rules.php) game engine.

![](https://raw.githubusercontent.com/danielmartinezvigo/renju/master/renju.png)

__[Live demo](https://danielmartinezvigo.github.io/renju-demo/#/)__

# Installation

`npm i renju`

# Usage

## Quick Start

```javascript
const Renju = require('./renju');

const game = new Renju();

game.play(7, 7);
game.play(7, 8);
game.play(6, 7);
game.play(8, 8);
game.play(5, 6);
game.play(9, 8);
game.play(5, 8);
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

## API
**Kind**: global class  

* [Renju](#Renju)
    * [new Renju([board])](#new_Renju_new)
    * [.play(i, j)](#Renju+play) ⇒ <code>number</code>
    * [.print()](#Renju+print)
    * [.getBoard()](#Renju+getBoard) ⇒ <code>Array.&lt;string&gt;</code>
    * [.getWinner()](#Renju+getWinner) ⇒ <code>string</code>
    * [.getDraw()](#Renju+getDraw) ⇒ <code>boolean</code>

<a name="new_Renju_new"></a>

### new Renju([board])

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| [board] | <code>Object</code> |  |  |
| [board.size] | <code>number</code> | <code>15</code> | Board size, min 6, max 100 |
| [board.rows] | <code>Array.&lt;string&gt;</code> |  | Rows, i.e.: 6x6 board [    '..W.B.',    '......',    '..WB..',    '..B.W.',    '......',    '......' ] |

<a name="Renju+play"></a>

### renju.play(i, j) ⇒ <code>number</code>
Receives a move.\
If the move is not valid then returns -1.\
If the move is valid and the game ends then modifies de board state and returns 1.\
If the move is valid but the game must continue then modifies de board state and returns 0.

**Kind**: instance method of [<code>Renju</code>](#Renju)  
**Returns**: <code>number</code> ⇒ -1 Forbidden, 0 Accepted, 1 Game is over  

| Param | Type | Description |
| --- | --- | --- |
| i | <code>number</code> | Row, >= 0, <= Board Size - 1 |
| j | <code>number</code> | Colum, >= 0, <= Board Size - 1 |

<a name="Renju+print"></a>

### renju.print()
Prints in console the board state.

**Kind**: instance method of [<code>Renju</code>](#Renju)  
<a name="Renju+getBoard"></a>

### renju.getBoard() ⇒ <code>Array.&lt;string&gt;</code>
Returns the board state.

**Kind**: instance method of [<code>Renju</code>](#Renju)  
<a name="Renju+getWinner"></a>

### renju.getWinner() ⇒ <code>string</code>
Returns 'B' if blacks player won.\
Returns 'W' if whites player won.\
Return null if no one won yet.

**Kind**: instance method of [<code>Renju</code>](#Renju)  
<a name="Renju+getDraw"></a>

### renju.getDraw() ⇒ <code>boolean</code>
Returns 'true' if the game ended in a tie.

**Kind**: instance method of [<code>Renju</code>](#Renju)

# License

MIT
