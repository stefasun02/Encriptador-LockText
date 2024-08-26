const textArea = document.getElementById("text__area");
const mensaje = document.getElementById("mensaje__encriptado");
const encriptarBtn = document.getElementById("btn__encriptar");
const desencriptarBtn = document.getElementById("btn__desencriptar");
const copyPasteButton = document.getElementById("copyPasteButton");
const limpiarBtn = document.querySelector(".limpiar");
const darkModeSwitch = document.getElementById('darkModeSwitch');

// Función para encriptar el texto
function encriptar(stringEncriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringEncriptada = stringEncriptada.toLowerCase();
    matrizCodigo.forEach(([char, code]) => {
        stringEncriptada = stringEncriptada.replaceAll(char, code);
    });
    return stringEncriptada;
}

// Función para desencriptar el texto
function desencriptar(stringDesencriptada) {
    let matrizCodigo = [["e", "enter"], ["i", "imes"], ["a", "ai"], ["o", "ober"], ["u", "ufat"]];
    stringDesencriptada = stringDesencriptada.toLowerCase();
    matrizCodigo.forEach(([char, code]) => {
        stringDesencriptada = stringDesencriptada.replaceAll(code, char);
    });
    return stringDesencriptada;
}

// Función para comprobar acentos, caracteres especiales y números
function comprobarTexto() {
    const textoUsuario = textArea.value;
    const regex = /[áéíóúÁÉÍÓÚñÑ`~!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?0-9]/;

    if (regex.test(textoUsuario)) {
        mensaje.style.backgroundImage = 'url("assets/mad-duck.gif")'; 
        mensaje.style.backgroundSize = "contain"; 
        mensaje.style.backgroundRepeat = "no-repeat";
        mensaje.style.backgroundPosition = "center";
        return false; 
    } else {
        mensaje.style.backgroundImage = "none"; 
        return true; 
    }
}

// Función botón para encriptar el texto
function botonEncriptar() {
    if (comprobarTexto()) {
        const textoEncriptado = encriptar(textArea.value);
        mensaje.value = textoEncriptado;
        textArea.value = ""; 
    }
}

// Función botón para desencriptar el texto
function botonDesencriptar() {
    if (comprobarTexto()) {
        const textoDesencriptado = desencriptar(textArea.value);
        mensaje.value = textoDesencriptado;
        textArea.value = ""; 
    }
}

// Función para copiar el texto
function copyText() {
    navigator.clipboard.writeText(mensaje.value)
        .then(() => {
            console.log('Texto copiado');
            copyPasteButton.textContent = 'Pegar'; 
            copyPasteButton.style.backgroundColor = 'white';
            copyPasteButton.style.color = 'black';
            copyPasteButton.removeEventListener('click', copyText); 
            copyPasteButton.addEventListener('click', pasteText); 
        })
        .catch(err => {
            console.error('Error al copiar: ', err);
        });
}

// Función para pegar el texto
function pasteText() {
    navigator.clipboard.readText()
        .then(text => {
            textArea.value = text;
            console.log('Texto pegado');
            copyPasteButton.textContent = 'Copiar'; 
            copyPasteButton.removeEventListener('click', pasteText); 
            copyPasteButton.addEventListener('click', copyText); 
        })
        .catch(err => {
            console.error('Error al pegar: ', err);
        });
}


// Función para limpiar los campos
function limpiarCampos() {
    textArea.value = ""; 
    mensaje.value = ""; 
    mensaje.style.backgroundImage = 'url("assets/duck-ducky.gif")'; 
}


// Función para aplicar el modo oscuro
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
}


// Conectar los botones con sus respectivas funciones
encriptarBtn.addEventListener('click', botonEncriptar);
desencriptarBtn.addEventListener('click', botonDesencriptar);
copyPasteButton.addEventListener('click', copyText);
limpiarBtn.addEventListener('click', limpiarCampos);
darkModeSwitch.addEventListener('change', toggleDarkMode);
