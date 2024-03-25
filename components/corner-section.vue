<template>
        <div class="corner-heading">
        <!-- accepts h1, p -->
            <slot></slot>
        </div>
</template>
<style>
    .corner-heading {
        margin-left: 2em;
    margin-top: 2em;
    max-width: 100vw;
    }
    .corner-heading > h1 {
        width: 300px;
        /* background-color: aliceblue; */
        background: none #f5f5de;
        background-image: linear-gradient(to bottom right, rgba(245,245,222,1.0), rgba(245,245,222,0)); 
        border-left: 1px solid black;
        border-top: 1px solid black;
        padding-left: 0.7em;
        padding-top: 0.5em;
        padding-bottom: 3em;
        font-size: 1.5em;
        z-index: 1;
        position: absolute;
        /* top left corner is rounded 10px */
        border-top-left-radius: 10px;
        /* background blur 10 */
        backdrop-filter: blur(10px);
    }
    .corner-heading > div {
        position: absolute;
        z-index: 2;
        margin-top: 5em;
        margin-left: 2em;
        border-radius: 10px;
        border: 1px solid black;
        /* padding: 1em; */
        padding: 0em 1em 0em 1em;
        max-width: 1000px;

        background-color: rgba(245,245,222,.8);
        backdrop-filter: blur(10px);
        /* drop shadow */
        filter:drop-shadow(5px 5px 4px rgba(0,0,0,0.25));
    }
    .corner-heading > div > p {
        font-size: 1.2em;
        font-weight: 300;
    }

</style>