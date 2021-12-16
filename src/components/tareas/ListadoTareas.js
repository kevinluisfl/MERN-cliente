import React, {Fragment, useContext} from 'react';
import Tarea from './Tarea';
import proyectoContext from '../../context/proyectos/proyectoContext';
import tareaContext from '../../context/tareas/tareaContext';
import {CSSTransition, TransitionGroup} from 'react-transition-group'

const ListadoTareas = () => {

    //Extraer proyectos de state inicial
    const proyectosContext = useContext(proyectoContext);
    const {proyecto, eliminarProyecto} = proyectosContext;

    //obtener la funcion del context de tarea
    const tareasContext = useContext(tareaContext);
    const {tareasproyecto} = tareasContext;

    //si no hay proyectos seleccionados
    if(!proyecto) return <h2>Seleccione un proyecto</h2>;

    //array destructuring para extraer el proyecto actual
    const [proyectoActual] = proyecto;

    //Eliminar un proyecto
    const onClickEliminar = () =>{
        eliminarProyecto(proyectoActual._id)
    }

    return (
        <Fragment>
            <h2>Proyecto: {proyectoActual.nombre}</h2>

            <ul className="listado-tareas">
                {tareasproyecto.length === 0
                    ?(<li className="tarea"><p>No hay tareas</p></li>)
                    :<TransitionGroup>
                     {tareasproyecto.map(tarea =>(
                        <CSSTransition
                            key={tarea.id}
                            timeout={200}
                            classNames="tarea"
                        >
                            <Tarea
                                tarea={tarea}
                            />
                        </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={onClickEliminar}
            >Eliminar proyecto &times;</button>
        </Fragment>
     );
}

export default ListadoTareas;