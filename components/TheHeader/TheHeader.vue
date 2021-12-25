<template>
  <header class="z-10 py-3 main-header backdrop-filter backdrop-blur-lg">
    <div
      class="flex items-center justify-between w-screen px-5 md:w-auto md:px-16"
    >
      <nuxt-link to="/">
        <div class="text-2xl headline">
          selina<span class="title">julia</span>
        </div>
      </nuxt-link>

      <object
        class="w-8 h-8 md:hidden"
        data="../../static/icons/menu.svg"
        type="image/svg+xml"
        @click="toggleMobileNav()"
      >
        <img
          class="w-8 h-8 transition duration-200 ease-in-out"
          src="../../static/icons/menu.svg"
        />
      </object>
      <div
        :class="{
          '-left-full -right-full transition-all duration-500 ease-in-out ':
            !isNavVisible,
          'left-0 right-0 transition-all duration-500 ease-in-out ':
            isNavVisible,
        }"
        class="absolute top-0 flex justify-between w-screen h-screen px-5 py-5 bg-white mobile-menu"
      >
        <nav class="w-full main-nav">
          <ul class="flex flex-col items-center justify-center mt-40 gap-y-10">
            <nuxt-link to="/" tag="li" class="nav-link mobile"
              ><a class="text-4xl" @click="closeMobileNav()">Home</a></nuxt-link
            >
            <nuxt-link to="/about" tag="li" class="nav-link mobile"
              ><a class="text-4xl" @click="closeMobileNav()"
                >Über mich</a
              ></nuxt-link
            >
            <nuxt-link to="/favorites" tag="li" class="nav-link mobile"
              ><a class="text-4xl" @click="closeMobileNav()"
                >Projekte</a
              ></nuxt-link
            >
          </ul>
        </nav>
        <object
          class="absolute right-0 w-6 h-6 mr-5 md:hidden"
          data="../../static/icons/close.svg"
          type="image/svg+xml"
          @click="toggleMobileNav()"
        >
          <img
            class="w-6 h-6 transition duration-200 ease-in-out"
            src="../../static/icons/close.svg"
          />
        </object>
      </div>

      <!-- desktop nav -->
      <nav class="hidden main-nav md:block">
        <ul class="nav-links flex gap-x-4">
          <nuxt-link to="/" tag="li" class="nav-link"><a>Home</a></nuxt-link>
          <nuxt-link to="/about" tag="li" class="nav-link"
            ><a>Über mich</a></nuxt-link
          >
          <nuxt-link to="/projects" tag="li" class="nav-link"
            ><a>Projekte</a></nuxt-link
          >
        </ul>
      </nav>
    </div>
  </header>
</template>

<script lang="ts">
export default {
  data() {
    return {
      isNavVisible: false,
    }
  },

  methods: {
    toggleMobileNav() {
      this.isNavVisible = !this.isNavVisible
    },
    closeMobileNav() {
      this.isNavVisible = false
    },
  },
}
</script>

<style scoped>
header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background-color: hsl(0deg 0% 100% / 85%);
}

.nav-link.nuxt-link-exact-active {
  border-bottom: 2px solid;
}
</style>
