<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-10-09 09:57:36
 * @LastEditors: Please set LastEditors
 -->
<!-- 定时、场景、联动 -->
<template>
  <div>
    <a-form :form="form"
            hide-required-mark
            class="reset-line-height"
            style="width:800px;">
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="场景名称">
        <a-input v-decorator="[ `name`,{
          initialValue:data.name,
          rules: [{ required: true, message: '输入场景名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]" />
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="{span:21}"
                   :colon="false"
                   label="执行设备">
        <a-button class="mr10"
                  @click="addDevice(true)">添加设备</a-button>
        <span class="actived-text"> 执行设备{{ data.effects&&data.effects.length||0 }}台</span>
        <br />
        <div v-if="data.effects&&data.effects.length>0"
             class="tag-box mt10">
          <div v-for="(item,index) in data.effects"
               :key="item.did"
               class="tag">
            <a-row>
              <!-- 自定义定时-设备信息&设备状态 -->
              <a-col :span="23">
                <Actions :actions="item"
                         @getValue="(newItem)=>{updateAcion(newItem,index,'effects')}" />
              </a-col>
              <a-col>
                <a-icon type="close-circle"
                        class="extra-icon cursor error input-icon"
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
                 title="添加设备"
                 flag="timeLinkage"
                 @cancel="handleCancelDevice"
                 @ok="handleOkDevice" />

  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { TimeLinkageDetailCreaterMix } = Mix;
  const { timeLinkageAsk } = service;
  export default {
    name: 'SceneDetail',
    components: {},
    mixins: [TimeLinkageDetailCreaterMix('scene')],
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 查询详情
      async getDetail() {
        this.$emit('updateSpinning', true);
        const { id } = this;
        const params = {
          id,
        };
        await timeLinkageAsk
          .getTimeLinkageInfo(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.data = data;
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
</style>
