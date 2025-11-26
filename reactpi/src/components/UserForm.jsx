import { useState, useEffect } from 'react';

const UserForm = ({ onSubmit, selectedUser, clearForm }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedUser) {
      setName(selectedUser.name);
      setEmail(selectedUser.email);
    }
  }, [selectedUser]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email) return;
    onSubmit({ name, email, id: selectedUser?.id });
    setName('');
    setEmail('');
    clearForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{selectedUser ? 'Editar Usuário' : 'Cadastrar Usuário'}</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{selectedUser ? 'Atualizar' : 'Cadastrar'}</button>
    </form>
  );
};

export default UserForm;
