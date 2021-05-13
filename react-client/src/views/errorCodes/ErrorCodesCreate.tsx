import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ICarErrorCode, INewErrorCode} from "../../types/ICarErrorCode";
import {ICar} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {CarsService} from "../../services/cars-service";


const ErrorCodesCreate = () => {
    const [errorCode, setErrorCode] = useState({carId: '', canId: -1, canData: -1} as INewErrorCode);
    const [cars, setCars] = useState([] as ICar[]);
    const service = new CarErrorCodeService();
    const carsService = new CarsService();

    useEffect(() => {
        carsService.getAll().then(res => {
            if (res.data) {
                setCars(res.data);
            }
        })
    }, [])

    const onClickSave = () => {
        service.post(errorCode! as ICarErrorCode).then((res) => {
            if (res.data) {
                window.location.href = `/errors/${res.data.id}`
            }
        })
    }

    return (
        <div className="container">
            <h1>Add new Car Error Code</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Car
                        </div>
                        <select onChange={(e) => setErrorCode({...errorCode, carId: e.target.value})}
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
                            CAN id
                        </div>
                        <input type="number"
                               value={errorCode.canId}
                               onChange={(e) => setErrorCode({...errorCode, canId: +e.target.value})}
                               className="column is-8-desktop"/>

                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            CAN data
                        </div>
                        <input type="number"
                               value={errorCode.canData}
                               onChange={(e) => setErrorCode({...errorCode, canData: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                <NavLink className="button m-2" to="/types">Back to List</NavLink>
            </div>
        </div>
    )
}

export default ErrorCodesCreate;
