import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import {NavLink, useParams} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {CarsService} from "../../services/cars-service";
import {ITrack} from "../../types/ITrack";
import {TrackService} from "../../services/track-service";
import DatePicker from "react-date-picker";
import {useStore} from "react-context-hook";
import showDateTime from "../../utils/showDateTime";


const TracksDetails = () => {
    const [resources] = useStore('resources')

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
            <h1>{resources.Shared.Track}</h1>
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
                                {resources.Dto.Track.Distance}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {track.distance}km
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
                                {resources.Dto.Track.StartTimestamp}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {showDateTime(track.startTimestamp)}
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
                                {resources.Dto.Track.EndTimestamp}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {showDateTime(track.endTimestamp)}
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
                                {resources.Dto.Track.Car}
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
                    <button className="button m-2 is-primary" onClick={onClickEdit}>{resources.Common.Edit}</button>
                    }
                    {(isEditing) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                    }
                    {// (admin) &&
                        <button className="button m-2 is-danger" onClick={onClickDelete}>{resources.Common.Delete}</button>
                    }
                    <NavLink className="button m-2" to="/react/tracks">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default TracksDetails;
