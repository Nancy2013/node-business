webpackJsonp([32],{1283:function(e,t,a){"use strict";var s=a(32),r=a(34),n=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var s in a)Object.prototype.hasOwnProperty.call(a,s)&&(e[s]=a[s])}return e},i=s.a.userManageAsk;t.a={name:"UserManage",components:{},props:{},data:function(){return{breadcrumbRoutes:[{name:"人员管理",breadcrumbName:"全部人员"}],id:this.$route.params.id,defaultActiveKey:this.$route.name,search:"",roleid:"-1",roleList:[]}},computed:{},watch:{},created:function(){this.getRole()},mounted:function(){},methods:n({},Object(r.mapMutations)("userManage",["setRoleid"]),Object(r.mapMutations)("userManage",["searchDisplayname"]),{handleChange:function(e){this.setRoleid(e)},doSearch:function(){var e=this.search;this.searchDisplayname(e),this.$refs.listModal.doSearch()},add:function(){this.$refs.listModal.add()},changeTab:function(e){this.defaultActiveKey=e,this.search="",this.roleid="-1",this.searchDisplayname(this.search),this.$router.push({name:e}),"userList"==e&&this.getRole()},getRole:function(){var e=this,t={limit:this.GLOBAL.MAX_LEN,offset:1};i.getRole(t).then(function(t){var a=t.errcode,s=t.data,r=void 0===s?{}:s;e.roleList=200===a?r.alist&&r.alist.filter(function(e){return"安装工"!==e.rolename}):[]}).catch(function(e){})}})}},1719:function(e,t){},1720:function(e,t,a){"use strict";var s=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("bl-header",[a("bl-breadcrumb",{attrs:{slot:"left","breadcrumb-routes":e.breadcrumbRoutes},slot:"left"}),e._v(" "),a("div",{attrs:{slot:"right"},slot:"right"},[a("a-select",{directives:[{name:"show",rawName:"v-show",value:"userList"===e.defaultActiveKey,expression:"defaultActiveKey==='userList'"}],staticClass:"component-w-224",on:{change:e.handleChange},model:{value:e.roleid,callback:function(t){e.roleid=t},expression:"roleid"}},[a("a-select-option",{attrs:{value:"-1"}},[e._v("\n          全部角色\n        ")]),e._v(" "),e._l(e.roleList,function(t){return a("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v("\n          "+e._s(t.rolename)+"\n        ")])})],2),e._v(" "),"roleList"===e.defaultActiveKey?a("a-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:e.add}},[e._v("添加角色\n      ")]):[a("a-input-search",{staticClass:"component-w-224",staticStyle:{margin:"0 10px"},attrs:{placeholder:"输入人员名称","enter-button":""},on:{search:e.doSearch},model:{value:e.search,callback:function(t){e.search="string"==typeof t?t.trim():t},expression:"search"}}),e._v(" "),a("a-button",{attrs:{type:"primary"},on:{click:e.add}},[e._v("添加人员\n        ")])]],2)],1),e._v(" "),a("bl-page-wrapper",[a("div",{attrs:{slot:"content"},slot:"content"},[a("div",[a("a-tabs",{staticClass:"log-list",attrs:{"default-active-key":e.defaultActiveKey},on:{change:e.changeTab}},[a("a-tab-pane",{key:"userList",attrs:{tab:"普通人员"}}),e._v(" "),a("a-tab-pane",{key:"installerList",attrs:{tab:"安装工","force-render":""}}),e._v(" "),a("a-tab-pane",{key:"roleList",attrs:{tab:"角色列表","force-render":""}})],1),e._v(" "),a("router-view",{ref:"listModal"})],1)])])],1)},r=[],n={render:s,staticRenderFns:r};t.a=n},997:function(e,t,a){"use strict";function s(e){a(1719)}Object.defineProperty(t,"__esModule",{value:!0});var r=a(1283),n=a(1720),i=a(24),o=s,c=i(r.a,n.a,!1,o,"data-v-463ff7d2",null);t.default=c.exports}});