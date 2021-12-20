<template>
  <section id="about-page" class="lg:px-52">
    <div class="flex gap-x-40">
      <div>
        <h1 class="headline lg:text-5xl mb-8">{{ title }}</h1>
        <p>{{ content }}</p>
      </div>

      <img class="h-72 w-72" src="../../static/me.jpg" alt="" />
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
        return {
          title: res.data.story.content.title,
          content: res.data.story.content.content,
        }
      })
  },
}
</script>
