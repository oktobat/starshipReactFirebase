import React, {useEffect} from 'react';
import styled from 'styled-components'
import { Link, NavLink } from 'react-router-dom'
import { BsCartPlusFill  } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { fetchProducts } from '@/store/product'

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

const Header = () => {
    const dispatch = useDispatch()
    const carts = useSelector(state=>state.products.carts)

    useEffect(()=>{
      dispatch(fetchProducts())
    }, [])

    return (
        <HeaderBlock>
            <h1 className="header__logo">
                <Link to="/">STARSHIP SQUARE</Link>
            </h1>
            <ItemCount>
              <Link to="/cart">
                <BsCartPlusFill />
                <span>{ carts.length }</span> 
              </Link>
            </ItemCount>
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
        </HeaderBlock>
    );
};

export default Header;