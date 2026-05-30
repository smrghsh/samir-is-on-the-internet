<template>
    <div class="corner-heading">
        <!-- accepts h1, div, -->
        <slot />
    </div>
</template>
<style>
.corner-heading {
    margin-left: 1em;
    margin-top: 1em;
    max-width: 95vw;
    position: relative;
}

@media (max-width: 600px) {
    .corner-heading {
        margin-left: var(--squish-stop);
    }
}

.corner-heading>h1 {
    width: var(--section-seperator-width);
    background: none;
    border-width: 1px;
    border-style: solid;
    border-color: light-dark(var(--light-border-col), var(--dark-border-col));
    border-bottom: none;
    border-right: none;
    padding-left: var(--one-stop);
    padding-top: 0.4em;
    padding-bottom: 3em;
    font-size: 1.5rem;
    z-index: 1;
    position: absolute;
    border-top-left-radius: 10px;
    backdrop-filter: blur(15px);
}

.corner-heading>.not-the-heading {
    position: absolute;
    z-index: 2;

}

.corner-heading>.not-the-heading>.text {
    font-size: 1rem;
    font-weight: 300;
    margin-top: 3em;
    margin-left: var(--three-stop);
    border-top-left-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: light-dark(var(--light-border-col), var(--dark-border-col));
    border-right: none;
    border-bottom: none;
    background-color: light-dark(
        rgba(255, 255, 255, 0.72),
        rgba(20, 20, 20, 0.65)
    );
    padding-left: calc(var(--one-stop) + var(--squish-stop));
    padding-top: var(--squish-stop);
    padding-bottom: 2em;
    padding-right: 2em;
    max-width: 1000px;
    min-width: var(--section-seperator-width);
    -webkit-backdrop-filter: blur(10px);
    backdrop-filter: blur(10px);
    box-shadow: 2px 2px 2px darkslategrey, -0.1px -0.1px 0.1px darkslategrey;
}

@media (max-width: 600px) {
    .corner-heading>.not-the-heading>.about {
        margin-left: var(--two-stop);
    }

    .corner-heading>.not-the-heading>.text {
        margin-left: var(--one-stop);
    }
}

li {
    /* margin-left: 2rem; */
    margin-left: var(--two-stop);
}

.corner-heading>div>main {

    background: transparent;
}

h2.project-demarcator {
    backdrop-filter: blur(10px);
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));
}
</style>