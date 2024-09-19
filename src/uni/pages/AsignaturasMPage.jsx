
import { Link } from "react-router-dom";
import { NavbarM } from '../components/NavbarM';
import AdministrarMComponent from "../components/AdministrarMComponent";





export const AsignaturasMPage = () => {
 


  return (
    <>
    <NavbarM active='Administrar' />
    <Link to={'/publicar/calificaciones'}>Publicar calificaciones</Link>
    <h3>Seleccionar asignatura para trabajar</h3>

    <AdministrarMComponent />



    
    </>
  )
}