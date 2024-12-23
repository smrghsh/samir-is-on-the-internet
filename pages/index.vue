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
  /* height: 100vh; */
  position: absolute;
  z-index: 2;
}

main {
  position: relative;
}

.project-demarcator {
  width: 300px;
  background-color: none;
  /* background-color: blue; */
  /* background-image: linear-gradient(to bottom right, rgba(245, 245, 222, 1.0), rgba(245, 245, 222, 0.0)); */
  border-left: 1px solid black;
  border-top: 1px solid black;
  /* border-bottom: none; */
  padding-left: 0.7em;
  padding-top: 0.3em;
  padding-bottom: 2em;
  margin-top: 0.5em;
  font-size: 1.5em;
  z-index: 1;
  position: absolute;
  /* top left corner is rounded 10px */
  border-top-left-radius: 10px;
  /* background blur 10 */
  backdrop-filter: blur(10px);

}
</style>