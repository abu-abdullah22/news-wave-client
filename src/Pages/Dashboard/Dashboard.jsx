import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col items-center justify-center">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open dashboard</label>
                <Outlet></Outlet>

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                    {/* dashboard special routes here */}
                    <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                    <li><NavLink to={'/dashboard/allArticlesApproval'}>All Articles (Approval)</NavLink></li>
                    <li><NavLink to={'/dashboard/addPublishers'}>Add Publishers</NavLink></li>
                    <div className="divider"></div>
                    {/* normal routes here */}
                    <li><NavLink to={'/'}>Home</NavLink></li>
                    <li><NavLink to={'/addArticles'}>Add Articles</NavLink></li>
                    <li><NavLink to={'/allArticles'}>All Articles</NavLink></li>
                    <li><NavLink to={'/subscription'}>Subscription</NavLink></li>
                    <li> <NavLink to={'/myArticles'}>My Articles</NavLink></li>
                    <li><NavLink to={'/premiumArticles'}>Premium Articles</NavLink></li>
                </ul>

            </div>


        </div>
    );
};

export default Dashboard;