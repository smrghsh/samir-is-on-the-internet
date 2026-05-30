<template>
  <nav>
    <div class="first-row">
      <NuxtLink to="/" class="home-link">
        <h1>Samir Ghosh</h1>
        <!-- <h3>XR RESEARCH AND DEVELOPMENT</h3> -->
      </NuxtLink>
      <div class="socials">
        <a href="https://github.com/smrghsh"><img src="/assets/images/social-icons/github.svg" alt=""></a>
        <a href="https://www.instagram.com/vertex.shader/"><img src="/assets/images/social-icons/instagram.svg"
            alt=""></a>
        <a href="https://www.linkedin.com/in/vertexshader"><img src="/assets/images/social-icons/linkedin.svg"
            alt=""></a>
        <a href="https://scholar.google.com/citations?hl=en&user=XJdXFN4AAAAJ"><img
            src="/assets/images/social-icons/googlescholar.svg" alt=""></a>
        <a href="https://orcid.org/0009-0004-4575-4954"><img src="/assets/images/social-icons/orcid.svg" alt=""></a>
        <a href="https://vertexshader.substack.com/"><img src="/assets/images/social-icons/substack.svg" alt=""></a>

      </div>
      <!-- <ColorModeSwitch /> -->
    </div>

    <div class="second-row">
      <NuxtLink class="subpage" to="/bio">
        <h3>About</h3>
      </NuxtLink>

      <NuxtLink class="subpage" to="/cv-and-resume">
        <h3>CV, Resume</h3>
      </NuxtLink>

      <NuxtLink class="subpage" to="/Colophon">
        <h3>Colophon</h3>
      </NuxtLink>
    </div>

  </nav>
</template>
<style>
nav {
  background-color: light-dark(
    rgba(245, 243, 238, 0.85),
    rgba(0, 0, 0, 0.75)
  );
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid light-dark(rgba(20, 20, 20, 0.12), rgba(255, 255, 255, 0.1));
}

.home-link {
  text-decoration: none;
  color: light-dark(var(--light-text-col), var(--dark-text-col));
  flex: 0 1 auto;
  align-self: auto;
}

.home-link {
  text-decoration: underline 1px rgba(0, 0, 0, 0);
  transition: text-decoration-color 200ms;
}

.home-link:hover {
  text-decoration: underline;
  cursor: pointer;
  text-decoration-line: underline;
  text-decoration-thickness: 1px;
  text-decoration-color: light-dark(var(--light-border-col), var(--dark-border-col));
  /* text-decoration: underline 1px rgba(0, 0, 0, 1); */
  /* opacity: .9; */
}

.home-link>h1 {
  font-size: 3.4rem;
}

.subpage {
  text-align: center;
  flex: 1 1 auto;
  text-decoration: none;
  /* color: black; */
  border-width: 1px;
  border-style: solid;
  border-color: light-dark(var(--light-border-col), var(--dark-border-col));
  border-top: none;
  /* border-bottom: none; */
  border-left: none;
  border-right: none;
  max-width: 95vw;
  /* transition: 300ms; */
  padding-left: 1rem;
  padding-right: 1rem;
  margin-top: -1px;
  /* left align */
  text-align: left;
}

.subpage:last-child {
  border-right: none;
  border-bottom: none;
}

.subpage:hover {
  background-color: darkslategray;
  transition: 300ms;
}

.subpage:hover h3 {
  transition: 300ms;
  color: white;
  /* background-color: light-dark(var(--light-button-hover), var(--dark-button-hover)); */
}

.socials {
  flex: 1 1 auto;
  align-self: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-content: center;
  align-items: center;
  align-self: stretch
}

.socials>a>img {
  width: 2rem;
  aspect-ratio: 1;
  margin: 2px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: 300ms;
}

/* Adjust GitHub octopus size and position to align with other icons */
.socials>a[href*="github.com"]>img {
  transform: scale(0.85);
  margin-top: -10%;
  /* Pull the icon up a bit to center it better */
}

/* Adjust Substack icon size */
.socials>a[href*="substack.com"]>img {
  transform: scale(0.75);
}

.socials>a>img:hover {
  opacity: 0.7;
}

.socials>a {
  flex: 0 1 auto;
  align-self: auto;
}

.first-row {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: flex-start;
  max-width: 1800px;
  padding-left: var(--one-stop);
  /* padding-right: 2em; */
}



.second-row {
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  /* justify-content: space-between; */
  align-content: center;
  align-items: flex-start;
  max-width: 1800px;
  background-color: transparent;
  /* border-style: solid; */
  /* border-width: 1px; */
  /* border-color: light-dark(var(--light-border-col), var(--dark-border-col)); */
  border-right: none;
  border-left: none;
  margin-left: calc(var(--one-stop) + 0.2rem);

}
</style>