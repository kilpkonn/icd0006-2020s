import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {CarsService} from "../../services/cars-service";
import {ITrack} from "../../types/ITrack";
import {TrackService} from "../../services/track-service";
// @ts-ignore
import DateTimePicker from 'react-datetime-picker'
import {useStore} from "react-context-hook";

const TracksCreate = () => {
    const [resources] = useStore('resources')

    const [track, setTrack] = useState({carId: '', distance: 0.0, startTimestamp: new Date(), endTimestamp: new Date()} as ITrack);
    const [cars, setCars] = useState([] as ICar[]);
    const service = new TrackService();
    const carsService = new CarsService();

    useEffect(() => {
        carsService.getAll().then(res => {
            if (res.data) {
                setCars(res.data);
            }
        })
    }, [])

    const onClickSave = () => {
        service.post(track!).then((res) => {
            if (res.data) {
                window.location.href = `/react/tracks/${res.data.id}`
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
                            {resources.Dto.Track.Car}
                        </div>
                        <select onChange={(e) => setTrack({...track, carId: e.target.value})}
                                className="column is-8-desktop">
                            {cars.map((car) =>
                                <option value={car.id} key={car.id}>
                                    {car.carType?.carModel?.carMark?.name} - {car.carType?.carModel?.name} - {car.carType?.name}
                                </option>
                            )}
                        </select>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.Track.Distance}
                        </div>
                        <input type="number"
                               value={track.distance}
                               onChange={(e) => setTrack({...track, distance: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.Track.StartTimestamp}
                        </div>
                        <DateTimePicker
                            value={track.startTimestamp}
                            onChange={(e: Date) => setTrack({...track, startTimestamp: e})}
                            className="column is-3-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.Track.EndTimestamp}
                        </div>
                        <DateTimePicker
                            value={track.endTimestamp}
                            onChange={(e: Date) => setTrack({...track, endTimestamp: e})}
                            className="column is-3-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                <NavLink className="button m-2" to="/tracks">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default TracksCreate;
