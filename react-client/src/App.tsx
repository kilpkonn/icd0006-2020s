import React from 'react';
import logo from './logo.svg';
import './assets/App.css';
import {Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import Cars from "./views/cars/Cars";

function App() {
    return (
        <>
            <Header/>
            <div className="container">
                <main role="main" className="pb-3">
                    <Switch>
                        {/*<Route exact path="/" component={HomeIndex}/>*/}

                        <Route path="/login" component={Login}/>
                        <Route path="/register" component={Register}/>

                        <Route path="/cars" component={Cars}/>
                        {/*<Route path="/contacttypes/edit/:id" component={ContactTypeEdit}/>*/}
                        {/*<Route path="/contacttypes/delete/:id" component={ContactTypeDelete}/>*/}
                        {/*<Route path="/contacttypes/:id" component={ContactTypeDetails}/>*/}
                        {/*<Route path="/contacttypes" component={ContactTypeIndex}/>*/}

                        {/*<Route component={Page404}/>*/}
                    </Switch>
                </main>
            </div>
        </>
    );
}

export default App;
