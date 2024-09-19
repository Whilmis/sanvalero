import React, { useState } from 'react';

const initialUsers = [
  { id: 1, name: 'Carlos López', email: 'carlos.lopez@example.com', role: 'Estudiante', password: 'password123' },
  { id: 2, name: 'Laura Torres', email: 'laura.torres@example.com', role: 'Maestro', password: 'password123' },
  { id: 3, name: 'José Rodríguez', email: 'jose.rodriguez@example.com', role: 'Administrador', password: 'password123' }
];

const AdminUserComponent = () => {
  const [users, setUsers] = useState(initialUsers);
  const [editingUser, setEditingUser] = useState(null);

  const startEditing = (user) => {
    setEditingUser({ ...user });
  };

  const cancelEditing = () => {
    setEditingUser(null);
  };

  const updateUser = () => {
    setUsers(users.map(user => 
      user.id === editingUser.id ? editingUser : user
    ));
    setEditingUser(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditingUser({
      ...editingUser,
      [name]: value
    });
  };

  return (
    <div>
      <h1>Administración de Usuarios</h1>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Correo Electrónico</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => startEditing(user)}>Editar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="edit-form">
          <h2>Editar Usuario</h2>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={editingUser.name}
              onChange={handleChange}
            />
          </label>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={editingUser.email}
              onChange={handleChange}
            />
          </label>
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={editingUser.password}
              onChange={handleChange}
            />
          </label>
          <label>
            Rol:
            <select
              name="role"
              value={editingUser.role}
              onChange={handleChange}
            >
              <option value="Estudiante">Estudiante</option>
              <option value="Maestro">Maestro</option>
              <option value="Administrador">Administrador</option>
            </select>
          </label>
          <div className="buttons">
            <button onClick={updateUser}>Guardar</button>
            <button onClick={cancelEditing}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserComponent;