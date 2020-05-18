<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 10:09:18
 * @LastEditTime: 2019-10-15 11:52:00
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="data-s-l">
    <chart-head>
      <div slot="head-l"
           class="chart-h">
        <span class="chart-title">全国站点统计</span>
        <ul>
          <li><span class="chart-legend">总</span></li>
          <li><span class="chart-legend">新增</span></li>
        </ul>
      </div>
      <div slot="head-r">
        <a-select v-model="siteYear"
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
    <div id="barChart"
         style="width: 100%;height: 85%;margin-top:10px"></div>
  </div>
</template>
<script>
  import service from 'servicePath/index';
  import { mapGetters, mapMutations } from 'vuex';
  import echarts from 'echarts';

  const { dataDisplayAsk } = service;
  export default {
    name: 'SiteSta',
    components: {},
    props: {},
    data() {
      return {
        charts: null,
        totalNum: [],
        countNum: [],
        monthNum: 0,
        MONTH: 'M',
        yearList: [],
        siteYear: new Date().getFullYear(),
      };
    },
    computed: {},
    watch: {},
    async created() {
      await this.getSiteNum();
      this.$nextTick(function() {
        this.drawBar('barChart');
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
        await this.getSiteNum(val);
        this.$nextTick(function() {
          this.drawBar('barChart');
        });
      },
      getSelectYear() {
        const thisYear = new Date().getFullYear();
        const eYear = thisYear - 5;
        for (let i = eYear; i <= thisYear; i += 1) {
          this.yearList.push(i);
        }
      },
      drawBar(id) {
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          title: {
            show: false,
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              //坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
            },
          },
          legend: {
            show: false,
          },
          grid: {
            left: '4%',
            right: '10%',
            bottom: '10%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
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
          ],
          yAxis: [
            {
              type: 'value',
              show: false,
            },
          ],
          series: [
            {
              name: '总站点',
              type: 'bar',
              data: this.totalNum,
              itemStyle: {
                color: '#FB712E',
              },
            },
            {
              name: '新增站点',
              type: 'bar',
              data: this.countNum,
              itemStyle: {
                color: '#FDAA82',
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
      async getSiteNum() {
        const { siteYear } = this;
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
          order: 'date',
          seq: 0,
          starttime: `${siteYear}-01-01`,
          endtime: `${siteYear}-12-31`,
        };
        await dataDisplayAsk
          .getSiteNum(params)
          .then(
            result => {
              const { errcode, data = [] } = result;
              if (errcode === 200) {
                this.totalNum.length = 12;
                this.totalNum.fill(0);
                this.countNum.length = 12;
                this.countNum.fill(0);
                console.log('长度', this.countNum);
                data &&
                  data.forEach(v => {
                    if (v.date) {
                      this.monthNum = this.$moment(v.date).format(this.MONTH);
                      console.log('月', this.monthNum);
                      const i = this.monthNum - 1;
                      this.totalNum[i] = v.total;
                      this.countNum[i] = v.total;
                      console.log('数组', this.countNum);
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
  .data-s-l {
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
    background-color: #fdaa82;
    vertical-align: middle;
    border-radius: 100%;
  }
  .chart-h ul > li {
    display: inline;
    margin-left: 10px;
  }
</style>
