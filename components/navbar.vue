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
      </div>
    </div>
    <div class="second-row">
      <NuxtLink class="subpage" to="/bio">
        <h3>Bio</h3>
      </NuxtLink>
      <a class="subpage" href="CV_Samir_Ghosh-11-4-24.pdf">
        <h3>CV</h3>
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
  margin-left: 2em;
  margin-top: 2em;
  max-width: 90vw;
  width: 400px;
}

@media (max-width: 600px) {
  nav {
    margin-left: 1em;
  }
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
  text-decoration: underline 1px rgba(0, 0, 0, 1);
  /* opacity: .9; */
}

.home-link>h1 {
  font-size: 2.5em;
}

.subpage {
  /* margin-left: 1em;
    margin-right: 1em; */
  text-align: center;
  flex: 1 1 auto;
  text-decoration: none;
  color: black;
  /* drop shadow */
  border-right: 1px solid black;
  max-width: 95vw;
  /* box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1); */
  transition: 300ms;
}

.subpage:last-child {
  border-right: none;
}

.subpage:hover {
  background-color: lightskyblue;
  opacity: .8;
  /* drop shadow */
  /* box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1); */
}

.socials {
  flex: 0 1 auto;
  align-self: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-content: center;
  align-items: center;
}

.socials>a>img {
  width: 1.8em;
  height: 1.8em;
  margin: 5px;
  cursor: pointer;
  /* no border */
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
}

.first-row {
  background-color: rgba(245, 245, 222, 0.8);
  backdrop-filter: blur(10px);
  /* blur */

  /* opacity: .8; */
  padding-left: .2em;
  padding-right: .2em;
}

.second-row {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-content: center;
  align-items: stretch;

  background-color: rgba(245, 245, 222, 0.8);
  /* opacity: .8; */
  backdrop-filter: blur(10px);
  border-top: 1px solid black;
  border-bottom: 1px solid black;
  /* padding-top: 1em;
    padding-bottom: 1em; */
  /* padding-left: 1em;
    padding-right: 1em; */
  /* drop shadow */
  /* box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1); */

}

/* https://stackoverflow.com/questions/46083220/how-to-vuejs-router-link-active-style */
/* for active router links */
/* nav {
    text-align: center;
    padding: 20px;
    background-color: #f4f4f4;
} */
</style>