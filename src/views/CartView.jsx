import React from 'react';
import styled from 'styled-components'
import Title from '@/components/layout/Title'
import CartSection from '@/components/cart/CartSection'
import {useLocation} from 'react-router-dom'

const CartViewBlock = styled.div`
    max-width:900px; margin:50px auto;
`
const CartView = () => {
    const location = useLocation()
    const {product, qty} = location.state
    console.log(product, qty)
    return (
        <CartViewBlock>
            <Title title="Cart" />
            <CartSection product={product} qty={qty} />
        </CartViewBlock>
    );
};

export default CartView;