import React, { useState } from 'react';

const enrolledSubjects = [
  { id: 1, name: 'Historia', code: 'HIS101' },
  { id: 2, name: 'Literatura', code: 'LIT102' },
  { id: 3, name: 'Biología', code: 'BIO103' },
  { id: 4, name: 'Matemáticas Avanzadas', code: 'MAT104' }
];

const RetiroComponent = () => {
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [withdrawAll, setWithdrawAll] = useState(false);

  const handleSelectSubject = (subject) => {
    setSelectedSubjects(prevState => [...prevState, subject]);
  };

  const handleDeselectSubject = (subject) => {
    setSelectedSubjects(prevState => prevState.filter(s => s.id !== subject.id));
  };

  const handleWithdrawAll = () => {
    setWithdrawAll(true);
    setSelectedSubjects(enrolledSubjects); // Selecciona todas las asignaturas si se retira todo el cuatrimestre
  };

  const handleWithdraw = () => {
    if (withdrawAll) {
      alert('Has retirado todo el cuatrimestre.');
    } else {
      alert(`Has retirado las siguientes asignaturas: ${selectedSubjects.map(s => s.name).join(', ')}`);
    }
    // Aquí podrías enviar los datos al servidor para procesar el retiro
  };

  return (
    <div>
      <h1>Retiro de Asignaturas</h1>
      <div>
        <button onClick={handleWithdrawAll}>Retirar Todo el Cuatrimestre</button>
      </div>
      <h2>O seleccionar asignaturas para retirar</h2>
      <ul>
        {enrolledSubjects.map(subject => (
          <li key={subject.id}>
            {subject.name}
            {selectedSubjects.some(s => s.id === subject.id) ? (
              <button onClick={() => handleDeselectSubject(subject)}>Cancelar Retiro</button>
            ) : (
              <button onClick={() => handleSelectSubject(subject)}>Retirar</button>
            )}
          </li>
        ))}
      </ul>
      {selectedSubjects.length > 0 && (
        <button onClick={handleWithdraw}>Confirmar Retiro</button>
      )}
    </div>
  );
};

export default RetiroComponent;