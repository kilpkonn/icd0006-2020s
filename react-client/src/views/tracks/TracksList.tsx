import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {ITrack} from "../../types/ITrack";
import {TrackService} from "../../services/track-service";

const TracksList = () => {
    const [tracks, setTracks] = useState([] as ITrack[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new TrackService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setTracks(result.data!);
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
                <NavLink to="/tracks/create">Create</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Car</th>
                        <th>Distance</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>Car</th>
                        <th>Distance</th>
                        <th>Start</th>
                        <th>End</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        tracks.map((track) =>
                            <tr key={track.id}>
                                <th><NavLink to={'/tracks/' + track.id}>{track.id}</NavLink></th>
                                <td>{track.carId}</td>
                                <td>{track.distance}</td>
                                <td>{track.startTimestamp}</td>
                                <td>{track.endTimestamp}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default TracksList;
