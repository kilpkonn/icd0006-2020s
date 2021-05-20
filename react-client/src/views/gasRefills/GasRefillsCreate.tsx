import {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ICar} from "../../types/ICar";
import {CarsService} from "../../services/cars-service";
import {IGasRefill} from "../../types/IGasRefill";
import {GasRefillsService} from "../../services/gas-refills-service";
import DatePicker from "react-date-picker";
import {useStore} from "react-context-hook";


const GasRefillsCreate = () => {
    const [resources] = useStore('resources')

    const [gasRefill, setGasRefill] = useState({carId: '', amountRefilled: -1, cost: -1, timestamp: new Date()} as IGasRefill);
    const [cars, setCars] = useState([] as ICar[]);
    const service = new GasRefillsService();
    const carsService = new CarsService();

    useEffect(() => {
        carsService.getAll().then(res => {
            if (res.data) {
                setCars(res.data);
            }
        })
    }, [])

    const onClickSave = () => {
        service.post(gasRefill! as IGasRefill).then((res) => {
            if (res.data) {
                window.location.href = `/react/refills/${res.data.id}`
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
                            {resources.Dto.GasRefill.Car}
                        </div>
                        <select onChange={(e) => setGasRefill({...gasRefill, carId: e.target.value})}
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
                            {resources.Dto.GasRefill.AmountRefilled}
                        </div>
                        <input type="number"
                               value={gasRefill.amountRefilled}
                               onChange={(e) => setGasRefill({...gasRefill, amountRefilled: +e.target.value})}
                               className="column is-8-desktop"/>

                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.GasRefill.Cost}
                        </div>
                        <input type="number"
                               value={gasRefill.cost}
                               onChange={(e) => setGasRefill({...gasRefill, cost: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.GasRefill.Cost}
                        </div>
                        <DatePicker
                            value={gasRefill.timestamp}
                            onChange={(e) => setGasRefill({...gasRefill, timestamp: e as Date})}
                            className="column is-8-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Create}</button>
                <NavLink className="button m-2" to="/types">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default GasRefillsCreate;
