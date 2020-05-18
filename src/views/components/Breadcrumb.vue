<template>
  <div class="">
    <a-breadcrumb :routes="breadcrumbRoutes"
                  separator=">">
      <template slot="itemRender"
                slot-scope="{route, params, routes, paths}">
        <span v-if="routes.indexOf(route) === routes.length - 1">
          {{ route.breadcrumbName }}
        </span>
        <router-link v-else
                     :to="{name:route.name,params:route.params}">
          {{ route.breadcrumbName }}
        </router-link>
      </template>
    </a-breadcrumb>
  </div>
</template>
<script>
  // import { mapGetters, mapMutations } from 'vuex';

  export default {
    name: 'Breadcrumb',
    components: {},
    props: {
      breadcrumbRoutes: {
        type: Array,
        required: true,
        default() {
          return [];
        },
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
</style>
