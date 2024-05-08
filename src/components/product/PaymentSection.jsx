import React from 'react';
import styled from 'styled-components'

const PaymentSectionBlock = styled.div`
    table.orderList {
        col:nth-child(1) { width:auto}
        col:nth-child(2) { width:150px; }
        col:nth-child(3) { width:150px; }
        thead { th { padding:10px } }
        tbody { td { padding:10px } }
        tfoot {
            td { text-align:center; 
                >div {
                  padding:20px; 
                  display:flex; 
                  justify-content:center; 
                  align-items:center;  
                  >div { margin:0 20px; 
                       p:nth-child(2) { font-size:30px }
                    }
                }
            }
        }
    }

    table.customerInfo {
        col:nth-child(1) { width:150px }
        col:nth-child(2) { width:auto }
    }

`

const PaymentSection = ({product}) => {

    console.log(product)
    const total = product.reduce((acc, item)=>acc+(parseInt(item.product.price) * parseInt(item.qty)), 0)

    return (
        <PaymentSectionBlock>
            <h2>STEP1. 주문하시는 상품</h2>
            <table className="orderList" border="1">
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
                    { product.map((item, index)=>(
                        <tr key={index}>
                            <td><img src={item.product.photo} alt={item.product.name} /> 상품명 : {item.product.name} / 수량 : {item.qty}개 / 가격 : {parseInt(item.product.price).toLocaleString()}원</td>
                            <td style={{textAlign:"right"}}>{(parseInt(item.qty)*parseInt(item.product.price)).toLocaleString()}원</td>
                            <td style={{textAlign:"right"}}>0원</td>
                        </tr>
                    ))
                    }
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan="3">
                            <div>
                                <div>
                                    <p>주문금액</p>
                                    <p>{total.toLocaleString()}원</p>
                                </div>
                                <div style={{fontSize:'30px'}}>
                                    +
                                </div>
                                <div>
                                    <p>배송비</p>
                                    <p>0원</p>
                                </div>
                                <div style={{fontSize:'30px'}}>
                                    =
                                </div>
                                <div>
                                    <p>총 주문금액</p>
                                    <p>{total.toLocaleString()}원</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
            <h2>STEP2. 주문고객/배송지 정보</h2>
            <table className="customerInfo">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <td>주문하시는 분</td>
                        <td>주문하시는 분의 정보를 입력하는 곳입니다.(*는 필수)</td>
                    </tr>
                    <tr>
                        <td>주문지 선택</td>
                        <td>
                            <input type="radio" name="placeType" value="latest" /> 최근주문지
                            <input type="radio" name="placeType" value="default" /> 기본주소(회원정보)
                            <input type="radio" name="placeType" value="self" /> 새로입력
                        </td>
                    </tr>
                    <tr>
                        <td>
                            이름
                        </td>
                        <td>
                            <input type="text" />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                    </tr>
                </tbody>
            </table>
        </PaymentSectionBlock>
    );
};

export default PaymentSection;