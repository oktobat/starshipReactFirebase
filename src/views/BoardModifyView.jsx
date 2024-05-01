import React from 'react';
import {useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import BoardModify from '@/components/board/BoardModify'

const BoardModifyViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`

const BoardModifyView = () => {
    const location = useLocation()
    const {post} = location.state
    const type = useSelector(state=>state.boards.type)
    return (
        <BoardModifyViewBlock className="row">
            <h2>{type}</h2>
            <BoardModify post={post} />
        </BoardModifyViewBlock>
    );
};

export default BoardModifyView;