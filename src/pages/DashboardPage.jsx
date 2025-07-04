
import React from 'react';
import { Link } from 'react-router-dom';

function DashboardPage({ username, onLogout, totalClientes, totalOrdens }) {
  const ordensAtivas = totalOrdens; 

  return (
    <div>
      <h1>Olá, {username || 'Usuário'}! Bem-vindo ao Dashboard</h1>
      <p>Aqui você terá uma visão geral da sua oficina e acesso aos módulos.</p>

      <div>
        <h2>Módulos do Sistema:</h2>
        <ul>
          <li><Link to="/clientes">Gerenciar Clientes</Link></li>
          <li><Link to="/ordens-servico">Gerenciar Ordens de Serviço</Link></li>
        </ul>
      </div>

      <div>
        <h2>Resumo da Oficina:</h2>
        {/* Use as props para exibir os números dinamicamente */}
        <p>Clientes Cadastrados: [{totalClientes}]</p>
        <p>Ordens de Serviço Ativas: [{ordensAtivas}]</p>
      </div>

      <button onClick={onLogout}>Sair</button>
    </div>
  );
}

export default DashboardPage;