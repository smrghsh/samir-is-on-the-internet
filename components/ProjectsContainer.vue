<template>
    <div class="card-container">
        <ContentList path="/_current-projects" v-slot="{ list }">
            <div v-for="project in list" :key="project._path">
                <Card>
                    <article>
                        <h3>{{ project.title }} <span class="time">(current)</span></h3>

                        <ContentDoc :path="project._path" v-slot="{ project }">

                        </ContentDoc>
                    </article>
                </Card>

            </div>
        </ContentList>
        <!-- mirror -->
        <ContentList path="/_past-projects" v-slot="{ list }">
            <div v-for="project in list" :key="project._path">
                <Card>
                    <article>
                        <h3>{{ project.title }} <span class="time">{{ project.year }}</span></h3>

                        <ContentDoc :path="project._path" v-slot="{ project }">

                        </ContentDoc>
                    </article>
                </Card>

            </div>
        </ContentList>

    </div>


</template>


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

    /* display: flex; */
    /* flex-direction: row; */
    /* flex-wrap: nowrap; */
    /* justify-content: space-between; */
    /* align-content: center; */
    /* align-items: center; */
    /* justify-content: space-around; */
}

@media (max-width: 600px) {
    .card-container {
        margin-left: 1em;
    }
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
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));

    flex: 0 1 auto;
    align-self: auto;

}
</style>