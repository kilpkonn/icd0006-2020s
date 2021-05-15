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
import AccessTypesList from "./views/carAccessTypes/AccessTypesList";
import AccessTypesDetails from "./views/carAccessTypes/AccessTypesDetails";
import AccessTypesCreate from "./views/carAccessTypes/AccessTypesCreate";
import GasRefillsCreate from "./views/gasRefills/GasRefillsCreate";
import GasRefillsDetails from "./views/gasRefills/GasRefillsDetails";
import GasRefillsList from "./views/gasRefills/GasRefillsList";
import TracksCreate from "./views/tracks/TracksCreate";
import TracksDetails from "./views/tracks/TracksDetails";
import TracksList from "./views/tracks/TracksList";
import TrackLocationsCreate from "./views/trackLocations/TrackLocationsCreate";
import TrackLocationsDetails from "./views/trackLocations/TrackLocationsDetails";
import TrackLocationsList from "./views/trackLocations/TrackLocationsList";

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

                        <Route path="/accesstypes/create" component={AccessTypesCreate}/>
                        <Route path="/accesstypes/:id" component={AccessTypesDetails}/>
                        <Route path="/accesstypes" component={AccessTypesList}/>

                        <Route path="/accesses/create" component={CarAccessesCreate}/>
                        <Route path="/accesses/:id" component={CarAccessesDetails}/>
                        <Route path="/accesses" component={CarAccessesList}/>

                        <Route path="/refills/create" component={GasRefillsCreate}/>
                        <Route path="/refills/:id" component={GasRefillsDetails}/>
                        <Route path="/refills" component={GasRefillsList}/>

                        <Route path="/tracks/create" component={TracksCreate}/>
                        <Route path="/tracks/:id" component={TracksDetails}/>
                        <Route path="/tracks" component={TracksList}/>

                        <Route path="/locations/create" component={TrackLocationsCreate}/>
                        <Route path="/locations/:id" component={TrackLocationsDetails}/>
                        <Route path="/locations" component={TrackLocationsList}/>

                        {/*<Route component={Page404}/>*/}
                    </Switch>
                </main>
            </div>
        </>
    );
}

export default App;
