import {useState} from "react";
import {NavLink} from "react-router-dom";
import {ICarMark} from "../../types/ICarMark";
import {CarMarkService} from "../../services/car-mark-service";


const MarksCreate = () => {
    const [mark, setMark] = useState({name: ''} as ICarMark);
    const service = new CarMarkService();

    const onClickSave = () => {
        service.post(mark!).then((res) => {
            if (res.data) {
                window.location.href = `/marks/${res.data.id}`
            }
        })
    }

    return (
        <div className="container">
            <h1>Add new Car Mark</h1>
            <div className="column">
                <hr/>
                <div className="column">
                    <div className="columns">
                        <div className="column is-4-desktop">
                            Name
                        </div>

                        <input onChange={(e) => setMark({...mark, name: e.target.value})}
                               className="column is-8-desktop"/>
                    </div>
                </div>
            </div>
            <div>
                <button className="button m-2 is-success" onClick={onClickSave}>Save</button>
                <NavLink className="button m-2" to="/marks">Back to List</NavLink>
            </div>
        </div>
    )
}

export default MarksCreate;
