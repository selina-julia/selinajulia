<template>
    <section id="about-page" class="xl:px-52 xl:pt-20">
        <div
            class="flex flex-col lg:flex-row mt-20 lg:mt-0 gap-x-40 mb-20 lg:mb-40"
        >
            <div>
                <h1 class="headline text-3xl lg:text-5xl mb-8">{{ title }}</h1>
                <div class="lg:pl-24">
                    <p class="mb-10">{{ content }}</p>
                    <nuxt-link class="button inline-block" to="/projects"
                        >Projekte ansehen</nuxt-link
                    >
                </div>
            </div>
            <img
                class="m-auto mt-10 lg:mt-0 h-72 w-72"
                src="../../static/me.jpg"
                alt=""
            />
        </div>

        <div class="text-center mb-10">
            <p class="subtitle text-violet">[ Mein Spezialgebiet ]</p>
            <div class="headline text-3xl">Skills & Tools</div>
        </div>
        <div class="lg:mx-24">
            <div class="flex flex-col gap-y-5 lg:flex-row gap-x-5 mb-10">
                <div class="bg-indigo-50 p-10">
                    <div class="headline text-xl mb-2">Web development</div>
                    <p>
                        Egal, ob Websites mit Wordpress oder Web Apps mit
                        Angular oder React - ich bin für jede Herausforderung
                        offen und stürze mich gerne mal in ein Projekt, um neue
                        Bereiche der Web-Entwicklung zu erkunden.
                    </p>
                </div>
                <div class="bg-indigo-50 p-10">
                    <div class="headline text-xl mb-2">Web design</div>
                    <p>
                        Ich gestalte die User Experience von mobilen
                        Applikationen bis hin zu Desktopanwendungen. Dabei ist
                        es mir wichtig, digitale Produkte zu entwickeln, die
                        einfach zu bedienen, Spaß machen und visuell ansprechend
                        sind.
                    </p>
                </div>
            </div>

            <div class="flex gap-4 flex-wrap mb-32">
                <p
                    v-for="skill in skills"
                    :key="skill"
                    class="px-3 py-2 rounded-sm border"
                >
                    {{ skill.name }}
                </p>
            </div>

            <div class="text-center mb-10">
                <p class="subtitle text-violet">[ WAS BISHER GESCHAH ]</p>
                <div class="headline text-3xl">
                    Ausbildung & Berufserfahrung
                </div>
            </div>
            <div class="mb-10 lg:mb-40">
                <div v-for="experience in experiences" :key="experience">
                    <div class="lg:grid lg:grid-cols-7 py-3 border-t">
                        <div class="col-span-3">{{ experience.name }}</div>
                        <div class="col-span-3">{{ experience.employer }}</div>
                        <div>{{ experience.period }}</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "AboutPage",

    asyncData(context) {
        return context.app.$storyapi
            .get("cdn/stories/about", {
                version: context.isDev ? "draft" : "published"
            })
            .then((res) => {
                return {
                    title: res.data.story.content.title,
                    content: res.data.story.content.content,
                    experiences: res.data.story.content.experiences,
                    skills: res.data.story.content.skills
                };
            });
    }
};
</script>
