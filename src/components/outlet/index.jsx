
import Home from '../../pages/home';   
import User from '../../pages/user';
import Mall from '../../pages/mall';
import Login from '../../pages/login';

function Outlet ({ path }) {

    console.log("routerPath", path);
    switch (path) {
        case '/pages/home/index':
            return <Home />;
        case '/pages/user/index':
            return <User />;
        case '/pages/mall/index':
            return <Mall />;
        case '/pages/login/index':
            return <Login />;
        default:
            return <Home />;
    }
};

export default Outlet;