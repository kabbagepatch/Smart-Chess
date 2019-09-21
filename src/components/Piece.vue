<template>
  <div
    v-bind:class="[
      x % 2 === 0 && y % 2 !== 0 || x % 2 !== 0 && y % 2 === 0 ? 'even-piece' : 'odd-piece',
      this.isSelected ? 'selected-piece' : '',
      this.isPossibleMove ? 'possible-move' : '',
      'piece',
    ]"
    @click="handleSquareClick"
  >
    <img :src=this.iconUrl v-if="this.iconUrl" />
  </div>
</template>

<script>

export default {
  name: 'generic-piece',
  props: {
    x: Number,
    y: Number,
  },
  computed: {
    currentSquareString() {
      return `${String.fromCharCode(96 + this.y)}${9 - this.x}`;
    },
    currentPiece() {
      return this.$store.state.chess.get(this.currentSquareString);
    },
    iconUrl() {
      if (!this.currentPiece) {
        return null;
      }

      if (this.currentPiece.color === 'b') {
        switch (this.currentPiece.type) {
          case 'k': return 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg';
          case 'q': return 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg';
          case 'r': return 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg';
          case 'n': return 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg';
          case 'b': return 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg';
          case 'p': return 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg';
          default:
        }
      } else {
        switch (this.currentPiece.type) {
          case 'k': return 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg';
          case 'q': return 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg';
          case 'r': return 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg';
          case 'n': return 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg';
          case 'b': return 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg';
          case 'p': return 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg';
          default:
        }
      }

      return null;
    },
    isSelected() {
      const { selectedPiece } = this.$store.state;
      return this.currentPiece
        && selectedPiece
        && selectedPiece.color === this.currentPiece.color
        && selectedPiece.type === this.currentPiece.type
        && selectedPiece.x === this.x
        && selectedPiece.y === this.y;
    },
    isPossibleMove() {
      const possibleMoveArrays = this.$store.state.possibleMoves.map(move => move.substr(-2));
      return possibleMoveArrays.includes(this.currentSquareString);
    },
  },
  methods: {
    handleSquareClick() {
      if (this.isSelected) {
        this.$store.commit('unSelectPiece');
        return;
      }
      const currentPiece = this.$store.state.chess.get(`${String.fromCharCode(96 + this.y)}${9 - this.x}`);
      if (currentPiece && currentPiece.color === this.$store.state.chess.turn()) {
        this.$store.commit('selectPiece', { x: this.x, y: this.y });
      } else if (this.$store.state.selectedPiece) {
        this.$store.commit('moveTo', { x: this.x, y: this.y });
      }
    },
  },
};
</script>

<style scoped>
  .odd-piece {
    background-color: burlywood;
  }

  .even-piece {
    background-color: rgb(105, 52, 14);
  }

  .selected-piece, .possible-move {
    outline: 4px solid yellow;
    outline-offset: -5px;
  }

  .piece, .piece img {
    height: 100px;
    width: 100px;
  }

  @media screen and (max-width: 800px) {
    .piece, .piece img {
      height: 90px;
      width: 90px;
    }
  }

  @media screen and (max-width: 700px) {
    .piece, .piece img {
      height: 70px;
      width: 70px;
    }
  }

  @media screen and (max-width: 500px) {
    .piece, .piece img {
      height: 50px;
      width: 50px;
    }
  }

  @media screen and (max-width: 350px) {
    .piece, .piece img {
      height: 30px;
      width: 30px;
    }
  }
</style>
