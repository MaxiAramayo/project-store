import { useReducer, useState, useEffect } from "react";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";
import ProductItem from "./ProductItem";
import "../App.css";
import CartItem from "./CartItem";
import { TYPES } from "../actions/shoppingAction";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ShoppingCart = () => {
  const [state, dispatch] = useReducer(shoppingReducer, shoppingInitialState);
  const { products, cart } = state;

  //STATES
  const [show, setShow] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [nombre, setNombre] = useState("");
  const [envio, setenvio] = useState("");
  const [direccion, setDireccion] = useState("");
  const [pago, setPago] = useState("");

  // ENVIO DE MENSAJE -----------------------------------------------------------------------------

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const message = `Hola Tienda: Aramayo
  //   Nombre: ${nombre}
  //   Envio: ${envio}
  //   ${cart.map((item) => {
  //     return `
  //     ${item.name} (${item.quantity}) ${item.price}
  //     `;
  //   })}
  //   direccion: ${direccion}
  //   pago: ${pago}
  //   Total: ${PrecioTotal}
  //   `;

  //   console.log(message);

  //   setMensaje(message);
  // };

  // TYPES -----------------------------------------------------------------------------

  const addToCart = (id) => {
    // console.log(id);
    dispatch({ type: TYPES.ADD_TO_CART, payload: id });
  };

  const deleteFromCart = (id, all = false) => {
    // console.log(id, all);
    // console.log(cart);
    if (all) {
      dispatch({ type: TYPES.REMOVE_ALL_TO_CART, payload: id });
    } else {
      dispatch({ type: TYPES.REMOVE_ONE_TO_CART, payload: id });
    }
  };

  const clearCart = () => {
      dispatch({ type: TYPES.CLEAR_CART });
    };
  const PrecioTotal = cart.reduce(
    (previous, current) => previous + current.price,
    0
  );

  // -----------------------------------------------------------------------------
  
    //FORMS ---------------------------------------------------------

    const {register, handleSubmit} = useForm();


  return (
    <>
      {show ? (
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            
            onChange={() => setNombre(e.target.value)}

          />

          <hr />
          <select onChange={() => setenvio(e.target.value)}>
            <option selected disabled value={""}>
              Selecciona la forma de consumir
            </option>

            <option value="delivery">Delivery</option>
            <option value="take">Retirar en el restaurante</option>
          </select>
          {envio === "delivery" ? (
            <input
              onChange={() => setDireccion(e.target.value)}
              type="text"
              placeholder="Ingrese su direccion"
            />
          ) : (
            <></>
          )}

          <hr />

          <select onChange={() => setPago(e.target.value)}>
            <option selected disabled value={""}>
              Selecciona la forma de Pago
            </option>
            <option value="efectivo">Efectivo</option>
            <option value="tarjeta">Tarjeta</option>
          </select>
          <hr />

          <button type="submit" onClick={handleSubmit}>
            Finalizar Compra
          </button>
          <a
            href={`https://wa.me/+543854402944?text=${encodeURIComponent(
              mensaje
            )}`}
            target="_blank"
          >
            enviar mensaje
          </a>
        </form>
      ) : (
        <>
          <div>
            <h1>Shooping Cart</h1>
            <h3>Productos</h3>
            <article className="box grid-responsive">
              {products.map((products) => (
                <ProductItem
                  key={products.id}
                  data={products}
                  addToCart={addToCart}
                />
              ))}
            </article>

            {cart.length > 0 ? (
              <>
                <h3>Carrito</h3>
                <article className="box grid-responsive">
                  <button onClick={clearCart}>Limpiar Carrito</button>
                  {cart.map((item, index) => (
                    <CartItem
                      key={index}
                      data={item}
                      deleteFromCart={deleteFromCart}
                    />
                  ))}
                  <h3>Precio Total: {PrecioTotal}</h3>
                </article>

                {/*  ------------------------------   Formulario --------------------------------------*/}
                <button onClick={() => setShow(!show)}>Comprar</button>
              </>
            ) : (
              <h1>No carrito</h1>
            )}

          </div>
        </>
      )}
    </>
  );
};

export default ShoppingCart;
