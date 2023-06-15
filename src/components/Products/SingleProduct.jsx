import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useGetProductQuery } from "../../store/api/apiSlice";
import { ROUTES } from "../../utils/routes";
import { filterForRelated } from "../../store/productsSlice/productsSlice";

import Product from "../Products/Product";
import Products from "./Products";

const SingleProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isError, isSuccess } = useGetProductQuery(id);
  const { list, related } = useSelector(({ products }) => products);

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.HOME);
    }
  }, [isError]);

  useEffect(() => {
    if (!data || !list.length) return;

    dispatch(filterForRelated(data.category.id));
  }, [dispatch, data, list.length]);

  return (
    isSuccess && (
      <>
        <Product {...data} />
        <Products products={related} amount={5} title="Related products" />
      </>
    )
  );
};

export default SingleProduct;
