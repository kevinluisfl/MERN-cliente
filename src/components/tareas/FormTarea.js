import React, {useContext, useState, useEffect} from 'react';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';


const FormTarea = () => {

        //Extraer si un proyecto esta activo
        const proyectosContext = useContext(proyectoContext);
        const {proyecto} = proyectosContext;

        //obtener la funcion del context de tarea
        const tareasContext = useContext(tareaContext);
        const {tareaseleccionada, errortarea, aregarTarea, validarTarea, obtenerTareas,
            actualizarTarea, limpiarTarea} = tareasContext;

        //Effect que detecta si hay una tarea seleccionada
        useEffect(()=>{
            if(tareaseleccionada !== null){
                guardarTarea(tareaseleccionada)
            } else {
                guardarTarea({
                    nombre: ''
                })
            }
        }, [tareaseleccionada]);

        //state del formulario
        const [tarea, guardarTarea] = useState({
            nombre:''
        })

        //extraer el nombre del proyecto
        const {nombre} = tarea;

        //si no hay proyectos seleccionados
        if(!proyecto) return null;

        //array destructuring para extraer el proyecto actual
        const [proyectoActual] = proyecto;

        //leer los valores del fomrulario
        const handleChange = e =>{
            guardarTarea({
                ...tarea,
                [e.target.name]: e.target.value
            })
        }

        const onSubmit = e =>{
            e.preventDefault();

            //validar
            if(nombre.trim() === '') {
                validarTarea();
                return;
            }

            //si es edicion o si es nueva tarea
            if(tareaseleccionada === null){
            //agregar nueva tarea al state de tarea
            //tarea.estado = false;
            tarea.proyecto = proyectoActual._id;
            aregarTarea(tarea);
            } else{
                //actualizar tarea seleccionada
                actualizarTarea(tarea);
                //limpia el form de tareaseleccionada
                limpiarTarea();
            }

            //agregar nueva tarea al state de tarea
            //tarea.estado = false;
            //tarea.proyectoId = proyectoActual.id;

            //ESTO ERA LO QUE PONIA LA TAREA DOS VECES
           // tarea.proyecto = proyectoActual._id;
            //aregarTarea(tarea);

            //obtener y filtrar las tareas nuevamente
            obtenerTareas(proyectoActual.id);

            //reiniciar el form
            guardarTarea({
                nombre:''
            });
        }

    return (
        <div className="formulario">
            <form
                onSubmit={onSubmit}
            >
                <div className="contenedor-input">
                    <input
                    type="text"
                    className="input-text"
                    placeholder="Nombre Tarea..."
                    name="nombre"
                    value={nombre}
                    onChange={handleChange}
                    />
                </div>

                <div className="contenedor-input">
                        <input
                        type="submit"
                        className="btn btn-primario btn-submit btn-block"
                        value={tareaseleccionada ?
                        'Editar Tarea'
                        : 'Agregar Tarea'}
                        />
                </div>
            </form>
            {errortarea ?
            <p className="mensaje error">El nombre de la tarea es requerido</p>
            : null}
        </div>
     );
}

export default FormTarea;