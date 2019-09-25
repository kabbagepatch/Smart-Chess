// import { getRandomInt, evaluateBoard } from './helpers';

export default function getMove(chessBoard) {
  const moves = chessBoard.moves({ verbose: true });
  return moves[0];
}
