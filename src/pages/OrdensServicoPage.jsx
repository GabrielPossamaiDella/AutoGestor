import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './css/OrdensServicoPage.css';

function OrdensServicoPage() {
  const [ordens, setOrdens] = useState([
    { id: 1, cliente: 'XPTO', veiculo: 'ABC-1234', descricao: 'Troca de óleo', status: 'Em Andamento' },
    { id: 2, cliente: 'YZ', veiculo: 'QWE-5678', descricao: 'Reparo no motor', status: 'Concluída' },
  ]);

  const [formAberto, setFormAberto] = useState(false);

  const [formDados, setFormDados] = useState({
    id: null,
    cliente: '',
    veiculo: '',
    descricao: '',
    status: 'Em Andamento',
  });

  function abrirFormularioNovo() {
    setFormDados({
      id: null,
      cliente: '',
      veiculo: '',
      descricao: '',
      status: 'Em Andamento',
    });
    setFormAberto(true);
  }

  function abrirFormularioEditar(os) {
    setFormDados(os);
    setFormAberto(true);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormDados(prev => ({
      ...prev,
      [name]: value,
    }));
  }

  function salvarOrdem(e) {
    e.preventDefault();

    if (formDados.id === null) {
      const novaOrdem = {
        ...formDados,
        id: ordens.length ? Math.max(...ordens.map(o => o.id)) + 1 : 1,
      };
      setOrdens([...ordens, novaOrdem]);
    } else {
      setOrdens(ordens.map(o => (o.id === formDados.id ? formDados : o)));
    }

    setFormAberto(false);
  }

  function excluirOrdem(id) {
    if (window.confirm('Tem certeza que quer excluir essa ordem?')) {
      setOrdens(ordens.filter(o => o.id !== id));
    }
  }

  return (
    <div className="container">
      <h1 className="titulo">Gerenciamento de Ordens de Serviço</h1>
      <p>Aqui você poderá cadastrar, listar, editar e excluir ordens de serviço.</p>
      <Link to="/dashboard" className="link">Voltar para o Dashboard</Link>

      <button onClick={abrirFormularioNovo} className="botao-principal">
        Adicionar Nova Ordem de Serviço
      </button>

      {formAberto && (
        <form onSubmit={salvarOrdem} className="formulario">
          <h3>{formDados.id === null ? 'Nova Ordem de Serviço' : `Editar Ordem de Serviço #${formDados.id}`}</h3>

          <label className="label" htmlFor="cliente">Cliente:</label>
          <input
            id="cliente"
            type="text"
            name="cliente"
            value={formDados.cliente}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label" htmlFor="veiculo">Veículo:</label>
          <input
            id="veiculo"
            type="text"
            name="veiculo"
            value={formDados.veiculo}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label" htmlFor="descricao">Descrição:</label>
          <input
            id="descricao"
            type="text"
            name="descricao"
            value={formDados.descricao}
            onChange={handleChange}
            required
            className="input"
          />

          <label className="label" htmlFor="status">Status:</label>
          <select
            id="status"
            name="status"
            value={formDados.status}
            onChange={handleChange}
            required
            className="select"
          >
            <option value="Em Andamento">Em Andamento</option>
            <option value="Concluída">Concluída</option>
            <option value="Cancelada">Cancelada</option>
          </select>

          <div className="botoes-formulario">
            <button type="submit" className="botao-salvar">Salvar</button>
            <button type="button" onClick={() => setFormAberto(false)} className="botao-cancelar">Cancelar</button>
          </div>
        </form>
      )}

      <h2>Lista de Ordens de Serviço</h2>
      <ul className="lista">
        {ordens.map(os => (
          <li key={os.id} className="item-lista">
            <span>
              OS {os.id} (Cliente {os.cliente}, Veículo {os.veiculo}, Descrição: {os.descricao}, Status: {os.status})
            </span>
            <div className="botoes-lista">
              <button onClick={() => abrirFormularioEditar(os)} className="botao-editar">Editar</button>
              <button onClick={() => excluirOrdem(os.id)} className="botao-excluir">Excluir</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default OrdensServicoPage;
