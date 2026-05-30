<template>
    <div class="card">
        <!-- slot inputs the contents of the markdown file, expecting, img,h1,p,a  -->
        <slot></slot>
    </div>
</template>


<style>
.card {
    background-color: light-dark(var(--light-cs-bg-col), var(--dark-cs-bg-col));
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    border-radius: 8px;
    border-width: 1px;
    border-style: solid;
    border-color: light-dark(var(--light-border-col), var(--dark-border-col));
    padding: 0.5rem;
    margin: var(--squish-stop);
    margin-bottom: 8px;
    width: var(--card-min-width);
    min-height: var(--card-min-height);
    min-width: var(--card-min-width);
    max-width: 95vw;
    flex: 0 1 auto;
    align-self: auto;
    box-shadow: 0 10px 40px light-dark(rgba(0,0,0,0.08), rgba(0,0,0,0.5));
    transition: background 120ms ease, border-color 120ms ease, transform 120ms ease;
}

.card:hover {
    background-color: light-dark(rgba(255,255,255,0.7), rgba(255,255,255,0.06));
    transform: translateY(-2px);
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