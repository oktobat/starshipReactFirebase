import React, {useEffect} from 'react';
import {useLocation, Link} from 'react-router-dom'
import {productDB, cartDB} from '@/assets/firebase'
import {useSelector, useDispatch} from 'react-redux'
import {fetchProducts, fetchCarts} from '@/store/product'

const PaymentFinishView = () => {
    const user = useSelector(state=>state.members.user)
    const dispatch = useDispatch()
    const location = useLocation()
    const {product} = location.state

    useEffect(()=>{
        product.map((item, index)=>{
            productDB.child(item.product.key).update({...item.product, inventory: parseInt(item.product.inventory) - item.qty })
            .then(() => {
                console.log('수량이 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('수량 업데이트 중 오류 발생:', error);
            });
            cartDB.child(user.key).child(item.product.id).remove()
            .then(()=>{
                console.log('장바구니가 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('업데이트 중 오류 발생:', error);
            });
        })
        dispatch(fetchProducts());        
        dispatch(fetchCarts())
    }, [])

    return (
        <div className="row">
            <p style={{ fontSize:'50px', margin:'50px 0', textAlign:'center'}}>결제가 완료되었습니다. </p>
            <p style={{ fontSize:'30px', margin:'50px 0', textAlign:'center'}}>
                <Link to="/product" style={{ padding:'10px', background:'red'}}>계속쇼핑</Link>
            </p>
        </div>
    );
};

export default PaymentFinishView;