import { useReducer, useState, useEffect } from "react";
import {
  shoppingInitialState,
  shoppingReducer,
} from "../reducers/shoppingReducer";
import ProductItem from "./ProductItem";
import "../App.css";
import CartItem from "./CartItem";
import { TYPES } from "../actions/shoppingAction";
import { Link, Navigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { validacionDelSelect } from "../validators/validators";
import { useFirestore } from "../hooks/useFirestore";

const ShoppingCart = () => {
  //FIREBASE ------------------------------------------------------------------------------
  const [data, error, loading, getData, getProductos] = useFirestore();
  const loadingData = loading.getData && <p>Loading data..</p>;
  const errorData = error && <p>{error}</p>;

  useEffect(() => {
    console.log("GetData");
    getData();
  }, []);

  useEffect(() => {
    getProductos("K3A18i");
    console.log("obteniendo Datos");
  }, []);

  const obj = {};

  data.map((item) => {
    {
      if (item.productos.length > 0) {
        item.productos.forEach((producto) => {
          const { categoria } = producto;
          obj[categoria] = obj[categoria]
            ? [...obj[categoria], producto]
            : [producto];
        });
      } else {
        return null;
      }
    }
  });

  //FIREBASE ------------------------------------------------------------------------------
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

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const incluirDireccion = watch("FormaDeConsumir");
  const incluirPago = watch("FormaDePago");

  const onSubmit = (data) => {
    const { nombre, FormaDeConsumir, apellido, Direccion, FormaDePago } = data;

    let mensaje = "";

    if (FormaDeConsumir === "delivery") {
      mensaje = `
      *Hola Tienda: Aramayo*
      _Nombre: ${nombre} ${apellido}_
      Envio: *Por Delivery*
      ${cart.map((item) => {
        return `
        *${item.name}* (${item.quantity}) _$${item.price}_
        -----------------------------------------------------
        `;
      })}
      direccion: *${Direccion}*
      *El costo del envio a cargo del restaurante/Cadete*
      pago: *${FormaDePago}*
      Total: _$${PrecioTotal}_
    `;
    } else {
      mensaje = `
      *Hola Tienda: Aramayo*
      _Nombre: ${nombre} ${apellido}_
      Envio: *Retira en Restaurante*
      ${cart.map((item) => {
        return `
        *${item.name}* (${item.quantity}) _$${item.price}_
        -----------------------------------------------------
        `;
      })}
      pago: *${FormaDePago}*
      Total: _$${PrecioTotal}_
      `;
    }

    console.log(data);

    console.log(mensaje);

    window.open(
      `https://wa.me/+543854402944?text=${encodeURIComponent(mensaje)}`
    );

    // setMensaje(mensaje);
  };

  return (
    <>
      {/* <div>
        <div className="flex flex-col items-center justify-center mt-24">
          <div>
            {loadingData}
            {errorData}
            <div className="text-white">
              {console.log(data)}
              {data.map((comercios) => (
                <div key={comercios.id}>
                  <p>{comercios.id}</p>
                  <h2>{comercios.nombre}</h2>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div> */}

      <div>
        <h1 className="my-5 text-2xl font-semibold text-center">Productos</h1>
        {data.map((item) => (
          <div key={item.id}>
            <h1 className="text-center">{item.nombre}</h1>
          </div>
        ))}

        <div>
          {Object.keys(obj).map((key) => (
            <div className="flex flex-col gap-5 p-5 " key={key}>
              <h3 className="font-semibold text-center uppercase">{key}</h3>
              {obj[key].map((producto, index) => (
                <div
                  className="flex flex-col gap-2 p-3 bg-slate-800 rounded-xl "
                  key={index}
                >
                  <h3 className="font-semibold">
                    Nombre:{" "}
                    <span className="font-normal">{producto.nombre}</span>
                  </h3>
                  <p className="font-semibold">
                    Precio:{" "}
                    <span className="font-normal">{producto.precio}</span>
                  </p>
                  <p className="font-semibold">
                    Descripcion:
                    <span className="font-normal"> {producto.descripcion}</span>
                  </p>

                  <p>ID: <span>{producto.id}</span></p>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {show ? (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label>Ingrese el Nombre: </label>

              <input
                type="text"
                {...register("nombre", {
                  required: true,
                })}
              />

              {errors.nombre?.type === "required" && (
                <p>Rellene el campo nombre</p>
              )}

              <p></p>
              {/* --------------------------------------------------------------------- */}

              <label>Ingrese el Apellido: </label>
              <input
                type="text"
                {...register("apellido", {
                  required: true,
                })}
              />

              {errors.apellido?.type === "required" && (
                <p>Rellene el campo Apellido</p>
              )}
            </div>

            <hr />

            <div>
              <select
                {...register("FormaDeConsumir", {
                  validate: validacionDelSelect,
                })}
              >
                <option selected disabled value={""}>
                  Selecciona la forma de consumir
                </option>
                <option value="delivery">Delivery</option>
                <option value="take">Retirar en el restaurante</option>
              </select>

              {errors.FormaDeConsumir && <p>Debe seleccionar una opcion</p>}

              {incluirDireccion === "delivery" ? (
                <div>
                  <label>Ingrese su Direccion:</label>
                  <input
                    type="text"
                    {...register("Direccion", { required: true })}
                  />
                  {errors.Direccion?.type === "required" && (
                    <p>Es necesario ingresar la direccion</p>
                  )}
                </div>
              ) : (
                <></>
              )}

              {incluirDireccion === "take" && <p>Retira en Restaurante</p>}
            </div>

            <hr />

            <div>
              <select
                {...register("FormaDePago", {
                  validate: validacionDelSelect,
                })}
              >
                <option selected disabled value={""}>
                  Selecciona la forma de Pago
                </option>
                <option value="efectivo">Efectivo</option>
                <option value="tarjeta">Tarjeta</option>
              </select>

              {errors.FormaDePago && <p>Debe seleccionar una opcion</p>}

              {incluirPago === "efectivo" ? (
                <div>
                  <label>Pagara En Efectivo</label>
                </div>
              ) : (
                <></>
              )}

              {incluirPago === "tarjeta" ? (
                <div>
                  <label>Pagara Con Tarjeta</label>
                </div>
              ) : (
                <></>
              )}
            </div>

            <hr />

            <button type="submit">Finalizar Compra</button>
            <hr />

            {/* <a
            href={`https://wa.me/+543854402944?text=${encodeURIComponent(
              mensaje
            )}`}
            target="_blank"
          >
            enviar mensaje
          </a> */}
          </form>
          <button onClick={() => setShow(!show)}>volver</button>
        </div>
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
