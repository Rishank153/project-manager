// components/routing/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useContext } from 'react';
import AuthContext from '../../context/authContext';

const PrivateRoute = ({ component: Component, adminRequired = false }) => {
    const { user, isAuthenticated, loading } = useContext(AuthContext);

    if (loading) {
        return <div>Loading...</div>; // or a spinner
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (adminRequired && user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />;
    }

    return <Component />;
};

export default PrivateRoute;
