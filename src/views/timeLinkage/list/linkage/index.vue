<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-09-18 17:14:50
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
                      class="mr10" />添加联动</div>
          </bl-card>
        </div>
      </a-col>
      <a-col v-for="(item) in data"
             :key="item.id"
             :span="8"
             class="mb20">
        <bl-card :edit="()=>edit(item)"
                 bottom>
          <a-button :class="{'disabled':!item.enable}"
                    type="primary"
                    style="width:100px;"
                    @click="onChange(!item.enable,item)">{{ item.enable?'正在启用':'已禁用' }}</a-button>
          <div slot="left">
            <span class="iconfont iconbiaoshilei_liandongAPIbeifen mr10"></span>
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
  import Mix from '@/mixins';

  const { TimeLinkageListCreaterMix } = Mix;
  export default {
    name: 'LinkageList',
    components: {},
    mixins: [TimeLinkageListCreaterMix('linkage')],
    props: {},
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
  .disabled {
    cursor: pointer;
  }
</style>
