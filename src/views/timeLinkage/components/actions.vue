<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-31 10:37:49
 * @LastEditTime: 2019-10-30 10:49:45
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-row :gutter="5">
      <a-col :span="6">
        <div class="label-input">{{ getDevicePlaceholder }}</div>
      </a-col>
      <a-col :span="1"
             style="text-align:center">
        --
      </a-col>
      <a-col :span="5">
        <a-button type="primary"
                  block
                  @click="setAction()">设置执行操作</a-button>
      </a-col>
      <a-col :span="12">
        <a-tooltip placement="bottomLeft">
          <template slot="title">
            <span>{{ getStatusPlaceholder }}</span>
          </template>
          <div class="label-input ellipsis">{{ getStatusPlaceholder }}</div>
        </a-tooltip>
      </a-col>
    </a-row>
    <!-- 执行操作-设备状态 -->
    <StatusModal v-if="isStatusModal"
                 :productid="devActions.productid"
                 :status="status"
                 @cancel="cancelStatusModal"
                 @ok="okStatusModal" />
  </div>
</template>
<script>
  // import { mapState, mapActions, mapMutations } from 'vuex';
  import StatusModal from './statusModal.vue';

  export default {
    name: 'Actions',
    components: {
      StatusModal,
    },
    mixins: [],
    props: {
      actions: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        devActions: this.actions,
        status: {},
        isStatusModal: false,
      };
    },
    computed: {
      // 显示设备信息
      getDevicePlaceholder() {
        const { devActions } = this;
        // -(${devActions.deviceid})
        return `${devActions.devicename || ''}`;
      },
      // 显示设备状态
      getStatusPlaceholder() {
        const { actions = [] } = this.devActions;
        const status = actions.map(v => v.attrname);
        return actions.length === 0 ? '暂无设置' : status.join('/');
      },
    },
    watch: {},
    created() {},
    mounted() {},
    destroyed() {},
    methods: {
      // 执行操作
      setAction() {
        this.isStatusModal = true;
        const { actions = [] } = this.devActions;
        const status = {};
        actions.forEach(v => {
          status[v.attrmethod] = v.attrvalue;
        });
        this.status = status;
      },
      // 取消执行操作
      cancelStatusModal() {
        this.isStatusModal = false;
      },
      // 确定执行操作
      okStatusModal(params) {
        const actions = params.map(v => ({
          attrmethod: v.key,
          attrname: v.text,
          attrvalue: `${v.value}`,
        }));
        const devActions = {
          ...this.devActions,
          actions,
        };
        this.devActions = Object.assign({}, this.devActions, devActions);
        this.$emit('getValue', this.devActions);
        this.cancelStatusModal();
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
