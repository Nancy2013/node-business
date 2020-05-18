<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-15 11:04:03
 * @LastEditTime: 2019-10-10 17:29:22
 * @LastEditors: Please set LastEditors
 -->
<template>
  <a-spin :spinning="spinning">
    <div>
      <bl-header>
        <bl-breadcrumb slot="left"
                       :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      </bl-header>
      <bl-page-wrapper class="content-padding">
        <div slot="content">
          <a-form :form="form"
                  hide-required-mark
                  class="reset-line-height"
                  style="width:800px;">
            <a-form-item :label-col="labelCol"
                         :wrapper-col="wrapperCol"
                         :colon="false"
                         label="站点名称">
              <a-input v-decorator="[ `name`,{
          initialValue:data.name,
          rules: [{ required: true, message: '输入站点名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]" />
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="{span:20}"
                         :colon="false"
                         label="站点位置">
              <bl-cascader :default-value="defaultValue"
                           style="margin-right:10px;"
                           @update="updateLocation" />
              <a-input v-decorator="[ `location`,{
          initialValue:data.location,
          rules: [{ required: true, message: '输入详细站点位置' }],} ]"
                       placeholder="详细地址：如道路门牌"
                       class="component-w-224" />
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="{ md: {span:20}}"
                         :colon="false"
                         label="站点设备">
              <div>
                <a-button type="primary"
                          @click="addDevice">添加设备</a-button>
              </div>
              <div v-if="data.devices&&data.devices.length>0"
                   class="tag-box mt10">
                <div v-for="(item,index) in data.devices"
                     :key="item.did"
                     class="tag">
                  <a-row>
                    <a-col :span="22">
                      {{ `${item.displayname}-(${item.did})-${item.location||''}` }}
                    </a-col>
                    <a-col :span="2">
                      <a-icon type="close-circle"
                              class="extra-icon cursor error"
                              @click="delDevices(index)" />
                    </a-col>
                  </a-row>
                </div>
              </div>
            </a-form-item>
            <a-form-item :label-col="labelCol"
                         :wrapper-col="{span:10}"
                         :colon="false"
                         label="站点图片">
              <a-upload :file-list="fileList"
                        :before-upload="beforeUpload"
                        :remove="handleRemove"
                        list-type="picture-card"
                        @preview="handlePreview"
                        @change="handleChange">
                <div v-if="fileList.length < 1">
                  <a-icon type="plus" />
                  <div class="ant-upload-text">上传照片</div>
                </div>
              </a-upload>
              <span class="tips">
                <span>图片大小:{{ GLOBAL.IMG_WIDTH }}*{{ GLOBAL.IMG_HEIGHT }}px</span>
                <br />
                <span>文件格式:jpg或png</span>
              </span>
              <a-modal :visible="previewVisible"
                       :footer="null"
                       :width="500"
                       @cancel="handleCancelModal">
                <img :src="previewImage"
                     alt="big"
                     style="width: 95%" />
              </a-modal>
            </a-form-item>
            <a-form-item :label-col="{span:0}"
                         :wrapper-col="{span:24}"
                         :colon="false"
                         label=""
                         style="margin-top:100px;">
              <a-button class="mr10"
                        @click="cancel">取消</a-button>
              <a-button v-if="id"
                        class="mr10"
                        type="danger"
                        @click="showDelModal">删除</a-button>
              <a-button class="mr10"
                        type="primary"
                        @click="ok">确定
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </bl-page-wrapper>
    </div>
    <!-- 按设备添加-->
    <DeviceModal v-if="isDeviceModal"
                 :data="dids"
                 title="添加设备"
                 flag="siteid"
                 @cancel="handleCancelDevice"
                 @ok="handleOkDevice" />
  </a-spin>
</template>
<script>
  import { mapState, mapGetters, mapMutations, mapActions } from 'vuex';
  import service from 'servicePath/index';
  import DeviceModal from 'viewsPath/taskManage/detail/deviceModal.vue';
  import GroupModal from './deviceModal.vue';

  const { appAsk, locationManageAsk } = service;

  export default {
    name: 'SiteDetail',
    components: {
      GroupModal,
      DeviceModal,
    },
    props: {},
    data() {
      return {
        data: {
          devices: [],
        },
        spinning: false,
        id: this.$route.params.id,
        form: this.$form.createForm(this),
        labelCol: { span: 2 },
        wrapperCol: { span: 6 },
        breadcrumbRoutes: [],
        provincial: '',
        urban: '',
        areas: '',
        defaultValue: undefined,
        isGroupModal: false,
        isDeviceModal: false,
        dids: [],
        previewVisible: false,
        previewImage: '',
        fileList: [],
      };
    },
    computed: {},
    watch: {},
    created() {
      this.init();
    },
    mounted() {},
    methods: {
      init() {
        this.setBreadcrumb();
        const { id, data } = this;
        if (id) {
          this.getDetail();
        } else {
          this.data = {
            ...data,
            provincial: '北京市',
            urban: '市辖区',
            areas: '东城区',
          };
        }
      },
      // 设置面包屑
      setBreadcrumb() {
        const breadcrumbRoutes = [
          {
            name: '位置管理',
            breadcrumbName: '全部位置',
          },
        ];
        if (this.id) {
          // 详情
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: '站点详情',
            },
          ];
        } else {
          // 添加站点
          this.breadcrumbRoutes = [
            ...breadcrumbRoutes,
            {
              name: '',
              breadcrumbName: '添加站点',
            },
          ];
        }
      },
      // 更新位置
      updateLocation(params) {
        const [provincial, urban, areas] = params;
        this.data = {
          ...this.data,
          provincial,
          urban,
          areas,
        };
      },

      // 按设备添加
      addDevice() {
        const { devices = [] } = this.data;
        this.dids = devices.map(v => v.did);
        this.isDeviceModal = true;
      },
      // 删除设备
      delDevices(index) {
        const { devices } = this.data;
        devices.splice(index, 1);
        this.data = Object.assign({}, this.data, { devices });
      },
      // 取消按分组添加
      handleCancelGroup() {
        this.isGroupModal = false;
      },

      // 取消按设备添加
      handleCancelDevice() {
        this.isDeviceModal = false;
      },
      // 确定按设备添加
      handleOkDevice(params = []) {
        const { devices = [] } = this.data;
        this.data = Object.assign({}, this.data, { devices: devices.concat(params) });
        this.handleCancelDevice();
      },
      /* 添加图片 */
      handleCancelModal() {
        this.previewVisible = false;
      },
      // 预览
      handlePreview(file) {
        this.previewImage = file.url || file.thumbUrl;
        this.previewVisible = true;
      },
      handleChange({ fileList }) {},
      // 删除文件
      handleRemove(file) {
        const index = this.fileList.indexOf(file);
        const newFileList = this.fileList.slice();
        newFileList.splice(index, 1);
        this.fileList = newFileList;
        this.data.picurl = '';
      },
      // 手动上传文件
      async beforeUpload(file) {
        const isValid = await this.checkFile(file);
        if (isValid) {
          const url = await this.handleUpload(file);
          file.url = url;
          this.fileList = [...this.fileList, file];
        }
        return false;
      },
      // 检查文件有效性
      async checkFile(file) {
        const { GLOBAL } = this;
        const types = ['image/png', 'image/jpeg'];
        const { type, size } = file;
        console.log(file);
        const isType = types.includes(type);
        if (!isType) {
          this.$message.error('请上传jpg或png格式文件!');
        }
        const isSize = size / 1024 / 1024 <= 2;
        if (!isSize) {
          this.$message.error('文件大小不能超过2MB!');
        }
        const isValid = await this.checkImageWH(file, GLOBAL.IMG_WIDTH, GLOBAL.IMG_HEIGHT);
        return isType && isSize && isValid;
      },
      // 检查图片尺寸
      async checkImageWH(file, width, height) {
        const that = this;
        return new Promise((resolve, reject) => {
          const filereader = new FileReader();
          filereader.onload = e => {
            const src = e.target.result;
            const image = new Image();
            image.onload = function() {
              if ((width && this.width != width) || (height && this.height != height)) {
                that.$message.warning(`请上传尺寸为${width}*${height}的图片`);
                reject();
              } else {
                resolve(true);
              }
            };
            image.onerror = reject;
            image.src = src;
          };
          filereader.readAsDataURL(file);
        });
      },
      // 上传图片
      handleUpload(file) {
        const { GLOBAL } = this;
        const formData = new FormData();
        formData.append('foldertype', GLOBAL.FOLDER_TYPE.sitelocation);
        formData.append('upfile', file);
        return appAsk
          .uploadPic(formData)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.data.picurl = data.url;
              return data.url;
            }
            return '';
          })
          .catch(e => {
            console.error(e);
          });
      },
      // 取消
      cancel() {
        this.$router.back();
      },
      // 删除确认弹窗
      showDelModal() {
        const that = this;
        this.$confirm({
          title: '确定要删除站点？',
          content: '',
          okText: '确定',
          cancelText: '取消',
          onOk() {
            that.del();
          },
          onCancel() {},
        });
      },
      // 确定
      ok() {
        this.form.validateFields((err, fieldsValue) => {
          if (err) {
            return;
          }
          const { id, data } = this;
          const { devices = [] } = data;
          const dids = devices.map(v => v.did);
          const { name, location } = fieldsValue;
          this.data = {
            ...data,
            name,
            location,
            dids,
          };
          if (id) {
            // 编辑
            this.mod();
          } else {
            // 添加
            this.add();
          }
        });
      },
      // 添加
      add() {
        this.spinning = true;
        const params = {
          ...this.data,
        };
        locationManageAsk
          .addSite(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'siteList' });
              this.spinning = false;
            }
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 修改
      mod() {
        this.spinning = true;
        const params = {
          ...this.data,
        };
        locationManageAsk
          .modSite(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'siteList' });
              this.spinning = false;
            }
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      del() {
        this.spinning = true;
        const { id } = this;
        const params = {
          siteids: [id],
        };
        locationManageAsk
          .delSite(params)
          .then(result => {
            const { errcode, data } = result;
            if (errcode === 200) {
              this.$message.success('操作成功！');
              this.$router.push({ name: 'siteList' });
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 查询详情
      getDetail() {
        this.spinning = true;
        const { id } = this;
        const params = {
          limit: 1,
          offset: 1,
          id: parseInt(id),
        };

        locationManageAsk
          .getSiteDetail(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { details = [] } = data;
              this.data = details[0] || {};
              const { provincial = '北京市', urban = '市辖区', areas = '东城区' } = this.data;
              this.defaultValue = [provincial, urban, areas];
              this.getFiles();
            }
            this.spinning = false;
          })
          .catch(e => {
            this.spinning = false;
            console.error(e);
          });
      },
      // 初始化文件列表
      getFiles() {
        const { picurl } = this.data;
        const path = '/sitelocation/';
        if (picurl && picurl.includes(path)) {
          const pos = picurl.indexOf(path);
          const name = picurl.substring(pos + path.length, picurl.length);
          this.fileList = [
            {
              id: '1',
              uid: '1',
              name,
              status: 'done',
              url: picurl,
            },
          ];
        }
      },
    },
  };
</script>

<style lang="less" scoped>
  .tips {
    display: table-cell;
    vertical-align: bottom;
    line-height: 1.5;
    height: 102px;
  }
</style>
