<template>
  <section id="about-page" class="xl:px-52">
    <div class="flex gap-x-40 mb-40">
      <div>
        <h1 class="headline lg:text-5xl mb-8">{{ title }}</h1>
        <div class="pl-24">
          <p class="mb-10">{{ content }}</p>
          <nuxt-link class="button inline-block" to="/projects"
            >Projekte ansehen</nuxt-link
          >
        </div>
      </div>
      <img class="h-72 w-72" src="../../static/me.jpg" alt="" />
    </div>
    <div class="text-center mb-10">
      <p class="subtitle text-violet">Was ich so kann</p>
      <div class="headline text-3xl">Skills & Tools</div>
    </div>
    <div class="mx-24">
      <div class="flex gap-x-5 mb-10">
        <div class="bg-indigo-50 p-10">
          <div class="headline text-xl mb-2">Web development</div>
          <p>
            Egal, ob Websites mit Wordpress oder Web Apps mit Angular oder React
            - ich bin für jede Herausforderung offen und stürze mich gerne mal
            in ein Projekt, um neue Bereiche der Web-Entwicklung zu erkunden.
          </p>
        </div>
        <div class="bg-indigo-50 p-10">
          <div class="headline text-xl mb-2">Web development</div>
          <p>
            Egal, ob Websites mit Wordpress oder Web Apps mit Angular oder React
            - ich bin für jede Herausforderung offen und stürze mich gerne mal
            in ein Projekt, um neue Bereiche der Web-Entwicklung zu erkunden.
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
        <p class="subtitle text-violet">WAS BISHER GESCHAH</p>
        <div class="headline text-3xl">Ausbildung & Berufserfahrung</div>
      </div>

      <div v-for="experience in experiences" :key="experience">
        <div class="grid grid-cols-7 py-3 border-t">
          <span class="col-span-3">{{ experience.name }}</span>
          <span class="col-span-3">{{ experience.employer }}</span>
          <span>{{ experience.period }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'AboutPage',

  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/about', {
        version: context.isDev ? 'draft' : 'published',
      })
      .then((res) => {
        console.log(res)
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          experiences: res.data.story.content.experiences,
          skills: res.data.story.content.skills,
        }
      })
  },
}
</script>
