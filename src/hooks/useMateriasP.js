import { useEffect,  useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMateriasP,  addMateriasP} from '../store';

import { calendarApi } from '../api';






export const useMateriasP = () => {

    const {   materiasP  } = useSelector( state => state.materiaP );
    const {   users , userActive } = useSelector( state => state.user );

    
    const [materiasPE, setMateriasPE] = useState(materiasP.filter(element => element.usuario.rol == "STUDENT_ROLE"))
    const [materiasPM, setMateriasPM] = useState(materiasP.filter(element => element.usuario.rol == "TEACHER_ROLE"))
    const [materiasD, setMateriasD] = useState(materiasP?.filter(element => userActive?.materias.find((materia)=> materia.clave == element.clave)))


    useEffect(()=>{
        setMateriasPE(materiasP.filter(element => element.usuario.rol == "STUDENT_ROLE"))
        setMateriasPM(materiasP.filter(element => element.usuario.rol == "TEACHER_ROLE"))
        setMateriasD(materiasP.filter(element => userActive?.materias.find((materia)=> materia.clave == element.clave)))
        


    },[materiasP,  users])

    useEffect(()=>{
     console.log(users)
     
    },[users])

    const dispatch = useDispatch();


    const startgetMateriasP = async() => {
      
        try {
         
            const { data } = await calendarApi.get('/materiaPs');

             
            dispatch( getMateriasP(data.materias) );   
     
        } catch (error) {
            console.error(error)
        }
    }




    const startaddMateriaP = async( materiaP) => {
       

        try {
            const { data } = await calendarApi.post('/materiaPs',materiaP);
            dispatch(  addMateriasP(data) );   
       
        } catch (error) {
            console.error(error)
        }
    }

    const startUpdateMateriaP = async(materiaP) => {
        try {
            if(materiaP.tipo == "NO_TOMADA"){
                materiaP.tipo = 'POR_TOMAR';
                await calendarApi.put(`/materias/${ materiaP._id }`,materiaP);
                const { data } = await calendarApi.post(`/materiaPs`,materiaP);
                dispatch(  addMateriasP(data) );   

            }
            else if(materiaP.tipo == "POR_TOMAR" ){
                materiaP.tipo = "NO_TOMADA"
                const materiaPfilter = materiasP.find((element) => element.clave == materiaP.clave);
                 
                await calendarApi.put(`/materias/${ materiaP._id }`,materiaP);
                const { data } = await calendarApi.delete(`/materiaPs/${ materiaPfilter?._id }`); 
                dispatch(  deleteMateriaP(data) );   

            }
          

            
        
        } catch (error) {
            console.error(error)
        }
       
    }

    const startAprobarMateriaP = async(materiaP) => {
        try {
    
          let {_id,nombre, tipo} = materiaP;
          tipo = "APROVADA"
        
 
            await calendarApi.put(`/materiaPs/${ _id }`,{nombre, tipo});
            const { data } = await calendarApi.get('/materiaPs');

            
            dispatch( getMateriasP(data.materias) );   
            
          

            
        
        } catch (error) {
            console.error(error)
        }
       
    }


    const starRechazarMateriaP = async(materiaP) => {
        try {
    
          let {_id,nombre, tipo} = materiaP;
          tipo = "RECHAZADA"
        
 
            await calendarApi.put(`/materiaPs/${ _id }`,{nombre, tipo});
            const { data } = await calendarApi.get('/materiaPs');

            
            dispatch( getMateriasP(data.materias) );   
            
          

            
        
        } catch (error) {
            console.error(error)
        }
       
    }


    const startDeleteUser = async(id) => {
   
        try {
            await calendarApi.delete(`/usuarios/${ id }` );
            dispatch( deleteUser(id) );
        } catch (error) {
            console.error(error)
        }
    }



    return {
        //* Propiedades
        materiasP, 
        materiasPE,
        materiasPM,
        materiasD,
        
      

        //* Métodos
  
        startgetMateriasP,
        startaddMateriaP,
        startUpdateMateriaP,
        startDeleteUser,
        startAprobarMateriaP,
        starRechazarMateriaP
    }

}