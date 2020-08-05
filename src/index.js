import component from "./component";
import "./main.css";
import "react";
import "react-dom";

// Small CSS framework to demonstrate the elimination of unused CSS with purifyCSS
import "purecss";

// Icons made by <a href="https://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon"> www.flaticon.com</a>
import "./assets/svg/sprite.svg";
import "./assets/svg/css.svg";
import "./assets/svg/github.svg";


document.body.appendChild(component());

// document.body.insertAdjacentHTML(
//     "afterbegin",
//     `<svg class="test">
//         <use xlink:href="#sprite-usage"></use>
//     </svg>

//     `
// );

document.body.insertAdjacentHTML(
    "beforeend",
    `<p class="title">TITLE</p>`
);

document.body.insertAdjacentHTML(
    "afterbegin",
    `<svg class="test">
        <use xlink:href="spritesheet.svg#sprite"></use>
    </svg>
    <svg class="test">
        <use xlink:href="spritesheet.svg#css"></use>
    </svg>
    <svg class="test">
        <use xlink:href="spritesheet.svg#github"></use>
    </svg>
    `
);
