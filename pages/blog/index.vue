<template>
    <div class="flex">
        <aside class="w-2/12 pt-6 mr-5">
            <div class="relative mb-5 mr-7 search-container">
                <input
                    id="search-bar"
                    v-model="search"
                    type="text"
                    class="px-3 py-2 mb-5"
                    placeholder="Search title.."
                    @change="filteredList()"
                />

                <a href="#"
                    ><img
                        class="search-icon"
                        src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png"
                /></a>
            </div>

            <div
                v-for="cat in categories"
                :key="cat"
                class="mb-3"
                @click="filter(cat)"
            >
                <input :id="cat" type="radio" name="cats" />
                <label :for="cat">{{ cat }}</label>
            </div>
        </aside>
        <section
            id="posts"
            class="container grid gap-8 px-4 mx-auto mb-8 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 w-100"
        >
            <PostPreview
                v-for="post in filteredList()"
                :id="post.id"
                :key="post.id"
                :title="post.title"
                :excerpt="post.previewText"
                :thumbnailImage="post.thumbnailUrl"
                :detailImage="post.detailImage"
                :categories="post.categories"
                :selectedCategory="selectedCat"
                :difficulty="post.difficulty"
                :minutes="post.minutes"
            />
        </section>
    </div>
</template>

<script lang="ts">
import PostPreview from "../../components/Blog/PostPreview.vue";

export default {
    name: "ProjectItem",
    components: {
        PostPreview
    },

    // eslint-disable-next-line camelcase
    // asyncData(context: {
    //   app: {
    //     $storyapi: {
    //       get: (
    //         arg0: string,
    //         // eslint-disable-next-line camelcase
    //         arg1: { version: string; starts_with: string }
    //       ) => Promise<any>
    //     }
    //   }
    // }) {
    //   // fetch data from blog folder in storyblok
    //   return context.app.$storyapi
    //     .get('cdn/stories', {
    //       version: context.isDev ? "draft" : "published",
    //       starts_with: 'blog/',
    //     })
    //     .then((res: { data: { stories: any[] } }) => {
    //       return {
    //         posts: res.data.stories.map(
    //           (post: {
    //             slug: any
    //             content: {
    //               title: any
    //               description: any
    //               thumbnail: { filename: any }
    //               categories: any
    //               difficulty: any
    //               minutes: any
    //             }
    //           }) => {
    //             return {
    //               id: post.slug,
    //               title: post.content.title,
    //               previewText: post.content.description,
    //               thumbnailUrl: post.content.thumbnail.filename,
    //               categories: post.content.categories,
    //               difficulty: post.content.difficulty,
    //               minutes: post.content.minutes,
    //             }
    //           }
    //         ),
    //       }
    //     })
    // },
    asyncData(context) {
        return context.app.$storyapi
            .get("cdn/stories", {
                version: context.isDev ? "draft" : "published",
                starts_with: "blog/"
            })
            .then((res) => {
                return {
                    posts: res.data.stories.map((post) => {
                        return {
                            id: post.slug,
                            title: post.content.title,
                            previewText: post.content.description,
                            thumbnailUrl: post.content.thumbnail.filename,
                            categories: post.content.categories,
                            difficulty: post.content.difficulty,
                            minutes: post.content.minutes
                        };
                    })
                };
            });
    },
    data() {
        return {
            isVisible: false,
            selectedCat: "",
            search: "",
            categories: [
                "Alle",
                "Brot",
                "Chinesisch",
                "Hühnerfleisch",
                "Italienisch",
                "Kartoffeln",
                "Meeresfrüchte",
                "Österreichisch",
                "Rindfleisch",
                "Salat",
                "Schweinefleisch",
                "Süßes",
                "Vegetarisch"
            ]
        };
    },

    methods: {
        filter(selectedCat: any): void {
            this.selectedCat = selectedCat;
        },
        filteredList(): any {
            return this.posts.filter((post: { title: string }) => {
                return post.title
                    .toLowerCase()
                    .includes(this.search.toLowerCase());
            });
        }
    }
};
</script>
