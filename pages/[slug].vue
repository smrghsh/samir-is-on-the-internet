<script setup lang="ts">
// import { useRoute } from 'vue-router';


const { slug } = useRoute().params;
</script>

<template>
    <Return />
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
                <h1>P̛̞͉̹̩̹̰̺̱̩a͇ͅg̼̮͙̦̪̘͞e̦̫͕͖͇͝͞ ͙̮̲͕̼̖͙n͏͙̝̭̟̰͖ọ̘̟͙̦̮t͏̙͔̟̝̣̼͝
                    ҉̦̮͔F̱̀o̧͈̬͖͔̠̬͎͓u̥̩̗͓̦̗n̨̻̯̖̜̗̮̭̠͢d̡̰̺͎̤</h1>
            </template>

        </ContentDoc>
    </article>
</template>

<style>
article.doc {
    width: 700px;
    max-width: 95vw;
    margin: 2em;
}

h1.title {
    font-size: 4rem;
    font-weight: 600;
    /* margin: 1em; */
}

/* .links {
    margin: 2em;
} */
</style>