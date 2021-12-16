import React, { useReducer } from 'react';
import tareaContext from './tareaContext';
import tareaReducer from './tareaReducer';
//import uuid from 'uuid'
//import { v4 as uuidv4 } from 'uuid';

import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    VALIDAR_TAREA,
    ELIMINAR_TAREA,
    //ESTADO_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA,
    LIMPIAR_TAREA
} from '../../types';

import clienteAxios from '../../config/axios';

const TareaState = props =>{

    //crear el state inicial
    const initialState = {
       // tareas: [
           // {id: 1, nombre: 'Elegir Nicho', estado: true, proyectoId:1},
           // {id: 2, nombre: 'Elegir Estrategia', estado: false, proyectoId:2},
           // {id: 3, nombre: 'Elegir Nombre', estado: false, proyectoId:3},
           // {id: 4, nombre: 'Elegir Dominio y Hosting', estado: true, proyectoId:3},
           // {id: 5, nombre: 'Comprar pizza', estado: true, proyectoId:1},
           // {id: 6, nombre: 'Pagar servico', estado: false, proyectoId:2},
           // {id: 7, nombre: 'Sacar pasajes', estado: false, proyectoId:1},
           // {id: 8, nombre: 'Sacar la basura', estado: true, proyectoId:2},
            //{id: 9, nombre: 'Hacer aseo', estado: true, proyectoId:1},
            //{id: 10, nombre: 'Hacer cotizacion', estado: false, proyectoId:3},
           // {id: 11, nombre: 'Comprar zapatos', estado: false, proyectoId:3},
         //   {id: 12, nombre: 'Pagar en la tienda', estado: true, proyectoId:1}
       // ],
        tareasproyecto: [],
        errortarea:false,
        tareaseleccionada: null
    }

    //crear el state y dispatch
    const [state, dispatch] = useReducer(tareaReducer, initialState);

    //crear las funciones

    //obtener las tareas de un proyeco
    const obtenerTareas = async proyecto =>{

        console.log(proyecto);
        try {
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}});
            console.log(resultado);
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            });
        } catch (error) {
            console.log(error);
        }
    }

    //AGREGAR TAREA AL PROYECTO SELECCIONADO
    const aregarTarea = async tarea =>{
       // tarea.id = uuidv4();
       console.log(tarea);
        try {
            const resultado = await clienteAxios.post('/api/tareas', tarea);
            console.log(resultado);
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch (error) {
            console.log(error);
        }
    }

    //validar tarea
    const validarTarea = () =>{
        dispatch({
            type: VALIDAR_TAREA
        })
    }

    //Elimianr tarea por id
    const eliminarTarea = async (id, proyecto) =>{
        try {
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch (error) {
            console.log(error);
        }
    }

    const actualizarTarea = async tarea =>{

       try {
           const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea);

           dispatch({
            type: ACTUALIZAR_TAREA,
            payload: resultado.data.tarea
        })
       } catch (error) {
           console.log(error);
       }
    }

    //cambiar estado de la tarea
 //   const cambiarEstadoTarea = tarea =>{
       // dispatch({
         //   type: ESTADO_TAREA,
       //     payload: tarea
     //   })
   // }

    //Extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }

    const limpiarTarea = () =>{
        dispatch({
            type: LIMPIAR_TAREA
        })
    }

    return (
        <tareaContext.Provider
            value={{
                tareasproyecto: state.tareasproyecto,
                errortarea: state.errortarea,
                tareaseleccionada: state.tareaseleccionada,
                obtenerTareas,
                aregarTarea,
                validarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea,
                limpiarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )

}

export default TareaState;