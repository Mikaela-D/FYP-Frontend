import classes from "./ProductsPopup.module.css";
import { useCart } from "../generic/CartContext";
import { useRouter } from "next/router";

const ProductsPopup = ({ category, products, onClose }) => {
  const { addToCart } = useCart();
  const router = useRouter();

  const filteredProducts = products.filter(
    (product) => product.category === category
  );

  const addToCartHandler = (product) => {
    addToCart({
      id: product.id,
      image: product.image,
      title: product.title,
      price: product.price,
      category: product.category,
    });
    onClose();
    router.push("/cart");
  };

  return (
    <div className={classes.popupBackground} onClick={onClose}>
      <div
        className={classes.popupContent}
        onClick={(e) => e.stopPropagation()}
      >
        <h2>Products in {category}</h2>
        {filteredProducts.length > 0 ? (
          <ul className={classes.productList}>
            {filteredProducts.map((product) => (
              <li key={product.id} className={classes.productItem}>
                <div className={classes.productDetails}>
                  <img src={product.image} alt={product.title} />
                  <div className={classes.productInfo}>
                    <h3>{product.title}</h3>
                    <p>
                      <strong>Price:</strong> {product.price}€
                    </p>
                    <p>
                      <strong>Description:</strong> {product.description}
                    </p>
                    <div className={classes.actions}>
                      <button onClick={() => addToCartHandler(product)}>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No products available in this category.</p>
        )}
        <button onClick={onClose} className={classes.closeButton}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ProductsPopup;
