import React from 'react';
import styled from 'styled-components'

const PaymentSectionBlock = styled.div`
    table {
        col:nth-child(1) { width:auto}
        col:nth-child(2) { width:150px; }
        col:nth-child(3) { width:150px; }
        thead { th { padding:10px } }
        tbody { td { padding:10px; text-align:right; } }
        tfoot {
            td {
                text-align:center; 
                >div {
                    padding:20px;
                    display:flex; 
                    justify-content:center; 
                    align-items:center; 
                    div { 
                        margin:0 20px; 
                        p:nth-child(2) { font-size:30px }
                    }
                }
            }
        }
    }
`

const PaymentSection = ({product, qty}) => {
    return (
        <PaymentSectionBlock>
           <table border="1">
                <colgroup>
                    <col />
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>상품명</th>
                        <th>주문금액</th>
                        <th>배송비</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={{ textAlign:'left'}}>
                            <img src={product.photo} alt={product.name} />
                            상품명 : {product.name} / 수량 : {qty}개 / 가격 : {parseInt(product.price).toLocaleString()}원 
                        </td>
                        <td>
                            { (parseInt(qty) * parseInt(product.price)).toLocaleString() }원
                        </td>
                        <td>0원</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <div>
                                <div>
                                    <p>주문금액</p>
                                    <p>
                                        { (parseInt(qty) * parseInt(product.price)).toLocaleString() }원
                                    </p>
                                </div>
                                <div style={{ fontSize:'50px', color:'red' }}>
                                    +
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>0원</p>
                                </div>
                                <div style={{ fontSize:'50px', color:'red' }}>
                                    =
                                </div>
                                <div>
                                    <p>총 주문금액</p>
                                    <p>
                                       { (parseInt(qty) * parseInt(product.price)).toLocaleString() }원
                                    </p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
           </table>
        </PaymentSectionBlock>
    );
};

export default PaymentSection;