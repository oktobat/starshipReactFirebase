import React from 'react';
import styled from 'styled-components'

const ModalBlock = styled.div`
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0; 
    z-index:999999999;
    background:rgba(0,0,0,0.5);
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

const Modal = () => {
    return (
        <ModalBlock>
            <div className="modalContent">
                <h2>확인</h2>
                <p>바로구매를 진행하시겠습니까?</p>
                <div className="btn">
                    <button onClick="">확인</button>
                    <button onClick="">취소</button>
                </div>
            </div>
        </ModalBlock>
    );
};

export default Modal;