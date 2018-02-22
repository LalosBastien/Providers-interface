import React from "react";
import { BrowserRouter as Router, Route} from "react-router-dom";
import Layout from './menu/layout';
import Offer from './offer/offer';
import List from './list/list';
import Availability from './availability/availability';
import './App.css';

// Some folks find value in a centralized route config.
// A route config is just data. React is great at mapping
// data into components, and <Route> is a component.

////////////////////////////////////////////////////////////
// first our route components

// const Tacos = ({ routes }) => (
//     <div>
//         <h2>Tacos</h2>
//         <ul>
//             <li>
//                 <Link to="/tacos/bus">Bus</Link>
//             </li>
//             <li>
//                 <Link to="/tacos/cart">Cart</Link>
//             </li>
//         </ul>
//
//         {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
//     </div>
// );

////////////////////////////////////////////////////////////
// then our route config
const routes = [
    {
        path: "/",
        component: Layout,
        routes: [
                {
                    path: "/offer",
                    component: Offer
                },
                {
                    path: "/availability",
                    component: Availability
                }
                ,
                {
                    path: "/list",
                    component: List
                }
            ]
    }
];

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
    <Route
        path={route.path}
        render={props => (
            // pass the sub-routes down to keep nesting
            <route.component {...props} routes={route.routes} />
        )}
    />
);

const RouteConfigExample = () => (
    <Router>
        <div className="App">
            {/*<ul>*/}
                {/*<li>*/}
                    {/*<Link to="/tacos">Tsacos</Link>*/}
                {/*</li>*/}
                {/*<li>*/}
                    {/*<Link to="/sandwiches">Sandwiches</Link>*/}
                {/*</li>*/}
            {/*</ul>*/}
            {/*<Layout testRoute={ routes }/>*/}
            {routes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
        </div>

    </Router>
);

export default RouteConfigExample;