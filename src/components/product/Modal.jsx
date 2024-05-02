import React from 'react';
import styled from 'styled-components'
import {useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'

const ModalBlock = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0; 
    z-index:999999999;
    background:rgba(0,0,0,0.5);
    display:none;
    &.on { display:block; }
    .modalContent {
        position:absolute; top:50%; left:50%; transform:translate(-50%, -50%);
        width:308px; text-align:center; color:#555; background:#fff; 
        h2 { text-align:left; background:red; color:#fff; 
            padding:10px; margin:0; font-size:20px; }
        p { padding:30px 0 }
        .btn { padding:20px 0; 
            button { border:1px solid #ddd; padding:5px; margin:0 5px }
        }
    }
`

const Modal = ({product, qty, modalOpen, onReset}) => {
    const user = useSelector(state=>state.members.user)
    const navigate = useNavigate()
    const {open, what} = modalOpen

    const onCart = ()=>{
        navigate("/cart", {state : {product:product, qty:qty}})
    }

    const onBuy = ()=>{
        if (!user) {
            alert("로그인을 하십시오.")
            sessionStorage.setItem("nextUrl", "/payment")
            sessionStorage.setItem("choiceProduct", JSON.stringify({product:product, qty:qty}))
            navigate("/login")
        } else {
          navigate("/payment", {state : { product:product, qty:qty }})
        }
    }

    return (
        <ModalBlock className={ open && "on" }>
            {  what=="buy" ?
                <div className="modalContent">
                    <h2>확인</h2>
                    <p>바로구매를 진행하시겠습니까?</p>
                    <div className="btn">
                        <button onClick={onBuy}>확인</button>
                        <button onClick={onReset}>취소</button>
                    </div>
                </div>
                :
                <div className="modalContent">
                    <h2>확인</h2>
                    <p>상품이 장바구니에 담겼습니다.<br />바로 확인하시겠습니까?</p>
                    <div className="btn">
                        <button onClick={onCart}>확인</button>
                        <button onClick={onReset}>취소</button>
                    </div>
                </div>
            }
        </ModalBlock>
    );
};

export default Modal;