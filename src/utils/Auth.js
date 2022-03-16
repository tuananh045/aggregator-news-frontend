import { Navigate, Outlet } from 'react-router-dom';
import { authentication } from './Authentication'

export function RequireAuth({ children, redirectTo }) {
    let isAuthenticated = authentication.isAuthentication();
    if (!isAuthenticated) {
        return <Navigate to="/login" />;
    }

    return <Outlet />;
}