<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-10-30 17:23:03
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <Topbar />
    <div class="reset-container">
      <div class="header-panel">
        <bl-header>
          <span slot="left"
                class="cursor"
                @click="goBack">
            <a-icon type="arrow-left"
                    class="mr10" />设置</span>
        </bl-header>
      </div>
      <bl-page-wrapper>
        <div slot="content">
          <div class="reset-panel">
            <div>
              <div class="form-panel">
                <div class="form-content">
                  <a-form hide-required-mark>
                    <a-form-item :label-col="labelCol"
                                 :wrapper-col="wrapperCol"
                                 :colon="false"
                                 label="APK下载">
                      <a-button :disabled="disabled"
                                type="primary"
                                block>
                        <a :href="downloadurl"
                           class="download"
                           target="_blank">下载</a></a-button>
                    </a-form-item>
                    <a-form-item :label-col="labelCol"
                                 :wrapper-col="wrapperCol"
                                 :colon="false"
                                 label="版本号">
                      <a-button block
                                disabled>{{ version }}</a-button>
                    </a-form-item>
                  </a-form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </bl-page-wrapper>
    </div>
  </div>
</template>

<script>
  import Topbar from 'viewsPath/common/Topbar.vue';
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { appAsk } = service;

  export default {
    name: 'ProjectSet',
    components: {
      Topbar,
    },
    props: {},
    data() {
      return {
        labelCol: { span: 6 },
        wrapperCol: { span: 16 },
        disabled: false,
        downloadurl: '',
        version: '',
      };
    },
    computed: {
      ...mapState('app', ['projectInfo']),
    },
    watch: {},
    created() {
      this.getapk();
    },
    mounted() {},
    methods: {
      goBack() {
        this.$router.go(-1);
      },
      // 查询apk
      getapk() {
        const { id } = this.projectInfo;
        const params = {
          projectid: id,
        };
        appAsk
          .getapk(params)
          .then(result => {
            const { errcode, data = {} } = result;
            const { downloadurl, version } = data;
            if (errcode === 200 && downloadurl) {
              this.downloadurl = downloadurl;
              this.version = version;
            } else {
              this.disabled = true;
            }
          })
          .catch(e => {
            console.error(e);
            this.disabled = true;
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .reset-container {
    .reset-panel {
      padding: 20px;
      background: #fff;
      .form-panel {
        margin-top: 100px;
        text-align: center;
      }
      .form-content {
        display: inline-block;
        width: 520px;
      }
    }
    .download {
      text-decoration: none;
    }
  }
</style>
