import { useRef } from "react"
import classes from './UpdateProduct.module.css'

const UpdateProduct = props => {
    const updatedQuantityRef = useRef()

    const productSKUId = props.product.map((product) => product.p_id)
    const productQuantity = props.product.map((product) => product.p_quantity)

    const quantitySubmitHandler = e => {
        e.preventDefault();
        props.onGetUpdatedQuantity(updatedQuantityRef.current.value, productSKUId);
        updatedQuantityRef.current.value = ""
    }

    return (
        <div className={classes.contain}>
            <p>Product Sku Id {productSKUId}</p>
            <p>Current Product Quantity {productQuantity}</p>
            <form onSubmit={quantitySubmitHandler}>
                <label htmlFor="qty">Update Product Quantity</label>
                <input id="qty" ref={updatedQuantityRef} type="number" name="qty" />
                <button>Update Quantity</button>
            </form>
        </div>
    )
}

export default UpdateProduct;