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
    ...mapState(useTagsViewStore, ['cachedViews']),
    key() {
      return this.$route.path;
    },
  },
};
</script>

<style lang="scss" scoped>
$topHeight: 80px;
$height: 60px;
$margin: 10px;
$tagView: 50px;
.app-main {
  min-height: calc(100vh - #{$height} - #{$margin} - #{$margin});
  // width: 100%;
  padding: $margin;
  position: relative;
  overflow: hidden;
  box-sizing: content-box;

  .el-main {
    background-color: #fff;
    padding: 24px 22px;
  }
}

.fixed-header + .app-main {
  padding-top: $height + $margin;
}

.hasTagsView {
  .app-main {
    /* 110 = navbar + tags-view = 60 + 50 */
    min-height: calc(100vh - #{$height} - #{$tagView} - #{$margin} - #{$margin});
  }

  .fixed-header + .app-main {
    padding-top: $height + $tagView + $margin;
  }
}
// 顶部菜单栏
.topbar {
  .app-main {
    /* 50= navbar  50  */
    min-height: calc(100vh - #{$topHeight} - #{$margin} - #{$margin});
    // width: 100%;
    position: relative;
    overflow: hidden;
    box-sizing: content-box;
  }

  .fixed-header + .app-main {
    padding-top: $topHeight + $topHeight;
  }

  .hasTagsView {
    .app-main {
      /* 84 = navbar + tags-view = 80 + 50 */
      min-height: calc(100vh - #{$topHeight} - #{$tagView} - #{$margin} - #{$margin});
    }

    .fixed-header + .app-main {
      padding-top: $topHeight + $tagView + $margin;
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
