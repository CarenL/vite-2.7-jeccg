<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import { mapState } from 'pinia';
import { useTagsViewStore } from '@/piniaStores';
export default {
  name: 'AppMain',
  computed: {
    ...mapState(useTagsViewStore, {
      cachedViews: (store) => store.cachedViews,
    }),
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
$topHeight: 80px;
$height: 60px;
.app-main {
  /* 50= navbar  50  */
  min-height: calc(100vh - $height);
  width: 100%;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;
}

.fixed-header + .app-main {
  padding-top: $height;
}

.hasTagsView {
  .app-main {
    /* 84 = navbar + tags-view = 60 + 50 */
    min-height: calc(100vh - 110px);
  }

  .fixed-header + .app-main {
    padding-top: 110px;
  }
}
// 顶部菜单栏
.topbar {
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - $topHeight);
    width: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: content-box;
  }

  .fixed-header + .app-main {
    padding-top: $topHeight;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 80 + 50 */
      min-height: calc(100vh - 130px);
    }

    .fixed-header + .app-main {
      padding-top: 130px;
    }
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
