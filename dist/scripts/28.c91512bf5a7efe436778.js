webpackJsonp([28],{1008:function(e,t,n){"use strict";var a=(n(34),n(32)),i=a.a.deviceManageAsk,r=a.a.groupManageAsk;t.a={name:"DeviceModal",components:{},mixins:[],props:{title:{type:String,default:"选择设备"},data:{type:Array,default:function(){return[]}},flag:{type:String,default:"null"},productid:{type:String,default:""}},data:function(){return{isModal:!0,deviceList:[],checkedList:[],spinning:!1,search:"",remark:"",did:"",groupid:0,groupList:[]}},computed:{indeterminate:function(){var e=this.checkedList,t=this.filterDevice;return!!e.length&&e.length<t.length},filterDevice:function(){var e=this.data,t=void 0===e?[]:e,n=this.deviceList;return n&&n.filter(function(e){return!t.includes(e.did)})||[]},checkAll:function(){var e=this.checkedList,t=this.filterDevice;return e.length===t.length&&e.length>0}},watch:{},created:function(){"timeLinkage"===this.flag&&this.getAllGroup(),this.getDevice()},mounted:function(){},destroyed:function(){},methods:{cancel:function(){this.$emit("cancel")},ok:function(){this.spinning=!0;var e=this.checkedList,t=this.deviceList;if(e.length<1)return this.$message.warning("请先选择设备！"),void(this.spinning=!1);var n=[];e.forEach(function(e){var a=t.findIndex(function(t){return t.did===e});a>-1&&n.push(t[a])}),this.$emit("ok",n)},onCheckAllChange:function(e){var t=this.filterDevice;Object.assign(this,{checkedList:e.target.checked?t&&t.map(function(e){return e.did}):[]})},doSearch:function(){this.checkedList=[],this.getDevice()},filterOption:function(e,t){return t.componentOptions.children[0].text.toLowerCase().indexOf(e.toLowerCase())>=0},getAllGroup:function(){var e=this;r.getGroup().then(function(t){var n=t.errcode,a=t.data,i=void 0===a?{}:a;200===n&&(e.groupList=i)}).catch(function(e){})},getDevice:function(){var e=this;this.spinning=!0;var t=this.search,n=this.flag,a=this.did,r=this.remark,c=this.productid,s=this.groupid,o={limit:this.GLOBAL.MAX_LEN,offset:1,displayname:t,remark:r,did:a};switch(n){case"siteid":case"groupid":o[n]=-1;break;case"taskid":o.running="-1",o[n]=-1;break;case"timeLinkage":o.productid=c,o.groupid=0===s?null:s}i.getDevice(o).then(function(t){var n=t.errcode,a=t.data,i=void 0===a?{}:a;200===n&&(e.deviceList=i.deviceInfos||[],e.spinning=!1)}).catch(function(t){e.spinning=!1})}}}},1013:function(e,t,n){"use strict";function a(e){n(1014)}var i=n(1008),r=n(1015),c=n(24),s=a,o=c(i.a,r.a,!1,s,"data-v-ce73d7ec",null);t.a=o.exports},1014:function(e,t){},1015:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("a-modal",{attrs:{"mask-closable":!1,width:560,footer:null,title:e.title},on:{cancel:e.cancel},model:{value:e.isModal,callback:function(t){e.isModal=t},expression:"isModal"}},[n("a-row",{attrs:{gutter:10}},[n("a-col",{attrs:{span:12}},["timeLinkage"===e.flag?n("a-select",{staticStyle:{width:"100%"},attrs:{"filter-option":e.filterOption,"show-search":!0},on:{change:e.doSearch},model:{value:e.groupid,callback:function(t){e.groupid=t},expression:"groupid"}},[n("a-select-option",{attrs:{value:0}},[e._v("全部设备")]),e._v(" "),e._l(e.groupList,function(t){return n("a-select-option",{key:t.id,attrs:{value:t.id}},[e._v(e._s(t.name))])})],2):n("a-input-search",{attrs:{placeholder:"请输入设备名称搜索","enter-button":""},on:{search:e.doSearch},model:{value:e.search,callback:function(t){e.search="string"==typeof t?t.trim():t},expression:"search"}})],1),e._v(" "),"siteid"===e.flag?n("a-col",{attrs:{span:12}},[n("a-input-search",{attrs:{placeholder:"请输入站点名称搜索","enter-button":""},on:{search:e.doSearch},model:{value:e.remark,callback:function(t){e.remark="string"==typeof t?t.trim():t},expression:"remark"}})],1):n("a-col",{attrs:{span:12}},[n("a-input-search",{attrs:{placeholder:"请输入设备DID搜索","enter-button":""},on:{search:e.doSearch},model:{value:e.did,callback:function(t){e.did="string"==typeof t?t.trim():t},expression:"did"}})],1)],1),e._v(" "),n("a-spin",{attrs:{spinning:e.spinning}},[n("div",{staticClass:"modal-border-panel mt20"},[n("div",[n("a-checkbox",{staticStyle:{"margin-bottom":"10px"},attrs:{checked:e.checkAll,indeterminate:e.indeterminate},on:{change:e.onCheckAllChange}},[e._v("全选")])],1),e._v(" "),n("a-checkbox-group",{model:{value:e.checkedList,callback:function(t){e.checkedList=t},expression:"checkedList"}},e._l(e.filterDevice,function(t){return n("a-row",{key:t.did,staticClass:"mb10"},[n("a-checkbox",{attrs:{value:t.did}},[e._v(e._s(t.displayname+"("+t.did+")"))])],1)}),1)],1),e._v(" "),n("div",{staticClass:"modal-footer-btn mt20"},[n("a-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("a-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:e.ok}},[e._v("确定\n        ")])],1)])],1),e._v(">\n")],1)},i=[],r={render:a,staticRenderFns:i};t.a=r},1263:function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(i,r){try{var c=t[i](r),s=c.value}catch(e){return void n(e)}if(!c.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}return a("next")})}}var r=(n(34),n(32)),c=n(1013),s=n(1676),o=function(){function e(e,t){var n=[],a=!0,i=!1,r=void 0;try{for(var c,s=e[Symbol.iterator]();!(a=(c=s.next()).done)&&(n.push(c.value),!t||n.length!==t);a=!0);}catch(e){i=!0,r=e}finally{try{!a&&s.return&&s.return()}finally{if(i)throw r}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},u=r.a.appAsk,d=r.a.locationManageAsk;t.a={name:"SiteDetail",components:{GroupModal:s.a,DeviceModal:c.a},props:{},data:function(){return{data:{devices:[]},spinning:!1,id:this.$route.params.id,form:this.$form.createForm(this),labelCol:{span:2},wrapperCol:{span:6},breadcrumbRoutes:[],provincial:"",urban:"",areas:"",defaultValue:void 0,isGroupModal:!1,isDeviceModal:!1,dids:[],previewVisible:!1,previewImage:"",fileList:[]}},computed:{},watch:{},created:function(){this.init()},mounted:function(){},methods:{init:function(){this.setBreadcrumb();var e=this.id,t=this.data;e?this.getDetail():this.data=l({},t,{provincial:"北京市",urban:"市辖区",areas:"东城区"})},setBreadcrumb:function(){var e=[{name:"位置管理",breadcrumbName:"全部位置"}];this.id?this.breadcrumbRoutes=[].concat(e,[{name:"",breadcrumbName:"站点详情"}]):this.breadcrumbRoutes=[].concat(e,[{name:"",breadcrumbName:"添加站点"}])},updateLocation:function(e){var t=o(e,3),n=t[0],a=t[1],i=t[2];this.data=l({},this.data,{provincial:n,urban:a,areas:i})},addDevice:function(){var e=this.data.devices,t=void 0===e?[]:e;this.dids=t.map(function(e){return e.did}),this.isDeviceModal=!0},delDevices:function(e){var t=this.data.devices;t.splice(e,1),this.data=Object.assign({},this.data,{devices:t})},handleCancelGroup:function(){this.isGroupModal=!1},handleCancelDevice:function(){this.isDeviceModal=!1},handleOkDevice:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:[],t=this.data.devices,n=void 0===t?[]:t;this.data=Object.assign({},this.data,{devices:n.concat(e)}),this.handleCancelDevice()},handleCancelModal:function(){this.previewVisible=!1},handlePreview:function(e){this.previewImage=e.url||e.thumbUrl,this.previewVisible=!0},handleChange:function(e){e.fileList},handleRemove:function(e){var t=this.fileList.indexOf(e),n=this.fileList.slice();n.splice(t,1),this.fileList=n,this.data.picurl=""},beforeUpload:function(e){var t=this;return i(regeneratorRuntime.mark(function n(){var i,r;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,t.checkFile(e);case 2:if(!(i=n.sent)){n.next=9;break}return n.next=6,t.handleUpload(e);case 6:r=n.sent,e.url=r,t.fileList=[].concat(a(t.fileList),[e]);case 9:return n.abrupt("return",!1);case 10:case"end":return n.stop()}},n,t)}))()},checkFile:function(e){var t=this;return i(regeneratorRuntime.mark(function n(){var a,i,r,c,s,o,l;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a=t.GLOBAL,i=["image/png","image/jpeg"],r=e.type,c=e.size,s=i.includes(r),s||t.$message.error("请上传jpg或png格式文件!"),o=c/1024/1024<=2,o||t.$message.error("文件大小不能超过2MB!"),n.next=10,t.checkImageWH(e,a.IMG_WIDTH,a.IMG_HEIGHT);case 10:return l=n.sent,n.abrupt("return",s&&o&&l);case 12:case"end":return n.stop()}},n,t)}))()},checkImageWH:function(e,t,n){var a=this;return i(regeneratorRuntime.mark(function i(){var r;return regeneratorRuntime.wrap(function(i){for(;;)switch(i.prev=i.next){case 0:return r=a,i.abrupt("return",new Promise(function(a,i){var c=new FileReader;c.onload=function(e){var c=e.target.result,s=new Image;s.onload=function(){t&&this.width!=t||n&&this.height!=n?(r.$message.warning("请上传尺寸为"+t+"*"+n+"的图片"),i()):a(!0)},s.onerror=i,s.src=c},c.readAsDataURL(e)}));case 2:case"end":return i.stop()}},i,a)}))()},handleUpload:function(e){var t=this,n=this.GLOBAL,a=new FormData;return a.append("foldertype",n.FOLDER_TYPE.sitelocation),a.append("upfile",e),u.uploadPic(a).then(function(e){var n=e.errcode,a=e.data;return 200===n?(t.data.picurl=a.url,a.url):""}).catch(function(e){})},cancel:function(){this.$router.back()},showDelModal:function(){var e=this;this.$confirm({title:"确定要删除站点？",content:"",okText:"确定",cancelText:"取消",onOk:function(){e.del()},onCancel:function(){}})},ok:function(){var e=this;this.form.validateFields(function(t,n){if(!t){var a=e.id,i=e.data,r=i.devices,c=void 0===r?[]:r,s=c.map(function(e){return e.did}),o=n.name,u=n.location;e.data=l({},i,{name:o,location:u,dids:s}),a?e.mod():e.add()}})},add:function(){var e=this;this.spinning=!0;var t=l({},this.data);d.addSite(t).then(function(t){var n=t.errcode;t.data;200===n&&(e.$message.success("操作成功！"),e.$router.push({name:"siteList"}),e.spinning=!1)}).catch(function(t){e.spinning=!1})},mod:function(){var e=this;this.spinning=!0;var t=l({},this.data);d.modSite(t).then(function(t){var n=t.errcode;t.data;200===n&&(e.$message.success("操作成功！"),e.$router.push({name:"siteList"}),e.spinning=!1)}).catch(function(t){e.spinning=!1})},del:function(){var e=this;this.spinning=!0;var t=this.id;d.delSite({siteids:[t]}).then(function(t){var n=t.errcode;t.data;200===n&&(e.$message.success("操作成功！"),e.$router.push({name:"siteList"})),e.spinning=!1}).catch(function(t){e.spinning=!1})},getDetail:function(){var e=this;this.spinning=!0;var t=this.id;d.getSiteDetail({limit:1,offset:1,id:t}).then(function(t){var n=t.errcode,a=t.data,i=void 0===a?{}:a;if(200===n){var r=i.sites;e.data=r||{};var c=e.data,s=c.provincial,o=void 0===s?"北京市":s,l=c.urban,u=void 0===l?"市辖区":l,d=c.areas,h=void 0===d?"东城区":d;e.defaultValue=[o,u,h],e.getFiles()}e.spinning=!1}).catch(function(t){e.spinning=!1})},getFiles:function(){var e=this.data.picurl,t="/sitelocation/";if(e&&e.includes(t)){var n=e.indexOf(t),a=e.substring(n+t.length,e.length);this.fileList=[{id:"1",uid:"1",name:a,status:"done",url:e}]}}}}},1264:function(e,t,n){"use strict";function a(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function i(e){return function(){var t=e.apply(this,arguments);return new Promise(function(e,n){function a(i,r){try{var c=t[i](r),s=c.value}catch(e){return void n(e)}if(!c.done)return Promise.resolve(s).then(function(e){a("next",e)},function(e){a("throw",e)});e(s)}return a("next")})}}var r=n(32),c=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},s=r.a.groupManageAsk;t.a={name:"DeviceModal",components:{},mixins:[],props:{data:{type:Array,default:function(){return[]}}},data:function(){return{isModal:!0,treeData:[],checkedKeys:[]}},computed:{},watch:{checkedKeys:function(e){}},created:function(){this.init()},mounted:function(){},destroyed:function(){},methods:{init:function(){var e=this;return i(regeneratorRuntime.mark(function t(){var n,a;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return t.next=2,e.getGroup(null);case 2:n=t.sent,a=n.groups,e.treeData=a.map(function(e){return c({key:e.id,title:e.name+"("+(e.devicenum||0)+"台)",children:[{}]},e)});case 5:case"end":return t.stop()}},t,e)}))()},onCheck:function(e,t){t.checked,t.checkedNodes,t.node,t.event},onLoadData:function(e){var t=this;return i(regeneratorRuntime.mark(function n(){var i,r,s,o,l,u;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return i=e.eventKey,r=e.dataRef,s=void 0===r?{}:r,n.next=6,t.getGroup(i);case 6:o=n.sent,l=o.groups,u=l.map(function(e){return c({key:e.id,title:e.name+"("+(e.devicenum||0)+"台)"},e)}),e.dataRef.children=[].concat(a(u)),t.treeData=[].concat(a(t.treeData));case 11:case"end":return n.stop()}},n,t)}))()},cancel:function(){this.$emit("cancel")},ok:function(){var e=this.checkedKeys;if(e.length>0){var t=this.getAllDevice(e[0]),n=t.devices,a=void 0===n?[]:n;this.$emit("ok",a)}else this.$message.warning("请先选择分组！")},getGroup:function(e){var t=this;return i(regeneratorRuntime.mark(function n(){var a,i,r,c;return regeneratorRuntime.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:return a={id:e},t.next=3,s.getGroup(a);case 3:return i=t.sent,i.errcode,r=i.data,c=void 0===r?[]:r,t.abrupt("return",{groups:c});case 8:case"end":return t.stop()}},n,t)}))()},getAllDevice:function(e){var t=this;return i(regeneratorRuntime.mark(function n(){var a,i,r,c;return regeneratorRuntime.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return a={id:e,offset:1,limit:t.GLOBAL.MAX_LEN},n.next=3,s.getDevice(a);case 3:return i=n.sent,i.errcode,r=i.data,c=void 0===r?{}:r,n.abrupt("return",{devices:c.deviceInfos});case 8:case"end":return n.stop()}},n,t)}))()}}}},1675:function(e,t){},1676:function(e,t,n){"use strict";function a(e){n(1677)}var i=n(1264),r=n(1678),c=n(24),s=a,o=c(i.a,r.a,!1,s,"data-v-52e7bacc",null);t.a=o.exports},1677:function(e,t){},1678:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-modal",{staticClass:"modal",attrs:{"mask-closable":!1,width:500,footer:null,title:"按分组添加"},on:{cancel:e.cancel},model:{value:e.isModal,callback:function(t){e.isModal=t},expression:"isModal"}},[n("div",{staticClass:"modal-border-panel"},[n("a-tree",{attrs:{"load-data":e.onLoadData,"tree-data":e.treeData,"auto-expand-parent":!1,checkable:""},on:{check:e.onCheck},model:{value:e.checkedKeys,callback:function(t){e.checkedKeys=t},expression:"checkedKeys"}})],1),e._v(" "),n("div",{staticClass:"modal-footer-btn mt10"},[n("a-button",{on:{click:e.cancel}},[e._v("取消")]),e._v(" "),n("a-button",{staticClass:"ml10",attrs:{type:"primary"},on:{click:e.ok}},[e._v("确定\n    ")])],1)])},i=[],r={render:a,staticRenderFns:i};t.a=r},1679:function(e,t,n){"use strict";var a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("a-spin",{attrs:{spinning:e.spinning}},[n("div",[n("bl-header",[n("bl-breadcrumb",{attrs:{slot:"left","breadcrumb-routes":e.breadcrumbRoutes},slot:"left"})],1),e._v(" "),n("bl-page-wrapper",{staticClass:"content-padding"},[n("div",{attrs:{slot:"content"},slot:"content"},[n("a-form",{staticClass:"reset-line-height",staticStyle:{width:"800px"},attrs:{form:e.form,"hide-required-mark":""}},[n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,colon:!1,label:"站点名称"}},[n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{initialValue:e.data.name,rules:[{required:!0,message:"输入站点名称长度不超过20个字符",max:e.GLOBAL.NAME_MAX_LEN}]}],expression:"[ `name`,{\n              initialValue:data.name,\n              rules: [{ required: true, message: '输入站点名称长度不超过20个字符' ,max:GLOBAL.NAME_MAX_LEN}],} ]"}]})],1),e._v(" "),n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":{span:20},colon:!1,label:"站点位置"}},[n("bl-cascader",{staticStyle:{"margin-right":"10px"},attrs:{"default-value":e.defaultValue},on:{update:e.updateLocation}}),e._v(" "),n("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["location",{initialValue:e.data.location,rules:[{required:!0,message:"输入详细站点位置"}]}],expression:"[ `location`,{\n                       initialValue:data.location,\n                       rules: [{ required: true, message: '输入详细站点位置' }],} ]"}],staticClass:"component-w-224",attrs:{placeholder:"详细地址：如道路门牌"}})],1),e._v(" "),n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":{md:{span:20}},colon:!1,label:"站点设备"}},[n("div",[n("a-button",{attrs:{type:"primary"},on:{click:e.addDevice}},[e._v("添加设备")])],1),e._v(" "),e.data.devices&&e.data.devices.length>0?n("div",{staticClass:"tag-box mt10"},e._l(e.data.devices,function(t,a){return n("div",{key:t.did,staticClass:"tag"},[n("a-row",[n("a-col",{attrs:{span:22}},[e._v("\n                    "+e._s(t.displayname+"-("+t.did+")-"+(t.location||""))+"\n                  ")]),e._v(" "),n("a-col",{attrs:{span:2}},[n("a-icon",{staticClass:"extra-icon cursor error",attrs:{type:"close-circle"},on:{click:function(t){return e.delDevices(a)}}})],1)],1)],1)}),0):e._e()]),e._v(" "),n("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":{span:10},colon:!1,label:"站点图片"}},[n("a-upload",{attrs:{"file-list":e.fileList,"before-upload":e.beforeUpload,remove:e.handleRemove,"list-type":"picture-card"},on:{preview:e.handlePreview,change:e.handleChange}},[e.fileList.length<1?n("div",[n("a-icon",{attrs:{type:"plus"}}),e._v(" "),n("div",{staticClass:"ant-upload-text"},[e._v("上传照片")])],1):e._e()]),e._v(" "),n("span",{staticClass:"tips"},[n("span",[e._v("图片大小:"+e._s(e.GLOBAL.IMG_WIDTH)+"*"+e._s(e.GLOBAL.IMG_HEIGHT)+"px")]),e._v(" "),n("br"),e._v(" "),n("span",[e._v("文件格式:jpg或png")])]),e._v(" "),n("a-modal",{attrs:{visible:e.previewVisible,footer:null,width:500},on:{cancel:e.handleCancelModal}},[n("img",{staticStyle:{width:"95%"},attrs:{src:e.previewImage,alt:"big"}})])],1),e._v(" "),n("a-form-item",{staticStyle:{"margin-top":"100px"},attrs:{"label-col":{span:0},"wrapper-col":{span:24},colon:!1,label:""}},[n("a-button",{staticClass:"mr10",on:{click:e.cancel}},[e._v("取消")]),e._v(" "),e.id?n("a-button",{staticClass:"mr10",attrs:{type:"danger"},on:{click:e.showDelModal}},[e._v("删除")]):e._e(),e._v(" "),n("a-button",{staticClass:"mr10",attrs:{type:"primary"},on:{click:e.ok}},[e._v("确定\n            ")])],1)],1)],1)])],1),e._v(" "),e.isDeviceModal?n("DeviceModal",{attrs:{data:e.dids,title:"添加设备",flag:"siteid"},on:{cancel:e.handleCancelDevice,ok:e.handleOkDevice}}):e._e()],1)},i=[],r={render:a,staticRenderFns:i};t.a=r},980:function(e,t,n){"use strict";function a(e){n(1675)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(1263),r=n(1679),c=n(24),s=a,o=c(i.a,r.a,!1,s,"data-v-129154bb",null);t.default=o.exports}});