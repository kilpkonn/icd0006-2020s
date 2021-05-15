import React from 'react';
import './assets/App.css';
import {Route, Switch} from 'react-router-dom';
import Header from "./components/Header";
import Login from "./views/auth/Login";
import Register from "./views/auth/Register";
import CarsList from "./views/cars/CarsList";
import CarDetails from "./views/cars/CarDetails";
import CarCreate from "./views/cars/CarCreate";
import TypesCreate from "./views/types/TypesCreate";
import TypesDetails from "./views/types/TypesDetails";
import TypesList from "./views/types/TypesList";
import ModelsList from "./views/models/ModelsList";
import ModelsDetails from "./views/models/ModelsDetails";
import ModelsCreate from "./views/models/ModelsCreate";
import MarksList from "./views/marks/MarksList";
import MarksCreate from "./views/marks/MarksCreate";
import MarksDetails from "./views/marks/MarksDetails";
import ErrorCodesCreate from "./views/errorCodes/ErrorCodesCreate";
import ErrorCodesDetails from "./views/errorCodes/ErrorCodesDetails";
import ErrorCodesList from "./views/errorCodes/ErrorCodesList";
import CarAccessesCreate from "./views/carAccesses/CarAccessesCreate";
import CarAccessesDetails from "./views/carAccesses/CarAccessesDetails";
import CarAccessesList from "./views/carAccesses/CarAccessesList";

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

                        <Route path="/cars/create" component={CarCreate}/>
                        <Route path="/cars/:id" component={CarDetails}/>
                        <Route path="/cars" component={CarsList}/>

                        <Route path="/types/create" component={TypesCreate}/>
                        <Route path="/types/:id" component={TypesDetails}/>
                        <Route path="/types" component={TypesList}/>

                        <Route path="/models/create" component={ModelsCreate}/>
                        <Route path="/models/:id" component={ModelsDetails}/>
                        <Route path="/models" component={ModelsList}/>

                        <Route path="/marks/create" component={MarksCreate}/>
                        <Route path="/marks/:id" component={MarksDetails}/>
                        <Route path="/marks" component={MarksList}/>

                        <Route path="/errors/create" component={ErrorCodesCreate}/>
                        <Route path="/errors/:id" component={ErrorCodesDetails}/>
                        <Route path="/errors" component={ErrorCodesList}/>

                        <Route path="/accesses/create" component={CarAccessesCreate}/>
                        <Route path="/accesses/:id" component={CarAccessesDetails}/>
                        <Route path="/accesses" component={CarAccessesList}/>

                        {/*<Route component={Page404}/>*/}
                    </Switch>
                </main>
            </div>
        </>
    );
}

export default App;
