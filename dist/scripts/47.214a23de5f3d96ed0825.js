webpackJsonp([47],{1248:function(e,t,a){"use strict";var r=a(32);r.a.deviceManageAsk;t.a={name:"DeviceDetail",components:{},mixins:[],props:{},data:function(){return{breadcrumbRoutes:[],defaultActiveKey:this.$route.name}},computed:{},watch:{},created:function(){this.setBreadcrumb()},mounted:function(){},destroyed:function(){},methods:{setBreadcrumb:function(){this.breadcrumbRoutes=[{name:"设备管理",breadcrumbName:"全部设备"},{name:"",breadcrumbName:"设备详情"}]},changeTab:function(e){this.defaultActiveKey=e,this.$router.push({name:e})}}}},1639:function(e,t){},1640:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"header-panel"},[a("bl-header",[a("bl-breadcrumb",{attrs:{slot:"left","breadcrumb-routes":e.breadcrumbRoutes},slot:"left"})],1)],1),e._v(" "),a("bl-page-wrapper",[a("div",{attrs:{slot:"content"},slot:"content"},[a("div",[a("a-tabs",{attrs:{"default-active-key":e.defaultActiveKey},on:{change:e.changeTab}},[a("a-tab-pane",{key:"baseInfo",attrs:{tab:"基本信息"}}),e._v(" "),a("a-tab-pane",{key:"serviceHistory",attrs:{tab:"服务记录","force-render":""}}),e._v(" "),a("a-tab-pane",{key:"maintainHistory",attrs:{tab:"维修记录","force-render":""}})],1),e._v(" "),a("router-view",{class:{plr20:"baseInfo"===e.defaultActiveKey}})],1)])])],1)},n=[],s={render:r,staticRenderFns:n};t.a=s},969:function(e,t,a){"use strict";function r(e){a(1639)}Object.defineProperty(t,"__esModule",{value:!0});var n=a(1248),s=a(1640),c=a(24),u=r,i=c(n.a,s.a,!1,u,"data-v-67a4fdf8",null);t.default=i.exports}});