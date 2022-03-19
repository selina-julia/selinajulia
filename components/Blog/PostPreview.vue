<template>
    <article
        v-if="filter()"
        class="relative flex flex-col items-center ease-in-out duration-300"
    >
        <nuxt-link :to="'/blog/' + id">
            <div
                class="project-preview flex justify-center items-center mb-2"
                :class="getBgColor()"
            >
                <img
                    class="mb-3 h-auto w-full p-14 project-image"
                    :src="thumbnailImage"
                    alt=""
                />
            </div>

            <div class="flex flex-col justify-between post-preview-content">
                <div class="subtitle mt-2">[ {{ overviewCategories }} ]</div>
                <h1 class="headline pr-5 mb-2 text-2xl font-bold line-clamp-2">
                    {{ title }}
                </h1>
            </div>
        </nuxt-link>
    </article>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
    props: {
        title: {
            type: String,
            required: true
        },
        excerpt: {
            type: String,
            required: true
        },
        thumbnailImage: {
            type: String,
            required: true
        },
        id: {
            type: String,
            required: true
        },
        categories: {
            type: String[{}],
            required: true
        },
        overviewCategories: {
            type: String,
            required: true
        },
        selectedCategory: {
            type: String,
            required: true
        },
        minutes: {
            type: String,
            required: true
        },
        difficulty: {
            type: String,
            required: true
        },
        ingredients: {
            type: String[{}],
            required: true
        },
        bgColor: {
            type: String,
            required: true
        },
        detailImage: {
            type: Object,
            required: true
        },
        createdDate: {
            type: Date,
            required: true
        }
    },

    data() {
        return {
            iterator: 0,
            favoriteStorage: [],
            isFavoritesClicked: false,
            isVisible: true
        };
    },

    mounted() {
        switch (this.difficulty) {
            case "einfach":
                this.iterator = 1;
                break;
            case "mittel":
                this.iterator = 2;
                break;
            case "schwierig":
                this.iterator = 3;
                break;
        }
    },

    methods: {
        getFavorites() {
            const fav = localStorage.getItem("favorites");
            return fav;
        },

        getBgColor() {
            switch (this.bgColor) {
                case "grayblue":
                    return "bg-gray-100";
                case "blue":
                    return "bg-blue-50";
                case "violet":
                    return "bg-indigo-50";
                case "orange":
                    return "bg-orange-50";
                case "green":
                    return "bg-green-50";
                case "yellow":
                    return "bg-yellow-50";
            }
            return "bg-gray-100";
        },

        setFavorites(fav) {
            this.getFavorites();
            this.favoriteStorage.push(fav);
            localStorage.setItem(
                "favorites",
                JSON.stringify(this.favoriteStorage)
            );
            this.isFavoritesClicked = !this.isFavoritesClicked;
        },
        filter() {
            if (!this.selectedCategory || this.selectedCategory === "Alle") {
                return true;
            }
            const x = Object.values(this.categories);

            return !!x.find((el) => el === this.selectedCategory);
        }
    }
});
</script>

<style>
.project-preview {
    width: 100%;
    height: 300px;

    @media (min-width: 1000px) {
        height: 400px;
        width: 100%;
    }

    @media (min-width: 1200px) {
        height: 550px;
        width: 100%;
    }
}

.project-image {
    transition: 300ms ease-in-out;
}

.project-image:hover {
    transform: scale(0.9);
}
</style>
