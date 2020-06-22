const MoveError = require("../../node-ttt-solution/moveError");

class View {
  constructor(game, $el) {
    this.game = game;
    this.$el = $el;
    this.setupBoard();
    this.bindEvents();
  }

  bindEvents() {
    $("li").on("click", event => {
      let $clicked = $(event.currentTarget);
      this.makeMove($clicked);
    });
  }

  makeMove($square) {
    let pos = $square.data("pos");
    let mark = this.game.currentPlayer;
    // play move
    if (this.game.board.isEmptyPos(pos)) {
      $square.text(mark);
      $square.removeClass("gray");
      this.game.playMove(pos);
    } else {
      alert("Position not empty!");
    }
    // check if finished
    if (this.game.isOver()) {
      // close the listner
      $("li").off("click");
      // add result message
      let $h1 = $("<h1>");
      const $body = $("body");
      const winner = this.game.winner();
      if (winner) {
        $h1.text(`${winner}, you win!`);
      } else {
        $h1.text("No one wins!");
      }
      $body.append($h1);
      // render result
      $("li").each( (index, el) => {
        let $liEl = $(el);
        if ($liEl.text() === winner) {
          $liEl.addClass("winner");
        } else {
          $liEl.addClass("loser");
        }
      });
    }
  }

  setupBoard() {
    const $ul = $("<ul>");
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        let $li = $("<li>");
        $li.data("pos", [i, j]);
        $li.addClass("gray")
        $ul.append($li);
      }
    }
    this.$el.append($ul);
  }
}

module.exports = View;
