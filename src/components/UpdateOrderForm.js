import { useRef } from "react";

import classes from './UpdateOrderForm.module.css'

const UpdateOrderForm = props => {
    const orIdRef = useRef()

    const submitHandler = (e) => {
        const orderId = orIdRef.current.value;
        e.preventDefault();
        props.onGetOrder(orderId)
        orIdRef.current.value = "";
    }

    return (
        <div className={classes.contain}>
            <form onSubmit={submitHandler}>
                <label htmlFor="orId">Order Id</label>
                <input type="text" id="orId" name="orderId" ref={orIdRef} required />
                <button>Fetch Order</button>
            </form>
        </div>
    )
}

export default UpdateOrderForm;