import React, {useEffect} from 'react';
import {Link} from 'react-router-dom'
import { productDB, orderDB, cartDB } from '@/assets/firebase'
import dayjs from 'dayjs'
import { useDispatch} from 'react-redux'
import { fetchCarts} from '@/store/product'

const PaymentFinishSection = ({userKey, product}) => {
    
    const dispatch = useDispatch()    

    const updateProductsToFirebase = (updateProducts)=>{
        updateProducts.forEach((item)=>{
            productDB.child(item.product.key).transaction((productData)=>{
                if (productData) {
                    productData.inventory = parseInt(productData.inventory) - parseInt(item.qty)
                }
                return productData; 
            }).then(() => {
                console.log('수량이 업데이트되었습니다.');
            }).catch((error) => {
                console.error('수량 업데이트 중 오류 발생:', error);
            });
        })
    }

    const saveOrderToFirebase = (userKeys, products) => {
        const date = new Date().toISOString(); // 주문일 생성
        const orderItemRef = orderDB.child(userKeys).child(dayjs(date).format('YYYY-MM-DD(HH:mm:ss)')) // 주문 정보를 저장할 레퍼런스 생성
        products.forEach((item, index)=>{
            orderItemRef.child(index).set({
                id : item.product.id,
                name: item.product.name, // 주문 상품명
                price : item.product.price,
                photo : item.product.photo,
                quantity: item.qty, // 주문 수량
            }).then(() => {
                console.log('주문이 성공적으로 저장되었습니다.');
            }).catch((error) => {
                console.error('주문 정보 저장 중 오류 발생:', error);
            });
        })
    }

    const updateCartsToFirebase = (userKeys, products)=>{
        products.forEach((item) => {
            const { product } = item; // 상품 가져오기
            const { id } = product; // 상품 ID 가져오기
            cartDB.child(userKeys).child(id).remove()
            .then(() => {
                console.log('장바구니가 업데이트되었습니다.');
            })
            .catch((error) => {
                console.error('업데이트 중 오류 발생:', error);
            });
        });
    }

    const handlePaymentComplete = (userKeys, products) => {
        updateProductsToFirebase(products); // 먼저 재고를 업데이트
        saveOrderToFirebase(userKeys, products); // 주문 정보를 저장
        updateCartsToFirebase(userKeys, products); // 장바구니 업데이트
    };

    useEffect(()=>{
        handlePaymentComplete(userKey, product);
        dispatch(fetchCarts())
    }, [])

    return (
        <div>
            <p style={{ fontSize:'50px', margin:'50px 0', textAlign:'center'}}>결제가 완료되었습니다. </p>
            <p style={{ fontSize:'30px', margin:'50px 0', textAlign:'center'}}>
                <Link to="/product" style={{ padding:'10px', background:'red'}}>계속쇼핑</Link>
            </p>
        </div>
    );
};

export default PaymentFinishSection;