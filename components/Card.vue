<template>
    <div class="card">
        <!-- slot reviews an image,  -->
        <slot></slot>
    </div>
</template>


<style>
.card {
    background-color: rgba(245,245,222,.97);
    backdrop-filter: blur(10px);
    border-radius: 10px;
    border: 1px solid black;
    padding: 1em;
    /* margin: 1em; */
    margin: 5px;
    margin-bottom: 10px;
    /* width: 200px; */
    min-height: 350px;
    min-width: 280px;
    max-width: 95vw;
    flex: 1 1 1;
    filter:drop-shadow(5px 5px 4px rgba(0,0,0,0.25));

    flex: 0 1 auto;
    align-self: auto;
}
.card > h3 {
    margin: 0;
}
.card > p {
    margin: 0;
    font-size: 0.8em;
    font-weight: 300;
    }


</style>