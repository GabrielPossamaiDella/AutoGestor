import React, { useState } from 'react'; 
import { Link } from 'react-router-dom';

function OrdensServicoPage() {

  return (
    <div>
      <h1>Gerenciamento de Ordens de Serviço</h1>
      <p>Aqui você poderá cadastrar, listar, editar e excluir ordens de serviço.</p>
      <Link to="/dashboard">Voltar para o Dashboard</Link>

      <button onClick={() => alert('Lógica para abrir formulário de nova OS (a implementar)')}>
        Adicionar Nova Ordem de Serviço
      </button>



      <h2>Lista de Ordens de Serviço (Simulado)</h2>
      <ul>
        <li>
          OS 001 (Cliente XPTO, Veículo ABC-1234, Descrição: Troca de óleo, Status: Em Andamento) 
          <button onClick={() => alert('Lógica para editar OS 001 (a implementar)')}>Editar</button>
          <button onClick={() => alert('Lógica para excluir OS 001 (a implementar)')}>Excluir</button>
        </li>
        <li>
          OS 002 (Cliente YZ, Veículo QWE-5678, Descrição: Reparo no motor, Status: Concluída)
          <button onClick={() => alert('Lógica para editar OS 002 (a implementar)')}>Editar</button>
          <button onClick={() => alert('Lógica para excluir OS 002 (a implementar)')}>Excluir</button>
        </li>
      </ul>
    </div>
  );
}

export default OrdensServicoPage;