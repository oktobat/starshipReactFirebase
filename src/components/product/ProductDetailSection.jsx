import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Modal from '@/components/product/Modal'
import {fetchCarts  } from '@/store/product'
import {cartDB, productDB } from '@/assets/firebase'

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
      #quantity { padding:5px;  }
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

   const dispatch = useDispatch()
   const navigate = useNavigate()
   const carts = useSelector(state=>state.products.carts)
   const user = useSelector(state=>state.members.user)
   const [modalOpen, setModalOpen] = useState({open:false, what:""})
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

   const onReset = ()=>{
      setModalOpen({open:false, what:""})
   }
 

   const cartIdCount = (id) => {
      const userItem = carts.find(value=>value.key==id)
      if (userItem) {
          return userItem.qty
      } else {
          return 0
      }
  }


   const addToCart = async (id)=>{
      if (user) {
        try {
            const cartItemRef = cartDB.child(user.key).child(id); // 해당 유저의 레퍼런스 생성
            const cartItemSnapshot = await cartItemRef.once('value'); // 해당 유저의 스냅샷 가져오기
            let quantity = 1;
            if (cartItemSnapshot.exists()) { // 해당 유저가 이미 장바구니에 있는 경우 수량을 증가시킴
                quantity = cartItemSnapshot.val().qty + qty;
            }
            // 장바구니에 상품 추가 또는 업데이트
            await cartItemRef.set({qty:quantity });
            dispatch(fetchCarts()).then(()=>{
              setModalOpen({open:true, what:"cart"});
            })
        } catch(error){
            console.log("오류메시지:", error)
        }
    } else {
      alert("로그인하세요.")
      sessionStorage.setItem('previousUrl', '/product');
      navigate("/login")
    }
}

const removeProduct = async (e, key, id)=>{
  e.preventDefault()
  const answer = confirm("정말로 삭제하시겠습니까?")
  if (answer) {
      try {
          await productDB.child(key).remove()
          const cartsSnapshot = await cartDB.once('value');
          if (cartsSnapshot.val()){
            const userCartsObj = cartsSnapshot.val()
            for (const userCartKey in userCartsObj) {
              const userProductsObj = userCartsObj[userCartKey];
              for (const productId in userProductsObj) {
                if (productId == id) {
                  // 해당 상품 ID를 가진 항목 삭제
                  await cartDB.child(userCartKey).child(productId).remove();
                }
              }
            }
          }
          navigate('/product')
      } catch(error){
          console.log("오류 : ", error)
      }
  } else {
      return
  }
}


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
                    <p>
                      구매수량 : { product.inventory - cartIdCount(product.id) ? <input id="quantity" type="number" value={qty} onChange={handleChange} /> : <span>품절!</span> }
                    </p>
                    <p>
                      고객만족도 : <span style={{marginRight:'10px'}}>{Math.round(product.averageRating*100)/100}점</span>
                      { 
                          Array.from({length:5}).map((_, index)=>(
                            <span 
                            key={index} 
                            style={{ color: index < product.averageRating ? 'red' : '#ddd'}}
                            >★</span>
                          ))
                      }
                    </p>
                    <div className="btn">
                    { product.inventory - cartIdCount(product.id) ?
                      <>
                        <a href="#" onClick={(e)=>{e.preventDefault(); addToCart(product.id); }}>장바구니</a>
                        <a href="#" onClick={(e)=>{e.preventDefault(); setModalOpen({open:true, what:"buy"})}}>구매하기</a>
                      </>
                      : ""
                      }
                      { (user && user.userId=='tsalt@hanmail.net') && <Link to="/productModify" state={{ product  }}>상품수정</Link>}
                      { (user && user.userId=='tsalt@hanmail.net') && <a href="#" onClick={ (e)=>removeProduct(e, product.key, product.id) }>상품삭제</a>}
                    </div>
                </div>
            </div>
            <Modal modalOpen={modalOpen} onReset={onReset} product={product} qty={qty} />
        </ProductDetailSectionBlock>
    );
};

export default ProductDetailSection;