const Game = require("../../node-ttt-solution/game");// require appropriate file
const View = require("./ttt-view"); // require appropriate file


  $(() => {
    // Your code here
    const game = new Game();
    const $figure = $(".ttt");
    const view = new View(game, $figure);
  });
