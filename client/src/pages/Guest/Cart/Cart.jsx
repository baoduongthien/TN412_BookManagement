
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { changeCart } from '../../../redux/cartSlice.js';

function Cart() {

    const dispatch = useDispatch();
    const cart = useSelector(state => state.cart.detail);
    
    function caculate(cart) {
        return cart.reduce((acc, book) => acc + book.quantity * book.price, 0);
    }

    const [total, setTotal] = useState(() => caculate(cart));

    function handleDelete(id) {
        const newCart = cart.filter(book => book.id !== id);
        dispatch(changeCart(newCart));
        setTotal(caculate(newCart));
    }

    function handleChangeQuantity(e, id) {
        if (e.target.value > 0) {
            const newCart = cart.map(book => book.id === id ? {...book, quantity: e.target.value} : book);
            dispatch(changeCart(newCart));
            setTotal(caculate(newCart));
        }
        else if (e.target.value === '0') {
            handleDelete(id);
        }
        else {
            alert('Số lượng không hợp lệ!');            
        }
    }

    return (
        <div className="pb-4 pt-4">
            <h1>Giỏ hàng</h1>
            <h4>Tổng số sản phẩm {cart.length}</h4>
            <table className="table">
                <thead>
                    <tr>
                        <th className="col-1">STT</th>
                        <th className="col-3">Ảnh</th>
                        <th className="col-3">Tên sách</th>
                        <th className="col-2">Số lượng</th>
                        <th className="col-2">Đơn giá</th>
                        <th className="col-1"></th>
                    </tr>
                </thead>
                <tbody>
                    {cart.length > 0 ? cart.map((book, index) => (
                        <tr key={index}>
                            <th scope="row">{index + 1}</th>
                            <th>
                                <img src={book.thumbnail} alt="book" style={{maxWidth: '200px', maxHeight: '200px'}} />
                            </th>
                            <td>{book.name}</td>

                            <td>
                                <input type="number" value={book.quantity} onChange={(e) => handleChangeQuantity(e, book.id)} />
                            </td>
                            <td>{book.price} VNĐ</td>
                            <td>
                                <button onClick={() => handleDelete(book.id)} className="btn btn-danger" style={{ marginLeft: '4px' }}>Xóa</button>
                            </td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={6} className="text-center">Giỏ hàng trống</td>
                        </tr>
                    )}

                </tbody>
            </table>
            { cart.length > 0 && <h4>Thành tiền: {total}</h4>}
            { cart.length > 0 && <button className="btn btn-primary" onClick={() => alert('Chức năng đang phát triển')}>Thanh toán</button>}
            <Link to="/books" className="btn btn-outline-primary" style={{marginLeft: '4px'}}>Quay lại</Link>
        </div>
    );
}

export default Cart;