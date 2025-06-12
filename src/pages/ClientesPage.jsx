
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function ClientesPage({ clientes, setClientes }) {

  const [nomeCliente, setNomeCliente] = useState('');
  const [telefoneCliente, setTelefoneCliente] = useState('');
  const [veiculoCliente, setVeiculoCliente] = useState('');
  
  const [editandoId, setEditandoId] = useState(null);


  const handleSalvarCliente = (e) => {
    e.preventDefault();
    if (!nomeCliente || !telefoneCliente || !veiculoCliente) {
        alert("Preencha todos os campos!");
        return;
    }

    if (editandoId !== null) {
        setClientes(clientes.map(c => 
            c.id === editandoId 
            ? { ...c, nome: nomeCliente, telefone: telefoneCliente, veiculo: veiculoCliente } 
            : c
        ));
        alert(`Cliente ID ${editandoId} atualizado (simulado)!`);
    } else {
        const novoId = clientes.length > 0 ? Math.max(...clientes.map(c => c.id)) + 1 : 1;
        setClientes([...clientes, { id: novoId, nome: nomeCliente, telefone: telefoneCliente, veiculo: veiculoCliente }]);
        alert('Novo cliente adicionado (simulado)!');
    }
    setNomeCliente('');
    setTelefoneCliente('');
    setVeiculoCliente('');
    setEditandoId(null);
  };

  const handleEditarCliente = (cliente) => {
    setEditandoId(cliente.id);
    setNomeCliente(cliente.nome);
    setTelefoneCliente(cliente.telefone);
    setVeiculoCliente(cliente.veiculo);
  };

  const handleExcluirCliente = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente (simulado)?')) {
      setClientes(clientes.filter(c => c.id !== id));
      alert(`Cliente ID ${id} excluído (simulado)!`);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Clientes</h1>
      <Link to="/dashboard">Voltar para o Dashboard</Link>

      <h2>{editandoId !== null ? 'Editar Cliente' : 'Adicionar Novo Cliente'}</h2>
      <form onSubmit={handleSalvarCliente}>
        <div>
            <label>Nome: </label>
            <input type="text" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} placeholder="Nome do Cliente"/>
        </div>
        <div>
            <label>Telefone: </label>
            <input type="text" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} placeholder="Telefone"/>
        </div>
        <div>
            <label>Veículo (Modelo - Placa): </label>
            <input type="text" value={veiculoCliente} onChange={(e) => setVeiculoCliente(e.target.value)} placeholder="Ex: Fiat Uno - XYZ-7890"/>
        </div>
        <button type="submit">{editandoId !== null ? 'Salvar Alterações' : 'Adicionar Cliente'}</button>
        {editandoId !== null && <button type="button" onClick={() => { setEditandoId(null); setNomeCliente(''); setTelefoneCliente(''); setVeiculoCliente('');}}>Cancelar Edição</button>}
      </form>

      <h2>Lista de Clientes</h2>
      {clientes.length === 0 ? <p>Nenhum cliente cadastrado.</p> : (
        <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Telefone</th>
              <th>Veículo</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {clientes.map(cliente => (
              <tr key={cliente.id}>
                <td>{cliente.id}</td>
                <td>{cliente.nome}</td>
                <td>{cliente.telefone}</td>
                <td>{cliente.veiculo}</td>
                <td>
                  <button onClick={() => handleEditarCliente(cliente)}>Editar</button>
                  <button onClick={() => handleExcluirCliente(cliente.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default ClientesPage;