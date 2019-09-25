import Chess from 'chess.js';
import { getRandomInt, evaluateBoard } from './helpers';

export default function getMove(chessBoard) {
  const moves = chessBoard.moves({ verbose: true });
  let maxScore = -50000;
  let bestMoves = [];

  moves.forEach((move) => {
    const tempBoard = new Chess(chessBoard.fen());
    tempBoard.move(move);
    const score = evaluateBoard(tempBoard);
    if (score > maxScore) {
      bestMoves = [move];
      maxScore = score;
    } else if (score === maxScore) {
      bestMoves.push(move);
    }
  });

  if (bestMoves.length === 0) {
    bestMoves = moves;
  }
  const randomBestMove = getRandomInt(bestMoves.length);
  return bestMoves[randomBestMove];
}
