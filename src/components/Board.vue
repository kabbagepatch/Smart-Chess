<template>
  <div>
    <div class="row" v-for="r in 8" v-bind:key=r>
      <div class="column" v-for="c in 8" v-bind:key=c>
        <Piece :x=r :y=c ></Piece>
      </div>
    </div>
  </div>
</template>

<script>
import Piece from './Piece.vue';

export default {
  name: 'my-grid',
  components: {
    Piece,
  },
  props: {},
};
</script>

<style scoped>
  .row {
    display: flex;
    flex-direction: row;
  }

  .column {
    display: flex;
    flex-direction: column;
  }
</style>
