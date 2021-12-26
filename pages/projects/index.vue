<template>
  <div class="xl:pt-20">
    <div class="flex gap-x-40 mt-20 lg:mt-0 mb-20 lg:mb-40 xl:px-52 lg:w-8/12">
      <div>
        <h1 class="headline text-3xl lg:text-5xl mb-8">
          Meine <span class="text-violet">Projekte</span>
        </h1>
        <div class="lg:pl-16">
          <p>
            Während meines Studiums an der FH Hagenberg durfte ich bereits
            einige Projekte im Bereich Design und Entwicklung umsetzen. Darüber
            hinaus habe ich auch bereits an ein paar Projekten im privaten
            Bereich mitgewirkt. Ich stelle mich gerne neuen Herausforderungen
            und lerne Neues kennen, besonders in Sachen Frameworks und
            Design-Trends.
          </p>
        </div>
      </div>
    </div>
    <aside
      class="lg:px-0 flex flex-col lg:flex-row-reverse lg:items-end lg:justify-between xl:px-52 mb-5"
    >
      <div class="relative search-container mb-5 lg:mb-0">
        <input
          id="search-bar"
          v-model="search"
          type="text"
          autocomplete="off"
          class="rounded-sm px-3 py-2 border w-full lg:w-auto"
          placeholder="Suchbegriff ..."
          @change="filteredList()"
        />
        <img
          class="absolute w-4 h-4 lg:w-4 lg:h-4 transition duration-200 ease-in-out right-2.5 lg:right-3 top-3.5"
          src="../../static/icons/search.svg"
        />
      </div>

      <div
        class="flex overflow-x-auto cat-filters lg:w-5/12 lg:flex-wrap gap-3"
      >
        <div
          v-for="cat in categories"
          :key="cat"
          class="flex items-center px-3 py-2 cursor-pointer rounded-sm border"
          :class="{ 'text-violet border-indigo-500': isCatSelected(cat) }"
          @click="filter(cat)"
        >
          {{ cat }}
          <!-- <div class="lg:flex">
            <input :id="cat" class="hidden" type="radio" name="cats" />
            <div
              class="hidden lg:block lg:h-full lg:mr-2 lg:rounded-sm filter-checkbox"
            >
              <img
                class="w-5 h-5 p-0.5"
                :class="{
                  'opacity-100': isCatSelected(cat),
                  'opacity-0': !isCatSelected(cat),
                }"
                src="../../static/icons/tick.svg"
              />
            </div>
            <label :for="cat">{{ cat }}</label>
          </div> -->
        </div>
      </div>
    </aside>
    <section
      id="posts"
      class="grid gap-x-8 gap-y-8 lg:gap-y-20 xl:px-52 pt-2 mx-auto lg:mb-40 lg:mx-0 mb-8 md:grid-cols-2 w-100"
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
  </div>
</template>

<script lang="ts">
import PostPreview from '../../components/Blog/PostPreview.vue'

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
        'Angular',
        'Vue.js',
        'Nuxt.js',
        'Storyblok',
        'Wordpress',
        'Firebase',
        'Figma',
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
    // filteredList(): any {
    //   return this.posts.filter((post: { title: string }) => {
    //     return post.title.toLowerCase().includes(this.search.toLowerCase())
    //   })
    // },

    // sortedProjects(): any {
    //   return this.posts.sort((a, b) => {
    //     return (
    //       new Date(b.publishDate).valueOf() - new Date(a.publishDate).valueOf()
    //     )
    //   })
    // },

    filteredList(): any {
      return this.posts.filter((post: { title: string }) =>
        post.title.toLowerCase().includes(this.search.toLowerCase())
      )
    },

    isCatSelected(cat): boolean {
      return cat === this.selectedCat
    },
  },
}
</script>

<style>
.cat-filters::-webkit-scrollbar {
  display: none;
}
</style>
