import React, {useRef, useState, useEffect} from 'react';
import styled from 'styled-components'
import { memberDB } from '@/assets/firebase'
import {useNavigate} from 'react-router-dom'
import { fetchMembers } from '@/store/member'
import { useDispatch, useSelector } from 'react-redux'

const JoinSectionBlock = styled.div`
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
`

const JoinSection = () => {
    const dispatch = useDispatch()
    const members = useSelector(state=>state.members.members)

    const navigate = useNavigate()
    const userIdRef = useRef("")
    const userPwRef = useRef("")
    const userPwOkRef = useRef("")
    const mZipcodeRef = useRef("")
    const mAddressRef = useRef("")
    const mAddressSubRef = useRef("")
    const [userInfo, setUserInfo] = useState({
        userId:"",
        userPw:"",
        userPwOk:"",
        userIrum:"",
        handphone:"",
        zipCode : "",
        addr1 : "",
        addr2:""
    })

    const handleChange = (e)=>{
        const {value, name } = e.target
        setUserInfo(userInfo=>({...userInfo, [name]:value}))
    }

    
    const register = async (e) =>{
        e.preventDefault()
        if (!userInfo.userId) {
            alert("이메일을 입력하세요.")
            userIdRef.current.focus()
            return
        }
        if (!userInfo.userPw) {
            alert("비밀번호를 입력하세요.")
            userPwRef.current.focus()
            return
        }
        if (!userInfo.userPwOk) {
            alert("비밀번호를 입력하세요.")
            userPwOkRef.current.focus()
            return
        }
        if (userInfo.userPw!=userInfo.userPwOk){
            alert("비밀번호가 일치하지 않습니다.")
            userPwRef.current.focus()
            return
        }

        if (!idCheck(userInfo.userId)) {
            return false;
        }

        const addMember = {mId:Date.now(), userId:userInfo.userId, userPw:userInfo.userPw, userIrum:userInfo.userIrum, handpone:userInfo.handphone, zipCode:userInfo.zipCode, addr1:userInfo.addr1, addr2:userInfo.addr2}
        try {
            await memberDB.push(addMember)
            alert("회원가입이 성공했습니다.")
            navigate('/login')
        } catch(error){
            console.log("오류 : ", error)
        }
    }
    
    const idCheck = (value)=>{
        let duplicate = members.find(item=>item.userId==value)
        console.log(duplicate)
        if (duplicate) {
            alert("중복된 아이디입니다.");
            userIdRef.current.focus();
            return false
        } else {
            return true
        }
    }

    useEffect(()=>{
        dispatch(fetchMembers())
    }, [])

    useEffect(() => {
        // daum.Postcode 스크립트를 동적으로 로드
        const script = document.createElement('script');
        script.src = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
        script.async = true;
        document.body.appendChild(script);
    
        // 스크립트가 로드된 후 실행될 함수
        script.onload = () => {
          // daum.Postcode 객체 생성
          window.openDaumPostcode = () => {
            new window.daum.Postcode({
              oncomplete: (data) => {
                let fullAddr = ''; // 최종 주소 변수
                let extraAddr = ''; // 조합형 주소 변수
                if (data.userSelectedType === 'R') { // 사용자가 도로명 주소를 선택했을 경우
                  fullAddr = data.roadAddress;
                } else { // 사용자가 지번 주소를 선택했을 경우(J)
                  fullAddr = data.jibunAddress;
                }
                if (data.userSelectedType === 'R') {
                  if (data.bname !== '') {
                    extraAddr += data.bname;
                  }
                  if (data.buildingName !== '') {
                    extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
                  }
                  fullAddr += (extraAddr !== '' ? ' (' + extraAddr + ')' : '');
                }
                // 주소 정보를 입력 요소에 설정
                setUserInfo(prevState => ({
                    ...prevState,
                    zipCode: data.zonecode,
                    addr1: fullAddr
                }));
                mAddressSubRef.current.focus();
              },
            }).open();
          };
        };
      }, []);

    return (
        <JoinSectionBlock>
            <form onSubmit={register}>
                <table border="0">
                    <colgroup>
                        <col />
                        <col />
                    </colgroup>
                    <tbody>
                        <tr>
                            <td><label htmlFor="userId">이메일 : </label></td>
                            <td><input type="text" name="userId" id="userId" ref={userIdRef} value={userInfo.userId} onChange={(e)=>{handleChange(e); idCheck(e.target.value)}} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPw">비밀번호 : </label></td>
                            <td><input type="password" name="userPw" id="userPw" ref={userPwRef} value={userInfo.userPw} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userPwOk">비밀번호확인 : </label></td>
                            <td><input type="password" name="userPwOk" id="userPwOk" ref={userPwOkRef} value={userInfo.userPwOk} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="userIrum">이름 : </label></td>
                            <td><input type="text" name="userIrum" id="userIrum" value={userInfo.userIrum} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td><label htmlFor="handphone">휴대폰번호 : </label></td>
                            <td><input type="text" name="handphone" id="handphone" value={userInfo.handphone} onChange={handleChange} /></td>
                        </tr>
                        <tr>
                            <td rowSpan="3"><label htmlFor="addr1">주소 : </label></td>
                            <td>
                                <button type="button" onClick={window.openDaumPostcode} style={{ height:'30px', verticalAlign:'middle', padding:'0 5px', marginRight:'5px'}}>우편번호</button>
                                <input style={{ width:'150px'}} type="text" name="zipcode" id="zipcode" ref={mZipcodeRef} value={userInfo.zipCode} onChange={handleChange} readOnly  />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="addr1" id="addr1" ref={mAddressRef} value={userInfo.addr1} onChange={handleChange} readOnly />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <input type="text" name="addr2" id="addr2" ref={mAddressSubRef} value={userInfo.addr2} onChange={handleChange} />
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                    <button type="submit">회원가입</button>
                </div>
            </form>
        </JoinSectionBlock>
    );
};

export default JoinSection;