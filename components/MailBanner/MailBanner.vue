<template>
    <div
        class="xl:px-52 bg-indigo-50 flex py-12 lg:py-24 items-center flex-col mail-banner relative"
    >
        <img
            class="hidden lg:block absolute -left-12 -scale-x-100 top-0 bottom-0 h-full"
            src="../../static/pattern.svg"
            alt=""
        />

        <p class="mb-3 text-violet subtitle">[ Noch Fragen? ]</p>
        <h2 class="mb-4 headline text-2xl lg:text-3xl text-center">
            Schreib mir eine Nachricht
        </h2>
        <p class="mb-8 text-center lg:w-6/12">
            Ich freue mich jedes Mal darauf, Designs für Websites und Web Apps
            zu kreieren und anschließend zum Leben zu erwecken. Falls du
            gemeinsam ein Projekt starten möchtest, schreib mir eine Nachricht!
        </p>
        <a class="button" href="mailto:hello@selinajulia.com"
            >Nachricht senden</a
        >
    </div>
</template>

<script lang="ts">
export default {};
</script>

<style scoped>
.mail-banner {
    position: relative;
}

.mail-banner::before {
    position: absolute;
    content: "";
    top: 0;
    bottom: 0;
    left: -100%;
    right: -100%;
    background: #eef2ff;
    z-index: -1;
}
</style>
