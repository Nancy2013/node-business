<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-29 09:57:38
 * @LastEditTime: 2019-09-18 10:16:06
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="district-select">
    <a-select v-model="provincial"
              class="component-w-120"
              @change="handleProvinceChange">
      <a-select-option value="-1">
        省
      </a-select-option>
      <a-select-option v-for="item in provinceData"
                       :key="item.provincial"
                       :value="item.provincial">
        {{ item.provincial }}
      </a-select-option>
    </a-select>
    <a-select v-model="urban"
              class="component-w-120"
              style="margin:0 10px;"
              @change="handleCityChange">
      <a-select-option value="-1">
        市
      </a-select-option>
      <a-select-option v-for="item in cityData"
                       :key="item.urban"
                       :value="item.urban">
        {{ item.urban }}
      </a-select-option>
    </a-select>
    <a-select v-model="areas"
              class="component-w-120"
              @change="handleDistrictChange">
      <a-select-option value="-1">
        区
      </a-select-option>
      <a-select-option v-for="item in districtData"
                       :key="item.areas"
                       :value="item.areas">
        {{ item.areas }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { locationManageAsk } = service;

  export default {
    name: 'DistrictSelect',
    components: {},
    mixins: [],
    props: {},
    data() {
      return {
        provinceData: [],
        cityData: [],
        districtData: [],
        provincial: '-1', // 省
        urban: '-1', // 市
        areas: '-1', // 区
      };
    },
    computed: {
      ...mapState('app', ['projectInfo']),
      name() {
        const { name } = this.$route;
        return name === 'siteList' || name === 'maintainList' ? 'site' : 'store';
      },
    },
    watch: {
      $route(to, from) {
        // 对路由变化作出响应...
        this.getProvincial();
      },
    },
    created() {
      this.init();
      this.getProvincial();
    },
    mounted() {},
    destroyed() {},
    methods: {
      // 更新搜索内容
      ...mapMutations('locationManage', ['updateLocation']),
      init() {
        this.provincial = '-1';
        this.urban = '-1';
        this.areas = '-1';
        this.provinceData = [];
        this.cityData = [];
        this.districtData = [];
        const { provincial, urban, areas } = this;
        const payload = [provincial, urban, areas];
        this.updateLocation(payload);
      },
      // 选择省
      async handleProvinceChange() {
        const { provincial } = this;
        if (provincial === '-1') {
          this.cityData = [];
          this.urban = '-1';
        } else {
          await this.getUrban();
          await this.getArea();
        }
        this.handleCityChange();
      },
      // 选择市
      async handleCityChange() {
        const { urban } = this;
        if (urban === '-1') {
          this.districtData = [];
          this.areas = '-1';
        } else {
          await this.getArea();
        }
        this.handleDistrictChange();
      },
      // 选择区
      handleDistrictChange() {
        const { provincial, urban, areas } = this;
        const payload = [provincial, urban, areas];
        this.updateLocation(payload);
        this.$emit('change');
      },
      // 查询省份
      getProvincial() {
        const { name, projectInfo } = this;
        const params = {
          projectid: `${projectInfo.id}`,
        };
        locationManageAsk[`${name}GetProvincial`](params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { provincials = [] } = data;
              this.provinceData = provincials;
            }
          })
          .catch(e => console.error(e));
      },
      // 查询市
      async getUrban() {
        this.urban = '-1';
        const { provincial, name } = this;
        const params = {
          provincial,
        };
        await locationManageAsk[`${name}GetUrban`](params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { urbans = [] } = data;
              this.cityData = urbans;
            }
          })
          .catch(e => console.error(e));
      },
      // 查询区
      async getArea() {
        this.areas = '-1';
        const { provincial, urban, name } = this;
        const params = {
          provincial,
          urban,
        };
        await locationManageAsk[`${name}GetArea`](params)
          .then(result => {
            const { errcode, data = {} } = result;
            if (errcode === 200) {
              const { areas = [] } = data;
              this.districtData = areas;
              const payload = [provincial, urban, this.areas];
              this.updateLocation(payload);
            }
          })
          .catch(e => console.error(e));
      },
    },
  };
</script>

<style lang="less" scoped>
  .district-select {
    display: inline-block;
  }
</style>
