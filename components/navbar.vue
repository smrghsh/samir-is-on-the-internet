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
      <label class="switch">
        <span class="sun"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <g fill="#ffd43b">
              <circle r="5" cy="12" cx="12" />
              <path
                d="m21 13h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm-17 0h-1a1 1 0 0 1 0-2h1a1 1 0 0 1 0 2zm13.66-5.66a1 1 0 0 1 -.66-.29 1 1 0 0 1 0-1.41l.71-.71a1 1 0 1 1 1.41 1.41l-.71.71a1 1 0 0 1 -.75.29zm-12.02 12.02a1 1 0 0 1 -.71-.29 1 1 0 0 1 0-1.41l.71-.66a1 1 0 0 1 1.41 1.41l-.71.71a1 1 0 0 1 -.7.24zm6.36-14.36a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm0 17a1 1 0 0 1 -1-1v-1a1 1 0 0 1 2 0v1a1 1 0 0 1 -1 1zm-5.66-14.66a1 1 0 0 1 -.7-.29l-.71-.71a1 1 0 0 1 1.41-1.41l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.29zm12.02 12.02a1 1 0 0 1 -.7-.29l-.66-.71a1 1 0 0 1 1.36-1.36l.71.71a1 1 0 0 1 0 1.41 1 1 0 0 1 -.71.24z" />
            </g>
          </svg></span>
        <span class="moon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
            <path
              d="m223.5 32c-123.5 0-223.5 100.3-223.5 224s100 224 223.5 224c60.6 0 115.5-24.2 155.8-63.4 5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6-96.9 0-175.5-78.8-175.5-176 0-65.8 36-123.1 89.3-153.3 6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
          </svg></span>
        <input type="checkbox" class="input">
        <span class="slider" />
      </label>
    </div>

    <div class="second-row">
      <!-- <NuxtLink class="subpage" to="/research">
        <h3>Research</h3>
      </NuxtLink> -->
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
  /* margin-left: 2em; */
  /* margin-top: 2em; */
  /* max-width: 90vw; */
  /* width: 400px; */
  /* background-color: rgba(245, 245, 222, 0.8);*/
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
  max-width: 90vw;
}

.first-row {

  max-width: 95vw;
  /* blur

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


/* From Uiverse.io by andrew-demchenk0 */
.switch {
  font-size: 17px;
  position: relative;
  display: inline-block;
  width: 64px;
  height: 34px;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #73C0FC;
  transition: .4s;
  border-radius: 30px;
}

.slider:before {
  position: absolute;
  content: "";
  height: 30px;
  width: 30px;
  border-radius: 20px;
  left: 2px;
  bottom: 2px;
  z-index: 2;
  background-color: #e8e8e8;
  transition: .4s;
}

.sun svg {
  position: absolute;
  top: 6px;
  left: 36px;
  z-index: 1;
  width: 24px;
  height: 24px;
}

.moon svg {
  fill: #73C0FC;
  position: absolute;
  top: 5px;
  left: 5px;
  z-index: 1;
  width: 24px;
  height: 24px;
}

/* .switch:hover */
.sun svg {
  animation: rotate 15s linear infinite;
}

@keyframes rotate {

  0% {
    transform: rotate(0);
  }

  100% {
    transform: rotate(360deg);
  }
}

/* .switch:hover */
.moon svg {
  animation: tilt 5s linear infinite;
}

@keyframes tilt {

  0% {
    transform: rotate(0deg);
  }

  25% {
    transform: rotate(-10deg);
  }

  75% {
    transform: rotate(10deg);
  }

  100% {
    transform: rotate(0deg);
  }
}

.input:checked+.slider {
  background-color: #183153;
}

.input:focus+.slider {
  box-shadow: 0 0 1px #183153;
}

.input:checked+.slider:before {
  transform: translateX(30px);
}
</style>