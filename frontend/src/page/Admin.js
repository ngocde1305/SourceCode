import { Outlet, Link } from "react-router-dom";
function Admin() {
    return (
        <>
           
            <div className="row">
             
                <div className="col">
                    <main className="pt-16 bg-slate-100 min-h-[calc(100vh)]">  
                        <Outlet />
                    </main>
                </div>
            </div>
        </>
    );
}
export default Admin;