<template>
  <div
    class="xl:px-52 bg-indigo-50 flex py-24 items-center flex-col mail-banner"
  >
    <p class="mb-3 text-violet subtitle">Noch Fragen?</p>
    <h2 class="mb-4 headline text-3xl">Schreib mir eine Nachricht</h2>
    <p class="mb-8 text-center lg:w-6/12">
      Falls du noch Fragen hast oder gemeinsam ein Projekt starten möchtest,
      kannst du mir jederzeit gerne eine Nachricht schreiben!
    </p>
    <button class="button">Nachricht senden</button>
  </div>
</template>

<script lang="ts">
export default {}
</script>

<style scoped>
.mail-banner {
  position: relative;
}

.mail-banner::before {
  position: absolute;
  content: '';
  top: 0;
  bottom: 0;
  left: -100%;
  right: -100%;
  background: #eef2ff;
  z-index: -1;
}
</style>
