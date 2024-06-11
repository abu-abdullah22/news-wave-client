import Chart from "react-google-charts";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";


const Admin = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth() ;
    const { data: articles = [] } = useQuery({
        queryKey: ['articles'],
        queryFn: async () => {
            const res = await axiosSecure.get('/articles');
            return res.data;
        }
    });
    const publicationCounts = articles.reduce((acc, article) => {
        acc[article.publisher] = (acc[article.publisher] || 0) + 1;
        return acc;
    }, {});

    const pieChartData = [
        ["Publication", "Number of Articles"],
        ...Object.entries(publicationCounts).map(([publisher, count]) => [publisher, count])
    ];

    const barChartData = [
        ["Status", "Count"],
        ["Approved", articles.filter(article => article.status === "approved").length],
        ["Pending", articles.filter(article => !article.status).length],
        ["Declined", articles.filter(article => article.status === "declined").length],
    ];

    const lineChartData = [
        ["Date", "Articles"],
        ...articles.map(article => [new Date(article.postedDate).toLocaleDateString(), 1])
    ];
    return (
        <div>
            <h2 className="text-3xl font-medium">Welcome, {user?.displayName}. Here is graphical demonstration of the user interactions.</h2>
            <div className="my-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <Chart
                            chartType="PieChart"
                            data={pieChartData}
                            options={{ title: "Articles by Publication" }}
                            width="100%"
                            height="400px"
                        />
                    </div>
                    <div>
                        <Chart
                            chartType="BarChart"
                            data={barChartData}
                            options={{ title: "Article Status Distribution" }}
                            width="100%"
                            height="400px"
                        />
                    </div>
                    <div>
                        <Chart
                            chartType="LineChart"
                            data={lineChartData}
                            options={{ title: "Articles Over Time" }}
                            width="100%"
                            height="400px"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admin;