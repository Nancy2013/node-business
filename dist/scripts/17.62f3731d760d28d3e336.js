webpackJsonp([17],{1008:function(t,e,n){"use strict";var a=(n(34),n(32)),i=a.a.deviceManageAsk,r=a.a.groupManageAsk;e.a={name:"DeviceModal",components:{},mixins:[],props:{title:{type:String,default:"选择设备"},data:{type:Array,default:function(){return[]}},flag:{type:String,default:"null"},productid:{type:String,default:""}},data:function(){return{isModal:!0,deviceList:[],checkedList:[],spinning:!1,search:"",remark:"",did:"",groupid:0,groupList:[]}},computed:{indeterminate:function(){var t=this.checkedList,e=this.filterDevice;return!!t.length&&t.length<e.length},filterDevice:function(){var t=this.data,e=void 0===t?[]:t,n=this.deviceList;return n&&n.filter(function(t){return!e.includes(t.did)})||[]},checkAll:function(){var t=this.checkedList,e=this.filterDevice;return t.length===e.length&&t.length>0}},watch:{},created:function(){"timeLinkage"===this.flag&&this.getAllGroup(),this.getDevice()},mounted:function(){},destroyed:function(){},methods:{cancel:function(){this.$emit("cancel")},ok:function(){this.spinning=!0;var t=this.checkedList,e=this.deviceList;if(t.length<1)return this.$message.warning("请先选择设备！"),void(this.spinning=!1);var n=[];t.forEach(function(t){var a=e.findIndex(function(e){return e.did===t});a>-1&&n.push(e[a])}),this.$emit("ok",n)},onCheckAllChange:function(t){var e=this.filterDevice;Object.assign(this,{checkedList:t.target.checked?e&&e.map(function(t){return t.did}):[]})},doSearch:function(){this.checkedList=[],this.getDevice()},filterOption:function(t,e){return e.componentOptions.children[0].text.toLowerCase().indexOf(t.toLowerCase())>=0},getAllGroup:function(){var t=this;r.getGroup().then(function(e){var n=e.errcode,a=e.data,i=void 0===a?{}:a;200===n&&(t.groupList=i)}).catch(function(t){})},getDevice:function(){var t=this;this.spinning=!0;var e=this.search,n=this.flag,a=this.did,r=this.remark,s=this.productid,o=this.groupid,c={limit:this.GLOBAL.MAX_LEN,offset:1,displayname:e,remark:r,did:a};switch(n){case"siteid":case"groupid":c[n]=-1;break;case"taskid":c.running="-1",c[n]=-1;break;case"timeLinkage":c.productid=s,c.groupid=0===o?null:o}i.getDevice(c).then(function(e){var n=e.errcode,a=e.data,i=void 0===a?{}:a;200===n&&(t.deviceList=i.deviceInfos||[],t.spinning=!1)}).catch(function(e){t.spinning=!1})}}}},1009:function(t,e,n){"use strict";function a(t){n(1021)}var i=n(1010),r=n(1022),s=n(24),o=a,c=s(i.a,r.a,!1,o,"data-v-08f44f4e",null);e.a=c.exports},1010:function(t,e,n){"use strict";function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function a(i,r){try{var s=e[i](r),o=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}return a("next")})}}var r=n(34),s=n(32),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};s.a.deviceManageAsk;e.a={name:"StatusModal",components:{},props:{status:{type:Object,default:function(){}},productid:{type:String,required:!0}},data:function(){return{isModal:!0,labelCol:{span:4},wrapperCol:{span:20},spinning:!1,deviceStatus:o({},this.status),formartStatus:[],slider:0}},computed:o({},Object(r.mapGetters)("deviceManage",["formatAttributes"]),Object(r.mapState)("deviceManage",["valueType"]),{setStatus:function(){return function(t,e){var n=this.deviceStatus;return n&&n[t]===e?"primary":null}},getFormatStatus:function(){var t=this.deviceStatus,e=void 0===t?{}:t,n=this.formatAttributes,a=void 0===n?[]:n,i=this.valueType,r=[];return Object.keys(e).forEach(function(t){if(null!==e[t]){var n=a.filter(function(e){return e.key===t})[0]||{},s={key:t,value:""+e[t]};if(n.valuetype===i.enum||n.valuetype===i.string){var o=n.status.filter(function(n){return n.value===e[t]})[0]||{};s.text=n.text+"-"+(o.text||e[t])}n.valuetype===i.range&&(s.text=n.text+"-"+e[t]),r.push(s)}}),r}}),watch:{},created:function(){var t=this;return i(regeneratorRuntime.mark(function e(){var n;return regeneratorRuntime.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return n=t.productid,e.next=3,t.getProductAttributes({productid:n});case 3:case"end":return e.stop()}},e,t)}))()},mounted:function(){},methods:o({},Object(r.mapActions)("deviceManage",["getProductAttributes"]),{setAction:function(t,e){var n=this.deviceStatus,i=this.valueType,r=void 0;r=(t.valuetype===i.enum||t.valuetype===i.string)&&n[t.key]===e?null:e,this.deviceStatus=Object.assign({},this.deviceStatus,a({},t.key,r))},cancel:function(){this.$emit("cancel")},ok:function(){var t=this.getFormatStatus;if(t.length<=0)return void this.$message.warning("请选择要执行的操作！");this.$emit("ok",t),this.cancel()}})}},1011:function(t,e,n){"use strict";var a=n(1009),i=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.a={name:"Actions",components:{StatusModal:a.a},mixins:[],props:{actions:{type:Object,default:function(){}}},data:function(){return{devActions:this.actions,status:{},isStatusModal:!1}},computed:{getDevicePlaceholder:function(){return""+(this.devActions.devicename||"")},getStatusPlaceholder:function(){var t=this.devActions.actions,e=void 0===t?[]:t,n=e.map(function(t){return t.attrname});return 0===e.length?"暂无设置":n.join("/")}},watch:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{setAction:function(){this.isStatusModal=!0;var t=this.devActions.actions,e=void 0===t?[]:t,n={};e.forEach(function(t){n[t.attrmethod]=t.attrvalue}),this.status=n},cancelStatusModal:function(){this.isStatusModal=!1},okStatusModal:function(t){var e=t.map(function(t){return{attrmethod:t.key,attrname:t.text,attrvalue:""+t.value}}),n=i({},this.devActions,{actions:e});this.devActions=Object.assign({},this.devActions,n),this.$emit("getValue",this.devActions),this.cancelStatusModal()}}}},1013:function(t,e,n){"use strict";function a(t){n(1014)}var i=n(1008),r=n(1015),s=n(24),o=a,c=s(i.a,r.a,!1,o,"data-v-ce73d7ec",null);e.a=c.exports},1014:function(t,e){},1015:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-modal",{attrs:{"mask-closable":!1,width:560,footer:null,title:t.title},on:{cancel:t.cancel},model:{value:t.isModal,callback:function(e){t.isModal=e},expression:"isModal"}},[n("a-row",{attrs:{gutter:10}},[n("a-col",{attrs:{span:12}},["timeLinkage"===t.flag?n("a-select",{staticStyle:{width:"100%"},attrs:{"filter-option":t.filterOption,"show-search":!0},on:{change:t.doSearch},model:{value:t.groupid,callback:function(e){t.groupid=e},expression:"groupid"}},[n("a-select-option",{attrs:{value:0}},[t._v("全部设备")]),t._v(" "),t._l(t.groupList,function(e){return n("a-select-option",{key:e.id,attrs:{value:e.id}},[t._v(t._s(e.name))])})],2):n("a-input-search",{attrs:{placeholder:"请输入设备名称搜索","enter-button":""},on:{search:t.doSearch},model:{value:t.search,callback:function(e){t.search="string"==typeof e?e.trim():e},expression:"search"}})],1),t._v(" "),"siteid"===t.flag?n("a-col",{attrs:{span:12}},[n("a-input-search",{attrs:{placeholder:"请输入站点名称搜索","enter-button":""},on:{search:t.doSearch},model:{value:t.remark,callback:function(e){t.remark="string"==typeof e?e.trim():e},expression:"remark"}})],1):n("a-col",{attrs:{span:12}},[n("a-input-search",{attrs:{placeholder:"请输入设备DID搜索","enter-button":""},on:{search:t.doSearch},model:{value:t.did,callback:function(e){t.did="string"==typeof e?e.trim():e},expression:"did"}})],1)],1),t._v(" "),n("a-spin",{attrs:{spinning:t.spinning}},[n("div",{staticClass:"modal-border-panel mt20"},[n("div",[n("a-checkbox",{staticStyle:{"margin-bottom":"10px"},attrs:{checked:t.checkAll,indeterminate:t.indeterminate},on:{change:t.onCheckAllChange}},[t._v("全选")])],1),t._v(" "),n("a-checkbox-group",{model:{value:t.checkedList,callback:function(e){t.checkedList=e},expression:"checkedList"}},t._l(t.filterDevice,function(e){return n("a-row",{key:e.did,staticClass:"mb10"},[n("a-checkbox",{attrs:{value:e.did}},[t._v(t._s(e.displayname+"("+e.did+")"))])],1)}),1)],1),t._v(" "),n("div",{staticClass:"modal-footer-btn mt20"},[n("a-button",{on:{click:t.cancel}},[t._v("取消")]),t._v(" "),n("a-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:t.ok}},[t._v("确定\n        ")])],1)])],1),t._v(">\n")],1)},i=[],r={render:a,staticRenderFns:i};e.a=r},1016:function(t,e,n){"use strict";var a=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},i=n(1017),r=i.keys().reduce(function(t,e){var n=e.match(/\.\/(.*)\.js$/);if(!n)return null;var a=n[1];return t[a.substr(0,1).toUpperCase()+a.substr(1)+"CreaterMix"]=i(e).default,t},{});e.a=a({},r)},1017:function(t,e,n){function a(t){return n(i(t))}function i(t){var e=r[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}var r={"./locationList.js":1018,"./pageTable.js":1019,"./timeLinkageDetail.js":1020,"./timeLinkageList.js":1026};a.keys=function(){return Object.keys(r)},a.resolve=i,t.exports=a,a.id=1017},1018:function(t,e,n){"use strict";function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=n(32),s=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},o=r.a.locationManageAsk;e.default=function(t){return{data:function(){return{data:[],spinning:!1,current:1,total:0}},computed:s({},Object(i.mapState)("locationManage",["provincial","urban","areas","search"])),created:function(){this[t+"List"]()},methods:a({doSearch:function(){this.current=1,this[t+"List"]()},detail:function(e){this.$router.push({name:t+"Detail",params:{id:e.id}})},change:function(e){this.current=e,this[t+"List"]()}},t+"List",function e(){var n=this;this.spinning=!0;var a=this.current,i=this.GLOBAL,r=this.provincial,s=this.urban,c=this.areas,u=this.search,d={limit:i.PAGE_SIZE_S,offset:a,name:u,provincial:r,urban:s,areas:c,order:"_id",seq:-1};o[t+"List"](d).then(function(a){var i=a.errcode,r=a.data,s=r===e?{}:r;if(200===i){var o=s.totalsize,c=o===e?0:o,u=s[t+"Infos"];n.total=c,n.data=u}n.spinning=!1}).catch(function(t){n.spinning=!1})})}}},1019:function(t,e,n){"use strict";function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function a(i,r){try{var s=e[i](r),o=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}return a("next")})}}Object.defineProperty(e,"__esModule",{value:!0});var r=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t};e.default=function(t){var e;return{data:function(){return{loading:!1,params:{},columns:[],data:[],tableFilter:{},pagination:{defaultCurrent:1,current:1,pageSize:15,total:0}}},created:function(){if("function"==typeof this[t+"Columns"]&&(this.columns=this[t+"Columns"]()),["group"].includes(t)){this.group.id&&this[t+"Fetch"]()}else this[t+"Fetch"]()},methods:(e={init:function(){this.pagination.current=1,this[t+"Fetch"]()}},a(e,t+"Fetch",function e(){var n=this;return i(regeneratorRuntime.mark(function a(){var i,s,o,c,u,d,l,f;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i=n,i.loading=!0,s=i.pagination,o=i.tableFilter,c=r({offset:s.current,limit:s.pageSize,seq:-1},i.params||{}),Object.keys(o).map(function(t){c[t]=JSON.stringify(o[t])}),a.next=7,n[t+"FetchList"](c);case 7:u=a.sent,u&&(d=u.data,l=d===e?[]:d,f=u.total,i.data=l||[],s.total=f||0,i.loading=!1);case 9:case"end":return a.stop()}},a,n)}))()}),a(e,t+"ShowBeforeTotal",function(t,e){return"共"+t+"条，每页显示"+e+"条"}),a(e,t+"Change",function(e,n){["device","group"].includes(t)&&this.stopTime();var a=this.pagination;a.current=Math.abs(parseInt(e.current)),a.pageSize=e.pageSize,this.tableFilter=n,this[t+"Fetch"]()}),a(e,t+"FormatPagination",function(t){var e=this.data,n=this.pagination;"add"===t?e.length===n.pageSize&&(this.pagination.current=n.current+1):1===e.length&&n.current>1&&(this.pagination.current=n.current-1)}),a(e,"formatPagination",function(){var t=this.data,e=this.pagination;1===t.length&&e.current>1&&(this.pagination.current=e.current-1)}),e)}}},1020:function(t,e,n){"use strict";function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}Object.defineProperty(e,"__esModule",{value:!0});var i=n(34),r=n(32),s=n(1013),o=n(1009),c=n(1023),u=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},d=r.a.timeLinkageAsk;e.default=function(t){return{components:{DeviceModal:s.a,StatusModal:o.a,Actions:c.a},data:function(){return{form:this.$form.createForm(this),labelCol:{span:2},wrapperCol:{span:8},id:this.$route.params.id,data:{enable:1,schedule:{isrepeat:0},effects:[],factors:[]},isDeviceModal:!1,isAction:!0,isStatusModal:!1,status:{},current:{},empty:"暂无设置",dids:[]}},computed:u({},Object(i.mapState)("timeLinkage",["repeat","typeMap","setRadio","repeatRadio"]),Object(i.mapState)("deviceManage",["valueType"]),{setStatus:function(){return function(t){var e=this.data.schedule.weekday;return e&&e.includes(t.key)?"primary":null}}}),created:function(){},mounted:function(){this.init()},methods:{init:function(){this.id?this.getDetail():this.$set(this.data,"type",this.typeMap[t])},onChangeRadioSet:function(t,e){var n=t.target.value;if("time"===e){var a=this.data.schedule.time;this.starttime=1===n?this.$moment():null,this.endtime=null;var i=u({},this.data.schedule,{isrepeat:1===n?0:null,starttime:1===n?a||this.$moment().format(this.GLOBAL.TIME_FORMAT_TIMING):null,endtime:null});this.data=Object.assign({},this.data,{schedule:i})}if("delay"===e){var r=1===n?this.data.delay||1:null;this.data=Object.assign({},this.data,{delay:r})}},onChangeRadio:function(t){var e=t.target.value,n=void 0;n=1===e?"1,2,3,4,5":"";var a=u({},this.data.schedule,{weekday:n});this.data=Object.assign({},this.data,{schedule:a})},setRepeat:function(t){var e=this.data.schedule.weekday,n=void 0===e?"":e,a=n.split(",");if(n.includes(t.key)){if(!(a.length>1))return void this.$message.warning("至少选择一天");var i=a.findIndex(function(e){return e===t.key});a.splice(i,1)}else a.push(t.key);var r=a.findIndex(function(t){return"0"===t});r>-1?(a.splice(r,1),a.sort(),a.push("0")):a.sort();var s=u({},this.data.schedule,{weekday:a.join(",")});this.data=Object.assign({},this.data,{schedule:s})},addDevice:function(t){this.isAction=t;var e=t?"effects":"factors";this.isDeviceModal=!0,this.data[e]=this.data[e]?this.data[e]:[],this.dids=t?this.data[e].map(function(t){return t.deviceid}):[]},handleCancelDevice:function(){this.isDeviceModal=!1},handleOkDevice:function(t){var e=this.isAction?"effects":"factors";this.data[e]=this.data[e]?this.data[e]:[],t.forEach(function(t){t.deviceid=t.did,t.devicename=t.displayname,t.actions=[]}),this.data=Object.assign({},this.data,a({},e,this.data[e].concat(t))),this.handleCancelDevice()},delDevices:function(t,e){this.data[e].splice(t,1)},updateAcion:function(t,e,n){var a=this.data,i=a[n][e];if(i){var r=t.actions;i.actions=r,this.data=a}},cancel:function(){this.$router.back()},showDelModal:function(){var t=this;this.$confirm({title:"确定要删除？",content:"",okText:"确定",cancelText:"取消",onOk:function(){t.del()},onCancel:function(){}})},ok:function(){var e=this;this.form.validateFields(function(n,a){var i=e.id,r=e.data,s=e.typeMap,o=e.GLOBAL,c=e.starttime,d=e.endtime,l=a.name,f=a.operatetime,h=e.data,p=h.type,v=h.schedule,m=h.effects,g=void 0===m?[]:m,b=(h.factors,h.linktasks),y=void 0===b?[]:b;if(v.isrepeat,!n){if(p===s.linkage){if(!e.isValidLinkage())return;e.data.sceneids=y.map(function(t){return t.id})}else{if(g.length<=0)return void e.$message.warning("请设置执行设备!");p===s.normal&&e.formatDevice()}for(var k=0;k<g.length;k+=1){var S=g[k].actions;if((void 0===S?[]:S).length<=0)return void e.$message.warning("请设置设备执行操作!")}var w="timing"===t?f:c;e.data=u({},r,{schedule:u({},v,{starttime:w?e.$moment(w).format(o.TIME_FORMAT_TIMING):"",endtime:d?e.$moment(d).format(o.TIME_FORMAT_TIMING):""}),name:l}),i?e.mod():e.add()}})},formatDevice:function(){var t=this,e=this.data.effects,n=void 0===e?[]:e,a=this.current.actions,i=void 0===a?[]:a;n.forEach(function(e){e.productid=t.productid,e.actions=i})},isValidLinkage:function(){var t=this.starttime,e=this.endtime,n=this.data,a=n.factors,i=void 0===a?[]:a,r=n.effects,s=void 0===r?[]:r,o=n.linktasks,c=void 0===o?[]:o;if(i.length<=0)return this.$message.warning("请设置触发条件!"),!1;if(s.length<=0&&c.length<=0)return this.$message.warning("请设置场景或添加设备!"),!1;for(var u=0;u<i.length;u+=1){var d=i[u].actions,l=void 0===d?[]:d,f=l[0]||{},h=f.attrmethod,p=f.attrvalue;if(null==h||null==p)return this.$message.warning("请设置有效触发条件!"),!1}return!(t&&(!e||e.isBefore(t)))||(this.$message.warning("请选择有效时间范围!"),!1)},add:function(){var e=this;this.$emit("updateSpinning",!0);var n=u({},this.data);d.addTimeLinkage(n).then(function(n){var a=n.errcode;n.data;200===a&&(e.$message.success("操作成功！"),e.$router.push({name:t+"List"}),e.$emit("updateSpinning",!1))}).catch(function(t){e.$emit("updateSpinning",!1)})},mod:function(){var e=this;this.$emit("updateSpinning",!0);var n=u({},this.data);d.modTimeLinkage(n).then(function(n){var a=n.errcode;n.data;200===a&&(e.$message.success("操作成功！"),e.$router.push({name:t+"List"}),e.$emit("updateSpinning",!1))}).catch(function(t){e.$emit("updateSpinning",!1)})},del:function(){var e=this;this.$emit("updateSpinning",!0);var n=this.id;d.delTimeLinkage({id:n}).then(function(n){var a=n.errcode;n.data;200===a&&(e.$message.success("操作成功！"),e.$router.push({name:t+"List"})),e.$emit("updateSpinning",!1)}).catch(function(t){e.$emit("updateSpinning",!1)})}}}}},1021:function(t,e){},1022:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-modal",{attrs:{"mask-closable":!1,width:560,footer:null,title:"执行操作"},on:{cancel:t.cancel},model:{value:t.isModal,callback:function(e){t.isModal=e},expression:"isModal"}},[n("a-spin",{attrs:{spinning:t.spinning}},[n("a-form",{staticClass:"reset-form-item-10"},[t._l(t.formatAttributes,function(e,a){return[e.valuetype===t.valueType.range?n("a-form-item",{key:""+e.key+a,staticStyle:{"margin-bottom":"0px"},attrs:{"label-col":t.labelCol,"wrapper-col":t.wrapperCol,label:e.text}},[n("a-slider",{attrs:{marks:(i={},i[e.min]=e.min,i[e.max]=e.max,i),max:e.max,min:e.min,step:e.step,"default-value":parseInt(t.deviceStatus[e.key])||e.min},on:{afterChange:function(n){t.setAction(e,n)}}})],1):n("a-form-item",{key:""+e.key+a,attrs:{"label-col":t.labelCol,"wrapper-col":t.wrapperCol,label:e.text}},[n("a-row",{attrs:{gutter:10}},t._l(e.status,function(a){return n("a-col",{key:""+a.value,attrs:{span:6}},[n("a-button",{staticClass:"reset-btn",attrs:{type:t.setStatus(e.key,a.value)},on:{click:function(){t.setAction(e,a.value)}}},[t._v(" "+t._s(a.text)+" ")])],1)}),1)],1)];var i}),t._v(" "),n("div",{staticClass:"modal-footer-btn mt20"},[n("a-button",{on:{click:t.cancel}},[t._v("取消")]),t._v(" "),n("a-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:t.ok}},[t._v("确定\n          ")])],1)],2)],1)],1)],1)},i=[],r={render:a,staticRenderFns:i};e.a=r},1023:function(t,e,n){"use strict";function a(t){n(1024)}var i=n(1011),r=n(1025),s=n(24),o=a,c=s(i.a,r.a,!1,o,"data-v-41574b64",null);e.a=c.exports},1024:function(t,e){},1025:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("a-row",{attrs:{gutter:5}},[n("a-col",{attrs:{span:6}},[n("div",{staticClass:"label-input"},[t._v(t._s(t.getDevicePlaceholder))])]),t._v(" "),n("a-col",{staticStyle:{"text-align":"center"},attrs:{span:1}},[t._v("\n      --\n    ")]),t._v(" "),n("a-col",{attrs:{span:5}},[n("a-button",{attrs:{type:"primary",block:""},on:{click:function(e){return t.setAction()}}},[t._v("设置执行操作")])],1),t._v(" "),n("a-col",{attrs:{span:12}},[n("a-tooltip",{attrs:{placement:"bottomLeft"}},[n("template",{slot:"title"},[n("span",[t._v(t._s(t.getStatusPlaceholder))])]),t._v(" "),n("div",{staticClass:"label-input ellipsis"},[t._v(t._s(t.getStatusPlaceholder))])],2)],1)],1),t._v(" "),t.isStatusModal?n("StatusModal",{attrs:{productid:t.devActions.productid,status:t.status},on:{cancel:t.cancelStatusModal,ok:t.okStatusModal}}):t._e()],1)},i=[],r={render:a,staticRenderFns:i};e.a=r},1026:function(t,e,n){"use strict";function a(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function i(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function a(i,r){try{var s=e[i](r),o=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}return a("next")})}}function r(t){if(Array.isArray(t)){for(var e=0,n=Array(t.length);e<t.length;e++)n[e]=t[e];return n}return Array.from(t)}Object.defineProperty(e,"__esModule",{value:!0});var s=n(34),o=n(32),c=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},u=o.a.timeLinkageAsk;e.default=function(t){var e;return{data:function(){return{params:{},data:[],pagination:{defaultCurrent:1,current:1,pageSize:this.GLOBAL.PAGE_SIZE_XS,total:0},disabled:!0}},computed:c({},Object(s.mapState)("timeLinkage",["typeMap"]),Object(s.mapGetters)("timeLinkage",["formatRepeat"])),created:function(){this[t+"Fetch"]()},methods:(e={add:function(){this.$router.push({name:t+"Add"})},edit:function(e){this.$router.push({name:t+"Detail",params:{id:e.id}})},onChange:function(t,e){var n=[].concat(r(this.data)),a=n.filter(function(t){return t.id===e.id})[0];a&&(a.enable=t,this.data=n);var i=c({},e,{enable:t?1:0});this.mod(i)},mod:function(t){var e=this;this.$emit("updateSpinning",!0),u.modTimeLinkage(t).then(function(n){var a=n.errcode;n.data;200===a?(e.$message.success("操作成功！"),e.$emit("updateSpinning",!1)):e.reset(t)}).catch(function(n){e.$emit("updateSpinning",!1),e.reset(t)})},reset:function(t){var e=[].concat(r(this.data)),n=t.id,a=t.enable,i=e.filter(function(t){return t.id===n})[0];i&&(i.enable=1!==a),this.data=e},change:function(e,n){var a=this.pagination;a.current=e,a.pageSize=n,this[t+"Fetch"]()}},a(e,t+"Fetch",function e(){var n=this;return i(regeneratorRuntime.mark(function a(){var i,r,s,o,u,d,l;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i=n,n.$emit("updateSpinning",!0),r=i.pagination,s=c({offset:r.current,limit:r.pageSize},i.params||{}),a.next=6,n[t+"FetchList"](s);case 6:o=a.sent,o&&(u=o.data,d=u===e?[]:u,l=o.total,i.data=d||[],r.total=l||0,n.$emit("updateSpinning",!1));case 8:case"end":return a.stop()}},a,n)}))()}),a(e,t+"FetchList",function e(){var n=this;return i(regeneratorRuntime.mark(function a(){var i,r,s,o,c,d,l,f;return regeneratorRuntime.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return i=n.typeMap,r=n.pagination,s=r.current,o=r.pageSize,c={limit:o,offset:s,order:"createtime",seq:-1,type:i[""+t]},a.next=5,u.getTimeLinkageList(c);case 5:return d=a.sent,d.errcode,l=d.data,f=l===e?{}:l,n.formatData(f),a.abrupt("return",{total:f.totalsize,data:f.alist});case 11:case"end":return a.stop()}},a,n)}))()}),a(e,"formatData",function(e){var n=this,a=e.alist,i=void 0===a?[]:a;switch(t){case"timing":i&&i.forEach(function(t){var e=t.weekday;t.enable=1===t.enable,t.weekday=n.formatRepeat(e)});break;case"scene":i&&i.forEach(function(t){t.execute=!1})}}),e)}}},1251:function(t,e,n){"use strict";function a(t){return function(){var e=t.apply(this,arguments);return new Promise(function(t,n){function a(i,r){try{var s=e[i](r),o=s.value}catch(t){return void n(t)}if(!s.done)return Promise.resolve(o).then(function(t){a("next",t)},function(t){a("throw",t)});t(o)}return a("next")})}}var i=n(34),r=n(32),s=n(1016),o=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var n=arguments[e];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(t[a]=n[a])}return t},c=r.a.deviceManageAsk,u=s.a.PageTableCreaterMix;e.a={name:"MaintainHistory",components:{},mixins:[u("app")],props:{},data:function(){return{did:this.$route.params.did}},computed:o({},Object(i.mapState)("deviceManage",["deviceStatusArray"]),{getStatus:function(){return function(t){var e=this.deviceStatusArray.filter(function(e){return e.key===t})[0];return e?e.text:""}}}),watch:{},created:function(){},mounted:function(){},destroyed:function(){},methods:{init:function(){this.pagination.current=1,this.appFetch()},appColumns:function(){return[{title:"时间",dataIndex:"createtime",align:"center",width:"20%",scopedSlots:{customRender:"createtime"}},{title:"任务",dataIndex:"taskname",align:"center",width:"20%"},{title:"安装工",dataIndex:"workername",align:"center",width:"20%"},{title:"状态",dataIndex:"status",width:"20%",align:"center",scopedSlots:{customRender:"status"}},{title:"",dataIndex:"operate",align:"center"}]},appFetchList:function(t){var e=this;return a(regeneratorRuntime.mark(function n(){var a,i,r,s;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.did,n.next=3,c.getAssignmentDevLog(o({},t,{order:"createtime",type:"0",did:a}));case 3:return i=n.sent,i.errcode,r=i.data,s=void 0===r?{}:r,n.abrupt("return",{total:s.totalsize,data:s.assignmentdevices});case 8:case"end":return n.stop()}},n,e)}))()}}}},1645:function(t,e){},1646:function(t,e,n){"use strict";var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("a-table",{staticClass:"reset-pagination",attrs:{columns:t.columns,"row-key":function(t){return""+t.createtime+Math.random()},"data-source":t.data,loading:t.loading,pagination:t.pagination},on:{change:t.appChange},scopedSlots:t._u([{key:"createtime",fn:function(e,a){return[n("span",[t._v(t._s(a.createtime?t.$moment().format(t.GLOBAL.TIME_FOEMAT):"— —"))])]}},{key:"status",fn:function(e,a){return[n("span",{class:{error:"3"===e}},[t._v(t._s(t.getStatus(e)))])]}}])})},i=[],r={render:a,staticRenderFns:i};e.a=r},972:function(t,e,n){"use strict";function a(t){n(1645)}Object.defineProperty(e,"__esModule",{value:!0});var i=n(1251),r=n(1646),s=n(24),o=a,c=s(i.a,r.a,!1,o,"data-v-014ae471",null);e.default=c.exports}});