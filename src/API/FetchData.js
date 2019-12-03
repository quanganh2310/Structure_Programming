export async function fetchData() {
    try {
        let response = await fetch('https://online-selling-website.herokuapp.com/deliveries')
        let data = await response.json()
        console.log('data:',data)
        data = data.deliveries
        data = data.map(delivery => ({
            order_id: `${delivery.order_id}`,
            delivery_unit_id: `${delivery.delivery_unit_id}`,
            shipper_id: `${delivery.shipper_id}`,
            receiver_phone: `${delivery.receiver_phone}`,
            receiving_address: `${delivery.receiving_address}`,
            total_cost: `${delivery.total_cost}`,
            status: `${delivery.status}`,
            success: `${delivery.success}`
        }))
        return data
    } catch (error) {
        console.log('parsing failed', error)
        return error
    }
}