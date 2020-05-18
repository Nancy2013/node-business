<!-- 分组管理-tree -->
<template>
  <div class="tree-panel">
    <a-directory-tree :load-data="onLoadData"
                      :tree-data="treeData"
                      :auto-expand-parent="false"
                      :selected-keys="selectedKeys"
                      :loaded-keys="loadedKeys"
                      multiple
                      show-icon
                      @select="onSelect"
                      @expand="onExpand">
    </a-directory-tree>
  </div>
</template>
<script>
  import { mapState, mapGetters, mapMutations } from 'vuex';
  import service from 'servicePath/index';

  const { groupManageAsk } = service;
  export default {
    name: 'TreeBar',
    components: {},
    props: {},
    data() {
      return {
        treeData: [],
        loadedKeys: [],
        selectedKeys: [],
      };
    },
    computed: {
      ...mapState('groupManage', ['node']),
    },
    watch: {},
    created() {},
    mounted() {
      this.getGroup();
    },
    methods: {
      ...mapMutations('groupManage', ['updateNode', 'updateIsEmpty']),
      onSelect(selectedKeys, { selected: boolean, node }) {
        this.selectedKeys = selectedKeys;
        console.log(node);
        this.updateNode(node);
      },
      onExpand(expandedKeys, { expanded, node }) {
        const { dataRef = {} } = node;
        const { id } = dataRef;
        const { loadedKeys } = this;
        const index = loadedKeys.indexOf(id);
        if (index > -1) {
          this.loadedKeys.splice(index, 1);
        }
        this.onSelect([id], { selected: true, node });
      },
      onLoadData(treeNode) {
        const { dataRef = {} } = treeNode;
        const { id } = dataRef;
        const params = {
          id,
        };
        return groupManageAsk.getGroup(params).then(reuslt => {
          const { errcode, data = [] } = reuslt;
          if (errcode === 200) {
            const children =
              data &&
              data.map(v => ({
                key: v.id,
                title: `${v.name}(${v.devicenum || 0}台)`,
                parentgid: id,
                parentname: dataRef.name,
                ...v,
              }));

            treeNode.dataRef.children = children;
            this.treeData = [...this.treeData];
            const index = this.loadedKeys.includes(id);
            if (!index) {
              this.loadedKeys.push(id);
            }
          }
        });
      },
      // 更新treeData
      updateTreeData(params) {
        this.treeData = [...params];
      },
      // 查询分组
      getGroup() {
        const params = {
          id: null,
        };
        groupManageAsk.getGroup(params).then(reuslt => {
          const { errcode, data = [] } = reuslt;
          if (errcode === 200) {
            if (data) {
              this.treeData = data.map(v => ({
                key: v.id,
                title: `${v.name}(${v.devicenum || 0}台)`,
                children: [{}],
                ...v,
                dataRef: { ...v, key: v.id },
              }));
              if (data.length > 0) {
                const { key, isnode = 0 } = this.treeData[0];
                this.selectedKeys = [key];
                this.updateIsEmpty(isnode === 0);
                this.updateNode(this.treeData[0]);
              }
            }
          }
        });
      },
    },
  };
</script>

<style lang="less" scoped>
</style>
