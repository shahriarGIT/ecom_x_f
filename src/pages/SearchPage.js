import React, { useEffect } from "react";
import CartTray from "../component/CartTray";
import Message from "../component/Message";
import Product from "../component/Product";

import Loader from "../component/Loader/LoadingSpinner.js";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getAllProducts, getCategories } from "../redux/actions/productActions";
import Pagination from "../component/Pagination";

const SearchPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const productList = useSelector((state) => state.productList);
  const { products, page, totalPages, error, loading } = productList;

  const cart = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.signIn);
  const {
    loading: loadingCategory,
    error: errorCategory,
    category: productCategory,
  } = useSelector((state) => state.categories);

  let {
    name = "all",
    category = "all",
    order = "newest",
    pageNumber = 1,
  } = useParams();

  const getFilteredURL = (filter) => {
    const filteredName = filter.name || name;
    const filteredCategory = filter.category || category;
    const sortOrder = filter.order || order;
    const page = filter.page || pageNumber;

    return `/search/pageNumber/${page}/name/${filteredName}/category/${filteredCategory}/order/${sortOrder}`;
  };

  useEffect(() => {
    dispatch(getCategories());
    dispatch(
      getAllProducts({
        name: name !== "all" ? name : "",
        category: category !== "all" ? category : "",
        order,
        pageNumber,
      })
    );
  }, [name, category, order, pageNumber]);

  return (
    <>
      <div className="row-flex">
        <h3>Search Result For - {name}</h3>
        <div className="row-flex">
          <h4>Sort By</h4>
          <select
            className="select_search"
            value={order}
            onChange={(e) => {
              navigate(getFilteredURL({ order: e.target.value }));
            }}
          >
            <option value="newest">Newest Arrivals</option>
            <option value="lowest">Price: Low to High</option>
            <option value="highest">Price: High to Low</option>
          </select>
        </div>
      </div>
      {loading ? (
        <Loader className="row center" />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          {userInfo && cart.cartItems.length !== 0 ? <CartTray /> : null}
          {
            <div className="row-flex top center">
              <div>
                <ul className="category_list">
                  <li>
                    <p>Select Category</p>
                    <Link to={getFilteredURL({ category: "all", name: "all" })}>
                      Any
                    </Link>
                  </li>
                  {productCategory?.map((c) => (
                    <li>
                      <Link key={c} to={getFilteredURL({ category: c })}>
                        {c}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="col-3">
                {products.length === 0 && <Message> No Product Found</Message>}
                <div className="row-grid center">
                  {products.map((product) => (
                    <Product key={product._id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          }
          <Pagination
            pageNumber={pageNumber}
            totalPages={totalPages}
            products={products}
            getFilteredURL={getFilteredURL}
          />
        </>
      )}
    </>
  );
};

export default SearchPage;
