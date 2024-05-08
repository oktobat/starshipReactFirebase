import React, {useState} from 'react';
import styled from 'styled-components'
import {Link, useNavigate} from 'react-router-dom'
import {noticeDB, reviewDB } from '@/assets/firebase'
import {useSelector} from 'react-redux'

const BoardWriteBlock = styled.div`
max-width:600px; margin:0 auto 50px; 
table {
    col:nth-child(1) { width:100px; }
    col:nth-child(2) { width:auto; }
    td { padding:5px;
        input { width:100%; border:1px solid #ddd; height:30px; padding:5px; }
        textarea { width:100%; border:1px solid #ddd; padding:5px; height:200px }
    }
}
.btn { text-align:center; margin-top:20px;
    button, a { margin:0 10px; padding:10px 20px; background:#ddd;
        font-size:14px }
}
`

const BoardWrite = ({type}) => {
    const user = useSelector(state=>state.members.user)
    const navigate = useNavigate()

    const [board, setBoard] = useState({
        subject:"",
        content:""
    })

    const handleChange = (e)=>{
        console.log(e)
        const {value, name} = e.target
        setBoard(post=>({...post, [name]:value }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        const date = new Date().toISOString()
        if (type=="notice") {
            noticeDB.push({...board, writer:user.userId, hit:0, date:date})
        } else if (type=="review") {
            reviewDB.push({...board, writer:user.userId, hit:0, date:date})
        }
        navigate("/boardList")
    }

    return (
        <BoardWriteBlock>
            <form onSubmit={onSubmit}>
                <table border="1">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td>작성자</td>
                            <td><input type="text" name={user.userId} value={user.userId} disabled /></td>
                        </tr>
                        <tr>
                            <td>제목</td>
                            <td><input type="text" name="subject" value={board.subject} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td>내용</td>
                            <td><textarea name="content" value={board.content} onChange={handleChange}></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="btn">
                    <button type="submit">작성</button>
                    <Link to="/boardList">목록</Link>
                </div>
            </form>
        </BoardWriteBlock>
    );
};

export default BoardWrite;