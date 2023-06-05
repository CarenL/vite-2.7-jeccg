<template>
  <div :class="set.classObj" class="app-wrapper">
    <div v-if="set.device === 'mobile' && set.sidebar.opened" class="drawer-bg" @click="handleClickOutside" />
    <sidebar
      class="sidebar-container"
      :class="[set.navTheme, set.fixedHeader ? 'fixed-sidebar' : '']"
      v-if="set.device === 'mobile' || set.layout === 'sidemenu'"
    />
    <div :class="{ hasTagsView: set.needTagsView }" class="main-container">
      <div :class="{ 'fixed-header': set.fixedHeader }">
        <navbar>
          <template #topbar v-if="set.layout !== 'sidemenu'">
            <topbar class="topbar-container" :class="[set.navTheme, set.fixedHeader ? 'fixed-sidebar' : '']"></topbar>
          </template>
          <template #sidemenu v-if="set.layout === 'sidemenu'">
            <hamburger
              id="hamburger-container"
              :is-active="set.sidebar.opened"
              class="hamburger-container"
              @toggleClick="toggleSideBar"
            />
            <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
          </template>
        </navbar>
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
import { AppMain, Navbar, Settings, Sidebar, TagsView, Topbar } from './components';
import Breadcrumb from '@/components/Breadcrumb/index.vue';
import Hamburger from '@/components/Hamburger/index.vue';
import variables from '@/styles/variables.module.scss';
import variablesLight from '@/styles/variables-light.module.scss';
import { useAppStore, useSettingsStore } from '@/piniaStores';

//https://cn.vuejs.org/api/reactivity-core.html
const appStore = useAppStore();
const settingsStore = useSettingsStore();
const set = reactive({
  sidebar: computed(() => {
    return appStore.sidebar;
  }),
  device: computed(() => {
    return appStore.device;
  }),
  fixedHeader: computed(() => {
    return settingsStore.fixedHeader;
  }),
  showSettings: computed(() => {
    return settingsStore.showSettings;
  }),
  needTagsView: computed(() => {
    return settingsStore.tagsView;
  }),
  navTheme: computed(() => {
    return settingsStore.navTheme;
  }),
  layout: computed(() => {
    return settingsStore.layout;
  }),
  classObj: computed(() => {
    const obj = {
      hideSidebar: !set.sidebar.opened,
      openSidebar: !!set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === 'mobile',
      sidebar: set.layout === 'sidemenu',
      topbar: set.layout !== 'sidemenu',
    };
    return obj;
  }),
  theme: computed(() => {
    return settingsStore.theme;
  }),
});

const handleClickOutside = (params) => {
  appStore.closeSideBar({ withoutAnimation: params });
};

const toggleSideBar = () => {
  appStore.toggleSideBar();
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
    appStore.toggleDevice(isMobile ? 'mobile' : 'desktop');

    if (isMobile) {
      handleClickOutside(true);
    }
  }
};

onMounted(() => {
  const isMobile = $_isMobile();
  if (isMobile) {
    appStore.toggleDevice('mobile');
    handleClickOutside(true);
  }
});

onBeforeMount(() => {
  window.addEventListener('resize', $_resizeHandler);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', $_resizeHandler);
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/variables.module.scss';

.app-wrapper {
  @include clearfix;
  position: relative;
  // height: 100%;
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
  width: 100%;
  transition: width 0.28s;
}

.sidebar {
  .fixed-header {
    width: calc(100% - #{$sideBarWidth});
  }
}

.hideSidebar.sidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
