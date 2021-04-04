document.getElementById("check").checked = localStorage.getItem("isTipsDisabled") === "true";
initTips();

if (!document.getElementById("check").checked) {
    window.onload = (event) => {
        setTimeout(() => document.getElementById("pane").removeAttribute("hidden"), 5000);
    }
}

function initTips() {
    let quotes = ["'What you wear is how you present yourself to the world, especially today, when human contacts are so quick. Fashion is instant language.'—Miuccia Prada"
        , "'Over the years I have learned that what is important in a dress is the woman who's wearing it.' —Yves Saint Laurent"
        , "'Shoes transform your body language and attitude. They lift you physically and emotionally.' —Christian Louboutin"
        , "'In order to be irreplaceable one must always be different.' —Coco Chanel"];
    let navigationList;
    createNavigationList();

    let index = 0;
    setIndex(!Number.isNaN(+localStorage.getItem("currentIndex"))
        ? +localStorage.getItem("currentIndex")
        : 0);

    document.getElementById("button-remove").onclick = (event) => {
        document.getElementById("pane").setAttribute("hidden", "hidden");
    };

    document.getElementById("button-right").onclick = event => {
        setIndex((index + 1) % quotes.length);
    };

    document.getElementById("button-left").onclick = event => {
        setIndex((index - 1 + quotes.length) % quotes.length);
    };

    document.getElementById("check").onchange = (event) => {
        localStorage.setItem("isTipsDisabled", document.getElementById("check").checked)
    };

    document.onkeydown = (event) => {
        if (event.shiftKey && event.code === "KeyO") {
            document.getElementById("pane").removeAttribute("hidden");
        } else if (event.code === "ArrowRight") {
            setIndex((index + 1) % quotes.length);
        } else if (event.code === "ArrowLeft") {
            setIndex((index - 1 + quotes.length) % quotes.length);
        }
    };

    function setIndex(newIndex) {
        navigationList[index].classList.remove("chosen");
        navigationList[newIndex].classList.add("chosen");
        document.getElementById("quote").innerText = quotes[newIndex];

        index = newIndex;
        localStorage.setItem("currentIndex", index);
    }

    function createNavigationList() {
        let list = document.getElementById("tip");
        list.innerHTML = "";

        for (let i = 0; i < quotes.length; i++) {
            list.appendChild(document.createElement("li"));
        }

        navigationList = document.querySelectorAll("#tip li");
    }
}