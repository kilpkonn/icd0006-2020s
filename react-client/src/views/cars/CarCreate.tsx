import {NavLink, useParams} from "react-router-dom";
import {ICarType} from "../../types/ICarType";
import {ICar} from "../../types/ICar";
import {useEffect, useState} from "react";
import {CarsService} from "../../services/cars-service";
import {CarTypeService} from "../../services/car-type-service";
import {useStore} from "react-context-hook";

const CarCreate = () => {
    const [resources] = useStore('resources')

    const [car, setCar] = useState({carTypeId: ''} as ICar);
    const [carTypes, setCarTypes] = useState([] as ICarType[]);
    const service = new CarsService();
    const carTypesService = new CarTypeService();

    useEffect(() => {
        carTypesService.getAll().then(res => {
            if (res.data) {
                setCarTypes(res.data);
            }
        })

    }, [])

    const onClickSave = () => {
        service.post(car!).then((res) => {
            if (res.data) {
                window.location.href = `/cars/${res.data.id}`;
            }
        })
    }

    return (
        <div className="container">
            <h1>{resources.Common.Car}</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.Car.CarType}
                        </div>
                        {
                            <select onChange={(e) => setCar({...car, carTypeId: e.target.value})}
                                    className="column is-8-desktop">
                                {carTypes.map((type) =>
                                    <option value={type.id} key={type.id}>
                                        {type.carModel?.carMark?.name} - {type.carModel?.name} - {type.name}
                                    </option>
                                )
                                }
                            </select>
                        }
                    </div>
                </div>
            </div>
            <div>
                {
                    <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                }
                <NavLink className="button m-2" to="/cars">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default CarCreate;
