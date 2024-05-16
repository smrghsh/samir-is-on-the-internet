<template>

    <ContentList :query="query" path="/projects" v-slot="{ list }">
        <div class="card-container">
            <div v-for="project in list" :key="project._path">

                <Card v-if="project.display">
                    <article>
                        <img :src="'./images/projects/thumbnails/' + project.thumbnail" alt="project.title">

                        <h3 class="project-title">{{ project.title }} <span class="time">{{ project.displayYear
                                }}</span></h3>
                        <ContentDoc :path="project._path" v-slot="{ project }">
                        </ContentDoc>
                        <span>
                            <NuxtLink :to="`${project.slug}`">Read More</NuxtLink>
                        </span>
                    </article>
                </Card>
            </div>

        </div>

    </ContentList>



</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/projects', draft: false, sort: [{ year: -1 }] }
</script>


<style>
.card-container {
    /* background-color: red; */

    width: 1800px;
    max-width: 95vw;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: center;
    align-items: flex-start;

    position: absolute;
    z-index: 2;
    margin-top: 3em;
    margin-left: 2em;
}

@media (max-width: 600px) {
    .card-container {
        margin-left: 1em;
    }
}

.time {
    color: grey;
}

.project-title {
    font-size: 1.5em;
    font-weight: 300;
    margin-bottom: 0.5em;
    margin-top: 0em;
}

img {
    width: 100%;
    height: 160px;
    border-radius: 10px;
    margin-bottom: 0.2em;

}

.button {
    background-color: #4CAF50;
    border: 1px black solid;
    color: white;
    padding: 0.2em 0.3em;
    margin: 0.2em 0.3em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    /* font-size: 16px; */
    /* margin: 4px 2px; */
    cursor: pointer;
    border-radius: 10px;

}

.card-container>.card {
    background-color: rgba(245, 245, 222, .87);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid black;
    padding: 1em;
    margin: 1em;
    width: 200px;
    max-width: 95vw;
    min-height: 500px;
    flex: 0 0 1;
    text-align: center;
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));

    flex: 0 1 auto;
    align-self: auto;

}
</style>