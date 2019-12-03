import React, {Component} from "react"

// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
// https://swapi.co/
// https://medium.com/javascript-scene/master-the-javascript-interview-what-is-a-promise-27fc71e77261
// var data = {
//     "deliveries": [
//         {
//             "order_id": 1,
//             "delivery_unit_id": 1,
//             "shipper_id": null,
//             "receiving_address": "1 Dai Co Viet St., Hai Ba Trung, Hanoi",
//             "receiver_phone": "0354417676",
//             "total_cost": 350000,
//             "expected_receving_date": "\"2019-11-24 11:26:44.836606\"",
//             "status": 0
//         },
//         {
//             "order_id": 2,
//             "delivery_unit_id": 5,
//             "shipper_id": null,
//             "receiving_address": "1 Dai Co Viet St., Hai Ba Trung, Hanoi",
//             "receiver_phone": "0354417676",
//             "total_cost": 350000,
//             "expected_receving_date": "\"2019-11-24 11:26:52.724475\"",
//             "status": 0
//         },
//         {
//             "order_id": 3,
//             "delivery_unit_id": 5,
//             "shipper_id": null,
//             "receiving_address": "1 Dai Co Viet St., Hai Ba Trung, Hanoi",
//             "receiver_phone": "0354417676",
//             "total_cost": 350000,
//             "expected_receving_date": "\"2019-11-25 11:52:39.923897\"",
//             "status": 0
//         }
//     ]
// }

export default class App extends Component {

    constructor() {
        super()
        this.state = {
            loading: true,
            deliveries: []
        }
    }
    
    componentDidMount() {
        this.fetchData();
    }

    fetchData() {
        fetch('https://online-selling-website.herokuapp.com/deliveries')
            .then(response => response.json())
            .then(parsedJSON => parsedJSON.deliveries.map(delivery => (
                {
                    order_id : `${delivery.order_id}`,
                    delivery_unit_id: `${delivery.delivery_unit_id}`,
                    shipper_id: `${delivery.shipper_id}`,
                    receiver_phone: `${delivery.receiver_phone}`,
                    receiving_address: `${delivery.receiving_address}`,
                    total_cost: `${delivery.total_cost}`,
                    status: `${delivery.status}`,
                    success: `${delivery.success}`
                }
            )))
            .then(deliveries => this.setState({
                deliveries,
                loading: false
            }))
            .catch(error => console.log('parsing failed', error));
    }
    
    render() {
        const {loading, deliveries} = this.state
        return (
            <div>
            {
                !loading && deliveries.length >0 ? deliveries.map(delivery => {
                    const {order_id, receiver_phone, receiving_address} = delivery
                    return (<div key={order_id}>
                        <p>{order_id}</p>
                        <p>{receiver_phone}</p>
                        <p>{receiving_address}</p>
                    </div>)
                }) : null
            }
            </div>
        )
    }
}

