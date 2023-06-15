import React from "react";
import { Link } from "react-router-dom";

import styles from "./Products.module.css";

const Products = ({ title, style = {}, products = [], amount }) => {
  const list = products.filter((_, i) => i < amount);

  //   const list = listArr.map((obj) => {
  //     const updateList = obj.images.map((item) => {
  //       if (item.indexOf("picsum") === -1) {
  //         return `https://picsum.photos/640/640?r=609${
  //           Math.floor(Math.random() * 10) + 1
  //         }`;
  //       }

  //       return item;
  //     });

  //     return { ...obj, images: updateList };
  //   });

  return (
    <section className={styles.products} style={style}>
      {title && <h2>{title}</h2>}

      <div className={styles.list}>
        {list.map(({ id, images, title, category: { name }, price }) => (
          <Link to={`/products/${id}`} key={id} className={styles.product}>
            <div
              className={styles.image}
              style={{ backgroundImage: `url(${images[0]})` }}
            />

            <div className={styles.wrapper}>
              <h3 className={styles.title}>{title}</h3>
              <div className={styles.cat}>{name}</div>
              <div className={styles.info}>
                <div className={styles.prices}>
                  <div className={styles.price}>
                    {price > 1000 ? 999 : price}$
                  </div>
                  <div className={styles.oldPrice}>
                    {price > 1000 ? 1999 : Math.floor(price * 0.8)}$
                  </div>
                </div>

                <div className={styles.purchases}>
                  {Math.floor(Math.random() * 20 + 1)} purchased
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Products;
