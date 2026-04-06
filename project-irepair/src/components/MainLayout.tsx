import { Outlet } from "react-router";
import Header from "./Header";

const MainLayout = () =>{
    return(
        <div>
            <Header />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    )

}

export default MainLayout;