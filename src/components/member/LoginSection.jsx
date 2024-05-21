import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { fetchMembers, userLogin } from '@/store/member';
import { fetchCarts } from '@/store/product';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { SiNaver } from "react-icons/si";
import { RiKakaoTalkFill } from "react-icons/ri";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { auth, githubProvider, signInWithPopup } from '@/assets/firebase';
import { getDatabase, ref, push } from 'firebase/database';

const LoginSectionBlock = styled.div`
    max-width:600px; margin:50px auto; 
    table { 
        col:nth-child(1) { width:150px }
        col:nth-child(2) { width:auto }
        td { padding:5px; 
            &:nth-child(1) { text-align:right }
            input { border:1px solid #ddd; height:30px; width:100%;
                text-indent:1em; }
        }
    }
    .btn { text-align:center; margin-top:20px; 
        button { padding:10px; background:red; color:#fff;  }
    }
    .snslogin { padding:50px 50px 50px 150px; 
        div { 
            display:flex; height:40px; line-height:40px; margin:5px 0; cursor:pointer;
            span:nth-child(1) { width:40px; text-align:center; font-size:18px; padding-top:1px }
            span:nth-child(2) { flex:1 }
            &.naver { background:#03c75a;   color:#fff }
            &.kakao { background:yellow;    color:#000 }
            &.google { background:#ea4335;  color:#fff }
            &.github { background:#000;     color:#fff }
        }
    }
`

const LoginSection = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const members = useSelector(state=>state.members.members)
    const [userId, setUserId] = useState("")
    const [userPw, setUserPw] = useState("")

    const userIdRef = useRef("")
    const userPwRef = useRef("")

    const previousUrl = sessionStorage.getItem('previousUrl');
    const choiceProduct = sessionStorage.getItem('choiceProduct')

    useEffect(()=>{
        dispatch(fetchMembers())
    }, [dispatch])

    const handleLogin = (e)=>{
        e.preventDefault()
        if (!userId) {
            alert("이메일을 입력하세요.")
            userIdRef.current.focus()
            return
        }
        if (!userPw) {
            alert("비밀번호를 입력하세요.")
            userPwRef.current.focus()
            return
        }
        let findUser = members.find(item=>item.userId==userId)  // { key:"", userId:""}
        if (findUser) {
            if (findUser.userPw!=userPw) {
                alert("비밀번호가 틀렸습니다.")
                userPwRef.current.focus()
                return false
            } else {
                dispatch(userLogin({findUser:findUser}))
                dispatch(fetchCarts())
                if (previousUrl=='/payment') {
                    navigate(previousUrl, {state:JSON.parse(choiceProduct)})
                    sessionStorage.removeItem('previousUrl')
                } else if (previousUrl=='/product' || previousUrl=='/cart'){
                    navigate(previousUrl)
                    sessionStorage.removeItem('previousUrl')
                } else {
                    navigate('/')                
                }
            }
        } else {
            alert("회원이 아닙니다.")
            userIdRef.current.focus()
            return false
        }
    }

    const handleGitHubLogin = async () => {
        try {
            const result = await signInWithPopup(auth, githubProvider);
            const user = result.user;

            // 사용자 정보로 findUser 객체 생성
            let findUser = members.find(item => item.userId === user.email);
            if (!findUser) {
                try {
                    const database = getDatabase();
                    const newMemberRef = await push(ref(database, 'members'), {
                        mId: Date.now(),
                        userId: user.email,
                        userPw: user.uid,
                        userIrum: '',
                        handphone: '',
                        zipCode: '',
                        addr1: '',
                        addr2: ''
                    });
                    alert('깃허브 계정으로 회원가입에 성공했습니다.');
                    findUser = {
                        key: newMemberRef.key,
                        userId: user.email,
                        userPw: user.uid,
                        userIrum: '',
                        handphone: '',
                        zipCode: '',
                        addr1: '',
                        addr2: ''
                    };
                } catch (error) {
                    console.error('회원가입 오류:', error);
                    return;
                }
            }

            // 로그인 처리
            dispatch(userLogin({ findUser }));
            dispatch(fetchCarts());

            if (previousUrl === '/payment') {
                navigate(previousUrl, { state: JSON.parse(choiceProduct) });
                sessionStorage.removeItem('previousUrl');
            } else if (previousUrl === '/product' || previousUrl === '/cart') {
                navigate(previousUrl);
                sessionStorage.removeItem('previousUrl');
            } else {
                navigate('/');
            }
        } catch (error) {
            console.error('GitHub 로그인 중 오류 발생:', error);
            if (error.code === 'auth/network-request-failed') {
                alert('네트워크 오류가 발생했습니다. 인터넷 연결을 확인하세요.');
            } else {
                alert('로그인 중 오류가 발생했습니다. 나중에 다시 시도하세요.');
            }
        }
    };

    return (
        <LoginSectionBlock>
            <form onSubmit={handleLogin}>
                <table>
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label htmlFor="userId">이메일: </label></td>
                            <td><input ref={userIdRef} type="text" id="userId" name="userId" onChange={ (e)=>setUserId(e.target.value)} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPw">비밀번호: </label></td>
                            <td><input ref={userPwRef} type="password" id="userPw" name="userPw" onChange={ (e)=>setUserPw(e.target.value) } /></td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">로그인</button>
                </div>
            </form>
            <div className="snslogin">
                <div className="naver">
                    <span style={{ fontSize:'15px'}}><SiNaver /></span>
                    <span>네이버 로그인</span>
                </div>
                <div className="kakao">
                    <span><RiKakaoTalkFill /></span>
                    <span>카카오 로그인</span>
                </div>
                <div className="google">
                    <span><FaGoogle /></span>
                    <span>구글 로그인</span>
                </div>
                <div className="github" onClick={handleGitHubLogin}>
                    <span><FaGithub /></span>
                    <span>깃허브 로그인</span>
                </div>
            </div>
        </LoginSectionBlock>
    );
};

export default LoginSection;