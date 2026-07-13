const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({
        nombre: 'Portafolio de Servicios en Node.js',
        mensaje: 'Servidor funcionando correctamente',
        estado: 'activo',
    });
});

router.get('/event-loop', (req, res) => {
    console.log('1. Inicia la solicitud a /event-loop');

    setTimeout(() => {
        console.log(
            '4. Finaliza la tarea asíncrona después de 2 segundos'
        );
    }, 2000);

    Promise.resolve().then(() => {
        console.log('3. Se ejecuta la microtarea de la Promise');
    });

    console.log('2. Node.js continúa sin bloquear el servidor');

    res.status(200).json({
        mensaje: 'Demostración del Event Loop ejecutada correctamente',
        explicacion:
            'La respuesta se envía sin esperar a que termine setTimeout, lo que demuestra el comportamiento asíncrono y no bloqueante de Node.js.',
    });
});

module.exports = router;