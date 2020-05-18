<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-10-30 10:47:20
 * @LastEditors: Please set LastEditors
 -->
<!-- 定时、场景、联动 -->
<template>
  <div>
    <div v-if="!id">
      <div class="tips">
        选择要添加定时的种类
      </div>
      <div class="btn-panel mtb20">
        <div :class="{hover:data.type===typeMap.normal}"
             class="btn mr10"
             @click="selectType(typeMap.normal)">
          <div class="title">普通定时</div>
          <div class="tips">多个设备(相同类型)执行一个操作</div>
        </div>
        <div :class="{hover:data.type===typeMap.define}"
             class="btn"
             @click="selectType(typeMap.define)">
          <div class="title">自定义定时</div>
          <div class="tips">多个设备执行多个操作</div>
        </div>
      </div>
    </div>
    <a-form :form="form"
            hide-required-mark
            class="reset-line-height"
            style="width:800px;">
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="定时名称">
        <a-input v-decorator="[ `name`,{
          initialValue:data.name,
          rules: [{ required: true, message: '输入定时名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]" />
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="执行时间">
        <a-time-picker v-decorator="[ `operatetime`,{
          initialValue:data.schedule.starttime,
          rules: [{ required: true, message: '请选择执行时间'}],} ]"
                       :format="GLOBAL.TIME_FORMAT_TIMING"
                       style="width:100%" />
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="{span:22}"
                   :colon="false"
                   label="重复设置">
        <a-radio-group :options="repeatRadio"
                       v-model="data.schedule.isrepeat"
                       @change="onChangeRadio" />
        <template v-if="data.schedule.isrepeat===1">
          <a-button v-for="item in repeat"
                    :key="item.key"
                    :type="setStatus(item)"
                    class="mr10"
                    @click="setRepeat(item)">{{ item.text }}</a-button>
        </template>

      </a-form-item>
      <a-form-item v-if="data.type===typeMap.normal"
                   :label-col="labelCol"
                   :wrapper-col="{span:12}"
                   :colon="false"
                   label="执行操作">
        <a-row :gutter="10">
          <a-col :span="16">
            <a-select v-model="productid"
                      style="width:100%"
                      @change="handleChange">
              <a-select-option v-for="v in productList"
                               :key="v.id"
                               :value="v.id">{{ v.productname }}</a-select-option>
            </a-select>
          </a-col>
          <a-col :span="8">
            <a-button type="primary"
                      block
                      @click="setAction()">设置执行操作</a-button>
          </a-col>
        </a-row>
        <a-tooltip placement="bottomLeft">
          <template slot="title">
            <span>{{ getPlaceholder }}</span>
          </template>
          <div class="label-input ellipsis mt10">{{ getPlaceholder }}</div>
        </a-tooltip>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="{span:21}"
                   :colon="false"
                   label="执行设备">
        <a-button class="mr10"
                  @click="addDevice(true)">添加设备</a-button>
        <span class="actived-text"> 执行设备{{ data.effects&&data.effects.length||0 }}台</span>
        <br />
        <!-- 普通定时 -->
        <div v-if="data.effects&&data.effects.length>0"
             class="tag-box mt10">
          <div v-for="(item,index) in data.effects"
               :key="item.deviceid"
               class="tag">
            <a-row>
              <template v-if="data.type===typeMap.normal">
                <a-col :span="22">
                  {{ `${item.devicename}-(${item.deviceid})` }}
                </a-col>
              </template>
              <template v-else>
                <!-- 自定义定时-设备信息&设备状态 -->
                <a-col :span="22">
                  <Actions :actions="item"
                           class="tag"
                           @getValue="(newItem)=>{updateAcion(newItem,index,'effects')}" />
                </a-col>
              </template>
              <a-col>
                <a-icon :class="{'input-icon':data.type!==typeMap.normal}"
                        type="close-circle"
                        class="extra-icon cursor error"
                        @click="delDevices(index,'effects')" />
              </a-col>
            </a-row>
          </div>
        </div>
      </a-form-item>
      <a-form-item :label-col="{span:0}"
                   :wrapper-col="{span:24}"
                   :colon="false"
                   label=""
                   style="margin-top:100px;">
        <a-button class="mr10"
                  @click="cancel">取消</a-button>
        <a-button v-if="id"
                  class="mr10"
                  type="danger"
                  @click="showDelModal">删除</a-button>
        <a-button class="mr10"
                  type="primary"
                  @click="ok">确定
        </a-button>
      </a-form-item>
    </a-form>
    <!-- 添加设备-->
    <DeviceModal v-if="isDeviceModal"
                 :data="dids"
                 :productid="productid"
                 title="添加设备"
                 flag="timeLinkage"
                 @cancel="handleCancelDevice"
                 @ok="handleOkDevice" />

    <!-- 执行操作-设备状态 -->
    <StatusModal v-if="isStatusModal"
                 :productid="productid"
                 :status="status"
                 @cancel="cancelStatusModal"
                 @ok="okStatusModal" />
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { TimeLinkageDetailCreaterMix } = Mix;
  const { timeLinkageAsk } = service;

  export default {
    name: 'TimingDetail',
    components: {},
    mixins: [TimeLinkageDetailCreaterMix('timing')],
    props: {},
    data() {
      return {
        type: '',
        productid: '',
        productList: [],
      };
    },
    computed: {
      getPlaceholder() {
        const { actions = [] } = this.current;
        const status = actions.map(v => v.attrname);
        return actions.length === 0 ? this.empty : status.join('/');
      },
    },
    watch: {},
    async created() {
      await this.getProduct();
      this.initData();
    },
    mounted() {},
    methods: {
      initData() {
        // 添加时默认普通定时
        const { id, typeMap } = this;
        if (!id) {
          // 添加
          this.selectType(typeMap.normal);
        }
      },
      // 选择定时类型
      async selectType(flag) {
        // 切换定时内容需要重置数据
        if (flag === this.typeMap.define) {
          this.productid = null;
          this.current = {};
        } else {
          await this.getProduct();
        }
        const data = {
          ...this.data,
          type: flag,
          effects: [],
        };
        this.data = Object.assign({}, this.data, data);
      },

      // 切换执行操作
      handleChange() {
        this.current = {};
        this.data = Object.assign({}, this.data, { effects: [] });
      },
      // 执行操作
      setAction() {
        if (this.productid) {
          this.isStatusModal = true;
        } else {
          this.$message.warning('请先选择执行类型');
        }
        const { actions = [] } = this.current;
        const status = {};
        actions.forEach(v => {
          status[v.attrmethod] =
            v.valuetype === this.valueType.range ? parseInt(v.attrvalue) : v.attrvalue; // 枚举类型需要转化为数值
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
        this.current = Object.assign({}, this.current, { actions });
        this.cancelStatusModal();
      },
      // 执行操作验证
      validatorAction(rule, value, callback) {
        // 执行操作验证
        const { actions = [] } = this.current;
        if (actions.length <= 0) {
          callback('请设置执行操作');
        } else {
          callback();
        }
      },
      // 查询详情
      async getDetail() {
        this.$emit('updateSpinning', true);
        const { id, typeMap, GLOBAL } = this;
        const params = {
          id,
        };
        await timeLinkageAsk
          .getTimeLinkageInfo(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { schedule = {}, effects = [], type } = data;
              data.schedule = {
                ...schedule,
                starttime: schedule.starttime
                  ? this.$moment(schedule.starttime, GLOBAL.TIME_FORMAT_TIMING)
                  : null,
              };
              this.data = data;
              this.current = effects[0] || {};
              this.productid = type === typeMap.normal ? effects[0].productid : null; // 设置产品id
            }
            this.$emit('updateSpinning', false);
          })
          .catch(e => {
            this.$emit('updateSpinning', false);
            console.error(e);
          });
      },
      // 查询产品列表
      async getProduct() {
        const params = {
          offset: 1,
          limit: this.GLOBAL.MAX_LEN,
        };
        await timeLinkageAsk
          .getProduct(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { productsinfo = [] } = data;
              this.productList = productsinfo;
              this.productid = productsinfo[0].id;
            }
            this.$emit('updateSpinning', false);
          })
          .catch(e => {
            this.$emit('updateSpinning', false);
            console.error(e);
          });
      },
    },
  };
</script>
<style lang="less" scoped>
  .tips {
    color: @bl-gray-9;
    font-size: @bl-font-size-sm;
  }
  .btn {
    display: inline-block;
    width: 220px;
    text-align: center;
    border: @bl-border-width-base @bl-border-style-base @bl-card-border-color;
    border-radius: @bl-border-radius-sm;
    padding: @bl-padding-md;
    cursor: pointer;
    &.hover {
      background: rgba(@theme-color, 0.1);
      border-color: @theme-color;
    }
  }
</style>
