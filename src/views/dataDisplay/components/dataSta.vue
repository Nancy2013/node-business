<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 10:09:18
 * @LastEditTime: 2019-10-11 16:28:26
 * @LastEditors: Please set LastEditors
 -->
<!-- 数据展示 -->
<template>
  <div class="data-o-r">
    <chart-head>
      <div slot="head-l"
           class="chart-h">
        <span class="chart-title">全国设备数据统计</span>
      </div>
      <div slot="head-r">
        <a-select v-model="ticketYear"
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
    <div id="lineChart"
         style="width: 100%;height: 85%;margin-top:10px"></div>
  </div>
</template>
<script>
  import service from 'servicePath/index';
  import { mapGetters, mapMutations } from 'vuex';
  import echarts from 'echarts';

  const { dataDisplayAsk } = service;
  export default {
    name: 'DataSta',
    components: {},
    props: {},
    data() {
      return {
        charts: '',
        dataStatistics: [],
        monthNum: 0,
        MONTH: 'M',
        yearList: [],
        ticketYear: new Date().getFullYear(),
      };
    },
    computed: {},
    watch: {},
    async created() {
      await this.getStatistics();
      this.$nextTick(function() {
        this.drawLine('lineChart');
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
        await this.getStatistics(val);
        this.$nextTick(function() {
          this.drawLine('lineChart');
        });
      },
      getSelectYear() {
        const thisYear = new Date().getFullYear();
        const eYear = thisYear - 5;
        for (let i = eYear; i <= thisYear; i += 1) {
          this.yearList.push(i);
        }
      },
      drawLine(id) {
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
            right: '5%',
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
          },
          yAxis: {
            splitLine: {
              show: false,
            },
            show: false,
          },

          series: [
            {
              name: '数据统计',
              type: 'line',
              stack: '总量',
              data: this.dataStatistics,
              itemStyle: {
                color: this.GLOBAL.THEME_COLOR,
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
      async getStatistics() {
        const { ticketYear } = this;
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
          order: 'date',
          seq: 0,
          starttime: `${ticketYear}-01-01`,
          endtime: `${ticketYear}-12-31`,
        };
        await dataDisplayAsk
          .getStatistics(params)
          .then(
            result => {
              const { errcode, data = [] } = result;
              if (errcode === 200) {
                this.dataStatistics.length = 12;
                this.dataStatistics.fill(0);
                data &&
                  data.forEach(v => {
                    if (v.date) {
                      this.monthNum = this.$moment(v.date).format(this.MONTH);
                      const i = this.monthNum - 1;
                      this.dataStatistics[i] = v.count;
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
  .data-o-r {
    width: 40%;
    height: 100%;
    display: inline-block;
    background-color: #ffffff;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>
