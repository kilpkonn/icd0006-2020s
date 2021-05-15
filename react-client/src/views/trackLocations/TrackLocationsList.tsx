import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {ITrackLocation} from "../../types/ITrackLocation";
import {TrackLocationService} from "../../services/track-location-service";

const TrackLocationsList = () => {
    const [trackLocations, setTrackLocations] = useState([] as ITrackLocation[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new TrackLocationService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setTrackLocations(result.data!);
        } else {
            setPageStatus({pageStatus: EPageStatus.Error, statusCode: result.statusCode});
        }
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <div className="columns m-6">
                <NavLink to="/locations/create">Create</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Track Id</th>
                        <th>Lng</th>
                        <th>Lat</th>
                        <th>Accuracy</th>
                        <th>Elevation</th>
                        <th>RPM</th>
                        <th>Speed</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Track Id</th>
                        <th>Lng</th>
                        <th>Lat</th>
                        <th>Accuracy</th>
                        <th>Elevation</th>
                        <th>RPM</th>
                        <th>Speed</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        trackLocations.map((loc) =>
                            <tr key={loc.id}>
                                <th><NavLink to={'/locations/' + loc.id}>{loc.id}</NavLink></th>
                                <td>{loc.trackId}</td>
                                <td>{loc.lng}</td>
                                <td>{loc.lat}</td>
                                <td>{loc.accuracy}</td>
                                <td>{loc.elevation}</td>
                                <td>{loc.rpm}</td>
                                <td>{loc.speed}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TrackLocationsList;
