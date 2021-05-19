import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {ITrack} from "../../types/ITrack";
import {TrackService} from "../../services/track-service";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";

const TracksList = () => {
    const [resources] = useStore('resources')

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
                <NavLink to="/tracks/create">{resources.Common.Create}</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.Track.Car}</th>
                        <th>{resources.Dto.Track.Distance}</th>
                        <th>{resources.Dto.Track.StartTimestamp}</th>
                        <th>{resources.Dto.Track.EndTimestamp}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.Track.Car}</th>
                        <th>{resources.Dto.Track.Distance}</th>
                        <th>{resources.Dto.Track.StartTimestamp}</th>
                        <th>{resources.Dto.Track.EndTimestamp}</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        tracks.map((track) =>
                            <tr key={track.id}>
                                <th><NavLink to={'/tracks/' + track.id}>{track.id}</NavLink></th>
                                <td>{track.carId}</td>
                                <td>{track.distance}km</td>
                                <td>{showDateTime(track.startTimestamp)}</td>
                                <td>{showDateTime(track.endTimestamp)}</td>
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
