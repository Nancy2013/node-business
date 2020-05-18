<!--
 * @Description: In User Settings Edit
 * @Author: your name
 * @Date: 2019-06-22 11:51:44
 * @LastEditTime: 2019-09-18 17:02:47
 * @LastEditors: Please set LastEditors
 -->
<template>
  <div class="bl-card">
    <div :class="{'margin-top':bottom}"
         class="card-center">
      <slot></slot>
    </div>
    <div class="card-body">
      <div class="card-detail">
        <a-row type="flex"
               justify="center">
          <a-col :span="14">
            <div class="title ellipsis">
              {{ title }}
            </div>
            <div class="description ellipsis">
              {{ description }}
            </div>
          </a-col>
          <a-col :span="10">
            <div class="card-action">
              <slot name="action"></slot>
            </div>
          </a-col>
        </a-row>
      </div>
    </div>

    <div v-if="bottom"
         class="card-bottom">
      <a-row>
        <a-col :span="16"
               class="left">
          <slot name="left"></slot>
        </a-col>
        <a-col :span="8"
               class="right">
          <span class="cursor"
                @click="edit">
            <a-icon type="form" />
            编辑
          </span>
        </a-col>
      </a-row>
    </div>
  </div>
</template>
<script>
  // import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'Card',
    components: {},
    props: {
      title: {
        type: String,
        default: '',
      },
      description: {
        type: String,
        default: '',
      },
      edit: {
        type: Function,
        default: () => {},
      },
      bottom: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {};
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {},
  };
</script>

<style lang="less" scoped>
  .bl-card {
    border: @bl-border-width-base @bl-border-style-dotted @bl-card-border-color;
    border-radius: @bl-border-radius-sm;
    box-shadow: 0 2px 8px 0 rgba(@bl-black, 0.1);
    box-sizing: border-box;
    height: 167px;
    position: relative;
    .card-center {
      position: absolute;
      left: 50%;
      top: 50%;
      text-align: center;
      transform: translate(-50%, -50%);
      font-size: @bl-font-size-lg;
      &.margin-top {
        margin-top: -20px;
      }
    }
    .card-body {
      font-size: @bl-font-size-lg;
      color: rgba(@bl-black, 0.45);
      padding: @bl-padding-md;
      .card-detail {
        .title {
          font-size: 40px;
          color: rgba(@bl-black, 0.85);
        }
      }
      .card-action {
        text-align: right;
        position: absolute;
        right: 0;
        top: 50%;
        transform: translate(0, -50%);
      }
    }
    .card-bottom {
      padding: @bl-padding-sm @bl-padding-md;
      background: @bl-card-bottom-bg;
      position: absolute;
      bottom: 0;
      width: 100%;
      box-sizing: border-box;
      .left {
        font-size: @bl-font-weight-base;
      }
      .right {
        text-align: right;
        color: @theme-color;
      }
    }
  }
</style>
