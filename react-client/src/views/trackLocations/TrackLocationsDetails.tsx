import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {ITrackLocation} from "../../types/ITrackLocation";
import {ITrack} from "../../types/ITrack";
import {TrackLocationService} from "../../services/track-location-service";
import {TrackService} from "../../services/track-service";
import {useStore} from "react-context-hook";


const TrackLocationsDetails = () => {
    const [resources] = useStore('resources')

    const {id} = useParams() as IRouteId;

    const [trackLocation, setTrackLocation] = useState(null as ITrackLocation | null);
    const [tracks, setTracks] = useState([] as ITrack[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new TrackLocationService();
    const trackService = new TrackService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setTrackLocation(res.data);
            }
        })
        trackService.getAll().then(res => {
            if (res.data) {
                setTracks(res.data);
            }
        })
    }, [])

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(trackLocation!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setTrackLocation(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(trackLocation!.id).then(() => {
            window.location.href = '/locations'
        })
    }

    return (
        <div className="container">
            <h1>{resources.Shared.TrackLocation}</h1>
            {trackLocation &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {trackLocation.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Lat}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.lat}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.lat}
                                       onChange={(e) => setTrackLocation({...trackLocation, lat: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Lng}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.lng}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.lng}
                                       onChange={(e) => setTrackLocation({...trackLocation, lng: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Elevation}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.elevation}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.elevation}
                                       onChange={(e) => setTrackLocation({...trackLocation, elevation: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Accuracy}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.accuracy}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.accuracy}
                                       onChange={(e) => setTrackLocation({...trackLocation, accuracy: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.ElevationAccuracy}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.elevationAccuracy}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.elevationAccuracy}
                                       onChange={(e) => setTrackLocation({...trackLocation, elevationAccuracy: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Speed}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.speed}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.speed}
                                       onChange={(e) => setTrackLocation({...trackLocation, speed: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Rpm}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.rpm}
                                </div>
                                :
                                <input type="float"
                                       value={trackLocation.rpm}
                                       onChange={(e) => setTrackLocation({...trackLocation, rpm: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.TrackLocation.Track}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {trackLocation.trackId}
                                </div>
                                : <select value={trackLocation.trackId}
                                          onChange={(e) => setTrackLocation({...trackLocation, trackId: e.target.value})}
                                          className="column is-8-desktop">
                                    {tracks.map((track) =>
                                        <option value={track.id} key={track.id}>
                                            {track.id}
                                        </option>
                                    )}
                                </select>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    {(!isEditing) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>{resources.Common.Edit}</button>
                    }
                    {(isEditing) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                    }
                    {// (admin) &&
                        <button className="button m-2 is-danger" onClick={onClickDelete}>{resources.Common.Delete}</button>
                    }
                    <NavLink className="button m-2" to="/react/locations">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default TrackLocationsDetails;
