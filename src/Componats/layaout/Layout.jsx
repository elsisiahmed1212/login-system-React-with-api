import { Outlet } from "react-router-dom";
import Register from "../register/Register";
import Sidebar from "../sidebar/Sidebar";

function Layout() {
    return ( 
    <>
    <Sidebar></Sidebar>
      <div className="p-4 sm:ml-64">
          <Outlet></Outlet>
      </div>
    </> 
    );
}

export default Layout;