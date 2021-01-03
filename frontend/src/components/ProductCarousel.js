import React,{useEffect} from 'react'
import {Link} from 'react-router-dom'
import { Carousel,Image} from 'react-bootstrap'
import Loader from './Loader'
import Message from "./Message";
import {listTopProducts} from '../actions/productAction'
import {useDispatch,useSelector} from "react-redux"

function ProductCarousel() {
    const dispatch = useDispatch()
    const  productTopRated = useSelector(state => state.productTopRated)
    const {loading ,error,products } = productTopRated

    useEffect(()=>{
        dispatch(listTopProducts())
    },[dispatch])

    return loading ? <Loader></Loader>: error ? <Message varient='danger'>{error}</Message>:(
        <Carousel pause='hover' className='bg-dark'>
          {products.map(product =>(
                  <Carousel.Item key={product._id} className="carousel-item">
                  <Link to={`/product/${product._id}`}>
                      <Image src={product.image} alt={product.name} fluid></Image>
                      <Carousel.Caption className='carousel-caption'>
                      <h2>
                          {product.name} ({product.price})
                      </h2>
                      </Carousel.Caption>       
                  </Link>
              </Carousel.Item>
          ))}
        </Carousel>
    )
}

export default ProductCarousel
