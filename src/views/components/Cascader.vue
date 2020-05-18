<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-16 10:45:49
 * @LastEditTime: 2019-09-02 19:42:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bl-cascader">
    <a-select v-model="province"
              class="component-w-120"
              @change="handleProvinceChange">
      <a-select-option v-for="item in provinceData"
                       :key="item.fullname"
                       :value="item.fullname">
        {{ item.fullname }}
      </a-select-option>
    </a-select>
    <a-select v-model="city"
              class="component-w-120"
              style="margin:0 10px;"
              @change="handleCityChange">
      <a-select-option v-for="item in cityData"
                       :key="item.fullname"
                       :value="item.fullname">
        {{ item.fullname }}
      </a-select-option>
    </a-select>
    <a-select v-model="district"
              class="component-w-120"
              @change="handleDistrictChange">
      <a-select-option v-for="item in districtData"
                       :key="item.fullname"
                       :value="item.fullname">
        {{ item.fullname }}
      </a-select-option>
    </a-select>
  </div>
</template>
<script>
  import { mapState, mapActions, mapMutations } from 'vuex';
  import $ from 'jquery';

  // 直辖市及自治区
  const resetCity = {
    北京市: ['市辖区'],
    上海市: ['市辖区'],
    天津市: ['市辖区'],
    重庆市: ['市辖区'],
    台湾省: ['台湾省'],
    香港特别行政区: ['香港特别行政区'],
    澳门特别行政区: ['澳门特别行政区'],
  };
  export default {
    name: 'Cascader',
    components: {},
    mixins: [],
    props: {
      defaultValue: {
        type: Array,
        default: () => ['北京市', '市辖区', '东城区'],
      },
    },
    data() {
      return {
        provinceData: [],
        cityData: [],
        districtData: [],
        province: '',
        city: '',
        district: '',
      };
    },
    computed: {},
    watch: {},
    async created() {
      await this.getProvince();
      this.init();
    },
    mounted() {},
    destroyed() {},
    methods: {
      async init() {
        const [province, city, district] = this.defaultValue;
        this.province = province;
        this.city = city;
        this.district = district;
        // 直辖市及自治区
        const index = Object.keys(resetCity).findIndex(v => v === province);
        if (index > -1) {
          this.cityData = resetCity[province];
          this.city = this.cityData[0];
        } else {
          await this.getCity();
        }
        await this.getDistrict();
      },
      // 省
      async handleProvinceChange(val) {
        // 直辖市及自治区
        const index = Object.keys(resetCity).findIndex(v => v === val);
        if (index > -1) {
          this.cityData = resetCity[val];
          this.city = this.cityData[0];
        } else {
          await this.getCity();
          this.city = this.cityData[0].fullname;
        }
        this.handleCityChange();
      },
      // 市
      async handleCityChange() {
        await this.getDistrict();
        this.district = this.districtData[0].fullname;
        this.handleDistrictChange();
      },
      // 区
      handleDistrictChange() {
        const { province, city, district } = this;
        this.$emit('update', [province, city, district]);
      },
      // 请求省
      async getProvince() {
        this.provinceData = await this.getWebService('/list', null);
        this.province = this.provinceData[0].fullname;
      },
      // 请求市
      async getCity() {
        const { province, provinceData } = this;
        const item = provinceData.filter(v => v.fullname === province)[0];
        if (item) {
          const { id } = item;
          this.cityData = await this.getWebService('/getchildren', { id });
        }
      },
      // 请求区
      async getDistrict() {
        const { province, city, cityData, provinceData } = this;
        let id;
        // 直辖市及自治区
        const index = Object.keys(resetCity).findIndex(v => v === province);
        if (index > -1) {
          const item = provinceData.filter(v => v.fullname === province)[0];
          if (item) {
            id = item.id;
          }
        } else {
          const item = cityData.filter(v => v.fullname === city)[0];
          if (item) {
            id = item.id;
          }
        }
        this.districtData = await this.getWebService('/getchildren', { id });
      },
      // 请求市/区
      async getWebService(api, params) {
        const data = {
          ...params,
          output: 'jsonp',
          key: this.GLOBAL.QQ_KEY,
        };
        const url = `https://apis.map.qq.com/ws/district/v1${api}`;
        let serviceData = [];
        await $.ajax({
          type: 'get',
          dataType: 'jsonp',
          data,
          jsonp: false,
          jsonpCallback: 'QQmap',
          url,
          success: json => {
            // console.log(json.result[0]);
            const { status, result = [] } = json;
            if (status === 0) {
              serviceData = result[0];
            }
          },
          error: e => {
            this.$message.error('WebService API请求失败！');
            console.error(e);
          },
        });
        return serviceData;
      },
    },
  };
</script>

<style lang="less" scoped>
  .bl-cascader {
    display: inline-block;
  }
</style>
