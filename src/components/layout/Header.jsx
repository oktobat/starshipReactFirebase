import React, {useEffect, useState} from 'react';
import cn from 'classnames'
import { FaBars } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { BsCartPlusFill  } from "react-icons/bs";
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '@/store/product'
import { userLogout, userLogin } from '@/store/member'
import { useMediaQuery } from 'react-responsive'

const HeaderBlock = styled.div`
  text-align: center;
  padding: 20px;
  background: #ddd;
  position: relative;
  .header__logo { padding: 20px; }
  .member { position: absolute; top: 30px; left: 30px;
    a { margin-right: 10px; }
  }
  .itemcount { position: absolute; top: 20px; right: 30px;
    font-size: 30px; color: blue;
    span { position: absolute; top: -2px; right: -5px; width: 20px;
      height: 20px; border-radius: 50%; background: red; color: #fff;
      font-size: 12px; line-height: 20px; text-align: center; font-weight: bold;
    }
  }
  .openNav { position: absolute; top: 20px; right: 80px; font-size: 30px; color: blue;
    cursor: pointer; display: none; }
  #header__nav { 
    ul {
      display: flex;
      justify-content: space-around;
      li { margin: 10px 0px; font-size: 20px;
        a { transition: all 0.5s;
          &:hover, &.active { color: #f00; }
        }
      }
    }
    .closeNav { display: none; }
  }
`

const ItemCount = styled.div`
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 30px;
  color: blue;
  span {
    position: absolute;
    top: -2px;
    right: -5px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: red;
    color: #fff;
    font-size: 12px;
    line-height: 20px;
    text-align: center;
    font-weight: bold;
  }
`

const Hamburger = styled.div`
  position: absolute;
  top: 20px;
  right: 70px;
  font-size: 30px;
  color: blue;
`

const MobileNav = styled.nav`
  position:fixed;
  left:100%;
  top:0; 
  bottom:0; 
  right:0;
  background:rgba(0,0,0,0.5);
  z-index:9999;
  overflow:hidden;
  transition:all 0.5s;
  &.on { left:0;  }
  .closeNav { font-size:30px; color:blue; position:absolute; 
    top:20px; right:-50px; z-index:9999;
    transition:all 0.3s;
    &.on { right:20px; transition:all 0.5s; }
  }
  ul {
    position:absolute;
    top:0; right:-200px;
    height:100%; width:200px; 
    background:#fff;
    padding-top:100px; 
    transition:all 0.3s 0s;
    &.on { right:0; transition:all 0.3s 0.2s; }
    li { border-bottom:1px solid #000;
      a { display:block; line-height:60px;  
          transition: all 0.5s;
          &:hover, &.active { color: #f00; }
      }
      &:nth-child(1) { border-top:1px solid #000 }
    }
  }
`

const Header = () => {
    const mobile = useMediaQuery({ maxWidth:768 })
    const [openNav, setOpenNav] = useState(false)

    const dispatch = useDispatch()
    const carts = useSelector(state=>state.products.carts)
    const user = useSelector(state=>state.members.user)

    const handleLogout = (e)=>{
      e.preventDefault()
      dispatch(userLogout())
    }

    useEffect(()=>{
      dispatch(fetchProducts())
      let loging = localStorage.loging
      if (loging) {
        dispatch(userLogin(JSON.parse(loging)))
      }
    }, [dispatch])

    return (
        <HeaderBlock>
            <h1 className="header__logo">
                <Link to="/">STARSHIP SQUARE</Link>
            </h1>
            { user ?
              <div className="member">
                <a href="#" onClick={ handleLogout }>로그아웃</a>
                <Link to="/memberModify">정보수정({user.userId})</Link>
              </div>
              :
              <div className="member">
                  <Link to="/login">로그인</Link>
                  <Link to="/join">회원가입</Link>
              </div>
            }
            { mobile &&
              <Hamburger onClick={()=>setOpenNav(true)}>
                <FaBars />
              </Hamburger> 
            }
            <ItemCount>
              <Link to="/cart">
                <BsCartPlusFill />
                <span>{ carts.length }</span> 
              </Link>
            </ItemCount>
            { mobile ||
              <nav id="header__nav">
                  <ul>
                      <li>
                          <NavLink to="/artist">Artist</NavLink>
                      </li>
                      <li>
                          <NavLink to="/actor">Actor</NavLink>
                      </li>
                      <li>
                          <NavLink to="/movie">Movie</NavLink>
                      </li>
                      <li>
                          <NavLink to="/theater">Theater</NavLink>
                      </li>
                      <li>
                          <NavLink to="/product">Product</NavLink>
                      </li>
                      <li>
                          <NavLink to="/">Community</NavLink>
                      </li>
                  </ul>
              </nav>
            }
            { mobile &&
              <MobileNav className={ openNav && "on"}>
                <MdClose className={cn("closeNav", openNav && "on")} onClick={()=>setOpenNav(false)} />
                <ul className={ openNav && "on"}>
                    <li>
                        <NavLink to="/artist">Artist</NavLink>
                    </li>
                    <li>
                        <NavLink to="/actor">Actor</NavLink>
                    </li>
                    <li>
                        <NavLink to="/movie">Movie</NavLink>
                    </li>
                    <li>
                        <NavLink to="/theater">Theater</NavLink>
                    </li>
                    <li>
                        <NavLink to="/product">Product</NavLink>
                    </li>
                    <li>
                        <NavLink to="/">Community</NavLink>
                    </li>
                </ul>
              </MobileNav>
            }
        </HeaderBlock>
    );
};

export default Header;