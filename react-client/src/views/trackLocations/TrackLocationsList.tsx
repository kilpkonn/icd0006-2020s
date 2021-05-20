import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {ITrackLocation} from "../../types/ITrackLocation";
import {TrackLocationService} from "../../services/track-location-service";
import {useStore} from "react-context-hook";

const TrackLocationsList = () => {
    const [resources] = useStore('resources')

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
                <NavLink to="/locations/create">{resources.Common.Create}</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.TrackLocation.TrackId}</th>
                        <th>{resources.Dto.TrackLocation.Lng}</th>
                        <th>{resources.Dto.TrackLocation.Lat}</th>
                        <th>{resources.Dto.TrackLocation.Accuracy}</th>
                        <th>{resources.Dto.TrackLocation.Elevation}</th>
                        <th>{resources.Dto.TrackLocation.Rpm}</th>
                        <th>{resources.Dto.TrackLocation.Speed}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.TrackLocation.TrackId}</th>
                        <th>{resources.Dto.TrackLocation.Lng}</th>
                        <th>{resources.Dto.TrackLocation.Lat}</th>
                        <th>{resources.Dto.TrackLocation.Accuracy}</th>
                        <th>{resources.Dto.TrackLocation.Elevation}</th>
                        <th>{resources.Dto.TrackLocation.Rpm}</th>
                        <th>{resources.Dto.TrackLocation.Speed}</th>
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
