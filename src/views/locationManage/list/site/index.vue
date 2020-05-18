<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 11:07:11
 * @LastEditTime: 2019-09-18 15:59:20
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-spin :spinning="spinning">
    <div class="flex-panel">
      <div v-for="item in data"
           :key="item.id"
           class="flex-item mb20">
        <a-card hoverable
                class="reset-padding"
                @click="()=>detail(item)">
          <img slot="cover"
               :src="item.picurl||defaultImg"
               alt="site" />
          <a-card-meta :title="item.name">
            <template slot="description">
              <div class="location">{{ location(item) }} </div>
              <div class="extra mt10">共{{ item.devicecnt||0 }}台设备</div>
            </template>
          </a-card-meta>
        </a-card>
      </div>
    </div>
    <div>
      <a-pagination v-if="total>0"
                    :total="total"
                    :current="current"
                    :page-size="GLOBAL.PAGE_SIZE_S"
                    @change="change" />
    </div>
  </a-spin>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';
  import defaultImg from 'stylesPath/images/default.png';

  const { locationManageAsk } = service;
  const { LocationListCreaterMix } = Mix;
  export default {
    name: 'SiteList',
    components: {},
    mixins: [LocationListCreaterMix('site')],
    props: {},
    data() {
      return {
        defaultImg,
      };
    },
    computed: {
      location() {
        return function(item) {
          const { provincial, urban, areas, location } = item;
          return `${provincial}${urban}${areas}${location}`;
        };
      },
    },
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
  .flex-panel {
    display: flex;
    flex-wrap: wrap;
    .flex-item {
      margin-right: 20px;
      width: 17%;
    }
  }
  .extra {
    color: @bl-gray-3;
  }
  img {
    border-radius: @bl-border-radius-base;
    object-fit: cover;
    overflow: hidden;
  }
  .location {
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
