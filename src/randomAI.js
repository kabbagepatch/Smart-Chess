export function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

export function getMove(chess) {
  const moves = chess.moves({ verbose: true });
  const randomMove = getRandomInt(moves.length);
  return moves[randomMove];
}
