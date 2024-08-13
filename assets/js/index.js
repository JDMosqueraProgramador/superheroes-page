let menu = document.querySelector("#menu");

document.addEventListener("scroll", (e) => {
    console.log(e)
    if(window.scrollY !== 0) {
        menu.classList.add("menu-scroll")
    } else {
        menu.classList.remove("menu-scroll")
    }
})