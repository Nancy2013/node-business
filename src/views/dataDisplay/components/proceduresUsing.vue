<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 10:09:18
 * @LastEditTime: 2019-10-15 11:53:59
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="data-o-l">
    <chart-head>
      <div slot="head-l"
           class="chart-h">
        <span class="chart-title">小程序使用人数</span>
        <ul>
          <li><span class="chart-legend">登录人数</span></li>
          <li><span class="chart-legend">体验人数</span></li>
        </ul>
      </div>
      <div slot="head-r">
        <a-select v-model="procedureYear"
                  class="component-w-108"
                  @change="handleChange">
          <a-select-option v-for="item in yearList"
                           :key="item"
                           :value="item">
            {{ item }}
          </a-select-option>
        </a-select>
      </div>
    </chart-head>
    <div id="dlineChart"
         style="width: 100%;height: 85%"></div>
  </div>
</template>
<script>
  import service from 'servicePath/index';
  import { mapGetters, mapMutations } from 'vuex';
  import echarts from 'echarts';

  const { dataDisplayAsk } = service;
  export default {
    name: 'ProceduresUsing',
    components: {},
    props: {},
    data() {
      return {
        charts: '',
        loginNum: [],
        experienceNum: [],
        monthNum: 0,
        MONTH: 'M',
        procedureYear: new Date().getFullYear(),
        yearList: [],
      };
    },
    computed: {},
    watch: {},
    async created() {
      await this.getLoginNum();
      await this.getExperienceNum();
      this.$nextTick(function() {
        this.drawDLine('dlineChart');
      });
      this.getSelectYear();
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.initChart);
    },
    mounted() {
      this.initChart();
    },
    methods: {
      async handleChange(val) {
        await this.getLoginNum(val);
        await this.getExperienceNum(val);
        this.$nextTick(function() {
          this.drawDLine('dlineChart');
        });
      },
      getSelectYear() {
        const thisYear = new Date().getFullYear();
        const eYear = thisYear - 5;
        for (let i = eYear; i <= thisYear; i += 1) {
          this.yearList.push(i);
        }
      },
      drawDLine(id) {
        const that = this;
        console.log('显示人数', that.experienceNum);
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          title: {
            show: false,
          },
          tooltip: {
            trigger: 'axis',
          },
          legend: {
            show: false,
          },
          grid: {
            left: '3%',
            right: '10%',
            bottom: '10%',
            containLabel: true,
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: [
              '1月',
              '2月',
              '3月',
              '4月',
              '5月',
              '6月',
              '7月',
              '8月',
              '9月',
              '10月',
              '11月',
              '12月',
            ],
            axisLabel: {
              interval: 0,
            },
          },
          yAxis: {
            splitLine: {
              show: false,
            },
            show: false,
          },

          series: [
            {
              name: '登录人数',
              type: 'line',
              data: this.loginNum,
              itemStyle: {
                color: '#FB712E',
              },
            },
            {
              name: '体验人数',
              type: 'line',
              data: this.experienceNum,
              itemStyle: {
                color: '#1890FF',
              },
            },
          ],
        });
      },
      initChart() {
        setTimeout(() => {
          window.addEventListener('resize', () => {
            this.charts.resize();
          });
        }, 20);
      },
      async getLoginNum() {
        const { procedureYear } = this;
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
          order: 'logindate',
          seq: 0,
          type: 5,
          starttime: `${procedureYear}-01-01`,
          endtime: `${procedureYear}-12-31`,
        };
        await dataDisplayAsk
          .getLoginNum(params)
          .then(
            result => {
              const { errcode, data = {} } = result;
              if (errcode === 200) {
                this.loginNum.length = 12;
                this.loginNum.fill(0);
                console.log('长度', this.loginNum);
                data.alist &&
                  data.alist.forEach(v => {
                    if (v.logindate) {
                      this.monthNum = this.$moment(v.logindate).format(this.MONTH);
                      console.log('月', this.monthNum);
                      const i = this.monthNum - 1;
                      this.loginNum[i] = v.logincnt;
                      console.log('数组', this.loginNum);
                    }
                  });
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
      async getExperienceNum() {
        const { procedureYear } = this;
        const Params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
          order: 'date',
          seq: 0,
          type: 5,
          starttime: `${procedureYear}-01-01`,
          endtime: `${procedureYear}-12-31`,
        };
        await dataDisplayAsk
          .getExperienceNum(Params)
          .then(
            result => {
              const { errcode, data = [] } = result;
              if (errcode === 200) {
                this.experienceNum.length = 12;
                this.experienceNum.fill(0);
                data &&
                  data.forEach(v => {
                    if (v.date) {
                      this.monthNum = this.$moment(v.date).format(this.MONTH);
                      const i = this.monthNum - 1;
                      this.experienceNum[i] = v.count;
                    }
                  });
              }
            },
            () => {}
          )
          .catch(e => {
            console.error(e);
          });
      },
    },
  };
</script>

<style lang="less" scoped>
  .data-o-l {
    width: 40%;
    height: 100%;
    display: inline-block;
    float: left;
    margin-right: 20px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
  .chart-h ul > li:first-child::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 2px;
    background-color: #fb712e;
    vertical-align: middle;
    border-radius: 100%;
  }
  .chart-h ul > li:last-child::before {
    content: '';
    display: inline-block;
    width: 5px;
    height: 5px;
    margin-right: 2px;
    background-color: #1890ff;
    vertical-align: middle;
    border-radius: 100%;
  }
  .chart-h ul > li {
    display: inline;
    margin-left: 10px;
  }
</style>
