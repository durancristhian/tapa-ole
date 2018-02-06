const domtoimage = require('dom-to-image');

let downloadEl;
let filesEl;
let linkEl;
let subtitleEl;
let titleEl;
let userCoverEl;

const logoImage = 'assets/images/logo-ole.png';
const poweradeImage = 'assets/images/logo-powerade.png';

function downloadUserCover() {
    domtoimage
        .toJpeg(document.getElementById('export'))
        .then((dataUrl) => {
            const link = document.createElement('a');
            link.download = 'tapa-ole.jpeg';
            link.href = dataUrl;
            link.click();
        })
        // eslint-disable-next-line
        .catch(console.error);
}

function handleFileSelect(event) {
    var files = event.target.files;

    for (var i = 0, f; (f = files[i]); i++) {
        if (!f.type.match('image.*')) {
            continue;
        }

        var reader = new FileReader();
        reader.onload = (function() {
            return function(e) {
                const imgSrc = e.target.result;

                userCoverEl.innerHTML = `
                    <div id="export" class="align-center bg-white flex flex-column justify-center relative tc user-image">
                        <div class="absolute bg-center bottom-0 cover left-0 right-0 top-0" style="background-image: url('${imgSrc}'); z-index: 0;">
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 top-0 tr" style="z-index: 1;">
                            <img src="${poweradeImage}" class="dib pr5 pt5 v-btm" style="width: 400px;" />
                        </div>
                        <div class="absolute bottom-0 left-0 right-0 top-0" style="z-index: 2;">
                            <img src="${logoImage}" class="absolute left-0 top-0" style="height: 350px; width: 550px;" />
                            <div class="absolute bottom-0 gradient-1 left-0 pv5 right-0">
                                <h2 class="f1 i mb3 mt0 normal oswald ph3 sans-serif text-shadow-1 ttu white" style="color: #b1c903; font-size: 150px; letter-spacing: -5px;">
                                    ${titleEl.value}
                                </h2>
                                <h3 class="f3 fw3 ma0 ph5 roboto-condensed sans-serif text-shadow-1 white" style="font-size: 50px;">
                                    ${subtitleEl.value}
                                </h3>
                            </div>
                        </div>
                    </div>
                `;

                postToImgur();
            };
        })(f);
        reader.readAsDataURL(f);
    }
}

function postToImgur() {
    domtoimage.toBlob(document.getElementById('export')).then((blob) => {
        linkEl.value = 'Subiendo...';

        var data = new FormData();
        data.append('image', blob);

        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'https://api.imgur.com/3/image', true);
        xhttp.setRequestHeader('Authorization', 'Client-ID bff2f3408c864bc');
        xhttp.onreadystatechange = function() {
            if (this.readyState === 4) {
                if (this.status >= 200 && this.status < 300) {
                    var result = '';

                    try {
                        var response = JSON.parse(this.responseText);

                        result = response.data.link;
                    } catch (err) {
                        // eslint-disable-next-line
                        console.error(error);
                    }

                    linkEl.value = result;
                }
            }
        };
        xhttp.send(data);
    });
}

export function init() {
    downloadEl = document.querySelector('#download');
    filesEl = document.querySelector('#files');
    linkEl = document.querySelector('#link');
    subtitleEl = document.querySelector('#subtitle');
    titleEl = document.querySelector('#title');
    userCoverEl = document.querySelector('#user-cover');

    downloadEl.addEventListener('click', downloadUserCover);
    filesEl.addEventListener('change', handleFileSelect, false);
}
