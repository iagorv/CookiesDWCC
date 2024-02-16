// Contenido de Cookies.js
function setCookie(name, value, expirationSeconds) {
    var date = new Date();
    date.setTime(date.getTime() + (expirationSeconds * 1000));
    var expires = expirationSeconds ? "; expires=" + date.toUTCString() : "";
    document.cookie = name + "=" + value + expires + "; path=/";
}

function saveUserPreferences() {
    var form = document.getElementById('preferencesForm');

    var idioma = form.idioma.value;
    var tema = form.tema.value;
    var usuario = form.usuario.value;
    var edad = form.edad.value;
    var preferencia = form.preferencia.value;


    setCookie('Idioma', idioma, 10);
    setCookie('Tema', tema, 15);
    setCookie('Nombre', usuario, 20);
    setCookie('Edad', edad, 0);
    setCookie('Preferencia', preferencia, 0);
    setCookie('UltimaVisita', new Date().toISOString(), 0); // Guardar la fecha y hora actual

    // Mostrar las cookies vigentes
    updateCookieList();
}

function updateCookieList() {
    var cookies = document.cookie.split(';');
    var cookiesContainer = document.getElementById('cookiesContainer');

    // Limpiar el contenedor anterior
    cookiesContainer.innerHTML = '';

    // Filtrar y mostrar solo las cookies específicas
    var specificCookies = ['Idioma', 'Tema', 'Nombre','Edad', 'Preferencia', 'UltimaVisita'];
    specificCookies.forEach(cookieName => {
        var cookieValue = getCookie(cookieName);
        if (cookieValue !== '') {
            var cookieItem = document.createElement('p');
            cookieItem.textContent = cookieName + '=' + cookieValue;
            cookiesContainer.appendChild(cookieItem);
        }
    });
}

function getCookie(name) {
    var nameEQ = name + "=";
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return '';
}

// Ejecutar la función una vez y luego cada 2 segundos
saveUserPreferences();
setInterval(updateCookieList, 2000);
