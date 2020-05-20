<template>
  <div class="sidebar-logo-container" :class="{'collapse':collapse}">
    <transition name="sidebarLogoFade">
      <router-link v-if="collapse" key="collapse" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 v-else class="sidebar-title">{{ title }} </h1>
      </router-link>
      <router-link v-else key="expand" class="sidebar-logo-link" to="/">
        <img v-if="logo" :src="logo" class="sidebar-logo">
        <h1 class="sidebar-title">{{ title }} </h1>
      </router-link>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      title: '贝壳后台管理系统',
      logo: 'data:image/png;base64,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'
    }
  }
}
</script>

<style lang="scss" scoped>
.sidebarLogoFade-enter-active {
  transition: opacity 1.5s;
}

.sidebarLogoFade-enter,
.sidebarLogoFade-leave-to {
  opacity: 0;
}

.sidebar-logo-container {
  position: relative;
  width: 100%;
  height: 50px;
  line-height: 50px;
  background: #409eff;
  text-align: center;
  overflow: hidden;

  & .sidebar-logo-link {
    height: 100%;
    width: 100%;
    & .sidebar-logo {
      width: 32px;
      height: 32px;
      vertical-align: middle;
      margin-right: 12px;
    }

    & .sidebar-title {
      display: inline-block;
      margin: 0;
      color: #fff;
      font-weight: 600;
      padding-top: 3px;
      // line-height: 50px;
      font-size: 14px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
    }
  }

  &.collapse {
    .sidebar-logo {
      margin-right: 0px;
    }
  }
}
</style>
