<template>
    <div class="card">
        <!-- slot inputs the contents of the markdown file, expecting, img,h1,p,a  -->
        <slot></slot>
    </div>
</template>


<style>
.card {
    /* background-color: rgba(245, 245, 222, .97); */
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid black;
    padding: 1em;
    /* margin: 1em; */
    margin: 5px;
    margin-bottom: 10px;
    width: 200px;
    min-height: 450px;
    min-width: 280px;
    max-width: 95vw;
    flex: 1 1 1;
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.2));

    flex: 0 1 auto;
    align-self: auto;
}

/* .card>div>h1,
h3 {
    margin: 0;
} */

.card>article>div>h1 {
    font-size: 1.5em;
    font-weight: 200;

}

.card>article>div>p {
    margin: 0;
    font-size: 0.88em;
    font-weight: 300;
}
</style>