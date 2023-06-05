<template>
  <div class="drawer-container">
    <div>
      <section>
        <h3 class="section-title">整体风格</h3>
        <div class="drawer-block">
          <el-tooltip content="暗色菜单风格" placement="top-start" popper-class="theme-picker-dropdown">
            <div class="drawer-item" @click="handleMenuTheme('dark')">
              <img :src="require('@/assets/dark.svg')" alt="dark" />
              <div class="drawer-item-select" v-if="navTheme === 'dark'">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </el-tooltip>
          <el-tooltip content="亮色菜单风格" placement="top-start" popper-class="theme-picker-dropdown">
            <div class="drawer-item" @click="handleMenuTheme('light')">
              <img :src="require('@/assets/light.svg')" alt="light" />
              <div class="drawer-item-select" v-if="navTheme !== 'dark'">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </el-tooltip>
        </div>
        <div class="drawer-block-set">
          <span class="drawer-title">主题色</span>
          <!-- <theme-picker @change="themeChange" class="drawer-picker" />-->
          <el-color-picker
            v-model="theme"
            :predefine="['#409EFF', '#1890ff', '#304156', '#212121', '#11a983', '#13c2c2', '#6959CD', '#f5222d']"
            class="theme-picker drawer-picker"
            popper-class="theme-picker-dropdown"
          />
        </div>
      </section>
      <section>
        <h3 class="section-title">导航模式</h3>
        <div class="drawer-block">
          <el-tooltip content="侧边栏导航" placement="top-start" popper-class="theme-picker-dropdown">
            <div class="drawer-item" @click="handleLayout('sidemenu')">
              <img :src="require('@/assets/sidebarIcon.png')" alt="sidemenu" />
              <div class="drawer-item-select" v-if="layout === 'sidemenu'">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </el-tooltip>

          <el-tooltip content="顶部栏导航" placement="top-start" popper-class="theme-picker-dropdown">
            <div class="drawer-item" @click="handleLayout('topmenu')">
              <img :src="require('@/assets/topbarIcon1.png')" alt="topmenu" />
              <div class="drawer-item-select" v-if="layout === 'topmenu'">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </el-tooltip>

          <el-tooltip content="顶部三级栏导航" placement="top-start" popper-class="theme-picker-dropdown">
            <div class="drawer-item" @click="handleLayout('topTreemenu')">
              <img :src="require('@/assets/topbarIcon2.png')" alt="topTreemenu" />
              <div class="drawer-item-select" v-if="layout === 'topTreemenu'">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </el-tooltip>
        </div>
        <div class="drawer-block-set" v-if="layout !== 'sidemenu'">
          <span class="drawer-title">内容区域宽度</span>
          <el-select v-model="contentWidth" size="mini" popper-class="theme-picker-dropdown">
            <el-option label="固定" value="Fixed"></el-option>
            <el-option label="流式" value="Fluid"></el-option>
          </el-select>
        </div>
        <div class="drawer-block-set">
          <span class="drawer-title">固定 Header</span>
          <el-switch v-model="fixedHeader" class="drawer-switch" />
        </div>
      </section>

      <section>
        <h3 class="section-title">其他设置</h3>
        <div class="drawer-block-set">
          <span class="drawer-title">色弱模式</span>
          <el-switch v-model="colorWeak" class="drawer-switch" />
        </div>
        <div class="drawer-block-set">
          <span class="drawer-title">多页签模式</span>
          <el-switch v-model="tagsView" class="drawer-switch" />
        </div>
        <div class="drawer-block-set">
          <span class="drawer-title">侧边栏logo</span>
          <el-switch v-model="sidebarLogo" class="drawer-switch" />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { mapState, mapWritableState, mapActions } from 'pinia';
import { useSettingsStore } from '@/piniaStores';
// import ThemePicker from '@/components/ThemePicker';

export default {
  // components: { ThemePicker },
  data() {
    return {};
  },
  computed: {
    ...mapState(useSettingsStore, {
      navTheme: (store) => store.navTheme,
      layout: (store) => store.layout,
      themeStore: (store) => store.theme,
      contentWidthStore: (store) => store.contentWidth,
      fixedHeaderStore: (store) => store.fixedHeader,
      colorWeakStore: (store) => store.colorWeak,
      tagsViewStore: (store) => store.tagsView,
      sidebarLogoStore: (store) => store.sidebarLogo,
    }),
    theme: {
      get() {
        return this.themeStore;
      },
      set(val) {
        this.changeSetting({
          key: 'theme',
          value: val,
        });
      },
    },
    contentWidth: {
      get() {
        return this.contentWidthStore;
      },
      set(val) {
        this.changeSetting({
          key: 'contentWidth',
          value: val,
        });
      },
    },
    fixedHeader: {
      get() {
        return this.fixedHeaderStore;
      },
      set(val) {
        this.changeSetting({
          key: 'fixedHeader',
          value: val,
        });
      },
    },
    colorWeak: {
      get() {
        return this.colorWeakStore;
      },
      set(val) {
        this.changeSetting({
          key: 'colorWeak',
          value: val,
        });
      },
    },
    tagsView: {
      get() {
        return this.tagsViewStore;
      },
      set(val) {
        this.changeSetting({
          key: 'tagsView',
          value: val,
        });
      },
    },
    sidebarLogo: {
      get() {
        return this.sidebarLogoStore;
      },
      set(val) {
        this.changeSetting({
          key: 'sidebarLogo',
          value: val,
        });
      },
    },
  },
  methods: {
    themeChange(val) {
      this.changeSetting({
        key: 'theme',
        value: val,
      });
    },
    handleMenuTheme(val) {
      this.changeSetting({
        key: 'navTheme',
        value: val,
      });
    },
    handleLayout(val) {
      this.changeSetting({
        key: 'layout',
        value: val,
      });
    },
    ...mapActions(useSettingsStore, ['changeSetting']),
  },
};
</script>
<style>
.theme-message,
.theme-picker-dropdown {
  z-index: 99999 !important;
}

.theme-picker .el-color-picker__trigger {
  height: 26px !important;
  width: 26px !important;
  padding: 2px;
}

.theme-picker-dropdown .el-color-dropdown__link-btn {
  display: none;
}
</style>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  section {
    padding: 10px 0;
    margin-bottom: 10px;
    border-bottom: 1px solid #e7e7e7;

    &:first-of-type {
      padding-top: 0;
    }

    .drawer-block-set {
      width: 100%;
      padding: 0;
      margin: 10px 0;
      font-size: 14px;
      line-height: 28px;
      color: rgba(0, 0, 0, 0.65);

      .el-select {
        width: 100px;
        float: right;
      }
    }
  }

  .section-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 16px;
    line-height: 22px;
  }

  .drawer-block {
    display: flex;
    margin-bottom: 20px;

    .drawer-item {
      margin-right: 16px;
      position: relative;
      border-radius: 4px;
      cursor: pointer;

      img {
        width: 48px;
      }

      .drawer-item-select {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        padding-top: 15px;
        padding-left: 24px;
        height: 100%;
        color: #1890ff;
        font-size: 14px;
        font-weight: 700;
      }
    }
  }

  .drawer-title {
    margin-bottom: 10px;
    font-size: 14px;
  }

  .drawer-switch,
  .drawer-picker {
    float: right;
  }

  .drawer-switch {
    margin-top: 4px;
  }

  .drawer-picker {
    height: 26px;
    margin: -3px 8px 0px 0px;
  }
}
</style>
