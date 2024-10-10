import { useDispatch, useSelector } from 'react-redux';
import { getUserActive, getUsers, deleteUser} from '../store';
import { calendarApi } from '../api';





export const useUserStore = () => {

    const {   users , userActive } = useSelector( state => state.user );
    const dispatch = useDispatch();

    const startUserActive = async(user) => {
       
        try {

            dispatch( getUserActive(user) );
            
        } catch (error) {
           console.error(error)
  
      
        }
    }

    const startgetUsers = async() => {
      
        try {
         
            const { data } = await calendarApi.get('/usuarios');

            
            dispatch( getUsers(data.usuarios) );   
     
        } catch (error) {
            console.error(error)
        }
    }


    const startaddUser = async({ email, password }) => {
       

        try {
            const { data } = await calendarApi.post('/usuarios',{correo: email, password });
            dispatch( getUsers(data) );   
       
        } catch (error) {
            console.error(error)
        }
    }

    const startUpdateUser = async({uid ,nombre, email, password, rol }) => {
        try {
            await calendarApi.put(`/usuarios/${ uid }`,{nombre, email, password , rol });
            const { data } = await calendarApi.get('/usuarios');

            
            dispatch( getUsers(data.usuarios) );   
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
        users, 
        userActive, 

        //* Métodos
  
        startUserActive,
        startgetUsers,
        startaddUser,
        startUpdateUser,
        startDeleteUser
    }

}