import {useState} from "react";
import {NavLink} from "react-router-dom";
import {ICarAccessType} from "../../types/ICarAccessType";
import {CarAccessTypeService} from "../../services/car-access-type-service";
import {useStore} from "react-context-hook";

const AccessTypesCreate = () => {
    const [resources] = useStore('resources')

    const [accessType, setAccessType] = useState({name: '', accessLevel: 10} as ICarAccessType);
    const service = new CarAccessTypeService();

    const onClickSave = () => {
        service.post(accessType!).then((res) => {
            if (res.data) {
                window.location.href = `/accesstypes/${res.data.id}`
            }
        })
    }

    return (
        <div className="container">
            <h1>{resources.Common.CarAccessType}</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.CarAccessType.Name}
                        </div>
                        <input value={accessType.name}
                               onChange={(e) => setAccessType({...accessType, name: e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                    <div className="columns">
                        <div className="column is-4-desktop">
                            {resources.Dto.CarAccessType.AccessLevel}
                        </div>
                        <input type="number"
                               value={accessType.accessLevel}
                               onChange={(e) => setAccessType({...accessType, accessLevel: +e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                <NavLink className="button m-2" to="/react/accesstypes">{resources.Common.Back}</NavLink>
            </div>
        </div>
    )
}

export default AccessTypesCreate;
