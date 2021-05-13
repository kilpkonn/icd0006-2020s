import {IRouteId} from "../../types/IRouteId";
import {useEffect, useState} from "react";
import isAdmin from "../../utils/isAdmin";
import {NavLink, useParams} from "react-router-dom";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";


const MarksDetails = () => {
    const {id} = useParams() as IRouteId;

    const [mark, setMark] = useState(null as ICarMark | null);
    const [isEditing, setIsEditing] = useState(false)
    const service = new CarMarkService();

    useEffect(() => {
        service.get(id).then(res => {
            if (res.data) {
                setMark(res.data);
            }
        })
    }, [])

    const admin = isAdmin();

    const onClickEdit = () => {
        setIsEditing(true);
    }

    const onClickSave = () => {
        service.put(mark!).then((res) => {
            service.get(id).then(res => {
                if (res.data) {
                    setMark(res.data);
                }
            })
            setIsEditing(false);
        })
    }

    const onClickDelete = () => {
        service.delete(mark!.id).then(() => {
            window.location.href = '/marks'
        })
    }

    return (
        <div className="container">
            <h1>Car Mark Details</h1>
            {mark &&
            <>
                <div className="column">
                    <hr/>
                    <div className="column">
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Id
                            </div>
                            <div className="column is-8-desktop">
                                {mark.id}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Name
                            </div>
                            {!isEditing ?
                                <div className="column is-8-desktop">
                                    {mark.name}
                                </div>
                                :
                                <input value={mark.name}
                                       onChange={(e) => setMark({...mark, name: e.target.value})}
                                       className="column is-8-desktop"/>
                            }
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Created By
                            </div>
                            <div className="column is-8-desktop">
                                {mark.createdBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Created At
                            </div>
                            <div className="column is-8-desktop">
                                {mark.createdAt}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated By
                            </div>
                            <div className="column is-8-desktop">
                                {mark.updatedBy}
                            </div>
                        </div>
                        <div className="columns">
                            <div className="column is-4-desktop">
                                Updated At
                            </div>
                            <div className="column is-8-desktop">
                                {mark.updatedAt}
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    {(!isEditing && admin) &&
                    <button className="button m-2 is-primary" onClick={onClickEdit}>Edit</button>
                    }
                    {(isEditing && admin) &&
                    <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                    }
                    {(admin) &&
                    <button className="button m-2 is-danger" onClick={onClickDelete}>Delete</button>
                    }
                    <NavLink className="button m-2" to="/marks">Back to List</NavLink>
                </div>
            </>
            }
        </div>
    )
}

export default MarksDetails;
