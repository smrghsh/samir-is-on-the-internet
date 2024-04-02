<template>
  <navbar />
  <corner-section>
    <h1>Colophon</h1>
    <div class="not-the-heading">
      <!-- <div class="text">

        
        <p>This website uses the Inter (with the browser’s sans-serif font as a backup), and is intended to be legible
          on a variety of 2D devices. </p>
        <p>The source code is viewable on Github, it includes Three.js + GLSL for the generative graphic on the home
          page,
          and uses Vue.js + Vite for a content management system and build tooling. The site is hosted with GitHub
          Pages.
        </p>
        <p>I intend for this version of the website to do the following:</p>
        <li>Conveniently share information (CV, Bio, Socials) that others may be trying to find</li>
        <li>Display a selection of my projects, and be extendable to future work</li>
        <li>Express myself through design and the generative graphic on the front page</li>
        <li>Help keep my web development skills sharp because frameworks are always changing!</li>
        <p></p>
      </div> -->
      <ContentDoc :head="false" class="text" path="/colophon">
      </ContentDoc>
    </div>

  </corner-section>
</template>

<style></style>