<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 10:09:18
 * @LastEditTime: 2019-10-11 16:23:25
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="pie-r">
    <chart-head>
      <div slot="head-l"
           class="chart-h">
        <span class="chart-title">设备故障率</span>
      </div>
    </chart-head>
    <div id="bpieChart"
         style="width: 100%;height: 85%"></div>
  </div>
</template>
<script>
  import service from 'servicePath/index';
  import { mapGetters, mapMutations } from 'vuex';
  import echarts from 'echarts';

  const { dataDisplayAsk } = service;
  export default {
    name: 'DeviceBroken',
    components: {},
    props: {},
    data() {
      return {
        charts: '',
        broeknRate: '',
        unbroeknRate: '',
      };
    },
    computed: {},
    watch: {},
    async created() {
      await this.getBrokenRate();
      this.$nextTick(function() {
        this.drawBPie('bpieChart');
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.initChart);
    },
    mounted() {
      this.initChart();
    },
    methods: {
      drawBPie(id) {
        this.charts = echarts.init(document.getElementById(id));
        this.charts.setOption({
          title: {
            show: false,
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)',
          },
          legend: {
            show: false,
          },
          series: [
            {
              name: '设备故障率',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: this.broeknRate,
                  name: `故障${this.broeknRate}台`,
                  itemStyle: {
                    color: '#EB415F',
                  },
                },
                {
                  value: this.unbroeknRate,
                  name: `正常${this.unbroeknRate}台`,
                  itemStyle: {
                    color: '#F6B225',
                  },
                },
              ],
              labelLine: {
                length2: 2,
              },
              itemStyle: {
                emphasis: {
                  show: false,
                },
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
      async getBrokenRate() {
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
        };
        await dataDisplayAsk
          .getBrokenRate(params)
          .then(
            result => {
              const { errcode, data = {} } = result;
              if (errcode === 200) {
                this.broeknRate = data ? data.broken : '';
                this.unbroeknRate = data ? parseInt(data.total) - parseInt(data.broken) : '';
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
  .pie-r {
    display: inline-block;
    float: right;
    width: 48%;
    height: 100%;
    background-color: #ffffff;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>
