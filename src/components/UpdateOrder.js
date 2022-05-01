import { useRef } from "react"
import classes from './UpdateOrder.module.css'

const UpdateOrder = props => {
    const updatedStatusRef = useRef()

    const orderId = props.order.map((order) => order.orderId)
    const ID = props.order.map((order) => order._id)
    const orderStatus = props.order.map((order) => order.orderStatus)

    const statusSubmitHandler = e => {
        e.preventDefault();
        props.onGetUpdatedStatus(updatedStatusRef.current.value, ID);
        updatedStatusRef.current.value = ""
    }

    return (
        <div className={classes.contain}>
            <p>Order Id {orderId}</p>
            <p>Current Order Status {orderStatus}</p>
            <form onSubmit={statusSubmitHandler}>
                <label htmlFor="stat">Update Order Status</label>
                <input id="stat" ref={updatedStatusRef} type="text" name="stat" />
                <button>Update Status</button>
            </form>
        </div>
    )
}

export default UpdateOrder;