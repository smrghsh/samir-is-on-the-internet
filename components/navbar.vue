<template>
  <nav>
    <div class="first-row">
      <NuxtLink to="/" class="home-link">
        <h1>Samir Ghosh</h1>
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
      </div>
      <ColorModeSwitch />
    </div>

    <div class="second-row">
      <!-- <NuxtLink class="subpage" to="/research">
        <h3>Research</h3>
      </NuxtLink> -->
      <NuxtLink class="subpage" to="/bio">
        <h3>Bio</h3>
      </NuxtLink>
      <a class="subpage" href="CV_Samir_Ghosh_July_2025.pdf">
        <h3>CV</h3>
      </a>
      <a class=" subpage" href="Resume_Samir_Ghosh-02-17-25.pdf">
        <h3>Resume</h3>
      </a>
      <!-- <NuxtLink class="subpage" to="/CV"><h3>Notes</h3></NuxtLink> -->
      <NuxtLink class="subpage" to="/Colophon">
        <h3>Colophon</h3>
      </NuxtLink>
    </div>
  </nav>
</template>
<style>
nav {
  backdrop-filter: blur(10px);

}


.home-link {
  text-decoration: none;
  color: black;

  flex: 0 1 auto;
  align-self: auto;
  /* margin: 0; */
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
  font-size: 2.5em;
}

.subpage {
  text-align: center;
  flex: 1 1 auto;
  text-decoration: none;
  color: black;
  border-width: 1px;
  border-style: solid;
  border-color: light-dark(var(--light-border-col), var(--dark-border-col));
  border-top: none;
  border-bottom: none;
  border-left: none;
  max-width: 95vw;
  transition: 300ms;
}

.subpage:last-child {
  border-right: none;
}

.subpage:hover {
  background-color: light-dark(var(--light-button-hover), var(--dark-button-hover));
  opacity: .8;
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
  width: 1.5em;
  height: 1.5em;
  margin: 2px;
  cursor: pointer;
  border-radius: 5px;
  border: none;
  transition: 300ms;


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
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: center;
  max-width: 1800px;
  padding-left: var(--one-stop);
  padding-right: 2em;
}



.second-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: stretch;
  max-width: 1800px;
  background-color: light-dark(var(--light-cs-bg-col), var(--dark-cs-bg-col));
  backdrop-filter: blur(10px);
  border-style: solid;
  border-width: 1px;
  border-color: light-dark(var(--light-border-col), var(--dark-border-col));
  border-right: none;
  border-left: none;

}
</style>