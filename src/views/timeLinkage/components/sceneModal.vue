<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-08 14:52:18
 * @LastEditTime: 2019-09-19 13:55:44
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <a-modal v-model="isModal"
             :mask-closable="false"
             :width="560"
             :footer="null"
             title="添加场景"
             @cancel="cancel">
      <a-row :gutter="10">
        <a-col :span="12">
          <a-input-search v-model.trim="search"
                          placeholder="请输入场景名称搜索"
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
            <a-row v-for="item in filterScene"
                   :key="item.id"
                   class="mb10">
              <a-checkbox :value="item.id">{{ item.name }}</a-checkbox>
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

  const { timeLinkageAsk } = service;
  export default {
    name: 'SceneModal',
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
        sceneList: [],
        checkedList: [],
        spinning: false,
        search: '',
      };
    },
    computed: {
      ...mapState('timeLinkage', ['typeMap']),
      checkAll() {
        const { checkedList, filterScene } = this;
        return checkedList.length === filterScene.length && checkedList.length > 0;
      },
      indeterminate() {
        const { checkedList, filterScene } = this;
        return !!checkedList.length && checkedList.length < filterScene.length;
      },
      filterScene() {
        const { sceneList = [], data } = this;
        const scene = (sceneList && sceneList.filter(v => !data.includes(v.id))) || [];
        return scene;
      },
    },
    watch: {},
    created() {
      this.getList();
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 取消
      cancel() {
        this.$emit('cancel');
      },
      // 切换分组
      handleChangeGroup() {
        this.getList();
      },
      // 确定
      ok() {
        this.spinning = true;
        const { checkedList, sceneList } = this;
        if (checkedList.length < 1) {
          this.$message.warning('请先选择场景！');
          this.spinning = false;
          return;
        }
        let params = [];
        checkedList.forEach(v => {
          const index = sceneList.findIndex(k => k.id === v);
          if (index > -1) {
            params.push(sceneList[index]);
          }
        });
        console.log(params);
        this.$emit('ok', params);
      },
      onCheckAllChange(e) {
        const { filterScene } = this;
        Object.assign(this, {
          checkedList: e.target.checked ? filterScene && filterScene.map(v => v.id) : [],
        });
      },
      doSearch() {
        this.checkedList = [];
        this.getList();
      },
      // 查询场景列表
      async getList() {
        this.spinning = true;
        const { search, typeMap } = this;
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
          type: typeMap.scene,
          name: search,
        };
        await timeLinkageAsk
          .getTimeLinkageList(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              this.sceneList = data.taskinfo || [];
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
