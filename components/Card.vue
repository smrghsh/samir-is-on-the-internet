<template>
    <div class="card">
        <!-- slot inputs the contents of the markdown file, expecting, img,h1,p,a  -->
        <slot></slot>
    </div>
</template>


<style>
.card {
    background-color: light-dark(var(--light-cs-bg-col), var(--dark-cs-bg-col));
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border: light-dark(var(--light-cs-border), var(--dark-cs-border));
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