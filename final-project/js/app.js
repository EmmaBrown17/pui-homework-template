document.addEventListener("DOMContentLoaded", () => {
    //sofonsiba levels
    const isLevel1Completed = localStorage.getItem("level1Completed") === "true";
    const isLevel2Completed = localStorage.getItem("level2Completed") === "true";
    const isLevel3Completed = localStorage.getItem("level3Completed") === "true";

    //lebrun levels
    const isLevel4Completed = localStorage.getItem("level4Completed") === "true";
    const isLevel5Completed = localStorage.getItem("level5Completed") === "true";
    const isLevel6Completed = localStorage.getItem("level6Completed") === "true";

    //cassatt levels
    const isLevel7Completed = localStorage.getItem("level7Completed") === "true";
    const isLevel8Completed = localStorage.getItem("level8Completed") === "true";
    const isLevel9Completed = localStorage.getItem("level9Completed") === "true";

    const sofonisbaPic = document.querySelector(".sofonisba-pic");
    const lebrunPic = document.querySelector(".lebrun-pic");
    const cassattPic = document.querySelector(".cassatt-pic");

    //sofonisba unlock
    if (isLevel1Completed && isLevel2Completed && isLevel3Completed) {
        sofonisbaPic.classList.add("unlocked");
        sofonisbaPic.classList.remove("locked");
    } else {
        sofonisbaPic.classList.add("locked");
        sofonisbaPic.classList.remove("unlocked");
        sofonisbaPic.src = "images/SiteImages/mysteryPainting.jpg"; 
    }

    //lebrun unlock
    if (isLevel4Completed && isLevel5Completed && isLevel6Completed) {
        lebrunPic.classList.add("unlocked");
        lebrunPic.classList.remove("locked");
    } else {
        lebrunPic.classList.add("locked");
        lebrunPic.classList.remove("unlocked");
        lebrunPic.src = "images/SiteImages/mysteryPainting.jpg";
    }

    //cassatt unlock
    if (isLevel7Completed && isLevel8Completed && isLevel9Completed) {
        cassattPic.classList.add("unlocked");
        cassattPic.classList.remove("locked");
    } else {
        cassattPic.classList.add("locked");
        cassattPic.classList.remove("unlocked");
        cassattPic.src = "images/SiteImages/mysteryPainting.jpg";
    }
});

const sofonisbaPic = document.getElementById("sofonisba-pic");
console.log(sofonisbaPic.classList);

