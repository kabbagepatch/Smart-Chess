<template>
  <div class="game">
    <Board />
  </div>
</template>

<script>
import Board from './Board.vue';

export default {
  name: 'game',
  components: {
    Board,
  },
  props: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.game {
}
</style>
