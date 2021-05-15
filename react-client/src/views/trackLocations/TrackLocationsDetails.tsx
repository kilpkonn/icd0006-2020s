import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {CarsService} from "../../services/cars-service";
import {ITrackLocation} from "../../types/ITrackLocation";
import {ITrack} from "../../types/ITrack";
import {TrackLocationService} from "../../services/track-location-service";
import {TrackService} from "../../services/track-service";


const TrackLocationsDetails = () => {
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
            <h1>Track Location</h1>
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
                                Latitude
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
                                Longitude
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
                                Elevation
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
                                Accuracy
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
                                Elevation accuracy
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
                                Speed
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
                                RPM
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
                                Track id
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
                    <button className="button m-2 is-primary" onClick={onClickEdit}>Edit</button>
                    }
                    {(isEditing) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                    }
                    {// (admin) &&
                        <button className="button m-2 is-danger" onClick={onClickDelete}>Delete</button>
                    }
                    <NavLink className="button m-2" to="/locations">Back to List</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default TrackLocationsDetails;
