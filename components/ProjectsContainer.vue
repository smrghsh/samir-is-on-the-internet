<template>

    <ContentList :query="query" path="/projects" v-slot="{ list }">
        <div class="card-container">
            <div v-for="project in  list " :key="project._path">

                <Card v-if="!project.draft">
                    <article>
                        <img class="thumbnail" :src="'./images/projects/thumbnails-resized/' + project.thumbnail"
                            :alt="project.title + ' thumbnail image'">

                        <h3 class="project-title">{{ project.title }} <span class="time">{{ project.displayYear
                                }}</span></h3>
                        <ContentDoc :path="project._path" v-slot="{ doc }">
                            <ContentRenderer :value="doc" :excerpt="true" />
                        </ContentDoc>
                        <NuxtLink v-if="project.hasMore" class="read-more" :to="`${project.slug}`">read more
                        </NuxtLink>
                    </article>
                </Card>
            </div>

        </div>

    </ContentList>



</template>

<script setup lang="ts">
import type { QueryBuilderParams } from '@nuxt/content/dist/runtime/types'
const query: QueryBuilderParams = { path: '/projects', sort: [{ year: -1 }] }
// Function to get a preview of the first 200 characters from the first paragraph
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

.read-more {
    color: black;
    /* text-decoration: none; */
    /* font-size: 0.8em; */
    font-weight: 300;
    margin-top: 0.5em;
    display: block;
}

.time {
    color: grey;
}

h3.project-title {
    font-size: 1.5em;
    font-weight: 300;
    /* margin-bottom: 0.5em; */
    margin-bottom: 0em;
    margin-top: 0em;
}

img.thumbnail {
    width: 100%;
    height: 160px;
    border-radius: 10px;
    margin-bottom: 0.2em;
    /* object-fit: cover */
}

.links {
    display: flex;
    justify-content: start;
    /* vertical */
    flex-wrap: wrap;
    /* flex-direction: column; */
    width: 90%;
    align-items: center;
    align-items: baseline;
    /* margin-top: 1em; */
    margin-top: 0.15em;
    margin-bottom: 0.15em;
    padding-top: 0em;

}


.links>a {
    /* margin: 0.2em; */
    flex: 1 1 1;
    font-size: 0.9em;
    /* flex-basis: content; */
}


/* .links>a:first-child {
    margin-left: 0em;
}

.links>a:last-child {
    margin-right: 0em;
} */

.button {
    /* background-color: #4CAF50; */
    border: 1px black solid;
    /* color: white; */
    color: black;
    padding: 0.3em 0.5em;
    margin: 0.2em 0.3em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    /* font-size: 16px; */
    /* margin: 4px 2px; */
    /* drop shadow */
    /* neumorphic */
    box-shadow: 3px 3px 3px rgba(0, 0, 0, 0.3), -3px -3px 3px rgba(255, 255, 255, 0.55);
    cursor: pointer;
    border-radius: 10px;

}

.button:hover {
    opacity: 0.8em;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), -1px -1px 1px rgba(255, 255, 255, 0.55);
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
    /* height: 520px; */
    min-height: 550px;
    flex: 0 0 1;
    text-align: center;
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));

    flex: 0 1 auto;
    align-self: auto;

}
</style>