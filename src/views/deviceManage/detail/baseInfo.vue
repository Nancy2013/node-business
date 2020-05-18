<template>
  <div>
    <a-form class="reset-form-item reset-form-item-label"
            style="width:800px;">
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="设备名称">
        <span>{{ device.displayname }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="设备DID">
        <span>{{ device.did }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="location">
        <span>{{ device.location }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="备注">
        <span>{{ device.remark }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="SSID">
        <span>{{ device.ssidname }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="IP">
        <span>{{ device.ip }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="设备状态">
        <span :class="{error:device.online!=='1'}">{{ device.online==='1'?'在线':'离线' }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="安装工">
        <span>{{ device.workername }}</span>
      </a-form-item>
      <a-form-item :label-col="labelCol"
                   :wrapper-col="wrapperCol"
                   :colon="false"
                   label="安装时间">
        <span>{{ device.installdate }}</span>
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
  import { mapState, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { deviceManageAsk } = service;
  export default {
    name: 'BaseInfo',
    components: {},
    mixins: [],
    props: {},
    data() {
      return {
        did: this.$route.params.did,
        device: {},
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
      };
    },
    computed: {
      ...mapState('app', ['running']),
    },
    watch: {},
    created() {
      this.getDevice();
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 查询设备详情
      getDevice() {
        const { did } = this;
        const params = {
          did,
        };
        deviceManageAsk
          .getDevice(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { deviceInfos } = data;
              this.device = deviceInfos ? deviceInfos[0] : {};
              const { installdate, running } = this.device;
              this.device.installdate = installdate
                ? this.$moment(installdate).format(this.GLOBAL.TIME_FOEMAT)
                : '';
              if (running) {
                const status = this.running.filter(v => v.value === running)[0];
                this.device.running = status ? status.text : '';
              }
            }
          })
          .catch(e => console.error(e));
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
