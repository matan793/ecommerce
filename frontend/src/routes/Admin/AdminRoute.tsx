import { Navigate } from 'react-router-dom';
import { useUser } from '../../contexts/userContext';
import { UserRole } from '../../utils/types/types';

interface AdminRouteProps {
    children: React.ReactNode;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
    const { user, loading } = useUser();

    if (loading) {
        return <div>Loading...</div>; // Or your loading component
    }

    if (!user || user.role !== UserRole.admin) {
        return <Navigate to="/" replace />;
    }

    return <>{children}</>;
};

export default AdminRoute