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
    font-size: 1.5em;
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
    font-size: 1.2em;
    font-weight: 300;
    margin-top: 3em;
    margin-left: var(--three-stop);
    border-radius: 10px;
    border-width: 1px;
    border-style: solid;
    border-color: light-dark(var(--light-border-col), var(--dark-border-col));
    background-color: light-dark(var(--light-cs-bg-col), var(--dark-cs-bg-col));
    padding: 0em 1em 0em 1em;
    max-width: 1000px;
    backdrop-filter: blur(10px);
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));

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
    margin-left: 2em;
}

.corner-heading>div>main {

    background: transparent;
}

h2.project-demarcator {
    backdrop-filter: blur(10px);
    filter: drop-shadow(5px 5px 4px rgba(0, 0, 0, 0.25));
}
</style>