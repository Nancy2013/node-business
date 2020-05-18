<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-07-19 10:09:18
 * @LastEditTime: 2019-10-11 16:28:12
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="pie-l">
    <chart-head>
      <div slot="head-l"
           class="chart-h">
        <span class="chart-title">设备使用率</span>
      </div>
    </chart-head>
    <div id="upieChart"
         style="width: 100%;height: 85%"></div>
  </div>
</template>
<script>
  import service from 'servicePath/index';
  import { mapGetters, mapMutations } from 'vuex';
  import echarts from 'echarts';

  const { dataDisplayAsk } = service;
  export default {
    name: 'DeviceUsing',
    components: {},
    props: {},
    data() {
      return {
        charts: '',
        usedValue: '',
        unusedValue: '',
      };
    },
    computed: {},
    watch: {},
    async created() {
      await this.getUsingRate();
      this.$nextTick(function() {
        this.drawUPie('upieChart');
      });
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.initChart);
    },
    mounted() {
      this.initChart();
    },
    methods: {
      drawUPie(id) {
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
              name: '设备使用率',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'],
              data: [
                {
                  value: parseInt(this.usedValue),
                  name: `使用${this.usedValue}台`,
                  itemStyle: {
                    color: '#F6B225',
                  },
                },
                {
                  value: parseInt(this.unusedValue),
                  name: `未使用${this.unusedValue}台`,
                  itemStyle: {
                    color: '#4BA8FF',
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
      async getUsingRate() {
        const params = {
          limit: this.GLOBAL.MAX_LEN,
          offset: 1,
        };
        await dataDisplayAsk
          .getUsingRate(params)
          .then(
            result => {
              const { errcode, data = {} } = result;
              if (errcode === 200) {
                this.usedValue = data ? data.using : '';
                this.unusedValue = data ? parseInt(data.total) - parseInt(data.using) : '';
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
  .pie-l {
    display: inline-block;
    width: 48%;
    height: 100%;
    margin-right: 16px;
    background-color: #ffffff;
    box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1);
    border-radius: 4px;
  }
</style>
