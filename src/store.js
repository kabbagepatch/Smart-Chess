/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';
// import getRandomMove from './randomAI';
import getGreedyMove from './greedyAI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chessBoard: new Chess(),
    selectedPiece: null,
    moveResult: null,
    possibleMoves: [],
  },
  mutations: {
    selectPiece(state, data) {
      const { x, y } = data;
      const squareString = `${String.fromCharCode(96 + y)}${9 - x}`;
      const { color, type } = state.chessBoard.get(squareString);
      state.selectedPiece = {
        x,
        y,
        squareString,
        color,
        type,
      };
      state.possibleMoves = state.chessBoard.moves({ square: squareString });
    },
    unSelectPiece(state) {
      state.selectedPiece = null;
      state.possibleMoves = [];
    },
    moveTo(state, data) {
      state.moveResult = state.chessBoard.move({
        from: state.selectedPiece.squareString,
        to: `${String.fromCharCode(96 + data.y)}${9 - data.x}`,
      });
      state.chessBoard = new Chess(state.chessBoard.fen());
      state.selectedPiece = null;
      state.possibleMoves = [];

      // AI's turn
      setTimeout(() => {
        if (state.moveResult) {
          state.moveResult = state.chessBoard.move(getGreedyMove(state.chessBoard));
          state.chessBoard = new Chess(state.chessBoard.fen());
        }
      }, 500);
    },
  },
  getters: {
    chessBoard: state => state.chessBoard,
  },
});
