<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-09 19:33:56
 * @LastEditTime: 2019-10-15 10:00:41
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div>
    <bl-header>
      <bl-breadcrumb slot="left"
                     :breadcrumb-routes="breadcrumbRoutes"></bl-breadcrumb>
      <div slot="right">
        <a-select v-model="provincename"
                  class="component-w-120"
                  @change="provinceChange">
          <a-select-option value="">
            省
          </a-select-option>
          <a-select-option v-for="item in provinceList"
                           :key="item.provincial"
                           :value="item.provincial">
            {{ item.provincial }}
          </a-select-option>
        </a-select>
        <a-select v-model="urbanname"
                  class="component-w-120"
                  @change="urbanChange">
          <a-select-option value="">
            市
          </a-select-option>
          <a-select-option v-for="item in urbanList"
                           :key="item.urban"
                           :value="item.urban">
            {{ item.urban }}
          </a-select-option>
        </a-select>
        <a-select v-model="areaname"
                  class="component-w-120"
                  @change="areaChange">
          <a-select-option value="">
            区
          </a-select-option>
          <a-select-option v-for="item in areaList"
                           :key="item.areas"
                           :value="item.areas">
            {{ item.areas }}
          </a-select-option>
        </a-select>
        <a-input-search v-model.trim="search"
                        placeholder="输入站点名称"
                        class="component-w-224"
                        enter-button
                        @search="doSearch" />
      </div>
    </bl-header>
    <bl-page-wrapper>
      <div slot="content">
        <a-table :columns="columns"
                 :row-key="record => record.id"
                 :data-source="data"
                 :loading="loading"
                 :pagination="pagination"
                 class="reset-pagination"
                 @change="maintainChange">
          <template slot="index"
                    slot-scope="text, record,index">
            <span>{{ index+1 }}</span>
          </template>
          <template slot="checkcycle"
                    slot-scope="text, record">
            <span>{{ record.checkcycle?`${record.checkcycle}个月` : '' }}</span>
          </template>
          <template slot="status"
                    slot-scope="text, record">
            <span>{{ record.status==='1'?'待维护' : '正常' }}</span>
          </template>
          <template slot="operation"
                    slot-scope="text, record">
            <a @click="detail(record)">详情</a>
          </template>
        </a-table>
      </div>
    </bl-page-wrapper>
  </div>
</template>


<script>
  import { mapState, mapGetters, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';
  import Mix from '@/mixins';

  const { locationManageAsk } = service;
  const { PageTableCreaterMix } = Mix;
  // 表头
  const columns = [
    {
      title: '序号',
      dataIndex: 'index',
      width: '10%',
      align: 'center',
      scopedSlots: { customRender: 'index' },
    },
    {
      title: '站点名称',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: '设备数量',
      dataIndex: 'devicecnt',
      align: 'center',
    },
    {
      title: '上一次维护时间',
      dataIndex: 'lastcheck',
      align: 'center',
    },
    {
      title: '维护周期',
      dataIndex: 'checkcycle',
      align: 'center',
      scopedSlots: { customRender: 'checkcycle' },
    },
    {
      title: '当前状态',
      dataIndex: 'status',
      align: 'center',
      scopedSlots: { customRender: 'status' },
    },
    {
      title: '操作',
      dataIndex: 'operate',
      align: 'left',
      scopedSlots: { customRender: 'operation' },
    },
  ];
  export default {
    name: 'MaintainList',
    components: {},
    mixins: [PageTableCreaterMix('maintain')],
    props: {},
    data() {
      return {
        breadcrumbRoutes: [
          {
            name: '维护管理',
            breadcrumbName: '维护列表',
          },
        ],
        provinceList: [],
        urbanList: [],
        areaList: [],
        provincename: '',
        urbanname: '',
        areaname: '',
        search: '',
        columns,
      };
    },
    computed: {
      ...mapState('app', ['projectInfo']),
    },
    created() {
      this.getProvince();
    },
    mounted() {},
    methods: {
      ...mapMutations('deviceManage', ['updateDevice']),
      doSearch() {
        this.init();
      },
      provinceChange() {
        const { provincename } = this;
        this.urbanname = '';
        if (provincename === '') {
          this.urbanList = [];
        } else {
          this.getUrban();
        }
        this.urbanChange();
      },
      urbanChange() {
        const { urbanname } = this;
        this.areaname = '';
        if (urbanname === '') {
          this.areaList = [];
        } else {
          this.getArea();
        }
        this.areaChange();
      },
      areaChange() {
        this.init();
      },
      // 更多
      detail(record) {
        this.$router.push({
          name: 'maintainDetail',
          params: { id: record.id, checkcycle: record.checkcycle },
        });
      },
      // 获取省
      getProvince() {
        const params = {
          projectid: `${this.projectInfo.id}`,
        };
        locationManageAsk
          .siteGetProvincial(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { provincials = [] } = data;
              this.provinceList = provincials;
            }
          })
          .catch(e => console.error(e));
      },
      // 获取市
      getUrban() {
        const { provincename } = this;
        const params = {
          provincial: `${provincename}`,
        };
        locationManageAsk
          .siteGetUrban(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { urbans = [] } = data;
              this.urbanList = urbans;
            }
          })
          .catch(e => console.error(e));
      },
      // 获取区
      getArea() {
        const { provincename, urbanname } = this;
        const params = {
          provincial: `${provincename}`,
          urban: `${urbanname}`,
        };
        locationManageAsk
          .siteGetArea(params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { areas = [] } = data;
              this.areaList = areas;
            }
          })
          .catch(e => console.error(e));
      },
      // 请求数据
      async maintainFetchList(params) {
        const { search, provincename, urbanname, areaname } = this;
        const { errcode, data = {} } = await locationManageAsk.siteList({
          ...params,
          location: search,
          provincial: provincename,
          urban: urbanname,
          areas: areaname,
          order: 'id',
        });
        const { sitelocations = [] } = data;
        sitelocations.forEach(v => {
          if (v.lastcheck) {
            v.lastcheck = this.$moment(v.lastcheck).format(this.GLOBAL.TIME_FOEMAT);
          }
        });
        return { total: data.totalsize, data: data.sitelocations };
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
