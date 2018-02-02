const domtoimage = require('dom-to-image');

let coverEl;
let filesEl;
let generateEl;
let subtitleEl;
let titleEl;

const logoImage = 'assets/images/logo-ole.png';
const poweradeImage = 'assets/images/logo-powerade.png';

function generatecover() {
    domtoimage
        .toJpeg(document.getElementById('export'))
        .then(dataUrl => {
            const link = document.createElement('a');
            link.download = 'cover.jpeg';
            link.href = dataUrl;
            link.click();
        })
        // eslint-disable-next-line
        .catch(console.error);
}

function handleFileSelect(evt) {
    var files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (var i = 0, f; (f = files[i]); i++) {
        // Only process image files.
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function() {
            return function(e) {
                const imgSrc = e.target.result;

                coverEl.innerHTML = `
        <div id="export" class="bg-white align-center flex flex-column image justify-center relative tc">
            <div style="background-image: url('${imgSrc}');" class="absolute bottom-0 left-0 right-0 top-0" style="z-index: 0;"></div>
            <div class="absolute bottom-0 left-0 right-0 top-0 tr" style="z-index: 1;">
                <img src="${poweradeImage}" class="dib pt5 pr5 v-btm" style="width: 400px;" />
            </div>
            <div class="absolute bottom-0 left-0 right-0 top-0" style="z-index: 2;">
                <img src="${logoImage}" class="absolute top-0 left-0" style="height: 350px; width: 550px;" />
                <div class="absolute bottom-0 left-0 right-0 pv5 fondito">
                    <h2 class="oswald f1 ttu i white f1 ph3 mb3 mt0 normal sans-serif ttu ts"
                        style="font-size: 150px; color: #b1c903; letter-spacing: -5px;">
                        ${titleEl.value}</h2>
                    <h3 class="roboto-condensed f3 white f3 fw3 ma0 sans-serif ts ph5"
                        style="font-size: 50px;">${subtitleEl.value}</h3>
                </div>
            </div>
        </div>`;
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    }
}

export function init() {
    coverEl = document.querySelector('#cover');
    filesEl = document.querySelector('#files');
    subtitleEl = document.querySelector('#subtitle');
    generateEl = document.querySelector('#generate');
    titleEl = document.querySelector('#title');

    filesEl.addEventListener('change', handleFileSelect, false);
    generateEl.addEventListener('click', generatecover);
}
