<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && set.sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar class="sidebar-container" />
    <div :class="{ hasTagsView: set.needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': set.fixedHeader }">
        <navbar />
        <tags-view v-if="set.needTagsView" />
      </div>
      <app-main />
      <right-panel v-if="set.showSettings">
        <settings />
      </right-panel>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, watch, watchEffect, onMounted, onBeforeMount, onBeforeUnmount, toRefs } from 'vue';
import { useStore, useRoute } from '@/utils/useApi';
import RightPanel from '@/components/RightPanel';
import { AppMain, Navbar, Settings, Sidebar, TagsView } from './components';

// export default {
//   name: 'TabLayout',
//   components: {
//     AppMain,
//     Navbar,
//     RightPanel,
//     Settings,
//     Sidebar,
//     TagsView,
//   },
//   setup() {
//https://cn.vuejs.org/api/reactivity-core.html
const store = useStore();
const set = reactive({
  sidebar: computed(() => {
    return store.state.app.sidebar;
  }),
  device: computed(() => {
    return store.state.app.device;
  }),
  fixedHeader: computed(() => {
    return store.state.settings.fixedHeader;
  }),
  showSettings: computed(() => {
    return store.state.settings.showSettings;
  }),
  needTagsView: computed(() => {
    return store.state.settings.tagsView;
  }),
  menuStyle: computed(() => {
    return store.state.settings.menu;
  }),
  classObj: computed(() => {
    const obj = {
      hideSidebar: !set.sidebar.opened,
      openSidebar: !!set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === 'mobile',
    };
    return obj;
  }),
});
const handleClickOutside = (params) => {
  store.dispatch('app/closeSideBar', { withoutAnimation: params });
};

const route = useRoute();
const WIDTH = ref(992);

watchEffect(() => {
  if (set.device === 'mobile' && !set.sidebar.opened) {
    handleClickOutside(false);
  }
});

watch(
  () => route,
  async () => {
    if (set.device === 'mobile' && set.sidebar.opened) {
      handleClickOutside(false);
    }
  },
  { immediate: true },
);

const $_isMobile = () => {
  const rect = document.body.getBoundingClientRect();
  return rect.width - 1 < WIDTH.value;
};

const $_resizeHandler = () => {
  if (!document.hidden) {
    const isMobile = $_isMobile();
    store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop');

    if (isMobile) {
      handleClickOutside(true);
    }
  }
};

onMounted(() => {
  const isMobile = $_isMobile();
  if (isMobile) {
    store.dispatch('app/toggleDevice', 'mobile');
    handleClickOutside(true);
  }
});

onBeforeMount(() => {
  window.addEventListener('resize', $_resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', $_resizeHandler);
});

//导航栏样式
const sideBarWidth = computed(() => {
  return set.menuStyle.sideBarWidth + 'px';
});
console.log(sideBarWidth);
//     return {
//       ...toRefs(set),
//       handleClickOutside,
//     };
//   },
// };
</script>

<style lang='scss'>
#app {
  .main-container {
    margin-left: v-bind(sideBarWidth);
  }
}
</style>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
