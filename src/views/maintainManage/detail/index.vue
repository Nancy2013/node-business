<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-09-17 13:57:02
 * @LastEditTime: 2019-09-18 15:56:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-spin :spinning="spinning">
    <div>
      <div class="header-panel">
        <bl-header>
          <bl-breadcrumb slot="left"
                         :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
        </bl-header>
      </div>
      <bl-page-wrapper>
        <div slot="content"
             class="pl20">
          <a-form class="reset-form-item-10 reset-form-item-label">
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="站点名称">
              <span>{{ maintainInfos.location }}</span>
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="上次维护">
              <span>{{ maintainInfos.lastcheck }}</span>
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="维护周期">
              <a-select v-model="cyclevalue"
                        class="component-w-224">
                <a-select-option v-for="item in cycleList"
                                 :key="item.value"
                                 :value="item.value">
                  {{ item.text }}
                </a-select-option>
              </a-select>
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="当前状态">
              <a-button :type="wType()"
                        class="mr10"
                        style="width: 88px"
                        @click="wClick">待维护</a-button>
              <a-button :type="aType()"
                        class="mr10"
                        style="width: 88px"
                        @click="aClick">已维护</a-button>
            </a-form-item>
            <a-form-item :label-col="{span:0}"
                         :wrapper-col="{span:24}"
                         :colon="false"
                         label="">
              <a-button class="mr10"
                        @click="cancel">取消</a-button>
              <a-button class="mr10"
                        type="primary"
                        @click="ok">保存
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </bl-page-wrapper>
    </div>
  </a-spin>
</template>
<script>
  import { mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { maintainManageAsk, locationManageAsk } = service;
  export default {
    name: 'MaintainDetail',
    components: {},
    mixins: [],
    props: {},
    data() {
      return {
        id: this.$route.params.id,
        form: this.$form.createForm(this),
        breadcrumbRoutes: [],
        spinning: false,
        maintainInfos: [],
        labelCol: { span: 2 },
        wrapperCol: { span: 20 },
        cycleList: [
          {
            text: '1个月',
            value: 1,
          },
          {
            text: '3个月',
            value: 3,
          },
          {
            text: '6个月',
            value: 6,
          },
          {
            text: '12个月',
            value: 12,
          },
        ],
        cyclevalue: this.$route.params.checkcycle,
        statusvalue: '',
        defaultStatus: '',
      };
    },
    computed: {
      wType() {
        return function() {
          const { statusvalue } = this;
          if (statusvalue) {
            return statusvalue == '1' ? 'primary' : null;
          }
          return null;
        };
      },
      aType() {
        return function() {
          const { statusvalue } = this;
          if (statusvalue) {
            return statusvalue == '0' ? 'primary' : null;
          }
          return null;
        };
      },
    },
    watch: {},
    created() {
      this.setBreadcrumb();
      if (this.id) {
        this.getSite();
      }
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 设置面包屑
      setBreadcrumb() {
        const breadcrumbRoutes = [
          {
            name: '维护管理',
            breadcrumbName: '维护列表',
          },
          {
            name: '',
            breadcrumbName: '站点维护详情',
          },
        ];
        this.breadcrumbRoutes = breadcrumbRoutes;
      },
      wClick() {
        const { defaultStatus } = this;
        if (defaultStatus == '0') {
          this.$message.warning('已维护状态不可更改为待维护状态！');
          return;
        }
        this.statusvalue = '1';
      },
      aClick() {
        this.statusvalue = '0';
      },
      cancel() {
        this.$router.back();
      },
      ok() {
        this.modSiteDetails();
      },
      // 修改站点维护详情
      modSiteDetails() {
        this.spinning = true;
        const { id, cyclevalue, statusvalue } = this;
        const params = {
          checkcycle: cyclevalue,
          id,
          status: `${statusvalue}`,
        };
        maintainManageAsk
          .modSiteDetails(params)
          .then(result => {
            const { errcode } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'maintainList' });
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 查询站点维护详情
      getSite() {
        this.spinning = true;
        const { id } = this;
        const params = {
          id: parseInt(id),
        };
        locationManageAsk
          .siteList(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { sitelocations } = data;
              this.maintainInfos = sitelocations ? sitelocations[0] : [];
              const { lastcheck, status } = this.maintainInfos;
              this.maintainInfos.lastcheck = lastcheck
                ? this.$moment(lastcheck).format(this.GLOBAL.TIME_FOEMAT)
                : '';
              this.statusvalue = status ? `${status}` : '';
              this.defaultStatus = this.statusvalue;
            }
            this.spinning = false;
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
