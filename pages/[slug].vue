<script setup lang="ts">
// import { useRoute } from 'vue-router';


const { slug } = useRoute().params;
</script>

<template>
    <article class="">
        <ContentDoc :path="`/projects/${slug}`">
            <template v-slot="{ doc }">
                <h1>
                    {{ doc.title }}
                </h1>
                <h3>{{ doc.displayYear }}</h3>
                <ContentRenderer :value="doc"></ContentRenderer>
            </template>
            <template #not-found>
                <h1>
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