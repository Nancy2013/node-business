<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-10 15:11:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal v-model="isModal"
             :mask-closable="false"
             :width="560"
             :footer="null"
             title="执行操作"
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
                        :default-value="parseInt(deviceStatus[item.key])||item.min"
                        @afterChange="(val)=>{setAction(item,val)}" />
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
                            class="reset-btn"
                            @click="()=>{setAction(item,v.value)}"> {{ v.text }} </a-button>
                </a-col>
              </a-row>
            </a-form-item>
          </template>
          <div class="modal-footer-btn mt20">
            <a-button @click="cancel">取消</a-button>
            <a-button class="ml10"
                      type="primary"
                      @click="ok">确定
            </a-button>
          </div>
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
    name: 'StatusModal',
    components: {},
    props: {
      status: {
        type: Object,
        default: () => {},
      },
      productid: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
        isModal: true,
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
        spinning: false,
        deviceStatus: { ...this.status },
        formartStatus: [],
        slider: 0,
      };
    },
    computed: {
      ...mapGetters('deviceManage', ['formatAttributes']),
      ...mapState('deviceManage', ['valueType']),
      // 选中按钮
      setStatus() {
        return function(key, val) {
          const { deviceStatus } = this;
          if (deviceStatus) {
            return deviceStatus[key] === val ? 'primary' : null;
          }
          return null;
        };
      },
      getFormatStatus() {
        // 格式化属性
        const { deviceStatus = {}, formatAttributes = [], valueType } = this;
        console.log(deviceStatus);
        const formatStatus = [];
        Object.keys(deviceStatus).forEach(v => {
          if (deviceStatus[v] !== null) {
            const item = formatAttributes.filter(k => k.key === v)[0] || {};
            const newItem = {
              key: v,
              value: `${deviceStatus[v]}`,
            };
            if (item.valuetype === valueType.enum || item.valuetype === valueType.string) {
              // 枚举 | 字符串
              const status = item.status.filter(k => k.value === deviceStatus[v])[0] || {};
              newItem.text = `${item.text}-${status.text || deviceStatus[v]}`;
            }
            if (item.valuetype === valueType.range) {
              // 连续型
              newItem.text = `${item.text}-${deviceStatus[v]}`;
            }
            formatStatus.push(newItem);
          }
        });
        return formatStatus;
      },
    },
    watch: {},
    async created() {
      // 获得产品属性，自动生成控制界面
      const { productid } = this;
      await this.getProductAttributes({ productid });
    },
    mounted() {},
    methods: {
      ...mapActions('deviceManage', ['getProductAttributes']),
      // 选择设备状态
      setAction(item, val) {
        console.log(item, val);
        const { deviceStatus, valueType } = this;
        let value;
        if (item.valuetype === valueType.enum || item.valuetype === valueType.string) {
          // 枚举取消选中
          value = deviceStatus[item.key] === val ? null : val;
        } else {
          value = val;
        }
        this.deviceStatus = Object.assign({}, this.deviceStatus, { [item.key]: value });
      },
      // 取消弹窗
      cancel() {
        this.$emit('cancel');
      },
      // 确定弹窗
      ok() {
        console.log(this.getFormatStatus);
        const { getFormatStatus } = this;
        if (getFormatStatus.length <= 0) {
          this.$message.warning('请选择要执行的操作！');
          return;
        }
        this.$emit('ok', getFormatStatus);
        this.cancel();
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
