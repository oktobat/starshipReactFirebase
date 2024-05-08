import React from 'react';
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import BoardWrite from '@/components/board/BoardWrite'

const BoardWriteViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`

const BoardWriteView = () => {
    
    const type = useSelector(state=>state.boards.type)

    return (
        <BoardWriteViewBlock className="row">
            <h2>{ type }</h2>
            <BoardWrite type={type} />
        </BoardWriteViewBlock>
    );
};

export default BoardWriteView;