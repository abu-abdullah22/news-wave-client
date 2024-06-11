import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';


const usePremium = () => {
    const { user,loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isPremium, isLoading } = useQuery({
        queryKey: [user?.email, 'isPremium'],
        queryFn: async () => {
            if (user?.email) {
                const res = await axiosSecure.get(`/users/${user.email}`);
                // console.log(res.data);
                return res.data?.isPremium;
            }
            return false;
        },
        enabled:!loading, 
    });

    return [isPremium, isLoading];
};

export default usePremium;

