import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ITrackLocation} from "../../types/ITrackLocation";
import {ITrack} from "../../types/ITrack";
import {TrackLocationService} from "../../services/track-location-service";
import {TrackService} from "../../services/track-service";
import {useStore} from "react-context-hook";


const TrackLocationsCreate = () => {
    const [resources] = useStore('resources')

    const [trackLocation, setTrackLocation] = useState({
        trackId: '',
        lat: 0.0,
        lng: 0.0,
        rpm: 0.0,
        speed: 0.0,
        elevationAccuracy: 0.0,
        accuracy: 0.0,
        elevation: 0.0
    } as ITrackLocation);
    const [tracks, setTracks] = useState([] as ITrack[]);
    const service = new TrackLocationService();
    const trackService = new TrackService();

    useEffect(() => {
        trackService.getAll().then(res => {
            if (res.data) {
                setTracks(res.data);
            }
        })
    }, [])

    const onClickSave = () => {
        service.post(trackLocation!).then((res) => {
            if (res.data) {
                window.location.href = `/locations/${res.data.id}`
            }
        })
    }

    return (
        <div className="container">
            <h1>{resources.Common.Create}</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Track}
                        </div>
                        <select onChange={(e) => setTrackLocation({...trackLocation, trackId: e.target.value})}
                                className="column is-8-desktop">
                            {tracks.map((track) =>
                                <option value={track.id} key={track.id}>
                                    {track.id}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Lat}
                        </div>
                        <input type="float"
                               value={trackLocation.lat}
                               onChange={(e) => setTrackLocation({...trackLocation, lat: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Lng}
                        </div>
                        <input type="float"
                               value={trackLocation.lng}
                               onChange={(e) => setTrackLocation({...trackLocation, lng: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Accuracy}
                        </div>
                        <input type="float"
                               value={trackLocation.accuracy}
                               onChange={(e) => setTrackLocation({...trackLocation, accuracy: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Elevation}
                        </div>
                        <input type="float"
                               value={trackLocation.elevation}
                               onChange={(e) => setTrackLocation({...trackLocation, elevation: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.ElevationAccuracy}
                        </div>
                        <input type="float"
                               value={trackLocation.elevationAccuracy}
                               onChange={(e) => setTrackLocation({...trackLocation, elevationAccuracy: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Speed}
                        </div>
                        <input type="float"
                               value={trackLocation.speed}
                               onChange={(e) => setTrackLocation({...trackLocation, speed: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.TrackLocation.Rpm}
                        </div>
                        <input type="float"
                               value={trackLocation.rpm}
                               onChange={(e) => setTrackLocation({...trackLocation, rpm: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                <NavLink className="button m-2" to="/locations">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default TrackLocationsCreate;
