import {useEffect, useState} from "react";
import {NavLink, useLocation, useParams} from "react-router-dom";
import {ICarErrorCode, INewErrorCode} from "../../types/ICarErrorCode";
import {ICar, ICarId} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import {CarsService} from "../../services/cars-service";
import {useStore} from "react-context-hook";


const ErrorCodesCreate = () => {
    const [resources] = useStore('resources')
    const carId = new URLSearchParams(useLocation().search).get("carId");
    const [errorCode, setErrorCode] = useState({carId: carId || '', canId: -1, canData: -1} as INewErrorCode);
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
            <h1>{resources.Common.Create}</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.CarErrorCode.Car}
                        </div>
                        <select value={errorCode.carId}
                                onChange={(e) => setErrorCode({...errorCode, carId: e.target.value})}
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
                            {resources.Dto.CarErrorCode.CanId}
                        </div>
                        <input type="number"
                               value={errorCode.canId}
                               onChange={(e) => setErrorCode({...errorCode, canId: +e.target.value})}
                               className="column is-8-desktop"/>

                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.CarErrorCode.Data}
                        </div>
                        <input type="number"
                               value={errorCode.canData}
                               onChange={(e) => setErrorCode({...errorCode, canData: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                <NavLink className="button m-2" to="/types">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default ErrorCodesCreate;
