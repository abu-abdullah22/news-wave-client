import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  
    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col m-4">
                {/* Page content here */}
                <label htmlFor="my-drawer-2" className="btn btn-primary drawer-button lg:hidden">Open dashboard</label>
                <Outlet></Outlet>
                

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content ">
                    {/* dashboard special routes here */}

                    <li><Link to={'/dashboard/admin'}>Admin Home</Link></li>
                    <li><NavLink to={'/dashboard/allUsers'}>All Users</NavLink></li>
                    <li><NavLink to={'/dashboard/allArticlesApproval'}>All Articles (Approval)</NavLink></li>
                    <li><NavLink to={'/dashboard/addPublishers'}>Add Publishers</NavLink></li>
                    <div className="divider"></div>
                    {/* normal routes here */}
                    <li><NavLink to={'/'}>Go back to Home</NavLink></li>
                  
                </ul>

            </div>


        </div>
    );
};

export default Dashboard;