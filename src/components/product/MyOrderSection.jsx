import React from 'react';
import styled from 'styled-components'

const MyOrderSectionBlock = styled.div`
h2 { margin:20px 0 }
table { margin-bottom:50px }
table.orderList {
    col:nth-child(1) { width:200px}
    col:nth-child(2) { width:auto }
    thead { th { padding:10px } }
    tbody { td { padding:10px } }
}
`

const MyOrderSection = () => {
    return (
        <MyOrderSectionBlock>
            <table className="orderList" border="1">
                <colgroup>
                    <col />
                    <col />
                </colgroup>
                <thead>
                    <tr>
                        <th>주문일자</th>
                        <th>주문상품</th>
                    </tr>
                </thead>
                <tbody>
                    
                </tbody>
            </table>
        </MyOrderSectionBlock>
    );
};

export default MyOrderSection;