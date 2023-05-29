<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">页面设置</h3>

      <div class="drawer-item">
        <span>主题色</span>
        <theme-picker style="float: right; height: 26px; margin: -3px 8px 0 0" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>标签页</span>
        <el-switch v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>导航栏位置</span>
        <el-select size="mini" v-model="layout" class="drawer-select" popper-class="theme-picker-dropdown">
          <el-option label="顶部" value="topmenu"></el-option>
          <el-option label="侧边" value="sidemenu"></el-option>
        </el-select>
      </div>

      <div class="drawer-item">
        <span>固定页头</span>
        <el-switch v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>侧边栏logo</span>
        <el-switch v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <h3 class="drawer-title menu">导航栏样式</h3>
      <div class="drawer-item">
        <span>菜单文本颜色</span>
        <el-color-picker
          v-model="menuStyle.menuText"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>菜单活动文本颜色</span>
        <el-color-picker
          v-model="menuStyle.menuActiveText"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>子菜单活动文本颜色</span>
        <el-color-picker
          v-model="menuStyle.subMenuActiveText"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>菜单背景颜色</span>
        <el-color-picker
          v-model="menuStyle.menuBg"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>菜单hover颜色</span>
        <el-color-picker
          v-model="menuStyle.menuHover"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>子菜单背景颜色</span>
        <el-color-picker
          v-model="menuStyle.subMenuBg"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>子菜单hover颜色</span>
        <el-color-picker
          v-model="menuStyle.subMenuHover"
          class="theme-picker drawer-picker"
          popper-class="theme-picker-dropdown"
        />
      </div>
      <div class="drawer-item">
        <span>菜单宽度</span>
        <el-input-number size="mini" :controls="false" v-model="menuStyle.sideBarWidth" class="drawer-picker" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker';

export default {
  components: { ThemePicker },
  data() {
    return {};
  },
  computed: {
    layout: {
      get() {
        return this.$store.state.settings.layout;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'layout',
          value: val,
        });
      },
    },
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val,
        });
      },
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val,
        });
      },
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo;
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val,
        });
      },
    },
    menuStyle() {
      return this.$store.state.settings.menu;
    },
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'theme',
        value: val,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 28px;
    padding: 10px 0;

    .el-select {
      width: 100px;
      float: right;
    }
  }

  .menu {
    margin-top: 20px;
  }
  .drawer-switch,
  .drawer-picker {
    float: right;
  }

  .drawer-picker {
    height: 26px;
    margin: -3px 8px 0px 0px;
  }
}
</style>
