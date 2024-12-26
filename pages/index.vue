<template>
  <twist />
  <div class="front-layer">
    <navbar />
    <corner-section>
      <h1>hello world!</h1>
      <div class="not-the-heading">
        <ContentDoc :head="false" class="text" path="/hello-world">
        </ContentDoc>
        <main>
          <h3 class="project-demarcator">Selected Projects</h3>
          <ProjectsContainer />
        </main>
      </div>

    </corner-section>
  </div>
</template>

<style>
.front-layer {
  width: 100vw;
  position: absolute;
  z-index: 2;
}

main {
  position: relative;
  padding-left: var(--one-stop);
}

/* media query for small devices 600px */
@media (max-width: 600px) {
  main {
    padding-left: var(--squish-stop);
  }
}

.project-demarcator {
  width: var(--section-seperator-width);
  border-width: 1px;
  border-style: solid;
  border-color: light-dark(var(--light-border-col), var(--dark-border-col));
  border-right: none;
  border-bottom: none;
  margin-left: var(one-stop);
  padding-left: var(--one-stop);
  padding-top: 0.3em;
  padding-bottom: 2em;
  margin-top: 0.5em;
  font-size: 1.5em;
  z-index: 1;
  position: absolute;
  border-top-left-radius: 10px;
  backdrop-filter: blur(10px);
}
</style>