import { useRef } from "react";
import classes from './CustomerIdForm.module.css'

const CustomerIdForm = props => {
    const idRef = useRef();

    const submitHandler = (e) => {
        const customerId = idRef.current.value;
        e.preventDefault();
        props.onGetCustomer(customerId)
        idRef.current.value = "";
    }
    return (
        <div className={classes.contain}>
            <form onSubmit={submitHandler}>
                <label htmlFor="custId">Customer Id</label>
                <input type="text" id="custId" name="custId" ref={idRef} required />
                <button>Fetch Orders</button>
            </form>
        </div>
    )
}

export default CustomerIdForm;