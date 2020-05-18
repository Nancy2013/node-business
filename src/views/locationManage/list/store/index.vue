<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 11:07:16
 * @LastEditTime: 2019-09-18 16:14:38
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-spin :spinning="spinning">
    <div class="list-panel">
      <ul>
        <li v-for="item in data"
            :key="item.id"
            class="cursor mb10"
            @click="()=>detail(item)">
          <span class="title mr10">{{ item.name }}</span>
          <span class="address">{{ `${item.provincial}${item.urban}${item.areas}${item.location}` }}</span>
        </li>
      </ul>
      <div class="mt20">
        <a-pagination v-if="total>0"
                      :total="total"
                      :current="current"
                      :page-size="GLOBAL.PAGE_SIZE_S"
                      @change="change" />
      </div>
    </div>
  </a-spin>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { LocationListCreaterMix } = Mix;
  const { locationManageAsk } = service;

  export default {
    name: 'StoreList',
    components: {},
    mixins: [LocationListCreaterMix('store')],
    props: {},
    data() {
      return {
        data: [],
      };
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
  .list-panel {
    display: inline-block;
    width: 50%;
    li {
      padding: 8px;
      border: @bl-border-width-base @bl-border-style-base @bl-border-color-base;
      border-radius: @bl-border-radius-base;
    }
    .title {
      font-size: @bl-font-size-lg;
      font-weight: @bl-font-weight-base;
    }
    .address {
      overflow: hidden;
    }
  }
</style>
