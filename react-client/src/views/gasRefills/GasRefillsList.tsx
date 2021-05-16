import {NavLink} from "react-router-dom";
import {useEffect, useState} from "react";
import {EPageStatus} from "../../types/EPageStatus";
import {IGasRefill} from "../../types/IGasRefill";
import {GasRefillsService} from "../../services/gas-refills-service";
import {useStore} from "react-context-hook";

const GasRefillsList = () => {
    const [resources] = useStore('resources')

    const [gasRefills, setGasRefills] = useState([] as IGasRefill[]);
    const [pageStatus, setPageStatus] = useState({pageStatus: EPageStatus.Loading, statusCode: -1});
    const service = new GasRefillsService();

    const loadData = async () => {
        let result = await service.getAll();

        if (result.data) {
            setPageStatus({pageStatus: EPageStatus.OK, statusCode: 0});
            setGasRefills(result.data!);
        } else {
            setPageStatus({pageStatus: EPageStatus.Error, statusCode: result.statusCode});
        }
    }
    useEffect(() => {
        loadData();
    }, []);
    return (
        <>
            <div className="columns m-6">
                <NavLink to="/refills/create">{resources.Common.Create}</NavLink>
            </div>
            <div className="column is-10-desktop m-6">
                <table className="table">
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.GasRefill.AmountRefilled}</th>
                        <th>{resources.Dto.GasRefill.Cost}</th>
                        <th>{resources.Dto.GasRefill.Timestamp}</th>
                        <th>{resources.Dto.GasRefill.CarId}</th>
                    </tr>
                    </thead>
                    <tfoot>
                    <tr>
                        <th>Id</th>
                        <th>{resources.Dto.GasRefill.AmountRefilled}</th>
                        <th>{resources.Dto.GasRefill.Cost}</th>
                        <th>{resources.Dto.GasRefill.Timestamp}</th>
                        <th>{resources.Dto.GasRefill.CarId}</th>
                    </tr>
                    </tfoot>
                    <tbody>
                    {
                        gasRefills.map((refill) =>
                            <tr key={refill.id}>
                                <th><NavLink to={'/refills/' + refill.id}>{refill.id}</NavLink></th>
                                <td>{refill.amountRefilled}</td>
                                <td>{refill.cost}</td>
                                <td>{refill.timestamp}</td>
                                <td>{refill.carId}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default GasRefillsList;
