<template>
  <div class="pt-10">
    <div
      class="flex flex-col justify-center items-center w-100 mb-10 lg:mb-20 mt-10"
    >
      <div class="mb-4">
        Hi, ich bin <span class="text-violet">Selina.</span>
      </div>
      <h1
        class="text-4xl lg:text-5xl xl:text-6xl headline text-center lg:w-4/6 xl:w-3/6 mb-4 lg:leading-tight xl:leading-tight"
      >
        Gestaltung und Entwicklung digitaler Produkte und Erlebnisse
      </h1>
      <p class="mb-8">Frontend Developer & Web Designer</p>
      <nuxt-link class="button" :to="'/about'"> Mehr über mich </nuxt-link>
    </div>
    <aside class="px-5 pt-6 pb-5 lg:px-0 md:w-2/12 md:mr-5"></aside>
    <div class="projects_overview xl:px-52 mb-20 lg:mb-40">
      <section
        id="posts"
        class="grid gap-x-8 gap-y-8 lg:gap-y-32 pt-2 mx-auto mb-8 md:grid-cols-2 w-100"
      >
        <PostPreview
          v-for="post in filteredList()"
          :id="post.id"
          :key="post.id"
          :title="post.title"
          :excerpt="post.previewText"
          :thumbnailImage="post.thumbnailUrl"
          :categories="post.categories"
          :overviewCategories="post.overviewCategories"
          :selectedCategory="selectedCat"
          :difficulty="post.difficulty"
          :minutes="post.minutes"
          :ingredients="post.ingredients"
          :bgColor="post.bgColor"
          :detailImage="post.detailImage"
        />
      </section>
      <nuxt-link class="button inline-block" to="/projects"
        >Alle Projekte ansehen</nuxt-link
      >
    </div>
    <MailBanner />
  </div>
</template>

<script lang="ts">
import PostPreview from '../components/Blog/PostPreview.vue'

export default {
  name: 'HomePage',

  components: {
    PostPreview,
  },

  // eslint-disable-next-line camelcase
  asyncData(context) {
    // fetch data from projects folder in storyblok
    return context.app.$storyapi
      .get('cdn/stories', {
        version: context.isDev ? 'draft' : 'published',
        starts_with: 'blog/',
      })
      .then((res: { data: { stories: any[] } }) => {
        return {
          posts: res.data.stories.map(
            (post: {
              slug: any
              published_at: any
              content: {
                title: any
                description: any
                thumbnail: { filename: any }
                categories: any
                overview_categories: any
                difficulty: any
                minutes: any
                ingredients: any
                bgColor: any
                detailImage: any
              }
            }) => {
              return {
                id: post.slug,
                title: post.content.title,
                previewText: post.content.description,
                thumbnailUrl: post.content.thumbnail.filename,
                categories: post.content.categories,
                overviewCategories: post.content.overview_categories,
                difficulty: post.content.difficulty,
                minutes: post.content.minutes,
                ingredients: post.content.ingredients,
                bgColor: post.content.bgColor,
                detailImage: post.content.detailImage,
                publishDate: post.published_at,
              }
            }
          ),
        }
      })
  },
  data() {
    return {
      isVisible: false,
      selectedCat: '',
      search: '',
      categories: [
        'Alle',
        'Brot',
        'Chinesisch',
        'Hühnerfleisch',
        'Italienisch',
        'Kartoffeln',
        'Meeresfrüchte',
        'Österreichisch',
        'Rindfleisch',
        'Salat',
        'Schweinefleisch',
        'Süßes',
        'Vegetarisch',
      ],
    }
  },

  mounted() {
    this.selectedCat = 'Alle'
  },

  methods: {
    filter(selectedCat: any): void {
      this.selectedCat = selectedCat
    },
    filteredList(): any {
      const sortedProjects = this.posts.sort((a, b) => {
        return (
          new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
        )
      })
      return sortedProjects.slice(0, 4)
    },
    isCatSelected(cat): boolean {
      return cat === this.selectedCat
    },
  },
}
</script>
