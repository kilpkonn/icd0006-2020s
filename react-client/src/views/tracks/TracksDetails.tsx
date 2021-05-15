import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {CarsService} from "../../services/cars-service";
import {ITrack} from "../../types/ITrack";
import {TrackService} from "../../services/track-service";
import DatePicker from "react-date-picker";


const TracksDetails = () => {
    const {id} = useParams() as IRouteId;

    const [track, setTrack] = useState(null as ITrack | null);
    const [cars, setCars] = useState([] as ICar[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new TrackService();
    const carsService = new CarsService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setTrack(res.data);
            }
        })
        carsService.getAll().then(res => {
            if (res.data) {
                setCars(res.data);
            }
        })
    }, [])

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(track!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setTrack(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(track!.id).then(() => {
            window.location.href = '/tracks'
        })
    }

    return (
        <div className="container">
            <h1>Track</h1>
            {track &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {track.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Distance
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {track.distance}
                                </div>
                                :
                                <input type="number"
                                       value={track.distance}
                                       onChange={(e) => setTrack({...track, distance: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Start timestamp
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {track.startTimestamp}
                                </div>
                                :
                                <DatePicker
                                    value={track.startTimestamp}
                                    onChange={(e) => setTrack({...track, startTimestamp: e as Date})}
                                    className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                End timestamp
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {track.endTimestamp}
                                </div>
                                :
                                <DatePicker
                                    value={track.endTimestamp}
                                    onChange={(e) => setTrack({...track, endTimestamp: e as Date})}
                                    className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Car id
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {track.carId}
                                </div>
                                : <select value={track.carId}
                                          onChange={(e) => setTrack({...track, carId: e.target.value})}
                                          className="column is-8-desktop">
                                    {cars.map((car) =>
                                        <option value={car.id} key={car.id}>
                                            {car.carType?.carModel?.carMark?.name} - {car.carType?.carModel?.name} - {car.carType?.name}
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
                    <NavLink className="button m-2" to="/tracks">Back to List</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default TracksDetails;
