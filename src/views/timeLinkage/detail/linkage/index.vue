<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-10-09 09:58:04
 * @LastEditors: Please set LastEditors
 -->
<!-- 定时、场景、联动 -->
<template>
  <div>
    <a-form :form="form"
            hide-required-mark
            class="reset-line-height"
            style="width:1050px;">
      <a-form-item :label-col="labelCol"
                   :wrapper-col="{span:5}"
                   :colon="false"
                   label="联动名称">
        <a-input v-decorator="[ `name`,{
          initialValue:data.name,
          rules: [{ required: true, message: '输入联动名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]" />
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="{span:22}"
                   :colon="false"
                   label="联动设置">
        <a-steps :current="0"
                 direction="vertical"
                 class="reset-steps"
                 size="small">
          <a-step>
            <div slot="title">
              <div><span class="title">触发条件</span>
                <span class="tips ">(当满足以下全部条件、必选)</span></div>
            </div>
            <div slot="description">
              <a-button @click="addDevice(false)">添加
              </a-button>
              <div v-for="(item,index) in data.factors"
                   :key="`${item.deviceid}${Math.random()}`"
                   class="mtb10">
                <a-row>
                  <a-col :span="22">
                    <Factor :factor.sync="item" />
                  </a-col>
                  <a-col :span="1">
                    <a-icon type="close-circle"
                            class="extra-icon cursor error input-icon"
                            @click="delDevices(index,'factors')" />
                  </a-col>
                </a-row>

              </div>
            </div>
          </a-step>
          <a-step>
            <div slot="title"><span class="title">有效时间</span>
              <a-radio-group :options="setRadio"
                             v-model="time"
                             @change="(e)=>onChangeRadioSet(e,'time')" />
              <template v-if="time===1">
                <a-time-picker :format="GLOBAL.TIME_FORMAT_TIMING"
                               v-model="starttime"
                               placeholder="开始时间"
                               style="width:100px;" />
                ~
                <a-time-picker :format="GLOBAL.TIME_FORMAT_TIMING"
                               v-model="endtime"
                               placeholder="结束时间"
                               style="width:100px;margin-right:10px;" />
              </template>
            </div>
            <div slot="description">
              <template v-if="time===1">
                <div class="mtb10">
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
                </div>

              </template>
            </div>
          </a-step>
          <a-step>
            <div slot="title"><span class="title">延时执行</span>
              <a-radio-group :options="setRadio"
                             v-model="delay"
                             @change="(e)=>onChangeRadioSet(e,'delay')" />
              <template v-if="delay===1">
                <a-select v-model="data.delay"
                          style="width: 100px"
                          @change="handleChange">
                  <a-select-option v-for="item in delayList"
                                   :key="item"
                                   :value="item">{{ `${item}分钟` }}</a-select-option>
                </a-select>
              </template>
            </div>
            <div slot="description">
            </div>
          </a-step>
          <a-step>
            <div slot="title"><span class="title">执行动作</span>
              <span class="tips ">(就执行以下动作、必选)</span></div>
            <div slot="description">
              <a-button type="primary"
                        class="mr10"
                        @click="addScene(false)">添加场景
              </a-button>
              <a-button @click="addDevice(true)">添加设备
              </a-button>
              <div v-if="isShowTask"
                   class="tag-box mt10">
                <div v-for="(item,index) in data.linktasks"
                     :key="item.id"
                     class="tag">
                  <a-row :gutter="30">
                    <a-col :span="6">
                      <div class="label-input">{{ item.name }}</div>
                    </a-col>
                    <a-col :span="1">
                      <a-icon type="close-circle"
                              class="extra-icon cursor error input-icon"
                              @click="delDevices(index,'linktasks')" />
                    </a-col>
                  </a-row>
                </div>

                <div v-for="(item,index) in data.effects"
                     :key="item.deviceid"
                     class="tag">
                  <a-row>
                    <!-- 自定义定时-设备信息&设备状态 -->
                    <a-col :span="22">
                      <Actions :actions="item"
                               @getValue="(newItem)=>{updateAcion(newItem,index,'effects')}" />
                    </a-col>
                    <a-col :span="1">
                      <a-icon type="close-circle"
                              class="extra-icon cursor error input-icon"
                              @click="delDevices(index,'effects')" />
                    </a-col>
                  </a-row>
                </div>
              </div>
            </div>
          </a-step>
        </a-steps>
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
    <!-- 添加场景-->
    <SceneModal v-if="isSceneModal"
                :data="ids"
                @cancel="handleCancelScene"
                @ok="handleOkScene" />
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
  import SceneModal from 'viewsPath/timeLinkage/components/sceneModal.vue';
  import Factor from 'viewsPath/timeLinkage/components/factor.vue';

  const { TimeLinkageDetailCreaterMix } = Mix;
  const { timeLinkageAsk } = service;
  export default {
    name: 'LinkageDetail',
    components: {
      SceneModal,
      Factor,
    },
    mixins: [TimeLinkageDetailCreaterMix('linkage')],
    props: {},
    data() {
      return {
        delayList: [],
        isSceneModal: false,
        ids: [],
        time: 0,
        delay: 0,
        starttime: null,
        endtime: null,
      };
    },
    computed: {
      isShowTask() {
        const { effects = [], linktasks = [] } = this.data;
        return effects.length > 0 || linktasks.length > 0;
      },
    },
    watch: {},
    created() {
      this.setDelay();
    },
    mounted() {},
    methods: {
      // 设置延时
      setDelay() {
        let delayList = [];
        for (let i = 1; i <= 60; i += 1) {
          delayList.push(i);
        }
        this.delayList = delayList;
      },
      // 设置延时执行
      onChangeDelay(e) {
        const { value } = e.target;
        this.delay = value;
        this.data = Object.assign({}, this.data, { delay: this.delay });
      },
      handleChange() {},
      // 添加场景
      addScene() {
        const { linktasks = [] } = this.data;
        this.ids = linktasks.map(v => v.id);
        this.isSceneModal = true;
      },
      // 取消添加场景弹窗
      handleCancelScene() {
        this.isSceneModal = false;
      },
      // 确定场景弹窗
      handleOkScene(params) {
        console.log(params);
        const { linktasks = [] } = this.data;
        this.data = Object.assign({}, this.data, { linktasks: linktasks.concat(params) });
        this.handleCancelScene();
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
              const { schedule = {}, effects = [], type, delay } = data;
              data.schedule = {
                ...schedule,
              };
              // 是否设置重复
              this.time = schedule.starttime ? 1 : 0;
              this.starttime = schedule.starttime
                ? this.$moment(schedule.starttime, GLOBAL.TIME_FORMAT_TIMING)
                : null;
              this.endtime = schedule.endtime
                ? this.$moment(schedule.endtime, GLOBAL.TIME_FORMAT_TIMING)
                : null;
              // 是否设置延时
              this.delay = delay ? 1 : 0;
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
  .tips {
    color: @bl-gray-9;
    font-size: @bl-font-size-sm;
  }
</style>
