import axios from 'axios';

/**
 * Añade una ciudad a la lista
 * 
 * @param {string} name 
 */
function addCityNode(name) {
    const citiesUl = document.getElementById('cities');

    // Crea y añade un nuevo elemento en la lista
    const item = document.createElement('li');
    item.className = 'list-group-item';
    item.appendChild(document.createTextNode(name));

    // Crea y añade el botón X para eliminar la ciudad
    const button = document.createElement('button');
    button.className = 'btn-close'
    button.onclick = function() {
        removeCity(name);
        item.remove();
    };
    item.appendChild(button);

    citiesUl.appendChild(item);
};

/**
 * Llama al backend para obtener la lista de ciudades
 */
window.readCities = function() {
    axios.get('http://localhost:8080/cities')
        .then((response) => {
            const cityList = response.data;

            // Se recorre toda la lista y se añade cada ciudad como un elemento de la lista
            Object.keys(cityList).forEach(cityName => {
                addCityNode(cityName);
            });
        });
};

/**
 * Añade una ciudad a la lista
 */
window.addCity = function() {
    // Recoge los datos del formulario
    const name = document.getElementById('name').value;
    const altitude = document.getElementById('altitude').value;
    const population = document.getElementById('population').value;

    // Valida los datos
    if (name === '') {
        alert('El nombre es un campo obligatorio');
        return;
    }

    // Invoca al backend con los datos recogidos del formulario
    axios.post('http://localhost:8080/cities', {
        name: name,
        altitude: altitude,
        population: population
    }).then(() => {
        addCityNode(name);
    });
};

/**
 * TODO Eliminar una ciudad
 * 
 * @param {string} name 
 */
window.removeCity = function(name) {
    console.log(name + ' was removed');
    // TODO Remove the city
};