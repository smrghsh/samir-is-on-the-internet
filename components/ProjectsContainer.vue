<template>

    <ContentList :query="query" path="/projects" v-slot="{ list }">
        <div class="card-container">
            <div v-for="project in list " :key="project._path">

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
        margin-left: var(--one-stop);
    }
}

.read-more {
    color: light-dark(var(--light-text-deemphasis-col), var(--dark-text-deemphasis-col));
    font-weight: 300;
    margin-top: 0.5em;
    display: block;
}

.time {
    color: light-dark(var(--light-text-deemphasis-col), var(--dark-text-deemphasis-col));
}

h3.project-title {
    font-size: 1.5em;
    font-weight: 300;
    margin-bottom: 0em;
    margin-top: 0em;
}

img.thumbnail {
    width: 100%;
    height: 160px;
    border-radius: 10px;
    margin-bottom: 0.2em;
}

.links {
    display: flex;
    justify-content: start;
    flex-wrap: wrap;
    width: 90%;
    align-items: center;
    align-items: baseline;
    margin-top: 0.15em;
    margin-bottom: 0.15em;
    padding-top: 0em;

}


.links>a {
    flex: 1 1 1;
    font-size: 0.9em;
    color: light-dark(var(--light-text-col), var(--dark-text-col));

}


.button {
    /* background-color: #4CAF50; */
    /* border: var(--button-border); */

    padding: 0.3em 0.5em;
    margin: 0.2em 0.3em;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    border-width: 1px;
    border-style: solid;
    border-color: light-dark(var(--light-border-col), var(--dark-border-col));
    box-shadow: 2px 2px 2px black,
        -0.1px -0.1px 0.1px rgb(30, 30, 30);
    cursor: pointer;
    border-radius: 10px;
    /* text-decoration: underline; */
    /* text-decoration-thickness: 0.1px; */

}

.button:hover {
    opacity: 0.8em;
    background-color: light-dark(var(--light-button-hover), var(--dark-button-hover));
    box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.2), 0px 0px 0px rgba(255, 255, 255, 0.55);
    text-decoration-thickness: 1px;
    text-decoration-line: underline;
    text-decoration-thickness: 0.5px;
    text-decoration-color: light-dark(var(--light-border-col), var(--dark-border-col));
}

.card-container>.card {
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border: var(--cs-border);
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