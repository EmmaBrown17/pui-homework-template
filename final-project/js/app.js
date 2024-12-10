document.addEventListener("DOMContentLoaded", () => {
    const isLevel1Completed = localStorage.getItem("level1Completed") === "true";
    const isLevel2Completed = localStorage.getItem("level2Completed") === "true";
    const isLevel3Completed = localStorage.getItem("level3Completed") === "true";

    const sofonisbaPic = document.querySelector(".sofonisba-pic");
    // const lebrunPic = document.querySelector(".lebrun-pic");
    // const cassattPic = document.querySelector(".cassatt-pic");

    if (isLevel1Completed && isLevel2Completed && isLevel3Completed) {
        sofonisbaPic.classList.add("unlocked");
        sofonisbaPic.classList.remove("locked");
    } else {
        sofonisbaPic.classList.add("locked");
        sofonisbaPic.classList.remove("unlocked");
        sofonisbaPic.src = "images/SiteImages/mysteryPainting.jpg"; 
    }

    // if (isLevel4Completed && isLevel5Completed isLevel6Completed) {
    //     lebrunPic.classList.add("unlocked");
    //     lebrunPic.classList.remove("locked");
    // } else {
    //     lebrunPic.classList.add("locked");
    //     lebrunPic.src = ""; //i dont think i need this lemme try and see
    // }

    // if (isLevel7Completed && isLevel8Completed isLevel9Completed) {
    //     cassattPic.classList.add("unlocked");
    //     cassattPic.classList.remove("locked");
    // } else {
    //     cassattPic.classList.add("locked");
    //     cassattPic.src = ""; //i dont think i need this lemme try and see
    // }
});

const sofonisbaPic = document.getElementById("sofonisba-pic");
console.log(sofonisbaPic.classList);

