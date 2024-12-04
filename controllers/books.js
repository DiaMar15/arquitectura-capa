const Libro = require('../models/libro');
const Genero = require('../models/genero');

//obtiene libros
async function obtenerLibros(req, res) {
    try {
        const libros = await Libro.findAll({
            include: [{
                model: Genero,
                as: 'Genero',
                attributes: ['nombre']
            }]
        });
        res.json(libros);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).send('Error al obtener los libros');
    }
}
//obtiene libro especifico por id
async function obtenerLibro(req, res) {
    const { id } = req.params;

    try {
        const libro = await Libro.findByPk(id, {
            include: {
                model: Genero,
                attributes: ['nombre']
            }
        });

        if (!libro) {
            return res.status(404).send('Libro no encontrado');
        }

        res.json(libro);
    } catch (error) {
        res.status(500).send('Error al obtener el libro');
    }
}
//crea libro
async function crearLibro(req, res) {
    const { titulo, autor, anio_publicacion, id_genero } = req.body;

    if (!titulo || !autor || !anio_publicacion || !id_genero) {
        return res.status(400).json({ message: 'Faltan datos necesarios' });
    }

    try {
        const nuevoLibro = await Libro.create({
            titulo,
            autor,
            anio_publicacion,
            id_genero,
        });

        res.status(201).json({
            message: 'Libro creado',
            libroId: nuevoLibro.id
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el libro' });
    }
}
//actualiza libro
async function actualizarAtributoLibro(req, res) {
    const { id } = req.params;
    const { titulo, autor, anio_publicacion, id_genero } = req.body;

    try {
        const libro = await Libro.findByPk(id);
        if (!libro) {
            return res.status(404).json({ message: 'Libro no encontrado' });
        }

        if (titulo) libro.titulo = titulo;
        if (autor) libro.autor = autor;
        if (anio_publicacion) libro.anio_publicacion = anio_publicacion;
        if (id_genero) libro.id_genero = id_genero;

        await libro.save();
        res.json({ message: 'Libro actualizado parcialmente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al actualizar el libro' });
    }

}
//actualiza libro
async function actualizarLibro(req, res) {
    const { id } = req.params;
    const { titulo, autor, anio_publicacion, id_genero } = req.body;

    try {
        const libro = await Libro.findByPk(id);
        if (!libro) {
            return res.status(404).send('Libro no encontrado');
        }

        libro.titulo = titulo;
        libro.autor = autor;
        libro.anio_publicacion = anio_publicacion;
        libro.id_genero = id_genero;

        await libro.save();
        res.send({ message: 'Libro actualizado correctamente' });
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).send('Error al actualizar el libro');
    }
}
//elimina libro
async function eliminarLibro(req, res) {
    const { id } = req.params;

    try {
        const libro = await Libro.findByPk(id);
        if (!libro) {
            return res.status(404).json({ message: `Libro con ID ${id} no encontrado` });
        }

        await libro.destroy();
        res.status(200).json({ message: `Libro con ID ${id} eliminado` });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el libro' });
    }
}

//Export
module.exports = {
    obtenerLibros,
    obtenerLibro,
    crearLibro,
    actualizarAtributoLibro,
    actualizarLibro,
    eliminarLibro
}