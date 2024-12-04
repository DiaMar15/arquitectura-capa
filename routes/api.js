const express = require ('express');
const router = express.Router();

const controller = require ('../controllers/books')

//obtiene libros
router.get('/', controller.obtenerLibros)

//obtiene libro especifico por id
router.get('/:id', controller.obtenerLibro)

//crea libro
router.post('/', controller.crearLibro)

//actualiza libro
router.patch('/:id', controller.actualizarAtributoLibro)

//actualiza libro
router.put('/:id', controller.actualizarLibro)

//elimina libro
router.delete('/:id', controller.eliminarLibro)

//export routes
module.exports = router