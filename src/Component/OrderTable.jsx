import React from 'react';

function OrderTable(props) {
    const {order}=props;
    const {items}=order;
    return (
        <div className="d-flex w-50 justify-content-center align-items-center flex-column">
            <div className="w-50 text-white mb-2">
                <h2>Ordered on:- {order.date} </h2>
            </div>
            <table className="table w-100 table-dark table-hover">
                <thead>
                <tr>
                    <th style={{color:'rgb(0, 255, 64)'}} scope="col">Title</th>
                    <th style={{color:'rgb(0, 255, 64)'}} scope="col">Price</th>
                    <th style={{color:'rgb(0, 255, 64)'}} scope="col">Quantity</th>
                    <th style={{color:'rgb(0, 255, 64)'}} scope="col">Total Price</th>
                </tr>
                </thead>
                <tbody className="table-group-divider">
                {items.map((item)=> (
                    <tr>
                        <td scope="row">{item.title}</td>
                        <td>${item.price}</td>
                        <td>{item.count}</td>
                        <td>{item.price*item.count}</td>
                    </tr>
                ))}
                <tr >
                    <th className="text-danger" colSpan="3" align={"center"} scope="row">Total Order Amount:- </th>
                    <th className="text-danger">{order.totalPrice}</th>
                </tr>
                </tbody>
            </table>
        </div>
    );
}

export default OrderTable;