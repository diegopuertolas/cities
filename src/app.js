// BACKEND

const express = require('express');
 
const app = express();
app.use(express.json());

const cities = {
    'Zaragoza': {
        altitude: 199,
        population: 673010
    },
    'Huesca': {
        altitude: 488,
        population: 53305
    },
    'Teruel': {
        altitude: 915,
        population: 25900
    },
};

// Nota: req = request (lo que envía el cliente), res = response (lo que responde el servidor).
 
app.get('/cities', (req, res) => {
    res.json(cities);
});
 
app.get('/cities/:city', (req, res) => {
    const city = req.params.city;
    res.json(cities[city]);
});

// Definimos una ruta POST en la URL /cities/
app.post('/cities/', (req, res) => {
    
    // Extraemos los valores enviados en el cuerpo de la petición (JSON)
    const name = req.body.name; // Obtenemos el nombre de la ciudad.
    const altitudeValue = req.body.altitude; // Obtenemos el valor de la altitud.
    const populationValue = req.body.population; // Obtenemos el valor de la población.

    // Guardamos la ciudad en el objeto "cities", usando el nombre como clave.
    // Ejemplo: cities["Madrid"] = { altitude: 667, population: 3223000 }
    cities[name] = {
        altitude: altitudeValue,
        population: populationValue
    };

    // Mostramos en la consola del servidor cómo va quedando el objeto "cities".
    console.log(cities);

    // Respondemos al cliente con un estado HTTP 201 (Created).
    // Esto significa que el recurso (la ciudad) se creó con éxito.
    res.status(201).end();
});

// Definimos una ruta PUT en la URL /cities/
app.put('/cities/', (req, res) => {

    // Obtenemos el nombre de la ciudad desde la URL.
    const name = req.params.name;
    // Datos de altitud y población que llegan desde el cuerpo.
    const {altitude, population} = req.body;

    // Comprobamos si la ciudad existe.
    if (!cities[name]) {
        
        // Si la ciudad NO existe, respondemos con un 404 (Not found).
        res.status(404).end();
    
    } else {

        // Actualizamos los datos segun los nuevos valores.
        cities[name].altitude = altitude;
        cities[name].population = population;

        // Respondemos con 200 (OK).
        res.status(200).end();
    }
})
 
// Definimos una ruta POST en la URL /cities/
app.delete('/cities/', (req, res) => {

     // Obtenemos el nombre de la ciudad desde la URL.
    const name = req.params.name; 

    // Comprobamos si la ciudad que hemos obtenido existe en el objeto.
    if (cities[name]) {

        // Si la ciudad existe en el objeto, la eliminamos
        delete cities[name];

        // Mostramos el nuevo estado del objeto cities
        console.log(cities);

        // Respondemos con 200 (OK)
        res.status(200).end();

    } else {

        // Si la ciudad no existe, devolvemos un error 404 (Not Found)
        res.status(404).end();
    }
});
 
app.listen(8080, () => {
    console.log('Iniciando el backend en el puerto 8080');
});