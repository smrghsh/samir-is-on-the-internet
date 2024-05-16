<script setup lang="ts">
// import { useRoute } from 'vue-router';


const { slug } = useRoute().params;
</script>

<template>
    <div class="return-container">
        <NuxtLink to="/" class="back-to-home">
            << back to home</NuxtLink>
    </div>

    <article class="doc">

        <ContentDoc :path="`/projects/${slug}`">
            <template v-slot="{ doc }">
                <h1 class="title">
                    {{ doc.title }}
                </h1>
                <h3>{{ doc.displayYear }}</h3>
                <ContentRenderer :value="doc"></ContentRenderer>
            </template>
            <template #not-found>
                <h1 class="title">
                    404
                </h1>
            </template>
            <!-- <h1>
                    {{ doc.title }}
                </h1>
                <h3>{{ doc.displayYear }}</h3>
                <ContentRenderer :value="doc"></ContentRenderer> -->
        </ContentDoc>
    </article>
</template>

<style>
.return-container {
    margin: 2em;
    margin-top: 3em;
    /* font-size: 1.5em; */
    /* font-weight: 200; */
}

.back-to-home {
    margin: 2em;
    margin-top: 3em;
    /* font-size: 1.5em; */
    /* font-weight: 200; */
}

article.doc {
    width: 700px;
    max-width: 95vw;
    margin: 2em;
}

h1.title {
    /* font-size: 2em; */
    font-weight: 200;
    /* margin: 1em; */
}

/* .links {
    margin: 2em;
} */
</style>