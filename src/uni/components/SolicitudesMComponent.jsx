import React, { useState, useEffect } from 'react';
import {useMateriasP} from '../../hooks'

import './solicitudesM.css';

const availableSubjects = [
  { id: 1, name: 'Matemáticas', code: 'MAT101' },
  { id: 2, name: 'Física', code: 'PHY101' },
  { id: 3, name: 'Química', code: 'CHE101' },
  { id: 4, name: 'Biología', code: 'BIO101' },
  { id: 5, name: 'Historia', code: 'HIS101' }
];

/*const {materiasD} = useMateriasP()*/

const SolicitudesMComponent = () => {
  const [requestedSubjects, setRequestedSubjects] = useState([]);



 /* useEffect(()=>{
    console.log(materiasD)
  },[materiasD]);*/




  const addSubject = (subject) => {
    setRequestedSubjects([...requestedSubjects, subject]);
  };

  const removeSubject = (subjectId) => {
    setRequestedSubjects(requestedSubjects.filter(subject => subject.id !== subjectId));
  };

  return (
    <div className="subject-request-container">
      <h1>Solicitud de Asignaturas</h1>
      <div className="tables-container">
        <div className="table-wrapper">
          <h2>Materias Disponibles</h2>
          <table >
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {availableSubjects.map(subject => (
                <tr key={subject.id}>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>
                    <button onClick={() => addSubject(subject)}>Agregar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="table-wrapper">
          <h2>Materias Solicitadas</h2>
          <table >
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {requestedSubjects.map(subject => (
                <tr key={subject.id}>
                  <td>{subject.code}</td>
                  <td>{subject.name}</td>
                  <td>
                    <button onClick={() => removeSubject(subject.id)}>Eliminar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SolicitudesMComponent;