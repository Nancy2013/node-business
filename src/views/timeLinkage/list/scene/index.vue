<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-09-18 17:14:36
 * @LastEditors: Please set LastEditors
 -->
<!-- 定时、场景、联动 -->
<template>
  <div>
    <a-row :gutter="20"
           style="width:80%">
      <a-col :span="8"
             class="mb20">
        <div>
          <bl-card>
            <div class="cursor"
                 @click="add">
              <a-icon type="plus"
                      class="mr10" />添加场景</div>
          </bl-card>
        </div>
      </a-col>
      <a-col v-for="(item,index) in data"
             :key="item.id"
             :span="8"
             class="mb20">
        <bl-card :edit="()=>edit(item)"
                 bottom>
          <a-button :disabled="item.execute"
                    type="primary"
                    style="width:100px;"
                    @click="execute(item,index)">{{ item.execute?'正在执行...':'执行' }}</a-button>
          <div slot="left">
            <span class="iconfont iconchangjing- mr10"></span>
            {{ item.name }}
          </div>
        </bl-card>
      </a-col>
    </a-row>
    <div>
      <a-pagination v-if="pagination.total>0"
                    :total="pagination.total"
                    :current="pagination.current"
                    :page-size="pagination.pageSize"
                    @change="change" />
    </div>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { TimeLinkageListCreaterMix } = Mix;
  const { timeLinkageAsk } = service;

  export default {
    name: 'SceneList',
    components: {},
    mixins: [TimeLinkageListCreaterMix('scene')],
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      // 执行
      execute(item, index) {
        item.execute = true;
        const params = {
          id: item.id,
        };
        console.log(item);
        timeLinkageAsk
          .execute(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
            }
            item.execute = false;
          })
          .catch(e => {
            item.execute = false;
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
