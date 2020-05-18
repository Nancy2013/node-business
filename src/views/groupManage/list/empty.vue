<template>
  <div class="empty">
    <img :src="Empty"
         alt="空分组">
    <div class="tips">当前暂无分组，添加分组后可对设备进行集中控制</div>
    <a-button type="primary"
              class="ml10"
              @click="addGroup">添加分组</a-button>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Empty from 'stylesPath/images/empty.png';

  const { groupManageAsk } = service;
  export default {
    name: 'Empty',
    components: {},
    mixins: [],
    props: {},
    data() {
      return {
        Empty,
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      addGroup() {
        this.$emit('add');
      },
    },
  };
</script>

<style lang="less" scoped>
  .empty {
    text-align: center;
    padding-top: 100px;
    img {
      width: 208px;
    }
    .tips {
      text-align: center;
      margin: 30px;
    }
  }
</style>
