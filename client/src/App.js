import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/authContext';
import { Container } from 'react-bootstrap';
import Navbar from './components/layout/Navbar';
import Home from './pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import TaskForm from './components/tasks/TaskForm';
import TaskList from './components/tasks/TaskList';
import PrivateRoute from './components/routing/PrivateRoute';

function App() {
  

  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Container className="mt-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Protected routes */}
            <Route
              path="/dashboard"
              element={<PrivateRoute component={Dashboard} />}
            />

            {/* Admin-only routes */}
            <Route
              path="/admin"
              element={
                <PrivateRoute component={AdminDashboard} adminRequired={true} />
              }
            />
            <Route
              path="/create-task"
              element={
                <PrivateRoute component={TaskForm} adminRequired={true} />
              }
            />

            {/* Task management routes */}
            <Route
              path="/tasks"
              element={
                <PrivateRoute component={TaskList} />
              }
            />
            <Route
              path="/tasks/available"
              element={
                <PrivateRoute component={() => <TaskList filter="available" />} />
              }
            />
            <Route
              path="/tasks/assigned"
              element={
                <PrivateRoute component={() => <TaskList filter="assigned" />} />
              }
            />
            <Route
              path="/tasks/completed"
              element={
                <PrivateRoute component={() => <TaskList filter="completed" />}
                />
              }
            />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;