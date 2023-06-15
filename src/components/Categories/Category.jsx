import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Products from "../Products/Products";

import { useGetProductsQuery } from "../../store/api/apiSlice";

import { ROUTES } from "../../utils/routes";

import styles from "./Category.module.css";
import { useSelector } from "react-redux";

const Category = () => {
  const { id } = useParams();
  const { list } = useSelector(({ categories }) => categories);
  const navigate = useNavigate();

  const defaultValues = {
    title: "",
    price_min: 0,
    price_max: 0,
  };

  const defaultParams = {
    categoryId: id,
    limit: 5,
    offset: 0,
    ...defaultValues,
  };

  const [inputValues, setInputValues] = useState(defaultValues);
  const [params, setParams] = useState(defaultParams);
  const [items, setItems] = useState([]);
  const [cat, setCat] = useState(null);
  const [isEnd, setIsEnd] = useState(false);

  const { data, isLoading, isSuccess, isError } = useGetProductsQuery(params);

  const handleInptValue = ({ target: { name, value } }) => {
    setInputValues({ ...inputValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setItems([]);
    setIsEnd(false);
    setParams({ ...defaultParams, ...inputValues });
  };

  useEffect(() => {
    if (!id) return;

    setInputValues(defaultValues);
    setItems([]);
    setIsEnd(false);

    setParams({ ...defaultParams, categoryId: id });
  }, [id]);

  useEffect(() => {
    if (!id || !list.length) return;

    const category = list.find((item) => item.id === id * 1);

    setCat(category);
  }, [list, id]);

  useEffect(() => {
    if (isLoading) return;

    if (isError) return;

    if (!data.length) return setIsEnd(true);

    setItems((_items) => [..._items, ...data]);
  }, [data, isLoading]);

  useEffect(() => {
    if (isError) {
      navigate(ROUTES.HOME);
    }
  }, [isError]);

  return (
    <section className={styles.wrapper}>
      <h2 className={styles.title}>{cat?.name}</h2>

      <form className={styles.filters} onSubmit={handleSubmit}>
        <div className={styles.filter}>
          <input
            type="text"
            name="title"
            onChange={handleInptValue}
            placeholder="Product name"
            value={inputValues.title}
          />
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_min"
            onChange={handleInptValue}
            placeholder="0"
            value={inputValues.price_min}
          />
          <span>Price from</span>
        </div>
        <div className={styles.filter}>
          <input
            type="number"
            name="price_max"
            onChange={handleInptValue}
            placeholder="0"
            value={inputValues.price_max}
          />
          <span>Price to</span>
        </div>

        <button type="submit" hidden />
      </form>

      {isLoading ? (
        <div className="preloader">Loading...</div>
      ) : !items.length || !isSuccess ? (
        <div className={styles.back}>
          <span>No results</span>
          <button>Reset</button>
        </div>
      ) : (
        <Products
          title=""
          products={items}
          style={{ padding: 0 }}
          amount={items.length}
        />
      )}
      {!isEnd ? (
        <div className={styles.more}>
          <button
            onClick={() => {
              setParams({ ...params, offset: params.offset + params.limit });
            }}
          >
            See more
          </button>
        </div>
      ) : (
        <p className={styles.more} style={{ fontSize: "18px" }}>
          No more products...
        </p>
      )}
    </section>
  );
};

export default Category;
