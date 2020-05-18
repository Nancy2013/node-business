<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-10 15:10:52
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal :title="modalTitle"
             v-model="isModal"
             :mask-closable="false"
             :width="560"
             :footer="null"
             ok-text="确定"
             cancel-text="取消"
             @cancel="cancel">
      <a-spin :spinning="spinning">
        <a-form class="reset-form-item-10">
          <template v-for="(item,index) in formatAttributes">
            <a-form-item v-if="item.valuetype===valueType.range"
                         :key="`${item.key}${index}`"
                         :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :label="item.text"
                         style="margin-bottom:0px;">
              <a-slider :marks="{[item.min]:item.min,[item.max]:item.max}"
                        :max="item.max"
                        :min="item.min"
                        :step="item.step"
                        v-model="deviceStatus[item.key]"
                        :disabled="disabled"
                        @change="(val)=>{devControl(item.key,val)}" />
            </a-form-item>
            <a-form-item v-else
                         :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :key="`${item.key}${index}`"
                         :label="item.text">
              <a-row :gutter="10">
                <a-col v-for="v in item.status"
                       :span="6"
                       :key="`${v.value}`">
                  <a-button :type="setStatus(item.key,v.value)"
                            :disabled="disabled"
                            class="reset-btn"
                            @click="()=>{devControl(item.key,v.value)}"> {{ v.text }} </a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </template>
        </a-form>
      </a-spin>
    </a-modal>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';

  const { deviceManageAsk } = service;
  export default {
    name: 'CentralControlModal',
    components: {},
    props: {
      isSingle: {
        type: Boolean,
        default: true,
      },
    },
    data() {
      return {
        isModal: true,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        spinning: false,
      };
    },
    computed: {
      ...mapState('deviceManage', ['deviceInfo', 'valueType']),
      ...mapState('groupManage', ['node']),
      ...mapState({
        deviceStatus: state => state.deviceManage.deviceInfo.status || {},
      }),
      ...mapGetters('deviceManage', ['formatAttributes']),
      disabled() {
        const { online } = this.deviceInfo;
        return online !== '1';
      },
      modalTitle() {
        // 单个控制显示设备名称，集中控制显示分组名称
        const title = this.isSingle ? this.deviceInfo.displayname : this.node.dataRef.name;
        return `设备控制-${title}`;
      },
      // 选中按钮
      setStatus() {
        return function(key, val) {
          const { status } = this.deviceInfo;
          if (status) {
            return status[key] === val ? 'primary' : null;
          }
          return null;
        };
      },
    },
    watch: {},
    created() {
      this.getAttributes();
    },
    mounted() {},
    methods: {
      ...mapMutations('deviceManage', ['updateDevice']),
      ...mapActions('deviceManage', ['getProductAttributes']),
      // 取消弹窗
      cancel() {
        this.$emit('cancel');
      },
      // 获得产品属性，自动生成控制界面
      getAttributes() {
        const { isSingle } = this;
        const { productid } = this.deviceInfo;
        const productId = isSingle ? productid : productid[0];
        const params = {
          productid: productId,
        };
        this.getProductAttributes(params);
      },
      // 控制设备
      devControl(key, val) {
        this.spinning = true;
        const { status, did } = this.deviceInfo;
        status[key] = val;
        const deviceInfo = { ...this.deviceInfo, status };
        this.updateDevice(deviceInfo);
        const { isSingle } = this;
        // 判断是否是集中控制
        const dids = isSingle ? [did] : did;
        const devctrs = dids.map(v => ({
          did: v,
          pname: key,
          pstate: `${val}`,
        }));
        const params = {
          devctrs,
        };

        deviceManageAsk
          .devControl(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .extra {
    text-align: center;
    height: 1px;
    background: #efefef;
  }
</style>
