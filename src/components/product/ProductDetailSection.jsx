import React from 'react';
import styled from 'styled-components'

const ProductDetailSectionBlock = styled.div`
  h2 {
    text-align: center;
    font-size: 30px;
    margin: 20px 0;
  }
  .content {
    display: flex;
    .photo {
      width: 300px;
      margin-right: 50px;
    }
    .info {
      flex: 1;
      button {
        background: red;
        color: #fff;
        padding: 10px 20px;
        margin: 10px 0;
      }
    }
  }
`

const ProductDetailSection = ({product}) => {
    return (
        <ProductDetailSectionBlock className="row"> 
            <h2>{ product.name }</h2>
            <div className="content">
                <div className="photo">
                    <img src={product.photo} alt={product.name} />
                </div>
                <div className="info">
                    <p>이 상품의 아이디는 { product.id }</p>
                    <p>카테고리 : { product.category }</p>
                    <p>가격 : { product.price.toLocaleString() }</p>
                    <p>요약설명 : <span dangerouslySetInnerHTML={{ __html: product.description }} /></p>
                </div>
            </div>
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;