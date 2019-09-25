export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function evaluateBoard(chessBoard, color = 'b') {
  const pieceValue = {
    p: 1,
    n: 3,
    b: 3,
    r: 5,
    q: 9,
    k: 100,
  };

  let value = 0;
  chessBoard.board().forEach((row) => {
    row.forEach((piece) => {
      if (piece) {
        value += pieceValue[piece.type] * (piece.color === color ? 1 : -1);
      }
    });
  });

  return value;
}
