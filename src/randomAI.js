import { getRandomInt } from './helpers';

export default function getMove(chessBoard) {
  const moves = chessBoard.moves({ verbose: true });
  const randomMove = getRandomInt(moves.length);
  return moves[randomMove];
}
