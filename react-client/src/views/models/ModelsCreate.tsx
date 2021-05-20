import {useEffect, useState} from "react";
import {ICarModel} from "../../types/ICarModel";
import {CarModelService} from "../../services/car-model-service";
import {NavLink} from "react-router-dom";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";
import {useStore} from "react-context-hook";


const ModelsCreate = () => {
    const [resources] = useStore('resources')

    const [model, setModel] = useState({name: '', carMarkId: ''} as ICarModel);
    const [carMarks, setCarMarks] = useState([] as ICarMark[]);
    const service = new CarModelService();
    const carModelService = new CarMarkService();

    useEffect(() => {
        carModelService.getAll().then(res => {
            if (res.data) {
                setCarMarks(res.data);
            }
        })
    }, [])

    const onClickSave = () => {
        service.post(model!).then((res) => {
            if (res.data) {
                window.location.href = `/react/models/${res.data.id}`
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
                            {resources.Dto.CarModel.Name}
                        </div>

                        <input onChange={(e) => setModel({...model, name: e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.CarModel.CarMark}
                        </div>
                        <select value={model.carMarkId}
                                onChange={(e) => setModel({...model, carMarkId: e.target.value})}
                                className="column is-8-desktop">
                            {carMarks.map((mark) =>
                                <option value={mark.id} key={mark.id}>
                                    {mark.name}
                                </option>
                            )}
                        </select>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                <NavLink className="button m-2" to="/models">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default ModelsCreate;
