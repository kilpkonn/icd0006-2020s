import {NavLink, useParams} from "react-router-dom";
import {ICarType} from "../../types/ICarType";
import {ICar} from "../../types/ICar";
import {useEffect, useState} from "react";
import {CarsService} from "../../services/cars-service";
import {CarTypeService} from "../../services/car-type-service";

const CarCreate = () => {
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
            <h1>Create new car</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Type
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
                    <button className="button m-2 is-success" onClick={onClickSave}>Create</button>
                }
                <NavLink className="button m-2" to="/cars">Back to List</NavLink>
            </div>
        </div>
    )
}

export default CarCreate;
