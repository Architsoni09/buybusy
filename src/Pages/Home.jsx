import React, { useEffect, useRef, useState } from 'react';
import ProductCard from "../Component/ProductCard";
import { useAllProductsData } from "../Contexts/AllProductContext";
import Spinner from 'react-spinner-material';
function Home(props) {
    const [price, setPrice] = useState(50000);
    const [categories, setCategories] = useState({
        mensClothing: true,
        womensClothing: true,
        electronics: true,
        jewelery: true,
    });

    const products = useAllProductsData();
    const [filteredProducts,setFilteredProducts] =useState(products);
    const priceRef = useRef();
    const menRef = useRef();
    const womenRef = useRef();
    const electronicRef = useRef();
    const jewelRef = useRef();
    const searchRef = useRef();


    const priceHandler = (e) => {
        e.preventDefault();
        setPrice(Number.parseFloat(e.target.value));
    };

    const categoryHandler = (e) => {
        const { id, checked } = e.target;
        setCategories({...categories,[id]:checked});
    };
    const searchHandler = (e) => {
        setFilteredProducts(products.filter(product => product.title.toLowerCase().includes(e.target.value.toLowerCase())));
    };

    useEffect(() => {
        setFilteredProducts(products.filter(product => {
            const matchesPrice = product.price <= price;
            const matchesCategory = (
                (categories.mensClothing && product.category === "men's clothing") ||
                (categories.womensClothing && product.category === "women's clothing") ||
                (categories.electronics && product.category === "electronics") ||
                (categories.jewelery && product.category === "jewelery")
            );
            return matchesPrice && matchesCategory;
        }));
    }, [price, categories, products]);

    return (
        <div style={{ height: 'auto' }} className="container-fluid bg-black d-flex flex-column align-items-center w-100 ">
            <div className="justify-content-center align-items-center d-flex w-75">
                <div className="col-auto mt-5 w-50">
                    <input ref={searchRef} onChange={searchHandler} type="text" placeholder="Search By Product Name" id="inputPassword6" className="form-control" aria-describedby="passwordHelpInline" />
                </div>
            </div>
            <div className="d-flex w-100 mt-5 ">
                <div style={{ width: '20%' }} className=" h-25 sticky-top d-flex flex-column bg-dark rounded text-white align-items-center justify-content-between">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="customRange1" className="form-label fs-2">Filter</label>
                            <h5>Price: {price}</h5>
                            <input value={price} onChange={priceHandler} min="1" max="100000" ref={priceRef} type="range" className="form-range" id="customRange1" aria-label="Price Range" />
                        </div>

                        <fieldset className="mb-3">
                            <legend className="fs-2">Category</legend>

                            <div className="mb-3 form-check">
                                <input checked={categories.mensClothing} ref={menRef} onChange={categoryHandler} type="checkbox" className="form-check-input" id="mensClothing" />
                                <label className="form-check-label" htmlFor="mensClothing">Men's Clothing</label>
                            </div>

                            <div className="mb-3 form-check">
                                <input checked={categories.womensClothing} ref={womenRef} onChange={categoryHandler} type="checkbox" className="form-check-input" id="womensClothing" />
                                <label className="form-check-label" htmlFor="womensClothing">Women's Clothing</label>
                            </div>

                            <div className="mb-3 form-check">
                                <input checked={categories.jewelery} ref={jewelRef} onChange={categoryHandler} type="checkbox" className="form-check-input" id="jewelery" />
                                <label className="form-check-label" htmlFor="jewelery">Jewelery</label>
                            </div>

                            <div className="mb-3 form-check">
                                <input checked={categories.electronics} ref={electronicRef} onChange={categoryHandler} type="checkbox" className="form-check-input" id="electronics" />
                                <label className="form-check-label" htmlFor="electronics">Electronics</label>
                            </div>
                        </fieldset>
                    </form>
                </div>
                {products.length === 0 ?
                    <div style={{width: '75%',height:'80vh'}} className="mx-3 d-flex justify-content-center align-items-center flex-wrap">
                        <Spinner radius={120} color={"#333"} stroke={2} visible={true} />
                    </div>
                    : <div style={{width: '75%'}} className="mx-3 d-flex justify-content-between flex-wrap">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    ) : (
                        <p>No products found matching the selected criteria.</p>
                    )}
                </div>
                }
            </div>
        </div>
    );
}

export default Home;
