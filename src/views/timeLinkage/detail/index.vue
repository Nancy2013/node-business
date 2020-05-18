<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-08-22 16:41:01
 * @LastEditTime: 2019-09-02 18:00:05
 * @LastEditors: Please set LastEditors
 -->
<!-- 定时、场景、联动 -->
<template>
  <div>
    <div>
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      </bl-header>
    </div>
    <bl-page-wrapper class="content-padding">
      <div slot="content">
        <a-spin :spinning="spinning">
          <router-view ref="dataView"
                       @updateSpinning="updateSpinning"></router-view>
        </a-spin>
      </div>
    </bl-page-wrapper>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';

  export default {
    name: 'TimeLinkageDetail',
    components: {},
    props: {},
    data() {
      return {
        spinning: false,
        id: this.$route.params.id,
        breadcrumbRoutes: [
          {
            name: '定时联动',
            breadcrumbName: '定时联动',
          },
        ],
      };
    },
    computed: {
      router() {
        const { name } = this.$route;
        let text;
        switch (name) {
          case 'timingDetail':
          case 'timingAdd':
            text = '定时';
            break;
          case 'sceneDetail':
          case 'sceneAdd':
            text = '场景';
            break;
          case 'linkageDetail':
          case 'linkageAdd':
            text = '联动';
            break;
          default:
            text = '';
        }
        return text;
      },
    },
    watch: {},
    created() {
      this.init();
    },
    mounted() {},
    methods: {
      init() {
        this.setBreadcrumb();
      },
      // 设置面包屑
      setBreadcrumb() {
        const { router } = this;
        const breadcrumbRoutes = [
          {
            name: '定时联动',
            breadcrumbName: '定时联动',
          },
        ];
        if (this.id) {
          // 详情
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: `编辑${router}`,
            },
          ];
        } else {
          // 添加
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: `添加${router}`,
            },
          ];
        }
      },

      // 更新loading
      updateSpinning(flag) {
        this.spinning = flag;
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
