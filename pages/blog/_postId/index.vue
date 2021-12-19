<template>
  <div id="post" class="lg:px-40">
    <section class="container px-4 pt-8 pb-20 mx-auto post-content">
      <div class="flex items-center mb-4">
        <object data="../../../static/icons/back.svg" type="image/svg+xml">
          <img
            class="w-5 h-5 mr-2 transition duration-200 ease-in-out"
            src="../../../static/icons/back.svg"
          />
        </object>
        <nuxt-link to="/">Zurück</nuxt-link>
      </div>

      <h1 class="headline mb-5 text-3xl font-bold xl:w-7/12 lg:text-7xl">
        {{ title }}
      </h1>
      <span class="px-2 py-1 mr-3 rounded-sm detail-category">{{
        categories
      }}</span>
      <p class="mt-5 lg:w-4/6">{{ content }}</p>
    </section>

    <img
      v-if="detailImage"
      class="w-full transition duration-200 ease-in-out"
      :src="detailImage.filename"
    />
  </div>
</template>

<script>
export default {
  name: 'ProjectItem',
  asyncData(context) {
    return context.app.$storyapi
      .get('cdn/stories/blog/' + context.params.postId, {
        version: context.isDev ? 'draft' : 'published',
      })
      .then((res) => {
        return {
          id: res.data.story.content.id,
          image: res.data.story.content.thumbnail,
          title: res.data.story.content.title,
          content: res.data.story.content.content,
          categories: res.data.story.content.categories,
          ingredients: res.data.story.content.ingredients,
          detailImage: res.data.story.content.detailImage,
        }
      })
  },
}
</script>

<style>
.post-thumbnail {
  width: 100%;
  background-size: cover;
  background-position: center;
}

.post-content p {
  white-space: pre-line;
}

.detail-category {
  border: 1px solid #555;
}
</style>
