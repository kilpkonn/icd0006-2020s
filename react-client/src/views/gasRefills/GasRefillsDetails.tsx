import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {NavLink, useParams} from "react-router-dom";
import {ICarErrorCode} from "../../types/ICarErrorCode";
import {ICar} from "../../types/ICar";
import {CarErrorCodeService} from "../../services/car-error-code-service";
import DatePicker from 'react-date-picker';
import {CarsService} from "../../services/cars-service";
import {IGasRefill} from "../../types/IGasRefill";
import {GasRefillsService} from "../../services/gas-refills-service";


const GasRefillsDetails = () => {
    const {id} = useParams() as IRouteId;

    const [gasRefill, setGasRefill] = useState(null as IGasRefill | null);
    const [cars, setCars] = useState([] as ICar[]);
    const [isEditing, setIsEditing] = useState(false)
    const service = new GasRefillsService();
    const carsService = new CarsService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setGasRefill(res.data);
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
        service.put(gasRefill!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setGasRefill(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(gasRefill!.id).then(() => {
            window.location.href = '/refills'
        })
    }

    return (
        <div className="container">
            <h1>Gas refills</h1>
            {gasRefill &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {gasRefill.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Amount
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {gasRefill.amountRefilled}
                                </div>
                                :
                                <input type="number"
                                       value={gasRefill.amountRefilled}
                                       onChange={(e) => setGasRefill({...gasRefill, amountRefilled: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Cost
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {gasRefill.cost}
                                </div>
                                :
                                <input type="number"
                                       value={gasRefill.cost}
                                       onChange={(e) => setGasRefill({...gasRefill, cost: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Timestamp
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {gasRefill.timestamp}
                                </div>
                                :
                                <DatePicker
                                       value={gasRefill.timestamp}
                                       onChange={(e) => setGasRefill({...gasRefill, timestamp: e as Date})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Car id
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {gasRefill.carId}
                                </div>
                                : <select value={gasRefill.carId}
                                          onChange={(e) => setGasRefill({...gasRefill, carId: e.target.value})}
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
                    <NavLink className="button m-2" to="/refills">Back to List</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default GasRefillsDetails;
