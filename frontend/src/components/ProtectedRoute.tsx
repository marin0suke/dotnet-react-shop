import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { CircularProgress } from '@mui/material';

interface ProtectedRouteProps {
    children: React.ReactNode;
    requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requireAdmin = false }) => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return <CircularProgress />;
    }

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (requireAdmin && !user.roles?.includes('Admin')) {
        return <Navigate to="/" />;
    }

    return <>{children}</>;
};

export default ProtectedRoute; 