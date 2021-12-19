<template>
  <div id="post">
    <div
      class="post-thumbnail"
      :style="{ backgroundImage: 'url(' + image.filename + ')' }"
    ></div>

    <section class="container px-4 pt-8 pb-20 mx-auto post-content">
      <div class="flex items-center mb-4">
        <object
          v-if="!isFavoritesClicked"
          data="../../../static/icons/back.svg"
          type="image/svg+xml"
        >
          <img
            class="w-5 h-5 mr-2 transition duration-200 ease-in-out"
            src="../../../static/icons/back.svg"
          />
        </object>
        <nuxt-link to="/">Zurück</nuxt-link>
      </div>

      <h1 class="mb-5 text-3xl font-bold xl:w-7/12 lg:text-7xl">{{ title }}</h1>
      <span v-for="cat in categories" :key="cat">
        <span class="px-2 py-1 mr-3 rounded-md detail-category">{{ cat }}</span>
      </span>
      <div class="mt-5 lg:flex">
        <div class="w-full xl:w-5/12 ingredients-wrapper">
          <h2 class="mt-5 mb-5 text-2xl font-medium">Zutaten</h2>

          <p v-for="i in ingredients" :key="i" class="mb-2">
            <span>{{ i.amount }}</span>
            <span>{{ i.unit }}</span>
            <span>{{ i.name }}</span>
          </p>
        </div>
        <div class="w-full instructions-wrapper">
          <h2 class="mt-5 mb-2 text-2xl font-medium">Zubereitung</h2>
          <p class="mt-5 xl:mr-36">{{ content }}</p>
        </div>
      </div>
    </section>
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
        }
      })
  },
}
</script>

<style>
.post-thumbnail {
  width: 100%;
  height: 300px;
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
