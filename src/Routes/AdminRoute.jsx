/* eslint-disable react/prop-types */

import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import { Navigate } from 'react-router-dom';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth() ;
    const[isAdmin, isAdminLoading] = useAdmin() ;
    if(loading || isAdminLoading){
        return <progress className="progress w-56"></progress>
    }
    if(user && isAdmin) {
        return children ;
    }
    return <Navigate to={'/'} state={{from: location}} replace></Navigate>
};

export default AdminRoute;