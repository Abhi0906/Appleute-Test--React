import classes from './OrderList.module.css'

const OrderList = props => {
    const orderList = props.orders.map((order) => (
        <ul key={order.orderId}>
            <li>Order Id {order.orderId}</li>
            <ul key={order.orderId}>
                <li>
                    Order Status - {order.orderStatus}
                </li>
                <li>
                    OrderDate - {order.orderDate}
                </li>
            </ul>
        </ul>
    ));
    return (
        <div className={classes.listContainer}>
            {orderList}
        </div>
    )
}

export default OrderList