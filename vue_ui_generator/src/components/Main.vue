<template>
  <div class="container" id="app">
    Main.vue
    <CanvasPoint
      v-bind:width="width"
      v-bind:height="height"
      v-bind:drawValue="drawValue"
      v-bind:backgroundValue="backgroundValue"
    />
  </div>
</template>

<script>
import CanvasPoint from "./CanvasPoint.vue";

export default {
  name: "Main",
  components: {
    CanvasPoint
  },
  props: {
    msg: String
  },
  data() {
    return {
      //已经记录的数据条数
      dataNum: 0,
      //是否处于记录数据的状态
      startRecord: true,
      //生成程序的长、宽
      width: 28,
      height: 28,
      drawValue: 220,
      backgroundValue: 45
    };
  },
  created() {
    console.log("Main created");
  },
  mounted() {
    console.log("Main mounted");
  },
  methods: {
    debug() {
      this.width++;
      console.log("Main.vue click");
      console.log("width in Main.vue after change == ", this.width);
    }
  }
};
</script>
