import * as basicLightbox from 'basiclightbox';
import stylefileinput from 'style-file-input';
import domtoimage from 'dom-to-image';

let downloadEl;
let facebookEl;
let fileEl;
let linkEl;
let loadingEl;
let previewEl;
let subtitleEl;
let titleEl;
let twitterEl;
let userActionsEl;
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
    // obtenemos la colección de fotos
    var file = event.target.files[0];

    // muestra el mensaje de que estamos generando la imágen
    loadingEl.classList.remove('hide');

    // ocultamos las acciones del usuario
    userActionsEl.classList.add('hide');

    // verificamos el tipo de imágen
    if (!file || !file.type.match('image.*')) {
        // oculta el mensaje de que estamos generando la imágen
        loadingEl.classList.add('hide');

        return;
    }

    var reader = new FileReader();
    // cargamos la imágen
    reader.readAsDataURL(file);
    // cuando terminó de cargarse la imágen
    reader.onload = (function() {
        return function(e) {
            // obtenemos el src en base 64
            const imgSrc = e.target.result;

            // creamos el markup de la portada que el usuario puede exportar
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
                                <h2 class="f1 i mb3 mt0 normal oswald ph3 sans-serif text-shadow-1 white" style="color: #b1c903; font-size: 150px; letter-spacing: -5px;">
                                    ${titleEl.value}
                                </h2>
                                <h3 class="f3 fw3 ma0 ph5 roboto-condensed sans-serif text-shadow-1 white" style="font-size: 50px;">
                                    ${subtitleEl.value}
                                </h3>
                            </div>
                        </div>
                    </div>
                `;

            // subimos la imágen a imgur después de 3 segundos
            // para que el navegador pueda cargar los logos
            setTimeout(postToImgur, 3000);
        };
    })(file);
}

function postToImgur() {
    domtoimage.toBlob(document.getElementById('export')).then((blob) => {
        // generamos un objeto FormData para enviar por AJAX
        var data = new FormData();
        data.append('image', blob);

        var xhttp = new XMLHttpRequest();
        xhttp.open('POST', 'https://api.imgur.com/3/image', true);
        xhttp.setRequestHeader('Authorization', 'Client-ID bff2f3408c864bc');
        xhttp.onreadystatechange = function() {
            // la petición se completó
            if (this.readyState === 4) {
                // si terminó correctamente
                if (this.status >= 200 && this.status < 300) {
                    var result = '';

                    // parseamos la respuesta para validar que sea el objeto que esperamos
                    try {
                        var response = JSON.parse(this.responseText);

                        result = response.data.link;
                    } catch (err) {
                        // eslint-disable-next-line
                        console.error(error);
                    }

                    // generamos el `alt` para las imágenes
                    const alt = `${titleEl.value} - ${subtitleEl.value}`;

                    // asignamos a los diferentes elementos los valores necesarios a partir del
                    // objeto de respuesta de imgur
                    facebookEl.href = `https://www.facebook.com/sharer/sharer.php?u=${result}`;
                    linkEl.value = result;
                    previewEl.alt = alt;
                    previewEl.src = result;
                    twitterEl.href = `https://twitter.com/intent/tweet?text=${
                        titleEl.value
                    }&url=${result}`;

                    // mostramos el preview y los botones para descargar y compartir
                    userActionsEl.classList.remove('hide');
                }
            }
        };
        xhttp.send(data);
    });
}

function showModal(event) {
    // creamos una función que recibe un evento keydown y se fija si se presionó
    // la tecla escape para cerrar el modal
    const onKeydown = function(modalInstance, event) {
        if (event.keyCode === 27) modalInstance.close();
    };
    let onKeydownListener;

    const modalInstance = basicLightbox.create(
        // markup del modal
        `<img src="${event.target.src}" alt="${event.target.alt}" class="shadow-5">`,
        {
            // eliminamos el listener de keydown antes de cerrar el modal
            beforeClose: () => {
                window.removeEventListener('keydown', onKeydownListener);
            },
            // antes de mostrar el modal
            beforeShow: (instance) => {
                // generamos una función que almacenamos en una variable externa
                // para ser capaces de eliminar el listener luego
                onKeydownListener = onKeydown.bind(this, instance);

                // agregamos el listener a window
                window.addEventListener('keydown', onKeydownListener);
            },
            // clase que se agrega al modal
            className: 'zoom-out',
        }
    );

    modalInstance.show();
}

export function init() {
    downloadEl = document.querySelector('#download');
    facebookEl = document.querySelector('#facebook');
    fileEl = document.querySelector('#file');
    linkEl = document.querySelector('#link');
    loadingEl = document.querySelector('#loading');
    previewEl = document.querySelector('#preview');
    subtitleEl = document.querySelector('#subtitle');
    titleEl = document.querySelector('#title');
    twitterEl = document.querySelector('#twitter');
    userActionsEl = document.querySelector('#user-actions');
    userCoverEl = document.querySelector('#user-cover');

    // usamos este plugin para poder estilizar el input file
    stylefileinput(fileEl, {
        browseButtonLabel: 'Subir',
        buttonClass:
            'b b--black-30 ba bg-main br1 lh-copy pointer pv2 tc text-shadow-2 ttu w-10-rem white',
        changeButtonLabel: 'Cambiar',
        inputClass: 'bg-black-50 kist-Stylefileinput-input white',
        noFileSelectedText: '',
        textClass: 'flex-auto-ns kist-Stylefileinput-text ml3-ns mt3 mt0-ns truncate',
        wrapperClass: 'flex flex-column flex-row-ns items-center-ns kist-Stylefileinput',
    });

    // descargar lo que el usuario generó
    downloadEl.addEventListener('click', downloadUserCover);

    // asignamos un listener al cargar una imágen
    fileEl.addEventListener('change', handleFileSelect, false);

    // previsualizar la foto generada
    previewEl.addEventListener('click', showModal);
}
