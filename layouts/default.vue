<template>
  <div class="">
    <TheHeader />

    <main class="w-screen main-content md:px-16">
      <nuxt />
    </main>
  </div>
</template>

<script>
import TheHeader from '@/components/TheHeader/TheHeader.vue'

export default {
  name: 'LayoutPage',

  components: {
    TheHeader,
  },
}
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  font-family: Inter, sans-serif;
  overflow-x: hidden;
  font-size: 18px;
  color: #212529;
}

.headline {
  font-family: Poppins, sans-serif;
  font-weight: 600;
}

.sub-headline {
  font-size: 14px;
}

.subtitle {
  text-transform: uppercase;
  font-size: 13px;
}

.text-violet {
  color: #4236ff;
}

.bg-violet {
  background: #4236ff;
}

.button {
  background: #4236ff;
  color: #fff;
  border-radius: 5px;
  padding: 12px 25px;
}

.main-content {
  margin-top: 1.5rem;
  @media (min-width: 768px) {
    margin-top: 5.5rem;
  }
}
</style>
