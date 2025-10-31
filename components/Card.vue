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
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: light-dark(var(--light-border-col), var(--dark-border-col));
    padding: 0.5rem;
    /* margin: 1em; */
    margin: var(--squish-stop);
    margin-bottom: 8px;
    width: var(--card-min-width);
    min-height: var(--card-min-height);
    min-width: var(--card-min-width);
    max-width: 95vw;
    flex: 1 1 1;
    filter: drop-shadow(5px 5px 4px rgb(47, 79, 79, 0.2));

    flex: 0 1 auto;
    align-self: auto;
    box-shadow: 2px 2px 2px darkslategrey,
        -0.1px -0.1px 0.1px darkslategrey;
}

/* @media (max-width: 600px) {
    .card {
        min-width: 80vw;
    }
}
 */

/* .card>div>h1,
h3 {
    margin: 0;
} */

.card>article>div>h1 {
    font-size: 1em;
    font-weight: 200;

}

.card>article>div>p {
    margin: 0;
    font-size: 0.82em;
    font-weight: 300;
}
</style>