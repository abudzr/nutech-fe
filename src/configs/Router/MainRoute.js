import React from 'react'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import home from '../../pages/Home'
import product from '../../pages/Product';
function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={home} />
                <Route path="/product" component={product} />
            </Switch>
        </Router>
    );
}
export default App;