import { useCallback, useState } from "react";

import OrderList from "./components/OrderList";
import CustomerIdForm from "./components/CustomerIdForm";
import UpdateOrderForm from "./components/UpdateOrderForm";
import UpdateOrder from "./components/UpdateOrder";
import UpdateProductForm from "./components/UpdateProductForm";
import UpdateProduct from "./components/UpdateProduct";
import classes from './App.module.css'

function App() {
    const [orders, setOrders] = useState([])
    const [updateOrder, setUpdateOrder] = useState([])
    const [updateQuantity, setUpdateQuantity] = useState([])
    const [isStatusUpdate, setIsStatusUpdate] = useState(false)
    const [isQuantityUpdate, setIsQuantityUpdate] = useState(false)

    const fetchCustomerHandler = async (custId) => {
        const urlLink = "http://localhost:3001/customer/" + custId + "/orders"
        const response = await fetch(urlLink, {
            type: 'GET',
            dataType: 'jsonp'
        })
        if (!response.ok) {
            throw new Error("Something Went Wrong!")
        }

        const responseData = await response.json()

        const orderData = []
        for (const i in responseData) {
            orderData.push({
                orderId: responseData[i].orderId,
                orderDate: responseData[i].orderDate,
                orderStatus: responseData[i].orderStatus
            })
        }

        setOrders(orderData)
    }

    const fetchOrderHandler = async (orId) => {
        setIsStatusUpdate(true)
        const urlLink = "http://localhost:3001/order/" + orId
        const response = await fetch(urlLink, {
            type: 'GET',
            dataType: 'jsonp'
        })
        if (!response.ok) {
            throw new Error("Something Went Wrong!")
        }

        const responseData = await response.json()

        const updateOrderData = []
        updateOrderData.push({
            _id: responseData[0]._id,
            orderId: responseData[0].orderId,
            orderDate: responseData[0].orderDate,
            orderStatus: responseData[0].orderStatus
        })

        setUpdateOrder(updateOrderData)
    }

    const fetchProductHandler = async (skuId) => {
        setIsQuantityUpdate(true)
        const urlLink = "http://localhost:3001/product/" + skuId
        const response = await fetch(urlLink, {
            type: 'GET',
            dataType: 'jsonp'
        })
        if (!response.ok) {
            throw new Error("Something Went Wrong!")
        }

        const responseData = await response.json()

        const updateProductData = []
        updateProductData.push({
            _id: responseData[0]._id,
            p_name: responseData[0].p_name,
            p_quantity: responseData[0].p_quantity,
            p_id: responseData[0].p_id
        })

        setUpdateQuantity(updateProductData)
    }

    const updateStatusHandler = useCallback(async (updatedStatus, orderID) => {
        const response = await fetch("http://localhost:3001/order/" + orderID, {
            method: 'POST',
            body: new URLSearchParams({
                'orderStatus': updatedStatus
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
        // console.log(response)
        // axios.post(JSON.stringify(urlLink), { orderStatus: updatedStatus })

        setIsStatusUpdate(false)
    })

    const updateQuantityHandler = useCallback(async (updatedQuantity, skuID) => {
        const response = await fetch("http://localhost:3001/product/" + skuID, {
            method: 'POST',
            body: new URLSearchParams({
                'quantity': updatedQuantity
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        })
        setIsQuantityUpdate(false)
    })

    return (
        <div>
            <CustomerIdForm onGetCustomer={fetchCustomerHandler} />
            <OrderList orders={orders} />
            {!isStatusUpdate && <UpdateOrderForm onGetOrder={fetchOrderHandler} />}
            {isStatusUpdate && <UpdateOrder order={updateOrder} onGetUpdatedStatus={updateStatusHandler} />}
            {!isQuantityUpdate && <UpdateProductForm onGetProduct={fetchProductHandler} />}
            {isQuantityUpdate && <UpdateProduct product={updateQuantity} onGetUpdatedQuantity={updateQuantityHandler} />}
        </div >
    );
}

export default App;
