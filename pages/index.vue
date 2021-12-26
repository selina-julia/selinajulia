<template>
  <div class="pt-10">
    <div class="flex flex-col justify-center items-center w-100 mb-20">
      <div class="mb-4">
        Hi, ich bin <span class="text-violet">Selina.</span>
      </div>
      <h1
        class="text-4xl lg:text-6xl headline text-center lg:w-3/6 mb-4 lg:leading-tight"
      >
        Gestaltung und Entwicklung digitaler Produkte und Erlebnisse
      </h1>
      <p class="mb-8">Frontend Developer & Web Designer</p>
      <nuxt-link class="button" :to="'/about'"> Mehr über mich </nuxt-link>
    </div>
    <aside class="px-5 pt-6 pb-5 lg:px-0 md:w-2/12 md:mr-5">
      <!-- <div class="relative rounded-md mb-7 md:mr-7 search-container">
        <input
          id="search-bar"
          v-model="search"
          type="text"
          class="py-3 my-1 rounded-md md:px-3"
          placeholder="Search title.."
          @change="filteredList()"
        />
        <img
          class="absolute w-6 h-6 lg:w-4 lg:h-4 transition duration-200 ease-in-out right-2.5 lg:right-3 top-3.5"
          src="../static/icons/search.svg"
        />
      </div> -->

      <!-- <div class="flex overflow-x-scroll md:block gap-x-2">
        <div
          v-for="cat in categories"
          :key="cat"
          class="flex items-center px-3 py-2 mb-3 border-gray-400 rounded-md md:block mobile-categories md:p-0 md:border-0 md:border-none"
          :class="{ 'selected-category lg:bg-none': isCatSelected(cat) }"
          @click="filter(cat)"
        >
          <div class="lg:flex">
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
                src="../static/icons/tick.svg"
              />
            </div>
            <label :for="cat">{{ cat }}</label>
          </div>
        </div>
      </div> -->
    </aside>
    <div class="projects_overview xl:px-52 mb-40">
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
          :selectedCategory="selectedCat"
          :difficulty="post.difficulty"
          :minutes="post.minutes"
          :ingredients="post.ingredients"
          :bgColor="post.bgColor"
          :detailImage="post.detailImage"
        />
      </section>
      <nuxt-link to="/projects" class="button">Alle Projekte ansehen</nuxt-link>
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
        console.log(res)
        return {
          posts: res.data.stories.map(
            (post: {
              slug: any
              content: {
                title: any
                description: any
                thumbnail: { filename: any }
                categories: any
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
                difficulty: post.content.difficulty,
                minutes: post.content.minutes,
                ingredients: post.content.ingredients,
                bgColor: post.content.bgColor,
                detailImage: post.content.detailImage,
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

  methods: {
    filter(selectedCat: any): void {
      this.selectedCat = selectedCat
    },
    filteredList(): any {
      // const sortedActivities = this.posts.sort((a, b) => b.date - a.date)
      // console.log(sortedActivities)
      // return sortedActivities
      console.log(this.posts)
      return this.posts.slice(0, 4)
    },

    isCatSelected(cat): boolean {
      return cat === this.selectedCat
    },
  },
}
</script>
