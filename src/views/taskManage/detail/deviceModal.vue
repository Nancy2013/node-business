<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-08 14:52:18
 * @LastEditTime: 2019-11-01 11:44:15
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal v-model="isModal"
             :mask-closable="false"
             :width="560"
             :footer="null"
             :title="title"
             @cancel="cancel">
      <a-row :gutter="10">
        <a-col :span="12">
          <a-select v-if="flag==='timeLinkage'"
                    v-model="groupid"
                    :filter-option="filterOption"
                    :show-search="true"
                    style="width:100%"
                    @change="doSearch">
            <a-select-option :value="0">全部设备</a-select-option>
            <a-select-option v-for="v in groupList"
                             :key="v.id"
                             :value="v.id">{{ v.name }}</a-select-option>
          </a-select>
          <a-input-search v-else
                          v-model.trim="search"
                          placeholder="请输入设备名称搜索"
                          enter-button
                          @search="doSearch" />
        </a-col>

        <a-col v-if="flag==='siteid'"
               :span="12">
          <a-input-search v-model.trim="remark"
                          placeholder="请输入站点名称搜索"
                          enter-button
                          @search="doSearch" />
        </a-col>
        <a-col v-else
               :span="12">
          <a-input-search v-model.trim="did"
                          placeholder="请输入设备DID搜索"
                          enter-button
                          @search="doSearch" />
        </a-col>
      </a-row>

      <a-spin :spinning="spinning">
        <div class="modal-border-panel mt20">
          <div>
            <a-checkbox :checked="checkAll"
                        :indeterminate="indeterminate"
                        style="margin-bottom:10px;"
                        @change="onCheckAllChange">全选</a-checkbox>
          </div>
          <a-checkbox-group v-model="checkedList">
            <a-row v-for="item in filterDevice"
                   :key="item.did"
                   class="mb10">
              <a-checkbox :value="item.did">{{ `${item.displayname}(${item.did})` }}</a-checkbox>
            </a-row>
          </a-checkbox-group>
        </div>

        <div class="modal-footer-btn mt20">
          <a-button @click="cancel">取消</a-button>
          <a-button class="ml10"
                    type="primary"
                    @click="ok">确定
          </a-button>
        </div>
      </a-spin>
    </a-modal>>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { deviceManageAsk, groupManageAsk } = service;
  export default {
    name: 'DeviceModal',
    components: {},
    mixins: [],
    props: {
      title: {
        type: String,
        default: '选择设备',
      },
      data: {
        type: Array,
        default: () => [],
      },
      flag: {
        type: String,
        default: 'null',
      },
      productid: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        isModal: true,
        deviceList: [],
        checkedList: [],
        spinning: false,
        search: '',
        remark: '',
        did: '',
        groupid: 0,
        groupList: [],
      };
    },
    computed: {
      indeterminate() {
        const { checkedList, filterDevice } = this;
        return !!checkedList.length && checkedList.length < filterDevice.length;
      },
      filterDevice() {
        // 已选中的设备不显示在弹窗中
        const { data = [], deviceList } = this;
        const devices = deviceList && deviceList.filter(v => !data.includes(v.did));
        return devices || [];
      },
      checkAll() {
        const { checkedList, filterDevice } = this;
        return checkedList.length === filterDevice.length && checkedList.length > 0;
      },
    },
    watch: {},
    created() {
      if (this.flag === 'timeLinkage') {
        // 定时联动查询全部分组
        this.getAllGroup();
      }
      this.getDevice();
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 取消
      cancel() {
        this.$emit('cancel');
      },
      // 确定
      ok() {
        this.spinning = true;
        const { checkedList, deviceList } = this;
        if (checkedList.length < 1) {
          this.$message.warning('请先选择设备！');
          this.spinning = false;
          return;
        }
        const params = [];
        checkedList.forEach(v => {
          const index = deviceList.findIndex(k => k.did === v);
          if (index > -1) {
            params.push(deviceList[index]);
          }
        });
        console.log(params);
        this.$emit('ok', params);
      },
      onCheckAllChange(e) {
        const { filterDevice } = this;
        Object.assign(this, {
          checkedList: e.target.checked ? filterDevice && filterDevice.map(v => v.did) : [],
        });
      },
      doSearch() {
        this.checkedList = [];
        this.getDevice();
      },
      filterOption(input, option) {
        return (
          option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
        );
      },
      // 查询所有分组
      getAllGroup() {
        const params = {
          id: 0,
          name: '',
        };
        groupManageAsk
          .getAllGroup(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.groupList = data;
            }
          })
          .catch(e => console.error(e));
      },
      // 查询设备列表
      getDevice() {
        this.spinning = true;
        const { search, flag, did, remark, productid, groupid } = this;
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
          displayname: search,
          remark,
          did,
        };
        // 过滤设备
        switch (flag) {
          case 'siteid':
          case 'groupid':
            // 只查询空闲设备
            params[flag] = -1;
            break;
          case 'task':
            // 只查询不在线设备
            params.running = '-1';
            break;
          case 'timeLinkage':
            params.productid = productid;
            params.groupid = groupid === 0 ? null : groupid;
            break;
          default:
            break;
        }
        deviceManageAsk
          .getDevice(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.deviceList = data.deviceInfos || [];
              this.spinning = false;
            }
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
</style>
