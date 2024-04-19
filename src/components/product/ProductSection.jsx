import React, {useState, useRef, useEffect} from 'react';
import { fetchProducts  } from '@/store/product'
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components'
import { BsCartPlusFill, BsCartPlus  } from "react-icons/bs";
import { ImSpinner } from "react-icons/im";
import { Link } from 'react-router-dom'
import { cartDB } from '@/assets/firebase'

const ProductSectionBlock = styled.div``

const UlBlock = styled.ul`
    border: 0px solid #000;
    display: flex;
    flex-wrap: wrap;
    list-style:none; 
    margin-top:50px; 
`
const ListBlock = styled.li`
    flex: 0 0 21%;
    margin: 20px 2%;
`

const LoadingBlock = styled.div`
    display:flex; justify-content:center; 
    margin:100px 0; 
    .loadIcon {
        font-size : 80px; 
        animation : loadSpin 5s linear infinite;
    }
    @keyframes loadSpin {
        0% { transform : rotate(0deg) }
        100% { transform : rotate(3turn) }
    }
`

const ButtonBlock = styled.div`
    button {
        margin:50px 5px; padding:5px 10px; 
        &.on { background:red; color:#fff }
    }
`
const ProductInsert = styled.div`
    text-align:center;
    margin:50px 0;
    a { padding:10px 20px; background:#999; }
`

const ProductSection = ({title}) => {
    const dispatch = useDispatch();

    const carts = useSelector(state=>state.products.carts)
    const allData = useSelector(state=>state.products.products)
    const [products, setProducts] = useState(allData)

    const sortType = [
        { type:'title', text:'상품명순'},
        { type:'price', text:'가격순'}
    ]

    const [changeSort, setChangeSort] = useState("")

    const [loading, setLoading] = useState(false)

    const sortFlag = useRef(false)

    const sortProduct = (keyname)=>{
        if (!sortFlag.current) {
            setProducts( (products)=>{
                let sortProducts = [...products]
                return sortProducts.sort( (a, b)=> a[keyname] < b[keyname] ? -1:1) 
            })
        } else {
            setProducts( (products)=>{
                let sortProducts = [...products]
                return sortProducts.sort( (a, b)=> a[keyname] > b[keyname] ? -1:1) 
            })
        }
        sortFlag.current = !sortFlag.current
    }

    const cartIdCount = (id) => {
        let item = carts.find(value=>value.id==id)
        if (item) {
            return item.qty
        } else {
            return 0
        }
    }

    const addToCart = async (id)=>{
        try {
            const cartItemRef = cartDB.child(id); // 해당 상품의 레퍼런스 생성
            const cartItemSnapshot = await cartItemRef.once('value'); // 해당 상품의 스냅샷 가져오기
            let quantity = 1;
            if (cartItemSnapshot.exists()) { // 해당 상품이 이미 장바구니에 있는 경우 수량을 증가시킴
                quantity = cartItemSnapshot.val().qty + 1;
            }
            // 장바구니에 상품 추가 또는 업데이트
            await cartItemRef.set({ id:id, qty:quantity });
        } catch(error){
            console.log("오류메시지:", error)
        }
    }

    useEffect(()=>{
        dispatch(fetchProducts())
    }, [])

    useEffect(()=>{
        if (allData.length>0) {
            setLoading(true)
            if (title=='all') {
                setProducts(allData)
            } else {
                setProducts(allData.filter((item)=>item.category==title))
            }
        }
    }, [allData, title])

    if (!loading) {
        return (
            <ProductSectionBlock>
                <LoadingBlock>
                    <ImSpinner className="loadIcon" />
                </LoadingBlock>
                <ProductInsert>
                    <Link to="/productInsert">상품등록</Link>
                </ProductInsert>
           </ProductSectionBlock>
        );
    } 
    return (
        <ProductSectionBlock>
            <ButtonBlock>
                {
                    sortType.map((item, index)=>(
                        <button key={index} onClick={()=>{setChangeSort(item.type); sortProduct(item.type)}} className={ changeSort==item.type && "on" }>{item.text}</button>
                    ))
                }
            </ButtonBlock>
            <UlBlock>
            {
                products.map((item, index)=>(
                    <ListBlock key={index}>
                        <div className="photo">
                            <Link to={`/product/${item.name}`} state={{ item : item }}><img src={item.photo} alt={item.name} /></Link>
                        </div>
                        <div className="info">
                            <p><a href="#">{item.name}</a></p>
                            <p>{parseInt(item.price).toLocaleString()}</p>
                            {/* <p className="rating">
                                {
                                    Array.from({length:5}).map((_, index)=>(
                                        (index+1)<=item.rating ? <span key={index}>★</span> : <span key={index}>☆</span>
                                    ))
                                }
                            </p> */}
                            { item.inventory!=cartIdCount(item.id) ? <button onClick={ ()=>addToCart(item.id) }><BsCartPlusFill /></button> : <button><BsCartPlus /></button> }
                            { item.inventory!=cartIdCount(item.id) ? <span>{ item.inventory - cartIdCount(item.id) }개 남았습니다.</span> : <span>품절!!</span>}
                        </div>
                    </ListBlock>
                ))
            }
            </UlBlock>
            <ProductInsert>
                <Link to="/productInsert">상품등록</Link>
            </ProductInsert>
        </ProductSectionBlock>
    );
};

export default ProductSection;