import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Não precisamos mais do CSS específico, pois usaremos o padrão do index.css
// import './css/OrdensServicoPage.css';

function OrdensServicoPage({ ordens, setOrdens }) {
  // Estado para controlar o modo de edição
  const [editandoId, setEditandoId] = useState(null);

  // Estados individuais para cada campo do formulário (resolve o bug)
  const [cliente, setCliente] = useState('');
  const [veiculo, setVeiculo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [status, setStatus] = useState('Em Andamento');

  const handleSalvar = (e) => {
    e.preventDefault();
    if (!cliente || !veiculo || !descricao) {
      alert("Preencha todos os campos obrigatórios!");
      return;
    }

    if (editandoId !== null) {
      // Lógica para EDITAR uma ordem existente
      setOrdens(
        ordens.map((o) =>
          o.id === editandoId
            ? { ...o, cliente, veiculo, descricao, status }
            : o
        )
      );
      alert(`Ordem de Serviço ID ${editandoId} atualizada!`);
    } else {
      // Lógica para ADICIONAR uma nova ordem
      const novoId = ordens.length > 0 ? Math.max(...ordens.map((o) => o.id)) + 1 : 1;
      setOrdens([
        ...ordens,
        { id: novoId, cliente, veiculo, descricao, status },
      ]);
      alert('Nova Ordem de Serviço adicionada!');
    }

    // Limpa o formulário e sai do modo de edição
    setEditandoId(null);
    setCliente('');
    setVeiculo('');
    setDescricao('');
    setStatus('Em Andamento');
  };

  const handleEditar = (ordem) => {
    // Preenche o formulário com os dados da ordem a ser editada
    setEditandoId(ordem.id);
    setCliente(ordem.cliente);
    setVeiculo(ordem.veiculo);
    setDescricao(ordem.descricao);
    setStatus(ordem.status);
  };
  
  const handleCancelarEdicao = () => {
    // Limpa o formulário e sai do modo de edição
    setEditandoId(null);
    setCliente('');
    setVeiculo('');
    setDescricao('');
    setStatus('Em Andamento');
  };

  const handleExcluir = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta Ordem de Serviço?')) {
      setOrdens(ordens.filter((o) => o.id !== id));
      alert(`Ordem de Serviço ID ${id} excluída!`);
    }
  };

  return (
    <div>
      <h1>Gerenciamento de Ordens de Serviço</h1>
      <Link to="/dashboard">Voltar para o Dashboard</Link>

      <h2>{editandoId !== null ? 'Editar Ordem de Serviço' : 'Adicionar Nova Ordem'}</h2>
      <form onSubmit={handleSalvar}>
        <div>
          <label>Cliente:</label>
          <input type="text" value={cliente} onChange={(e) => setCliente(e.target.value)} placeholder="Nome do Cliente" />
        </div>
        <div>
          <label>Veículo:</label>
          <input type="text" value={veiculo} onChange={(e) => setVeiculo(e.target.value)} placeholder="Modelo e Placa do Veículo" />
        </div>
        <div>
          <label>Descrição do Serviço:</label>
          <input type="text" value={descricao} onChange={(e) => setDescricao(e.target.value)} placeholder="Ex: Troca de óleo e filtro" />
        </div>
        <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Em Andamento">Em Andamento</option>
                <option value="Concluída">Concluída</option>
                <option value="Cancelada">Cancelada</option>
            </select>
        </div>
        <button type="submit">{editandoId !== null ? 'Salvar Alterações' : 'Adicionar Ordem'}</button>
        {editandoId !== null && <button type="button" className="secondary" onClick={handleCancelarEdicao}>Cancelar Edição</button>}
      </form>

      <h2>Lista de Ordens de Serviço</h2>
      {ordens.length === 0 ? <p>Nenhuma ordem de serviço cadastrada.</p> : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Cliente</th>
              <th>Veículo</th>
              <th>Descrição</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {ordens.map((ordem) => (
              <tr key={ordem.id}>
                <td>{ordem.id}</td>
                <td>{ordem.cliente}</td>
                <td>{ordem.veiculo}</td>
                <td>{ordem.descricao}</td>
                <td>{ordem.status}</td>
                <td>
                  <button onClick={() => handleEditar(ordem)}>Editar</button>
                  <button className="danger" onClick={() => handleExcluir(ordem.id)}>Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrdensServicoPage;