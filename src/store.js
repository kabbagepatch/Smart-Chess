/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';
import Chess from 'chess.js';
import { getMove } from './randomAI';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    chess: new Chess(),
    selectedPiece: null,
    moveResult: null,
    possibleMoves: [],
  },
  mutations: {
    selectPiece(state, data) {
      const { x, y } = data;
      const squareString = `${String.fromCharCode(96 + y)}${9 - x}`;
      const { color, type } = state.chess.get(squareString);
      state.selectedPiece = {
        x,
        y,
        squareString,
        color,
        type,
      };
      state.possibleMoves = state.chess.moves({ square: squareString });
    },
    unSelectPiece(state) {
      state.selectedPiece = null;
      state.possibleMoves = [];
    },
    moveTo(state, data) {
      state.moveResult = state.chess.move({
        from: state.selectedPiece.squareString,
        to: `${String.fromCharCode(96 + data.y)}${9 - data.x}`,
      });
      state.chess = new Chess(state.chess.fen());
      state.selectedPiece = null;
      state.possibleMoves = [];

      // AI's turn
      if (state.moveResult) {
        state.moveResult = state.chess.move(getMove(state.chess));
        state.chess = new Chess(state.chess.fen());
      }
    },
  },
  getters: {
    chess: state => state.chess,
  },
});
