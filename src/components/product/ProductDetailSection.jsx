import React, {useState, useEffect} from 'react';
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Modal from '@/components/product/Modal'

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
      .btn {
        a { padding:10px 20px; background:red; color:#fff; margin:20px 5px;
          &:nth-child(2) { background:blue }
          &:nth-child(3) { background:black }
        }
      }
    }
  }
`

const ProductDetailSection = ({product}) => {

   const admin = useSelector(state=>state.members.admin)
   const [loging, setLoging] = useState(false)
   const [qty, setQty] = useState(1)

   const handleChange = (e)=>{
      let newQty = parseInt(e.target.value)
      if (newQty<1) {
        newQty = 1
      }
      if (newQty>product.inventory) {
          newQty = product.inventory
      }
      setQty(newQty)
   }
   
   useEffect(()=>{
     setLoging(admin)
   }, [admin])

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
                    <p>구매수량 : <input type="number" value={qty} onChange={ handleChange } /></p>
                    <div className="btn">
                      <a href="#">장바구니</a>
                      <a href="#">구매하기</a>
                      { loging && <Link to="/productModify" state={{ product  }}>상품수정</Link>}
                    </div>
                </div>
            </div>
            <Modal product={product} qty={qty} />
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;