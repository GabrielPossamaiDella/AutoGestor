
import React, { useState } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import ClientesPage from './pages/ClientesPage';
import OrdensServicoPage from './pages/OrdensServicoPage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const [clientes, setClientes] = useState([
    { id: 1, nome: 'José Alberto', telefone: '99999-0001', veiculo: 'Chevrolet Celta Life - QJC-9269' },
    { id: 2, nome: 'Marcelo Amaral', telefone: '99999-0002', veiculo: 'Ford Ka Sport - DEF-5678' },
  ]);

  const [ordens, setOrdens] = useState([
    { id: 1, cliente: 'XPTO', veiculo: 'ABC-1234', descricao: 'Troca de óleo', status: 'Em Andamento' },
    { id: 2, cliente: 'YZ', veiculo: 'QWE-5678', descricao: 'Reparo no motor', status: 'Concluída' },
  ]);


  const handleLogin = (user) => {
    setUsername(user);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setUsername('');
    setIsAuthenticated(false);
    navigate('/login');
  };

  const ProtectedRoute = ({ children }) => {
    if (!isAuthenticated) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/dashboard" replace /> : <LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              {/* 2. Passe os dados para o Dashboard */}
              <DashboardPage
                username={username}
                onLogout={handleLogout}
                totalClientes={clientes.length}
                totalOrdens={ordens.length}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/clientes"
          element={
            <ProtectedRoute>
              {/* 3. Passe o estado e a função para atualizar para a página de Clientes */}
              <ClientesPage clientes={clientes} setClientes={setClientes} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/ordens-servico"
          element={
            <ProtectedRoute>
              {/* 4. Passe o estado e a função para atualizar para a página de Ordens */}
              <OrdensServicoPage ordens={ordens} setOrdens={setOrdens} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;