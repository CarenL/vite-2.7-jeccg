<!-- 多级路由使用-->
<template>
  <section class="router-view">
    <transition name="fade-transform" mode="out-in">
      <router-view />
    </transition>
  </section>
</template>

<script>
export default {};
</script>
<style lang="scss">
// fix css style bug in open el-dialog
.router-view {
  width: 100%;
  height: 100%;
}
</style>
