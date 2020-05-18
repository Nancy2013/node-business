<template>
  <a-modal v-model="isModal"
           :mask-closable="false"
           :width="500"
           :footer="null"
           title="按分组添加"
           class="modal"
           @cancel="cancel">
    <div class="modal-border-panel">
      <a-tree v-model="checkedKeys"
              :load-data="onLoadData"
              :tree-data="treeData"
              :auto-expand-parent="false"
              checkable
              @check="onCheck">
      </a-tree>
    </div>

    <div class="modal-footer-btn mt10">
      <a-button @click="cancel">取消</a-button>
      <a-button class="ml10"
                type="primary"
                @click="ok">确定
      </a-button>
    </div>
  </a-modal>
</template>
<script>
  // import { mapState, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { groupManageAsk } = service;
  export default {
    name: 'DeviceModal',
    components: {},
    mixins: [],
    props: {
      data: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        isModal: true,
        treeData: [],
        checkedKeys: [],
      };
    },
    computed: {},
    watch: {
      checkedKeys(val) {
        console.log('onCheck', val);
      },
    },
    created() {
      this.init();
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 初始化
      async init() {
        const { groups } = await this.getGroup(null);
        this.treeData = groups.map(v => ({
          key: v.id,
          title: `${v.name}(${v.devicenum || 0}台)`,
          children: [{}],
          ...v,
        }));
      },
      // 点击复选框
      onCheck(checkedKeys, { checked, checkedNodes, node, event }) {},
      // 请求数据
      async onLoadData(treeNode) {
        console.log(treeNode);
        const { eventKey } = treeNode;
        const params = {
          id: eventKey,
        };
        const { dataRef = {} } = treeNode;
        const { groups } = await this.getGroup(eventKey);
        // 组
        const groupData = groups.map(v => ({
          key: v.id,
          title: `${v.name}(${v.devicenum || 0}台)`,
          ...v,
        }));
        // 组合数据
        treeNode.dataRef.children = [...groupData];
        this.treeData = [...this.treeData];
      },
      // 取消
      cancel() {
        this.$emit('cancel');
      },
      // 确定
      ok() {
        const { checkedKeys } = this;
        console.log(checkedKeys);
        if (checkedKeys.length > 0) {
          const { devices = [] } = this.getAllDevice(checkedKeys[0]);
          this.$emit('ok', devices);
        } else {
          this.$message.warning('请先选择分组！');
        }
      },
      // 查询分组
      async getGroup(id) {
        const params = {
          id,
        };
        const { errcode, data = [] } = await groupManageAsk.getGroup(params);
        return { groups: data };
      },
      // 查询设备
      async getAllDevice(id) {
        const params = {
          id,
          offset: 1,
          limit: this.GLOBAL.MAX_LEN,
        };
        const { errcode, data = {} } = await groupManageAsk.getDevice(params);
        return { devices: data.deviceInfos };
      },
    },
  };
</script>

<style lang="less" scoped>
  .modal {
    max-height: 768px;
    overflow: auto;
  }
</style>
