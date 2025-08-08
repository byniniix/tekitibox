// script.js
console.log("script.js loaded and executing.");

// Global variables for application state (simulated data)
let currentUser = null; // Represents the logged-in user object
let currentUserId = null; // ID of the logged-in user
let userProfileData = {}; // Profile data for the current user
let objects = [ // Sample objects for the feed
    { id: 'obj1', userId: 'userA', username: 'Emma', name: 'Camisa Blanca', exchangeFor: 'Pantalón, Cinturón, Lentes, Playera', location: 'Colonia Sur', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Camisa', status: 'Disponible' },
    { id: 'obj2', userId: 'userB', username: 'Tobias', name: 'Muñecas de Juguete', exchangeFor: 'Peluche, Juego de Mesa, Almohada', location: 'Colonia Tur', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Muñecas', status: 'Disponible' },
    { id: 'obj3', userId: 'userC', username: 'Támara', name: 'Audífonos', exchangeFor: 'Vestido, Pulseras, Collares', location: 'Colonia Medio Norte', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Audifonos', status: 'Disponible' },
    { id: 'obj4', userId: 'userD', username: 'Marco', name: 'Cinturones', exchangeFor: 'Playera, Pantalón, Perfume, Comida', location: 'Colonia Dolores', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Cinturones', status: 'Disponible' },
    { id: 'obj5', userId: 'userE', username: 'Emilio', name: 'Mochila', exchangeFor: 'Libretas, Plumas, Lápices, Cinturón', location: 'Colonia Sol', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Mochila', status: 'Disponible' },
    { id: 'obj6', userId: 'userF', username: 'Fabian', name: 'Libreta y Pluma', exchangeFor: 'Cinturón, Libro de Amor, Cartera, Funda de Celular', location: 'Colonia Oeste', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Libreta', status: 'Disponible' },
    { id: 'obj7', userId: 'userG', username: 'Melissa', name: 'Tacones', exchangeFor: 'Cosmetiquera, Galletas, Cobija, Escoba', location: 'Colonia Grecia', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Tacones', status: 'Disponible' },
    { id: 'obj8', userId: 'userH', username: 'William', name: 'Comida Enlatada', exchangeFor: 'Galletas, Mantel, Cobija, Jabón', location: 'Colonia Ola', imageUrl: 'https://placehold.co/300x200/A0C49D/FFFFFF?text=Comida', status: 'Disponible' },
];
let userObjects = []; // Objects posted by the current user
let blockedUsers = []; // List of blocked user IDs

// Simulated user accounts (for login/register)
const simulatedUsers = {}; // Stores {email: {password, username, phone, dob, privacySetting, locationSetting, notificationSettings, blockedUsers}}

// Navigation function
let currentPage = 'home';

function navigateTo(page) {
    currentPage = page;
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = ''; // Clear current content

    switch (page) {
        case 'home':
            renderHomePage();
            break;
        case 'about':
            renderAboutPage();
            break;
        case 'register':
            renderRegisterPage();
            break;
        case 'login':
            renderLoginPage();
            break;
        case 'profile':
            if (currentUser) {
                renderProfilePage();
            } else {
                renderLoginPage(); // Redirect to login if not authenticated
            }
            break;
        case 'feed':
            renderFeedPage();
            break;
        case 'map':
            renderMapPage();
            break;
        case 'settings':
            if (currentUser) {
                renderSettingsPage();
            } else {
                renderLoginPage(); // Redirect to login if not authenticated
            }
            break;
        default:
            renderHomePage();
    }
    updateAuthButtons(); // Update header buttons based on auth state
}

// Render Home Page
function renderHomePage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="flex flex-col md:flex-row items-center justify-between w-full">
            <div class="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                <h1 class="text-5xl font-extrabold text-gray-800 leading-tight mb-4 animate-fade-in-up">
                    Intercambia, vibra y <br /> comparte
                </h1>
                <p class="text-2xl text-gray-600 mb-6 animate-fade-in-up delay-100">
                    ¡Intercambia sin necesidad de dinero!
                </p>
                ${!currentUser ? `
                <button id="registerHomeBtn"
                    class="px-8 py-4 bg-orange-500 text-black text-xl font-bold rounded-full shadow-lg hover:bg-orange-600 transition duration-300 transform hover:scale-105 animate-fade-in-up delay-200">
                    Registrarme
                </button>
                ` : ''}
            </div>
            <div class="md:w-1/2 flex justify-center items-center">
                <img
                    src="C:/Users/HP Proo Book/OneDrive/Imágenes/Screenshots/Logo-v3.jpg"
                    alt="Logo de Tekiti Box"
                    class="w-full max-w-sm rounded-full border-4 border-red-500 shadow-4x2 animate-fade-in-right"
                />
            </div>
        </div>
    `;

    const registerHomeBtn = document.getElementById('registerHomeBtn');
    if (registerHomeBtn) {
        registerHomeBtn.addEventListener('click', () => navigateTo('register'));
    }
}

// Render About Page
function renderAboutPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="w-full text-gray-800">
            <h2 class="text-4xl font-bold mb-6 text-center text-green-700">Acerca de Nosotros - Tekiti Box</h2>
            <p class="mb-4 text-lg leading-relaxed">
                Tekiti Box nace con una idea simple pero poderosa: intercambiar en lugar de desechar. Somos una app que
                conecta a personas que quieren dar una nueva vida a sus objetos, sin usar dinero, solo con el valor del trueque
                y la colaboración entre usuarios.
            </p>
            <h3 class="text-3xl font-semibold mb-4 text-green-600">Nuestra misión</h3>
            <p class="mb-4 text-lg leading-relaxed">
                Queremos facilitar el intercambio de objetos de forma segura, respetuosa y gratuita. Creemos
                que muchas cosas aún tienen valor para alguien más, y con Tekiti Box, puedes encontrar ese
                alguien fácilmente.
            </p>
            <h3 class="text-3xl font-semibold mb-4 text-green-600">¿Por qué "Tekiti"?</h3>
            <p class="mb-4 text-lg leading-relaxed">
                La palabra "tekiti" viene del náhuatl y significa trabajo, esfuerzo o intercambio.
                Elegimos este nombre porque representa lo que buscamos: una comunidad
                que comparte, coopera y encuentra valor en lo que ya tiene.
            </p>
            <h3 class="text-3xl font-semibold mb-4 text-green-600">Lo que creemos</h3>
            <ul class="list-disc list-inside text-lg leading-relaxed space-y-2">
                <li>Reutilizar es cuidar el planeta</li>
                <li>Intercambiar es ayudar sin gastar</li>
                <li>Compartir es construir comunidad</li>
            </ul>
        </div>
    `;
}

// Render Register Page
function renderRegisterPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Registrarme</h2>
            <form id="registerForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="usernameRegister">
                        Usuario
                    </label>
                    <input type="text" id="usernameRegister" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="emailRegister">
                        Correo
                    </label>
                    <input type="email" id="emailRegister" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="phoneRegister">
                        Teléfono
                    </label>
                    <input type="tel" id="phoneRegister" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="dobRegister">
                        Día / Mes / Año
                    </label>
                    <input type="date" id="dobRegister" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordRegister">
                        Contraseña
                    </label>
                    <input type="password" id="passwordRegister" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="confirmPasswordRegister">
                        Confirmar contraseña
                    </label>
                    <input type="password" id="confirmPasswordRegister" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <p id="registerError" class="text-red-500 text-xs italic"></p>
                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-md">
                        Registrarme
                    </button>
                </div>
            </form>
        </div>
    `;
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

// Render Login Page
function renderLoginPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
            <h2 class="text-3xl font-bold mb-6 text-center text-gray-800">Iniciar Sesión</h2>
            <form id="loginForm" class="space-y-4">
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="emailLogin">
                        Correo/Usuario
                    </label>
                    <input type="text" id="emailLogin" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <div>
                    <label class="block text-gray-700 text-sm font-bold mb-2" for="passwordLogin">
                        Contraseña
                    </label>
                    <input type="password" id="passwordLogin" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 mb-3 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500" required>
                </div>
                <p id="loginError" class="text-red-500 text-xs italic"></p>
                <div class="flex items-center justify-between">
                    <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-md">
                        Iniciar Sesión
                    </button>
                    <a href="#" class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
                        ¿Olvidaste tu contraseña?
                    </a>
                </div>
            </form>
        </div>
    `;
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
}

// Render Profile Page
function renderProfilePage() {
    if (!currentUser) {
        renderLoginPage();
        return;
    }

    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="w-full text-gray-800 flex flex-col items-center">
            <div class="flex items-center space-x-4 mb-6">
                <img src="blob:https://i.pinimg.com/736x/0a/60/be/0a60be827ce3ee04c4c0c00055975f7f.jpg" alt="User Avatar" class="rounded-full w-24 h-24 shadow-lg">
                <div>
                    <h2 class="text-3xl font-bold">${userProfileData.username || 'Usuario'}</h2>
                    <p class="text-lg text-gray-600">ID: ${currentUserId}</p>
                </div>
            </div>
            <button id="editProfileBtn" class="px-6 py-3 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md mb-6">Editar Perfil</button>

            <h3 class="text-2xl font-semibold mb-4 text-green-700">Mis Publicaciones</h3>
            <div id="userObjectsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                <!-- User objects will be loaded here -->
            </div>
            <button id="addObjectProfileBtn" class="mt-6 px-6 py-3 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition duration-300 shadow-md">
                + Subir Objeto
            </button>
        </div>

        <!-- Edit Profile Modal -->
        <div id="editProfileModal" class="modal">
            <div class="modal-content">
                <span class="close-button" id="closeEditProfileModalBtn">&times;</span>
                <h2 class="text-2xl font-bold mb-4 text-gray-800">Editar Perfil</h2>
                <form id="editProfileForm" class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="usernameInput">Nombre de Usuario</label>
                        <input type="text" id="usernameInput" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="emailInput">Correo</label>
                        <input type="email" id="emailInput" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="phoneInput">Número</label>
                        <input type="tel" id="phoneInput" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="dobInput">Fecha de Nacimiento</label>
                        <input type="date" id="dobInput" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>
                    <p id="profileMessage" class="text-sm mt-2 text-center"></p>
                    <button type="submit" class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full focus:outline-none focus:shadow-outline transition duration-300 shadow-md">Aceptar</button>
                </form>
            </div>
        </div>
    `;

    // Attach event listeners for profile page elements
    const editProfileBtn = document.getElementById('editProfileBtn');
    if (editProfileBtn) editProfileBtn.addEventListener('click', () => openModal('editProfileModal'));

    const addObjectProfileBtn = document.getElementById('addObjectProfileBtn');
    if (addObjectProfileBtn) addObjectProfileBtn.addEventListener('click', openObjectModal);

    const closeEditProfileModalBtn = document.getElementById('closeEditProfileModalBtn');
    if (closeEditProfileModalBtn) closeEditProfileModalBtn.addEventListener('click', () => closeModal('editProfileModal'));

    const editProfileForm = document.getElementById('editProfileForm');
    if (editProfileForm) {
        editProfileForm.addEventListener('submit', handleUpdateProfile);
    }

    // Populate current user data from userProfileData
    const usernameInput = document.getElementById('usernameInput');
    if (usernameInput) usernameInput.value = userProfileData.username || '';
    const emailInput = document.getElementById('emailInput');
    if (emailInput) emailInput.value = userProfileData.email || '';
    const phoneInput = document.getElementById('phoneInput');
    if (phoneInput) phoneInput.value = userProfileData.phone || '';
    const dobInput = document.getElementById('dobInput');
    if (dobInput) dobInput.value = userProfileData.dob || '';

    renderUserObjects();
}

// Render Feed Page
function renderFeedPage() {
    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="w-full text-gray-800">
            <h2 class="text-3xl font-bold mb-6 text-center text-green-700">Explorar Publicaciones</h2>
            <div id="objectsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <!-- Objects will be loaded here -->
            </div>
        </div>
    `;
    renderObjectsGrid();
}

// Render Map Page (Placeholder)

function renderMapPage() {
    const appContent = document.getElementById('app-content');
    if (appContent) {
        appContent.innerHTML = `
            <div class="w-full flex flex-col items-center">
                <h2 class="text-3xl font-bold mb-6 text-gray-800">Mapa de Ubicaciones</h2>
                <div id="full-page-map" class="w-full h-[400px] rounded-2xl shadow-xl border border-gray-300"></div>
            </div>
        `;
    }
    setTimeout(initializeFullPageMap, 200);
}

function initializeFullPageMap() {
    const mapContainerId = 'full-page-map';
    const mapContainer = document.getElementById(mapContainerId);

    if (!mapContainer || mapContainer.offsetWidth === 0 || mapContainer.offsetHeight === 0) {
        setTimeout(initializeFullPageMap, 200);
        return;
    }

    mapboxgl.accessToken = 'pk.eyJ1Ijoic290dG9mdyIsImEiOiJjbWR0ZHFta2cxMGR2MmtvY2JqaXd4Yzl1In0.GlH1h8ucHyL2DQEoj3qwfg';

    const map = new mapboxgl.Map({
        container: mapContainerId,
        style: 'mapbox://styles/mapbox/satellite-streets-v12',
        center: [-100.4551, 25.6726],
        zoom: 13
    });

    map.on('load', () => {
        // Cargar icono de flecha
        map.loadImage(
            'https://cdn-icons-png.flaticon.com/512/32/32195.png',
            function(error, image) {
                if (error) throw error;
                if (!map.hasImage('arrow-icon')) {
                    map.addImage('arrow-icon', image);
                }

                // Generar GeoJSON dinámico desde el array objects
                const locationCoords = {
                    'Colonia Sur': [-100.4551, 25.6726],
                    'Colonia Tur': [-100.4600, 25.6750],
                    'Colonia Medio Norte': [-100.4700, 25.6800],
                    'Colonia Dolores': [-100.4500, 25.6700],
                    'Colonia Sol': [-100.4480, 25.6680],
                    'Colonia Oeste': [-100.4650, 25.6650],
                    'Colonia Grecia': [-100.4600, 25.6600],
                    'Colonia Ola': [-100.4550, 25.6620]
                };

                const features = objects.map(obj => ({
                    type: 'Feature',
                    properties: {
                        nombre: obj.name,
                        usuario: obj.username,
                        estado: obj.status,
                        intercambio: obj.exchangeFor,
                        ubicacion: obj.location,
                        imageUrl: obj.imageUrl,
                        id: obj.id
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: locationCoords[obj.location] || [-100.4551, 25.6726]
                    }
                }));

                const geojson = {
                    type: 'FeatureCollection',
                    features: features
                };

                map.addSource('objetos', {
                    type: 'geojson',
                    data: geojson
                });

                map.addLayer({
                    id: 'objetos-arrow-layer',
                    type: 'symbol',
                    source: 'objetos',
                    layout: {
                        'icon-image': 'arrow-icon',
                        'icon-size': 0.08,
                        'icon-allow-overlap': true,
                        'icon-anchor': 'bottom',
                        'text-field': ['get', 'nombre'],
                        'text-font': ['Open Sans Bold'],
                        'text-offset': [0, 1.5],
                        'text-anchor': 'top',
                        'text-size': 12
                    },
                    paint: {
                        'text-color': '#ff0000',
                        'text-halo-color': '#ffffff',
                        'text-halo-width': 2
                    }
                });

                // Interactividad: popup al hacer clic en marcador
                map.on('click', 'objetos-arrow-layer', function(e) {
                    const feature = e.features[0];
                    const props = feature.properties;
                    const coordinates = feature.geometry.coordinates.slice();

                    // Popup HTML
                    const popupHtml = `
                        <div style="min-width:220px">
                            <img src="${props.imageUrl}" alt="${props.nombre}" style="width:100%;border-radius:8px;margin-bottom:8px;">
                            <strong>${props.nombre}</strong><br>
                            <span style="font-size:14px;">Por: ${props.usuario}</span><br>
                            <span style="font-size:14px;">Estado: <span style="color:green">${props.estado}</span></span><br>
                            <span style="font-size:14px;">Intercambio por: ${props.intercambio}</span><br>
                            <span style="font-size:14px;">Ubicación: ${props.ubicacion}</span><br>
                            <button style="margin-top:8px;padding:6px 16px;background:#f87171;color:white;border:none;border-radius:6px;cursor:pointer;" onclick="alert('Reservar objeto: ${props.nombre}')">Reservar</button>
                        </div>
                    `;

                    new mapboxgl.Popup()
                        .setLngLat(coordinates)
                        .setHTML(popupHtml)
                        .addTo(map);
                });

                // Cambia el cursor al pasar sobre los marcadores
                map.on('mouseenter', 'objetos-arrow-layer', function() {
                    map.getCanvas().style.cursor = 'pointer';
                });
                map.on('mouseleave', 'objetos-arrow-layer', function() {
                    map.getCanvas().style.cursor = '';
                });
            }
        );
    });
}


// Render Settings Page
function renderSettingsPage() {
    if (!currentUser) {
        renderLoginPage();
        return;
    }

    const appContent = document.getElementById('app-content');
    appContent.innerHTML = `
        <div class="w-full max-w-2xl text-gray-800">
            <h2 class="text-3xl font-bold mb-6 text-center text-green-700">Configuración</h2>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-blue-700">Cuenta</h3>
                <div class="space-y-3">
                    <p class="text-lg"><strong>Correo:</strong> <span id="displayEmail">${userProfileData.email || 'N/A'}</span></p>
                    <p class="text-lg"><strong>Contraseña:</strong> <button id="changePasswordSettingsBtn" class="text-blue-500 hover:underline">Cambiar contraseña</button></p>
                    <p class="text-lg"><strong>Fecha de Nacimiento:</strong> <span id="displayDob">${userProfileData.dob || 'N/A'}</span></p>
                    <p class="text-lg"><strong>Número:</strong> <span id="displayPhone">${userProfileData.phone || 'N/A'}</span></p>
                    <button id="logoutBtn" class="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 shadow-md mt-4">Cerrar Sesión</button>
                    <button id="deleteAccountBtn" class="px-5 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition duration-300 shadow-md mt-4 ml-2">Eliminar cuenta</button>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-blue-700">Privacidad</h3>
                <div class="space-y-4">
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Visibilidad del perfil</label>
                        <select id="privacySetting" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="public">Público: cualquier usuario puede ver tu perfil e intercambios.</option>
                            <option value="registered">Solo usuarios registrados: solo quienes tienen cuenta en la app pueden ver tus publicaciones.</option>
                            <option value="private">Privado: solo personas con las que has iniciado un intercambio pueden ver tu perfil.</option>
                        </select>
                    </div>
                    <div>
                        <label class="block text-gray-700 text-sm font-bold mb-2">Ubicación</label>
                        <select id="locationSetting" class="shadow appearance-none border rounded-xl w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="approximate">Mostrar ubicación aproximada (ej. colonia o ciudad).</option>
                            <option value="hidden">Ocultar ubicación por completo.</option>
                            <option value="exchangeOnly">Mostrar ubicación exacta solo durante un intercambio acordado.</option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6 mb-6">
                <h3 class="text-xl font-semibold mb-4 text-blue-700">Notificaciones</h3>
                <div class="space-y-3">
                    <label class="flex items-center">
                        <input type="checkbox" id="newProposalsNotif" class="form-checkbox h-5 w-5 text-green-600">
                        <span class="ml-2 text-gray-700">Propuestas nuevas</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" id="messagesNotif" class="form-checkbox h-5 w-5 text-green-600">
                        <span class="ml-2 text-gray-700">Mensajes</span>
                    </label>
                    <label class="flex items-center">
                        <input type="checkbox" id="nearbyExchangesNotif" class="form-checkbox h-5 w-5 text-green-600">
                        <span class="ml-2 text-gray-700">Intercambios cercanos</span>
                    </label>
                </div>
            </div>

            <div class="bg-white rounded-xl shadow-md p-6">
                <h3 class="text-xl font-semibold mb-4 text-blue-700">Seguridad de la Cuenta</h3>
                <div class="space-y-3">
                    <button id="openBlockedUsersBtn" class="px-5 py-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition duration-300 shadow-md">Bloqueados</button>
                    <button id="openReportSettingsBtn" class="px-5 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition duration-300 shadow-md">Reportar publicaciones</button>
                </div>
            </div>
        </div>
    `;
    // Populate current user data for settings from userProfileData
    const privacySetting = document.getElementById('privacySetting');
    if (privacySetting) privacySetting.value = userProfileData.privacySetting || 'public';
    privacySetting.addEventListener('change', (e) => updatePrivacySetting(e.target.value));

    const locationSetting = document.getElementById('locationSetting');
    if (locationSetting) locationSetting.value = userProfileData.locationSetting || 'approximate';
    locationSetting.addEventListener('change', (e) => updateLocationSetting(e.target.value));

    const newProposalsNotif = document.getElementById('newProposalsNotif');
    const messagesNotif = document.getElementById('messagesNotif');
    const nearbyExchangesNotif = document.getElementById('nearbyExchangesNotif');

    if (userProfileData.notificationSettings) {
        if (newProposalsNotif) {
            newProposalsNotif.checked = userProfileData.notificationSettings.newProposals;
            newProposalsNotif.addEventListener('change', (e) => updateNotificationSetting('newProposals', e.target.checked));
        }
        if (messagesNotif) {
            messagesNotif.checked = userProfileData.notificationSettings.messages;
            messagesNotif.addEventListener('change', (e) => updateNotificationSetting('messages', e.target.checked));
        }
        if (nearbyExchangesNotif) {
            nearbyExchangesNotif.checked = userProfileData.notificationSettings.nearbyExchanges;
            nearbyExchangesNotif.addEventListener('change', (e) => updateNotificationSetting('nearbyExchanges', e.target.checked));
        }
    }

    // Attach event listeners for settings page buttons
    const changePasswordSettingsBtn = document.getElementById('changePasswordSettingsBtn');
    if (changePasswordSettingsBtn) changePasswordSettingsBtn.addEventListener('click', openChangePasswordModal);

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

    const deleteAccountBtn = document.getElementById('deleteAccountBtn');
    if (deleteAccountBtn) deleteAccountBtn.addEventListener('click', deleteAccount);

    const openBlockedUsersBtn = document.getElementById('openBlockedUsersBtn');
    if (openBlockedUsersBtn) openBlockedUsersBtn.addEventListener('click', openBlockedUsersModal);

    const openReportSettingsBtn = document.getElementById('openReportSettingsBtn');
    if (openReportSettingsBtn) openReportSettingsBtn.addEventListener('click', openReportModal);
}

// --- Authentication Simulation Functions ---
function generateUniqueId() {
    return '_' + Math.random().toString(36).substr(2, 9);
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('usernameRegister').value;
    const email = document.getElementById('emailRegister').value;
    const phone = document.getElementById('phoneRegister').value;
    const dob = document.getElementById('dobRegister').value;
    const password = document.getElementById('passwordRegister').value;
    const confirmPassword = document.getElementById('confirmPasswordRegister').value;
    const registerErrorElement = document.getElementById('registerError');

    if (password !== confirmPassword) {
        registerErrorElement.textContent = 'Las contraseñas no coinciden.';
        return;
    }
    if (simulatedUsers[email]) {
        registerErrorElement.textContent = 'Este correo ya está registrado.';
        return;
    }

    const newUserId = generateUniqueId();
    simulatedUsers[email] = {
        id: newUserId,
        username: username,
        email: email,
        password: password, // In a real app, never store plain passwords!
        phone: phone,
        dob: dob,
        privacySetting: 'public',
        locationSetting: 'approximate',
        notificationSettings: {
            newProposals: true,
            messages: true,
            nearbyExchanges: true,
        },
        blockedUsers: [],
        userObjects: [] // Initialize user's objects
    };
    registerErrorElement.textContent = '';
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    navigateTo('login');
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('emailLogin').value;
    const password = document.getElementById('passwordLogin').value;
    const loginErrorElement = document.getElementById('loginError');

    const userAccount = simulatedUsers[email];
    if (userAccount && userAccount.password === password) {
        currentUser = {
            uid: userAccount.id,
            displayName: userAccount.username,
            email: userAccount.email
        };
        currentUserId = userAccount.id;
        userProfileData = { ...userAccount }; // Copy profile data
        userObjects = [...userAccount.userObjects]; // Copy user's objects
        blockedUsers = [...userAccount.blockedUsers]; // Copy blocked users
        loginErrorElement.textContent = '';
        navigateTo('home');
    } else {
        loginErrorElement.textContent = 'Correo o contraseña incorrectos.';
    }
}

function handleLogout() {
    currentUser = null;
    currentUserId = null;
    userProfileData = {};
    userObjects = [];
    blockedUsers = [];
    navigateTo('home');
}

function handleUpdateProfile(event) {
    event.preventDefault();
    if (!currentUser) return;

    const username = document.getElementById('usernameInput').value;
    const email = document.getElementById('emailInput').value;
    const phone = document.getElementById('phoneInput').value;
    const dob = document.getElementById('dobInput').value;
    const profileMessageElement = document.getElementById('profileMessage');

    // Update simulated user data
    simulatedUsers[currentUser.email].username = username;
    simulatedUsers[currentUser.email].email = email;
    simulatedUsers[currentUser.email].phone = phone;
    simulatedUsers[currentUser.email].dob = dob;

    // Update current user and profile data in memory
    currentUser.displayName = username;
    currentUser.email = email;
    userProfileData.username = username;
    userProfileData.email = email;
    userProfileData.phone = phone;
    userProfileData.dob = dob;

    profileMessageElement.textContent = 'Perfil actualizado exitosamente.';
    closeModal('editProfileModal');
    updateAuthButtons(); // Update header to reflect new username if changed
}

function handleChangePassword(event) {
    event.preventDefault();
    if (!currentUser) return;

    const currentPasswordInput = document.getElementById('currentPassword').value;
    const newPasswordInput = document.getElementById('newPassword').value;
    const passwordChangeMessageElement = document.getElementById('passwordChangeMessage');

    if (simulatedUsers[currentUser.email].password === currentPasswordInput) {
        simulatedUsers[currentUser.email].password = newPasswordInput;
        passwordChangeMessageElement.textContent = 'Contraseña actualizada exitosamente.';
        document.getElementById('currentPassword').value = '';
        document.getElementById('newPassword').value = '';
        closeModal('changePasswordModal');
    } else {
        passwordChangeMessageElement.textContent = 'Contraseña actual incorrecta.';
    }
}

function deleteAccount() {
    if (!currentUser) return;

    const confirmDelete = confirm('¿Estás seguro de que quieres eliminar tu cuenta? Esta acción es irreversible.');
    if (confirmDelete) {
        delete simulatedUsers[currentUser.email]; // Remove from simulated users
        currentUser = null;
        currentUserId = null;
        userProfileData = {};
        userObjects = [];
        blockedUsers = [];
        alert('Cuenta eliminada exitosamente.');
        navigateTo('home');
    }
}

// --- Object Management Functions (Simulated) ---
function handleAddObject(event) {
    event.preventDefault();
    if (!currentUser) return;

    const newObjectName = document.getElementById('newObjectName').value;
    const newObjectExchange = document.getElementById('newObjectExchange').value;
    const newObjectLocation = document.getElementById('newObjectLocation').value;
    const newObjectImage = document.getElementById('newObjectImage').value;

    const newObjectId = generateUniqueId();
    const newObject = {
        id: newObjectId,
        userId: currentUserId,
        username: currentUser.displayName || userProfileData.username || 'Anónimo',
        name: newObjectName,
        exchangeFor: newObjectExchange,
        location: newObjectLocation,
        imageUrl: newObjectImage || `https://placehold.co/300x200/A0C49D/FFFFFF?text=${newObjectName.substring(0, 10)}`,
        status: 'Disponible',
        timestamp: new Date().toISOString(),
    };

    objects.push(newObject); // Add to public objects
    userObjects.push(newObject); // Add to user's objects
    simulatedUsers[currentUser.email].userObjects.push(newObject); // Update simulated user's data

    document.getElementById('newObjectName').value = '';
    document.getElementById('newObjectExchange').value = '';
    document.getElementById('newObjectLocation').value = '';
    document.getElementById('newObjectImage').value = '';
    closeModal('objectModal');
    renderFeedPage(); // Refresh feed
    renderUserObjects(); // Refresh user's objects if on profile page
}

function handleDeleteObject(objectId) {
    if (!currentUser) return;

    // Remove from global objects array
    objects = objects.filter(obj => obj.id !== objectId);
    // Remove from user's objects array
    userObjects = userObjects.filter(obj => obj.id !== objectId);
    // Update simulated user's data
    simulatedUsers[currentUser.email].userObjects = simulatedUsers[currentUser.email].userObjects.filter(obj => obj.id !== objectId);

    renderFeedPage(); // Refresh feed
    renderUserObjects(); // Refresh user's objects
}

function handleUpdateObjectStatus(objectId, newStatus) {
    if (!currentUser) return;

    // Update in global objects array
    const objIndex = objects.findIndex(obj => obj.id === objectId);
    if (objIndex !== -1) {
        objects[objIndex].status = newStatus;
    }

    // Update in user's objects array
    const userObjIndex = userObjects.findIndex(obj => obj.id === objectId);
    if (userObjIndex !== -1) {
        userObjects[userObjIndex].status = newStatus;
    }

    // Update simulated user's data
    const simulatedUserObjIndex = simulatedUsers[currentUser.email].userObjects.findIndex(obj => obj.id === objectId);
    if (simulatedUserObjIndex !== -1) {
        simulatedUsers[currentUser.email].userObjects[simulatedUserObjIndex].status = newStatus;
    }

    renderFeedPage(); // Refresh feed
    renderUserObjects(); // Refresh user's objects
}

// --- Settings Management Functions (Simulated) ---
function updatePrivacySetting(value) {
    if (!currentUser) return;
    userProfileData.privacySetting = value;
    simulatedUsers[currentUser.email].privacySetting = value;
    alert('Configuración de privacidad actualizada.');
}

function updateLocationSetting(value) {
    if (!currentUser) return;
    userProfileData.locationSetting = value;
    simulatedUsers[currentUser.email].locationSetting = value;
    alert('Configuración de ubicación actualizada.');
}

function updateNotificationSetting(type, checked) {
    if (!currentUser) return;
    userProfileData.notificationSettings[type] = checked;
    simulatedUsers[currentUser.email].notificationSettings[type] = checked;
    alert('Configuración de notificaciones actualizada.');
}

function handleBlockUser() {
    if (!currentUser) return;
    const blockUserIdInput = document.getElementById('blockUserIdInput').value;
    if (!blockUserIdInput) return;

    if (!blockedUsers.includes(blockUserIdInput)) {
        blockedUsers.push(blockUserIdInput);
        userProfileData.blockedUsers = blockedUsers; // Update local profile data
        simulatedUsers[currentUser.email].blockedUsers = blockedUsers; // Update simulated user's data
        document.getElementById('blockUserIdInput').value = '';
        alert('Usuario bloqueado exitosamente.');
        renderBlockedUsersList(); // Re-render the list
        renderObjectsGrid(); // Re-render feed to hide blocked users' objects
    } else {
        alert('Este usuario ya está bloqueado.');
    }
}

function handleReportPublication(event) {
    event.preventDefault();
    if (!currentUser || !selectedObject) return;
    const reportReason = document.getElementById('reportReason').value;

    console.log(`Reporte de publicación: Objeto ID: ${selectedObject.id}, Razón: ${reportReason}, Reportado por: ${currentUser.email}`);
    document.getElementById('reportReason').value = '';
    closeModal('reportModal');
    alert('Publicación reportada exitosamente (simulado).');
}

// --- UI Rendering Helpers ---
function updateAuthButtons() {
    const authButtonsDiv = document.getElementById('auth-buttons');
    if (authButtonsDiv) { // Ensure the element exists
        if (currentUser) {
            authButtonsDiv.innerHTML = `
                <button id="navProfile" class="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-md">Perfil</button>
                <button id="navFeed" class="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 shadow-md">Explorar</button>
                <button id="navMap" class="px-5 py-2 bg-yellow-600 text-white rounded-full hover:bg-yellow-700 transition duration-300 shadow-md">Mapa</button>
                <button id="navSettings" class="px-5 py-2 bg-gray-600 text-white rounded-full hover:bg-gray-700 transition duration-300 shadow-md">Configuración</button>
                <button id="navLogout" class="px-5 py-2 bg-red-600 text-white rounded-full hover:bg-red-700 transition duration-300 shadow-md">Cerrar Sesión</button>
            `;
            // Attach event listeners for newly created buttons
            document.getElementById('navProfile').addEventListener('click', () => navigateTo('profile'));
            document.getElementById('navFeed').addEventListener('click', () => navigateTo('feed'));
            document.getElementById('navMap').addEventListener('click', () => navigateTo('map'));
            document.getElementById('navSettings').addEventListener('click', () => navigateTo('settings'));
            document.getElementById('navLogout').addEventListener('click', handleLogout);
        } else {
            authButtonsDiv.innerHTML = `
                <button id="navLogin" class="px-5 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition duration-300 shadow-md">Iniciar Sesión</button>
                <button id="navRegister" class="px-5 py-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition duration-300 shadow-md">Registrarme</button>
            `;
            // Attach event listeners for newly created buttons
            document.getElementById('navLogin').addEventListener('click', () => navigateTo('login'));
            document.getElementById('navRegister').addEventListener('click', () => navigateTo('register'));
        }
    }
}

function renderObjectsGrid() {
    const objectsGrid = document.getElementById('objectsGrid');
    if (!objectsGrid) return; // Ensure the element exists

    objectsGrid.innerHTML = ''; // Clear existing objects

    objects.forEach(obj => {
        // Filter out objects from blocked users
        if (blockedUsers.includes(obj.userId)) {
            return;
        }

        const objectCard = document.createElement('div');
        objectCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300 cursor-pointer';
        objectCard.innerHTML = `
            <img src="${obj.imageUrl}" alt="${obj.name}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/300x200/A0C49D/FFFFFF?text=${obj.name.substring(0, 10)}';">
            <div class="p-4">
                <h4 class="text-xl font-bold text-gray-800">${obj.name}</h4>
                <p class="text-black text-sm mb-2">Por: ${obj.username}</p>
                <p class="text-sm font-semibold mt-2 ${obj.status === 'Disponible' ? 'text-green-600' : obj.status === 'En Espera' ? 'text-yellow-600' : 'text-red-600'}">
                    Estado: ${obj.status}
                </p>
                <p class="text-black text-sm mb-2">Intercambio por: ${obj.exchangeFor}</p>
                <p class="text-black text-xs">Ubicación: ${obj.location}</p>
            </div>
        `;
        // Use addEventListener for click to ensure function is ready
        objectCard.addEventListener('click', () => openObjectDetailsModal(obj));
        objectsGrid.appendChild(objectCard);
    });
}

function renderUserObjects() {
    const userObjectsGrid = document.getElementById('userObjectsGrid');
    if (!userObjectsGrid) return;

    userObjectsGrid.innerHTML = ''; // Clear existing user objects

    if (userObjects.length === 0) {
        userObjectsGrid.innerHTML = '<p class="text-center text-gray-600 col-span-full">Aún no has publicado ningún objeto. ¡Anímate a subir el primero!</p>';
        return;
    }

    userObjects.forEach(obj => {
        const userObjectCard = document.createElement('div');
        userObjectCard.className = 'bg-white rounded-xl shadow-lg overflow-hidden';
        userObjectCard.innerHTML = `
            <img src="${obj.imageUrl}" alt="${obj.name}" class="w-full h-48 object-cover" onerror="this.onerror=null;this.src='https://placehold.co/300x200/A0C49D/FFFFFF?text=${obj.name.substring(0, 10)}';">
            <div class="p-4">
                <h4 class="text-xl font-bold text-gray-800">${obj.name}</h4>
                <p class="text-gray-600 text-sm mb-2">Intercambio por: ${obj.exchangeFor}</p>
                <p class="text-gray-500 text-xs">Ubicación: ${obj.location}</p>
                <p class="text-sm font-semibold mt-2 ${obj.status === 'Disponible' ? 'text-green-600' : obj.status === 'En Espera' ? 'text-yellow-600' : 'text-red-600'}">
                    Estado: ${obj.status}
                </p>
                <div class="mt-4 flex justify-between gap-2">
                    <select id="statusSelect-${obj.id}" class="flex-grow p-2 border rounded-md">
                        <option value="Disponible" ${obj.status === 'Disponible' ? 'selected' : ''}>Disponible</option>
                        <option value="En Espera" ${obj.status === 'En Espera' ? 'selected' : ''}>En Espera</option>
                        <option value="Intercambiado" ${obj.status === 'Intercambiado' ? 'selected' : ''}>Intercambiado</option>
                    </select>
                    <button id="deleteBtn-${obj.id}" class="p-2 bg-red-500 text-white rounded-md hover:bg-red-600">Eliminar</button>
                </div>
            </div>
        `;
        userObjectsGrid.appendChild(userObjectCard);

        // Attach event listeners for dynamically created elements
        const statusSelect = document.getElementById(`statusSelect-${obj.id}`);
        if (statusSelect) {
            statusSelect.addEventListener('change', (e) => handleUpdateObjectStatus(obj.id, e.target.value));
        }
        const deleteBtn = document.getElementById(`deleteBtn-${obj.id}`);
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => handleDeleteObject(obj.id));
        }
    });
}

function renderBlockedUsersList() {
    const blockedUsersList = document.getElementById('blockedUsersList');
    if (!blockedUsersList) return;

    blockedUsersList.innerHTML = '';
    if (blockedUsers.length === 0) {
        blockedUsersList.innerHTML = '<p class="text-gray-600">No hay usuarios bloqueados.</p>';
        return;
    }
    blockedUsers.forEach(id => {
        const listItem = document.createElement('li');
        listItem.textContent = id;
        blockedUsersList.appendChild(listItem);
    });
}

// --- Modal Functions ---
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'flex';
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) modal.style.display = 'none';
}

function openObjectModal() {
    openModal('objectModal');
}

function openObjectDetailsModal(obj) {
    const objectDetailsContent = document.getElementById('objectDetailsContent');
    if (objectDetailsContent) {
        objectDetailsContent.innerHTML = `
            <img src="${obj.imageUrl}" alt="${obj.name}" class="rounded-xl shadow-md w-full mb-4">
            <h3 class="text-3xl font-bold mb-2">${obj.name}</h3>
            <p class="text-lg text-gray-700 mb-2">Por: ${obj.username}</p>
            <p class="text-lg text-gray-700 mb-2">Quiere a cambio: ${obj.exchangeFor}</p>
            <p class="text-lg text-gray-700 mb-4">Ubicación: ${obj.location}</p>
            <button id="viewLocationBtn" class="px-5 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition duration-300 shadow-md">Ver ubicación en el mapa</button>
        `;
    }
    openModal('objectDetailsModal');

    // Attach event listener for the new button
    const viewLocationBtn = document.getElementById('viewLocationBtn');
    if (viewLocationBtn) {
        viewLocationBtn.addEventListener('click', () => {
            closeModal('objectDetailsModal');
            openLocationModal(obj.location);
        });
    }

    // Attach event listener for report button
    const reportPublicationBtn = document.getElementById('reportPublicationBtn');
    if (reportPublicationBtn) {
        reportPublicationBtn.addEventListener('click', () => {
            closeModal('objectDetailsModal');
            openReportModal();
        });
    }
}
function openLocationModal(location) {
    const locationDetailsContent = document.getElementById('locationDetailsContent');
    if (locationDetailsContent) {
        // Limpia el contenido anterior
        locationDetailsContent.innerHTML = `
            <h3 class="text-2xl font-bold mb-4 text-gray-800">Ubicación de Intercambio</h3>
            <p class="text-lg text-gray-700 mb-4">${location}</p>
            <div id="modal-map" style="width:100%;height:300px;border-radius:12px;box-shadow:0 2px 8px #0002;"></div>
        `;

        // Inicializa el mapa solo cuando el modal está abierto
        setTimeout(() => {
            mapboxgl.accessToken = 'pk.eyJ1Ijoic290dG9mdyIsImEiOiJjbWR0ZHFta2cxMGR2MmtvY2JqaXd4Yzl1In0.GlH1h8ucHyL2DQEoj3qwfg';
            const map = new mapboxgl.Map({
                container: 'modal-map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-100.465, 25.689], // Puedes adaptar la ubicación según el objeto
                zoom: 13
            });
            // Puedes agregar marcadores aquí si lo deseas
        }, 100);
    }
    openModal('locationModal');
}

function openHelpModal() {
    openModal('helpModal');
}

function openPolicyModal() {
    openModal('policyModal');
}

function openInfoModal() {
    openModal('infoModal');
}

function openReportModal() {
    closeModal('objectDetailsModal'); // Close object details if open
    openModal('reportModal');
}

function openBlockedUsersModal() {
    renderBlockedUsersList(); // Populate the list before opening
    openModal('blockedUsersModal');
}

function openChangePasswordModal() {
    openModal('changePasswordModal');
}

// Event Listeners for Modals (attached once DOM is ready)
document.addEventListener('DOMContentLoaded', () => {
    // Header navigation buttons
    document.getElementById('navHome').addEventListener('click', () => navigateTo('home'));
    document.getElementById('navAbout').addEventListener('click', () => navigateTo('about'));

    // Modal close buttons
    document.getElementById('closeObjectModalBtn').addEventListener('click', () => closeModal('objectModal'));
    document.getElementById('closeObjectDetailsModalBtn').addEventListener('click', () => closeModal('objectDetailsModal'));
    document.getElementById('closeReportModalBtn').addEventListener('click', () => closeModal('reportModal'));
    document.getElementById('closeLocationModalBtn').addEventListener('click', () => closeModal('locationModal'));
    document.getElementById('closeHelpModalBtn').addEventListener('click', () => closeModal('helpModal'));
    document.getElementById('closePolicyModalBtn').addEventListener('click', () => closeModal('policyModal'));
    document.getElementById('closeInfoModalBtn').addEventListener('click', () => closeModal('infoModal'));
    document.getElementById('closeBlockedUsersModalBtn').addEventListener('click', () => closeModal('blockedUsersModal'));
    document.getElementById('closeChangePasswordModalBtn').addEventListener('click', () => closeModal('changePasswordModal'));

    // Form submissions
    const addObjectForm = document.getElementById('addObjectForm');
    if (addObjectForm) addObjectForm.addEventListener('submit', handleAddObject);

    const reportForm = document.getElementById('reportForm');
    if (reportForm) reportForm.addEventListener('submit', handleReportPublication);

    const changePasswordForm = document.getElementById('changePasswordForm');
    if (changePasswordForm) changePasswordForm.addEventListener('submit', handleChangePassword);

    // Specific buttons that appear on certain pages (handled by render functions)
    // reportPublicationBtn is in objectDetailsModal, handled when modal content is set
    // blockUserBtn is in blockedUsersModal, handled when modal content is set
});


// Initial page load
window.onload = () => {
    // 👇 Agregar dinámicamente el logo al header
    const headerTitle = document.querySelector("header .text-4xl");

    if (headerTitle) {
        const logoImg = document.createElement("img");
        logoImg.src = ""; // asegúrate de que esta imagen exista
        logoImg.alt = "";
        logoImg.className = "h-16 mr-4";

        const wrapper = document.createElement("div");
        wrapper.className = "flex items-center mb-4 md:mb-0";

        const parent = headerTitle.parentNode;
        parent.replaceChild(wrapper, headerTitle);
        wrapper.appendChild(logoImg);
        wrapper.appendChild(headerTitle);
    }

    navigateTo('home'); // ya existente
};

// Make functions globally accessible for onclick attributes (fallback/debugging)
// This is less critical now that addEventListener is used, but kept for robustness.
window.navigateTo = navigateTo;
window.openModal = openModal;
window.closeModal = closeModal;
window.openObjectModal = openObjectModal;
window.openObjectDetailsModal = openObjectDetailsModal;
window.openLocationModal = openLocationModal;
window.openHelpModal = openHelpModal;
window.openPolicyModal = openPolicyModal;
window.openInfoModal = openInfoModal;
window.openReportModal = openReportModal;
window.openBlockedUsersModal = openBlockedUsersModal;
window.openChangePasswordModal = openChangePasswordModal;
window.handleDeleteObject = handleDeleteObject;
window.handleUpdateObjectStatus = handleUpdateObjectStatus;
window.updatePrivacySetting = updatePrivacySetting;
window.updateLocationSetting = updateLocationSetting;
window.updateNotificationSetting = updateNotificationSetting;
window.handleBlockUser = handleBlockUser;
window.handleReportPublication = handleReportPublication;
window.handleLogout = handleLogout;
window.deleteAccount = deleteAccount;
