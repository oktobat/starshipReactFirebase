import React from 'react';
import {useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
import BoardDetail from '@/components/board/BoardDetail'
import styled from 'styled-components'

const BoardDetailViewBlock = styled.div`
    h2 { 
        font-size:30px; text-align:center; margin:30px 0; 
    }
`
const BoardDetailView = () => {
    const location = useLocation()
    const { post } = location.state
    const type = useSelector(state=>state.boards.type)
    return (
        <BoardDetailViewBlock className="row">
            <h2>{type}</h2>
            <BoardDetail post={post} />
        </BoardDetailViewBlock>
    );
};

export default BoardDetailView;