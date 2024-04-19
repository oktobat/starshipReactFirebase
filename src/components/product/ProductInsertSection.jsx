import React, {useState} from 'react';
import styled from 'styled-components'

const ProductInsertSectionBlock = styled.div`
    max-width:500px; margin:0 auto;
    div {
        display:flex; padding:5px; margin:5px; 
        label { width:100px; display:inline-block; }
        input, select, textarea { flex:1;  border:1px solid #000; }
        input[type=text], input[type=number] { height:30px; padding:5px }
        input[type=file] { border:none }
        select { height:30px; }
        textarea { height:200px; padding:5px }
        &.btn {
            justify-content:center; margin-top:20px; 
            button { padding:10px 20px; background:red  }
        }
    }
`

const ProductInsertSection = () => {

    const [product, setProduct] = useState({
        category:"woman",
        name:"",
        price:"",
        description:"",
        inventory:"",
        photo:""
    })

    const handleChange = (e)=>{
        console.log(e)
        const {value, name} = e.target
        // setProduct(product=>{
        //     let newProduct = {...product, [name]:value }
        //     return newProduct
        // })
        setProduct(product=>({...product, [name]:value }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        console.log(product)
        setProduct({
            category:"woman",
            name:"",
            price:"",
            description:"",
            inventory:"",
            photo:""
        })
    }

    return (
        <ProductInsertSectionBlock>
            <form onSubmit={onSubmit}>
                <div>
                    <label htmlFor="category">카테고리:</label>
                    <select name="category" id="category" value={product.category} onChange={handleChange}>
                        <option value="woman">woman</option>
                        <option value="man">man</option>
                        <option value="underwear">underwear</option>
                        <option value="kids">kids</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="name">상품명:</label>
                    <input type="text" name="name" id="name" value={product.name} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="price">가격:</label>
                    <input type="number" name="price" id="price" value={product.price} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="description">요약설명:</label>
                    <textarea name="description" id="description" value={product.description} onChange={handleChange}></textarea>
                </div>
                <div>
                    <label htmlFor="inventory">재고:</label>
                    <input type="number" name="inventory" id="inventory" value={product.inventory} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="photo">상품사진:</label>
                    <input type="file" name="photo" id="photo" value={product.photo} onChange={handleChange} />
                </div>
                <div className="btn">
                    <button type="submit">등록</button>
                </div>
            </form>
        </ProductInsertSectionBlock>
    );
};

export default ProductInsertSection;