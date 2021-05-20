import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {NavLink, useParams} from "react-router-dom";
import {ICarAccessType} from "../../types/ICarAccessType";
import {CarAccessTypeService} from "../../services/car-access-type-service";
import {useStore} from "react-context-hook";

const AccessTypesDetails = () => {
    const [resources] = useStore('resources')

    const {id} = useParams() as IRouteId;

    const [accessType, setAccessType] = useState(null as ICarAccessType | null);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarAccessTypeService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setAccessType(res.data);
            }
        })
    }, [])

    const admin = isAdmin();

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(accessType!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setAccessType(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(accessType!.id).then(() => {
            window.location.href = '/accesstypes'
        })
    }

    return (
        <div className="container">
            <h1>{resources.Common.CarAccessType}</h1>
            {accessType &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {accessType.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarAccessType.Name}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {accessType.name}
                                </div>
                                :
                                <input value={accessType.name}
                                       onChange={(e) => setAccessType({...accessType, name: e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                {resources.Dto.CarAccessType.AccessLevel}
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {accessType.accessLevel}
                                </div>
                                :
                                <input type="number"
                                       value={accessType.accessLevel}
                                       onChange={(e) => setAccessType({...accessType, accessLevel: +e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>

                    </div>
                </div>
                <div>
                    {(!isEditing && admin) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>{resources.Common.Edit}</button>
                    }
                    {(isEditing && admin) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>{resources.Common.Save}</button>
                    }
                    {(admin) &&
                    <button className="button m-2 is-danger" onClick={onClickDelete}>{resources.Common.Delete}</button>
                    }
                    <NavLink className="button m-2" to="/react/accesstypes">{resources.Common.Back}</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default AccessTypesDetails;
