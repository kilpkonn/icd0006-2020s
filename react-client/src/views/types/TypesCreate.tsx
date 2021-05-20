import {useEffect, useState} from "react";
import {CarTypeService} from "../../services/car-type-service";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {ICarType} from "../../types/ICarType";
import {NavLink} from "react-router-dom";
import {useStore} from "react-context-hook";


const TypesCreate = () => {
    const [resources] = useStore('resources')

    const [type, setType] = useState({name: '', carModelId: ''} as ICarType);
    const [carModels, setCarModels] = useState([] as ICarModel[]);
    const service = new CarTypeService();
    const carModelService = new CarModelService();

    useEffect(() => {
        carModelService.getAll().then(res => {
            if (res.data) {
                setCarModels(res.data);
            }
        })
    }, [])

    const onClickSave = () => {
        service.post(type!).then((res) => {
            if (res.data) {
                window.location.href = `/types/${res.data.id}`
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
                            {resources.Dto.CarType.Name}
                        </div>

                        <input onChange={(e) => setType({...type, name: e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.CarType.Model}
                        </div>
                        <select onChange={(e) => setType({...type, carModelId: e.target.value})}
                                className="column is-8-desktop">
                            {carModels.map((model) =>
                                <option value={model.id} key={model.id}>
                                    {model.carMark?.name} - {model.name}
                                </option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                <NavLink className="button m-2" to="/react/types">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default TypesCreate;
