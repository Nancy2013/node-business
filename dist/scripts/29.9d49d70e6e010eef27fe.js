webpackJsonp([29],{1008:function(e,t,n){"use strict";var a=(n(34),n(32)),i=a.a.deviceManageAsk,r=a.a.groupManageAsk;t.a={name:"DeviceModal",components:{},mixins:[],props:{title:{type:String,default:"选择设备"},data:{type:Array,default:function(){return[]}},flag:{type:String,default:"null"},productid:{type:String,default:""}},data:function(){return{isModal:!0,deviceList:[],checkedList:[],spinning:!1,search:"",remark:"",did:"",groupid:0,groupList:[]}},computed:{indeterminate:function(){var e=this.checkedList,t=this.filterDevice;return!!e.length&&e.length<t.length},filterDevice:function(){var e=this.data,t=void 0===e?[]:e,n=this.deviceList;return n&&n.filter(function(e){return!t.includes(e.did)})||[]},checkAll:function(){var e=this.checkedList,t=this.filterDevice;return e.length===t.length&&e.length>0}},watch:{},created:function(){"timeLinkage"===this.flag&&this.getAllGroup(),this.getDevice()},mounted:function(){},destroyed:function(){},methods:{cancel:function(){this.$emit("cancel")},ok:function(){this.spinning=!0;var e=this.checkedList,t=this.deviceList;if(e.length<1)return this.$message.warning("请先选择设备！"),void(this.spinning=!1);var n=[];e.forEach(function(e){var a=t.findIndex(function(t){return t.did===e});a>-1&&n.push(t[a])}),this.$emit("ok",n)},onCheckAllChange:function(e){var t=this.filterDevice;Object.assign(this,{checkedList:e.target.checked?t&&t.map(function(e){return e.did}):[]})},doSearch:function(){this.checkedList=[],this.getDevice()},filterOption:function(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0},getAllGroup:function(){var e=this;r.getGroup().then(function(t){var n=t.errcode,a=t.data,i=void 0===a?{}:a;200===n&&(e.groupList=i)}).catch(function(e){})},getDevice:function(){var e=this;this.spinning=!0;var t=this.search,n=this.flag,a=this.did,r=this.remark,s=this.productid,o=this.groupid,c={limit:this.GLOBAL.MAX_LEN,offset:1,displayname:t,remark:r,did:a};switch(n){case"siteid":case"groupid":c[n]=-1;break;case"taskid":c.running="-1",c[n]=-1;break;case"timeLinkage":c.productid=s,c.groupid=0===o?null:o}i.getDevice(c).then(function(t){var n=t.errcode,a=t.data,i=void 0===a?{}:a;200===n&&(e.deviceList=i.deviceInfos||[],e.spinning=!1)}).catch(function(t){e.spinning=!1})}}}},1013:function(e,t,n){"use strict";function a(e){n(1014)}var i=n(1008),r=n(1015),s=n(24),o=a,c=s(i.a,r.a,!1,o,"data-v-ce73d7ec",null);t.a=c.exports},1014:function(e,t){},1015:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-modal",{attrs:{"mask-closable":!1,width:560,footer:null,title:e.title},on:{cancel:e.cancel},model:{value:e.isModal,callback:function(t){e.isModal=t},expression:"isModal"}},[n("a-row",{attrs:{gutter:10}},[n("a-col",{attrs:{span:12}},["timeLinkage"===e.flag?n("a-select",{staticStyle:{width:"100%"},attrs:{"filter-option":e.filterOption,"show-search":!0},on:{change:e.doSearch},model:{value:e.groupid,callback:function(t){e.groupid=t},expression:"groupid"}},[n("a-select-option",{attrs:{value:0}},[e._v("全部设备")]),e._v(" "),e._l(e.groupList,function(t){return n("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])})],2):n("a-input-search",{attrs:{placeholder:"请输入设备名称搜索","enter-button":""},on:{search:e.doSearch},model:{value:e.search,callback:function(t){e.search="string"==typeof t?t.trim():t},expression:"search"}})],1),e._v(" "),"siteid"===e.flag?n("a-col",{attrs:{span:12}},[n("a-input-search",{attrs:{placeholder:"请输入站点名称搜索","enter-button":""},on:{search:e.doSearch},model:{value:e.remark,callback:function(t){e.remark="string"==typeof t?t.trim():t},expression:"remark"}})],1):n("a-col",{attrs:{span:12}},[n("a-input-search",{attrs:{placeholder:"请输入设备DID搜索","enter-button":""},on:{search:e.doSearch},model:{value:e.did,callback:function(t){e.did="string"==typeof t?t.trim():t},expression:"did"}})],1)],1),e._v(" "),n("a-spin",{attrs:{spinning:e.spinning}},[n("div",{staticClass:"modal-border-panel mt20"},[n("div",[n("a-checkbox",{staticStyle:{"margin-bottom":"10px"},attrs:{checked:e.checkAll,indeterminate:e.indeterminate},on:{change:e.onCheckAllChange}},[e._v("全选")])],1),e._v(" "),n("a-checkbox-group",{model:{value:e.checkedList,callback:function(t){e.checkedList=t},expression:"checkedList"}},e._l(e.filterDevice,function(t){return n("a-row",{key:t.did,staticClass:"mb10"},[n("a-checkbox",{attrs:{value:t.did}},[e._v(e._s(t.displayname+"("+t.did+")"))])],1)}),1)],1),e._v(" "),n("div",{staticClass:"modal-footer-btn mt20"},[n("a-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("a-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:e.ok}},[e._v("确定\n        ")])],1)])],1),e._v(">\n")],1)},i=[],r={render:a,staticRenderFns:i};t.a=r},1271:function(e,t,n){"use strict";function a(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(i,r){try{var s=t[i](r),o=s.value}catch(e){return void n(e)}if(!s.done)return Promise.resolve(o).then(function(e){a("next",e)},function(e){a("throw",e)});e(o)}return a("next")})}}var i=n(34),r=n(32),s=n(1013),o=function(){function e(e,t){var n=[],a=!0,i=!1,r=void 0;try{for(var s,o=e[Symbol.iterator]();!(a=(s=o.next()).done)&&(n.push(s.value),!t||n.length!==t);a=!0);}catch(e){i=!0,r=e}finally{try{!a&&o.return&&o.return()}finally{if(i)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},l=r.a.taskManageAsk;t.a={name:"TaskDetail",components:{DeviceModal:s.a},mixins:[],props:{},data:function(){return{spinning:!1,breadcrumbRoutes:[],form:this.$form.createForm(this),labelCol:{span:2},wrapperCol:{span:8},columns:[],id:this.$route.params.id,task:{devices:[],type:"1"},dids:[],selected:[],rangeTime:[],isModal:!1}},computed:c({},Object(i.mapState)("taskManage",["taskType"]),Object(i.mapGetters)("taskManage",["installList"]),Object(i.mapState)("deviceManage",["runningStatus","deviceStatusArray"]),{getStatus:function(){return function(e,t){var n=this[e].filter(function(e){return e.key===t})[0];return n?n.text:""}}}),watch:{},created:function(){var e=this;return a(regeneratorRuntime.mark(function t(){return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return e.setBreadcrumb(),e.columns=e.getColumns(),t.next=4,e.getRoleList();case 4:e.init();case 5:case"end":return t.stop()}},t,e)}))()},mounted:function(){},destroyed:function(){},methods:c({},Object(i.mapActions)("taskManage",["getRoleList"]),{init:function(){this.id&&this.getAssignment()},setBreadcrumb:function(){var e=[{name:"任务管理",breadcrumbName:"全部任务"}];this.id?this.breadcrumbRoutes=[].concat(e,[{name:"",breadcrumbName:"任务详情"}]):this.breadcrumbRoutes=[].concat(e,[{name:"",breadcrumbName:"创建任务"}])},getColumns:function(){var e=[{title:"序号",dataIndex:"index",align:"center",width:"10%",scopedSlots:{customRender:"index"}},{title:"设备名称",dataIndex:"displayname",align:"center"},{title:"DID",dataIndex:"did",align:"center"},{title:"备注",dataIndex:"remark",align:"center"},{title:"状态",dataIndex:"running",align:"center",width:"20%",scopedSlots:{customRender:"running"}}];return this.id?e:[].concat(e,[{title:"",dataIndex:"operation",align:"center",scopedSlots:{customRender:"operation"}}])},handleSelectChange:function(e){this.task=Object.assign({},this.task,{type:e})},handleSelectChangeWorker:function(e){var t=this.installList,n=t.filter(function(t){return t.accountname===e})[0],a=n?n.displayname:"";this.task=Object.assign({},this.task,{worker:e,workname:a})},disabledDate:function(e){return e&&e<this.$moment()},onChangeTime:function(e){this.rangeTime=e},selectDevice:function(){var e=this.task.devices,t=void 0===e?[]:e;this.dids=t.map(function(e){return e.did}),this.isModal=!0},handleCancel:function(){this.isModal=!1},handleOk:function(e){var t=this.task.devices,n=void 0===t?[]:t;this.task=Object.assign({},this.task,{devices:n.concat(e)}),this.handleCancel()},delDevice:function(e){var t=this.task.devices;t.splice(e,1),this.task=Object.assign({},this.task,{devices:t})},cancel:function(){this.$router.back()},showDelModal:function(){var e=this;this.$confirm({title:"确定要删除任务？",content:"",okText:"确定",cancelText:"取消",onOk:function(){e.del()},onCancel:function(){}})},del:function(){var e=this;this.spinning=!0;var t=this.id,n=this.task,a={id:t,devices:n.devices};l.delAssignment(a).then(function(t){var n=t.errcode;t.data;200===n&&(e.$message.success("操作成功！"),e.$router.push({name:"taskList"})),e.spinning=!1}).catch(function(t){e.spinning=!1})},ok:function(){var e=this;this.form.validateFields(function(t,n){if(!t){e.spinning=!0;var a=e.id,i=e.rangeTime,r=e.task,s=n.taskname,l=n.worker,u=n.count;if(e.task=c({},e.task,{taskname:s,worker:l,count:u}),i){var d=o(i,2),m=d[0],h=d[1];e.task.starttime=m?m.format(e.GLOBAL.TIME_FOEMAT):"",e.task.endtime=h?h.format(e.GLOBAL.TIME_FOEMAT):""}if("0"===r.type){var p=r.devices;if((void 0===p?[]:p).length<=0)return e.$message.warning("请先添加设备！"),void(e.spinning=!1)}if(r.devices){var f=r.devices.map(function(e){return e.did});e.task=c({},e.task,{dids:f})}a?e.modAssignment():e.addAssignment()}})},addAssignment:function(){var e=this,t=c({},this.task);l.addAssignment(t).then(function(t){var n=t.errcode;t.data;200===n&&(e.$message.success("操作成功！"),e.$router.push({name:"taskList"})),e.spinning=!1}).catch(function(t){e.spinning=!1})},modAssignment:function(){var e=this,t=c({},this.task);l.modAssignment(t).then(function(t){var n=t.errcode;t.data;200===n&&(e.$message.success("操作成功！"),e.$router.push({name:"taskList"})),e.spinning=!1}).catch(function(t){e.spinning=!1})},getAssignment:function(){var e=this;this.spinning=!0;var t=this.id,n=this.installList,a=void 0===n?[]:n;l.getAssignmentDetail({id:t}).then(function(t){var n=t.errcode,i=t.data,r=void 0===i?{}:i;if(200===n){e.task=r.taskInfos;var s=e.task,o=s.starttime,c=s.endtime,l=s.worker;o&&(e.rangeTime=[e.$moment(o),e.$moment(c)]);a.findIndex(function(e){return e.accountname===l})<0&&(e.task.worker="")}e.spinning=!1}).catch(function(t){e.spinning=!1})}})}},1692:function(e,t){},1693:function(e,t){},1694:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-spin",{attrs:{spinning:e.spinning}},[n("div",[n("bl-header",[n("bl-breadcrumb",{attrs:{slot:"left","breadcrumb-routes":e.breadcrumbRoutes},slot:"left"})],1),e._v(" "),n("bl-page-wrapper",{staticClass:"content-padding"},[n("div",{attrs:{slot:"content"},slot:"content"},[n("a-form",{staticStyle:{width:"940px"},attrs:{form:e.form,"hide-required-mark":""}},[n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,colon:!1,label:"任务名称"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["taskname",{initialValue:e.task.taskname,rules:[{required:!0,message:"输入任务名称长度不超过20个字符",max:e.GLOBAL.NAME_MAX_LEN}]}],expression:"[ `taskname`,{\n        initialValue:task.taskname,\n        rules: [{ required: true, message: '输入任务名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,colon:!1,label:"任务类型"}},[n("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["type",{initialValue:e.task.type,rules:[{required:!0,message:"请选择任务类型"}]}],expression:"[ `type`,{\n        initialValue:task.type,\n        rules: [{ required: true, message: '请选择任务类型' }],} ]"}],attrs:{disabled:!!e.id},on:{change:e.handleSelectChange}},e._l(e.taskType,function(t){return n("a-select-option",{key:t.key,attrs:{value:t.key}},[e._v("\n                "+e._s(t.text)+"\n              ")])}),1)],1),e._v(" "),n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,colon:!1,label:"任务人员"}},[n("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["worker",{initialValue:e.task.worker,rules:[{required:!0,message:"请选择任务人员"}]}],expression:"[ `worker`,{\n        initialValue:task.worker,\n        rules: [{ required: true, message: '请选择任务人员' }],} ]"}],on:{change:e.handleSelectChangeWorker}},e._l(e.installList,function(t){return n("a-select-option",{key:t.accountname,attrs:{value:t.accountname}},[e._v("\n                "+e._s(t.displayname)+"\n              ")])}),1)],1),e._v(" "),n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,colon:!1,label:"任务时限"}},[n("a-range-picker",{directives:[{name:"decorator",rawName:"v-decorator",value:["rangeTime",{initialValue:e.rangeTime,rules:[{required:!0,message:"请选择任务时限"}]}],expression:"[ `rangeTime`,{\n        initialValue:rangeTime,\n        rules: [{ required: true, message: '请选择任务时限' }],} ]"}],staticStyle:{width:"100%"},attrs:{placeholder:["开始时间","结束时间"],format:e.GLOBAL.TIME_FOEMAT,"show-time":""},on:{change:e.onChangeTime}})],1),e._v(" "),"1"!==e.task.type||e.id?n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":{span:22},colon:!1,label:"任务内容"}},[e.id?e._e():n("a-button",{attrs:{type:"primary"},on:{click:e.selectDevice}},[e._v("选择需要维修的设备")]),e._v(" "),n("a-table",{staticClass:"table-border mt10",attrs:{columns:e.columns,"row-key":function(e){return e.did},pagination:!1,"data-source":e.task.devices,bordered:""},scopedSlots:e._u([{key:"index",fn:function(t,a,i){return[n("span",[e._v(e._s(i+1))])]}},{key:"running",fn:function(t,a){return[n("span",{class:{error:"-1"===t}},[e._v(e._s(e.getStatus("runningStatus",t)))])]}},{key:"operation",fn:function(t,a,i){return[n("a",{on:{click:function(t){return e.delDevice(i)}}},[n("a-icon",{staticClass:"error",attrs:{type:"close-circle"}})],1)]}}],null,!1,159479888)})],1):e._e(),e._v(" "),"1"!==e.task.type||e.id?e._e():n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,colon:!1,label:"设备数量"}},[n("a-input-number",{directives:[{name:"decorator",rawName:"v-decorator",value:["count",{initialValue:e.task.count,rules:[{required:!0,message:"安装数量至少为1且不超过100"}]}],expression:"[ `count`,{\n        initialValue:task.count,\n        rules: [{ required: true, message: '安装数量至少为1且不超过100'}],} ]"}],attrs:{min:1,max:100}})],1),e._v(" "),n("a-form-item",{attrs:{"label-col":{span:0},"wrapper-col":{span:24},colon:!1,label:""}},[n("a-button",{staticClass:"mr10",on:{click:e.cancel}},[e._v("取消")]),e._v(" "),e.id?n("a-button",{staticClass:"mr10",attrs:{type:"danger"},on:{click:e.showDelModal}},[e._v("删除")]):e._e(),e._v(" "),n("a-button",{staticClass:"mr10",attrs:{type:"primary"},on:{click:e.ok}},[e._v("确定\n            ")])],1)],1)],1)]),e._v(" "),e.isModal?n("DeviceModal",{attrs:{data:e.dids,flag:"taskid"},on:{cancel:e.handleCancel,ok:e.handleOk}}):e._e()],1)])},i=[],r={render:a,staticRenderFns:i};t.a=r},987:function(e,t,n){"use strict";function a(e){n(1692),n(1693)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1271),r=n(1694),s=n(24),o=a,c=s(i.a,r.a,!1,o,"data-v-3b7de3e7",null);t.default=c.exports}});