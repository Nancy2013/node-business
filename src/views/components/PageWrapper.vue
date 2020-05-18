<template>
  <div :style="{'min-height':minHeight+'px'}"
       class="content-panel">
    <slot name="content"></slot>
  </div>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'PageWrapper',
    components: {},
    props: {},
    data() {
      return {};
    },
    computed: {
      minHeight() {
        return this.$store.state.app.window.height - 120;
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
</style>
