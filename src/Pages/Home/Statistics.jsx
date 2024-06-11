import CountUp from 'react-countup';
import useUserStats from '../../Hooks/useUserStats';

const Statistics = () => {
    const { data, isLoading, error } = useUserStats();

    if (isLoading) return <p>Loading...</p>;
    if (error) return <p>Error loading statistics</p>;

    const { totalUsers, normalUsers, premiumUsers } = data;

    return (
        <div className="statistics-section p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white container mx-auto">
            <h2 className="text-4xl font-bold text-center mb-8">User Statistics</h2>
            <div className="flex justify-around">
                <div className="stat flex flex-col items-center bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Total Users</h3>
                    <CountUp end={totalUsers} duration={2.5} className="text-3xl font-bold" />
                </div>
                <div className="stat flex flex-col items-center bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Normal Users</h3>
                    <CountUp end={normalUsers} duration={2.5} className="text-3xl font-bold" />
                </div>
                <div className="stat flex flex-col items-center bg-white bg-opacity-20 p-6 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">Premium Users</h3>
                    <CountUp end={premiumUsers} duration={2.5} className="text-3xl font-bold" />
                </div>
            </div>
        </div>
    );
};

export default Statistics;
