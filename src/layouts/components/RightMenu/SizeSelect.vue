<template>
  <el-dropdown trigger="click" @command="handleSetSize">
    <div>
      <svg-icon class-name="size-icon" icon-class="size" />
    </div>
    <el-dropdown-menu slot="dropdown">
      <el-dropdown-item
        v-for="item of sizeOptions"
        :key="item.value"
        :disabled="size === item.value"
        :command="item.value"
      >
        {{ item.label }}
      </el-dropdown-item>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import { mapState, mapActions } from 'pinia';
import { useAppStore, useTagsViewStore } from '@/piniaStores';
export default {
  data() {
    return {
      sizeOptions: [
        { label: 'Default', value: 'default' },
        { label: 'Medium', value: 'medium' },
        { label: 'Small', value: 'small' },
        { label: 'Mini', value: 'mini' },
      ],
    };
  },
  computed: {
    ...mapState(useAppStore, {
      size: (store) => store.size,
    }),
  },
  methods: {
    handleSetSize(size) {
      this.$ELEMENT.size = size;
      this.setSize(size);
      this.refreshView();
      this.$message({
        message: 'Switch Size Success',
        type: 'success',
      });
    },
    refreshView() {
      // In order to make the cached page re-rendered
      this.delAllCachedViews(this.$route);

      const { fullPath } = this.$route;

      this.$nextTick(() => {
        this.$router.replace({
          path: '/redirect' + fullPath,
        });
      });
    },
    ...mapActions(useTagsViewStore, ['delAllCachedViews']),
    ...mapActions(useAppStore, ['setSize']),
  },
};
</script>
