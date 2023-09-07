import Slider from "react-slick";
import NextArrow from "./NextArrow";
import PrevArrow from "./PrevArow";
import { FaRegHeart } from "react-icons/fa";
import { FaHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import axiosInstance from '../../axiosInstance'
import Spinner from "../Reusable/Spinner";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setProduct } from '../../reduxSlices/productSlice'

// This component used for slider and normal listing of all items
// Checking isSlider condition
function Products(props) {
    const dispatch = useDispatch()

    let { title, bgColor, isSlider } = props
    const [allProducts, setAllProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // initial number of visible items this is used for achieve load more feature
    const [lazyLoadCount, setLazyLoadCount] = useState(4);

    // counting product based on count arrange the slideToShow
    let sliderCount = 4
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: (sliderCount < 4) ? 1 : 4,
        slidesToScroll: 4,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2,
                    dots: true,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    dots: true,
                }
            }
        ]
    };

    // useEffects
    useEffect(() => {
        axiosInstance.get('/product/get-all-products')
            .then((resp) => {
                if (resp.status === 200) {
                    setAllProducts(resp.data.allProducts)
                    setLoading(false)
                }
            })
    }, [])

    return (
        <>
            {loading && <Spinner />}
            <section className="procuct-list">
                <div className="container" style={{ background: `${bgColor}` }}>
                    <div className="row">
                        <div className="col-12">
                            <h3 className="card-top-title">{title}</h3>
                        </div>
                        {/* slider */}
                        {
                            isSlider
                                ?
                                <Slider {...settings}>
                                    <div className="card-wrap p-1">
                                        <div className="card">
                                            {/* Favorite icon */}
                                            <div className="favorite">
                                                {
                                                    false ? <FaHeart /> : <FaRegHeart />
                                                }
                                            </div>
                                            <img src="https://apollo-singapore.akamaized.net/v1/files/ecl4wgjepi901-IN/image;s=300x600;q=60" alt="" />
                                            <div className="card-details">
                                                <h3 className="price">400000</h3>
                                                <p className="description">FACTORY OUTLET OFFERS 4K</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-wrap p-1">
                                        <div className="card">
                                            {/* Favorite icon */}
                                            <div className="favorite">
                                                {
                                                    true ? <FaHeart style={{ color: "orange" }} /> : <FaRegHeart style={{ color: "black" }} />
                                                }
                                            </div>
                                            <img src="https://apollo-singapore.akamaized.net/v1/files/ecl4wgjepi901-IN/image;s=300x600;q=60" alt="" />
                                            <div className="card-details">
                                                <h3 className="price">400000</h3>
                                                <p className="description">FACTORY OUTLET OFFERS 4K</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-wrap p-1">
                                        <div className="card">
                                            {/* Favorite icon */}
                                            <div className="favorite">
                                                {
                                                    false ? <FaHeart /> : <FaRegHeart />
                                                }
                                            </div>
                                            <img src="https://apollo-singapore.akamaized.net/v1/files/ecl4wgjepi901-IN/image;s=300x600;q=60" alt="" />
                                            <div className="card-details">
                                                <h3 className="price">400000</h3>
                                                <p className="description">FACTORY OUTLET OFFERS 4K</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-wrap p-1">
                                        <div className="card">
                                            {/* Favorite icon */}
                                            <div className="favorite">
                                                {
                                                    false ? <FaHeart /> : <FaRegHeart />
                                                }
                                            </div>
                                            <img src="https://apollo-singapore.akamaized.net/v1/files/ecl4wgjepi901-IN/image;s=300x600;q=60" alt="" />
                                            <div className="card-details">
                                                <h3 className="price">400000</h3>
                                                <p className="description">FACTORY OUTLET OFFERS 4K</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-wrap p-1">
                                        <div className="card">
                                            {/* Favorite icon */}
                                            <div className="favorite">
                                                {
                                                    false ? <FaHeart /> : <FaRegHeart />
                                                }
                                            </div>
                                            <img src="https://apollo-singapore.akamaized.net/v1/files/ecl4wgjepi901-IN/image;s=300x600;q=60" alt="" />
                                            <div className="card-details">
                                                <h3 className="price">400000</h3>
                                                <p className="description">FACTORY OUTLET OFFERS 4K</p>
                                            </div>
                                        </div>
                                    </div>
                                </Slider>
                                :
                                <>
                                    {
                                        allProducts.slice(0, lazyLoadCount).map((product, index) => (
                                            <div className="card-wrap p-1 col-6 col-lg-3" key={index}>
                                                <Link to='/product-details' onClick={()=>dispatch(setProduct(product))}  style={{textDecoration:'none'}}>
                                                    <div className="card">
                                                        {/* Favorite icon */}
                                                        <div className="favorite">
                                                            {
                                                                product.isFavorite ? <FaHeart style={{ color: "orange" }} /> : <FaRegHeart style={{ color: "black" }} />
                                                            }
                                                        </div>
                                                        <div className="product-image-container"
                                                            style={{ backgroundImage: `url(${product.image[0]})` }}>
                                                        </div>
                                                        <div className="card-details">
                                                            <h3 className="price">₹ {product.price}</h3>
                                                            <p className="description">{(product.description).slice(0,32)}...</p>
                                                        </div>
                                                    </div>
                                                </Link>
                                            </div>
                                        ))
                                    }
                                    <div className="col-12 text-center">
                                        <button
                                            className="load-more-btn"
                                            onClick={() => setLazyLoadCount(prev => prev + 4)}
                                        >
                                            Load more
                                        </button>
                                    </div>
                                </>
                        }
                    </div>
                </div>
            </section>
        </>
    )
}
export default Products