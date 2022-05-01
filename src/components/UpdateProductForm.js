import { useRef } from "react";

import classes from './UpdateProductForm.module.css'

const UpdateProductForm = props => {
    const prIdRef = useRef()

    const submitHandler = (e) => {
        const productId = prIdRef.current.value;
        e.preventDefault();
        props.onGetProduct(productId)
        prIdRef.current.value = "";
    }

    return (
        <div className={classes.contain}>
            <form onSubmit={submitHandler}>
                <label htmlFor="prId">Product Sku Id</label>
                <input type="text" id="prId" name="productId" ref={prIdRef} required />
                <button>Fetch Product</button>
            </form>
        </div>
    )
}

export default UpdateProductForm;