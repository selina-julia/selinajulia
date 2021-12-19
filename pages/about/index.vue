<template>
  <section id="about-page">
    <h1>{{ title }}</h1>
    <p>{{ content }}</p>
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
