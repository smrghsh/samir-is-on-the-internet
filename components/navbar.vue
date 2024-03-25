
<template>
    <nav>
        <div class="first-row">
            <router-link to="/"class="home-link"><h1>Samir Ghosh</h1></router-link>
            <div class="socials">
                <a href="" ><img src="/assets/images/social-icons/github.svg" alt=""></a>
                <a href="" ><img src="/assets/images/social-icons/instagram.svg" alt=""></a>
            </div>
        </div>
        <div class="second-row">
            <router-link class="subpage" to="/bio"><h3>Bio</h3></router-link>
            <router-link class="subpage" to="/CV"><h3>CV</h3></router-link>
            <!-- <router-link class="subpage" to="/CV"><h3>Notes</h3></router-link> -->
            <router-link class="subpage" to="/Colophon"><h3>Colophon</h3></router-link>
        </div>

    </nav>
</template>
<style>
nav {
    margin-left: 2em;
    margin-top: 2em;
    max-width: 100vw;
    width: 400px;
}
.home-link {
    text-decoration: none;
    color: black;

    flex: 0 1 auto;
    align-self: auto;
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
    /* box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.1); */
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
.socials > a > img {
    width: 1.8em;
    height: 1.8em;
    margin: 5px;
    cursor: pointer;
    /* no border */
    border: none;


}
.socials > a > img:hover {
    opacity: 0.7;
}
.socials > a{
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
.second-row {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-content: center;
    align-items: stretch;

    background-color: #f5f5de;
    opacity: .8;
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