import { useState } from "react";

const Checkout = ({ carrito }) => {
  const [mensaje, setMensaje] = useState("");
  //select

  const [nombre, setNombre] = useState("");

  const handleChange = (e) => {
    setNombre(e.target.value);
  };

  const [envio, setenvio] = useState("");

  const handleChangeEnvio = (e) => {
    setenvio(e.target.value);
  };

  const [direccion, setDireccion] = useState("");
  const handleChangeDireccion = (e) => {
    setDireccion(e.target.value);
  };

  const [pago, setPago] = useState("");
  const handleChangePago = (e) => {
    setPago(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const message = `Hola Tienda: Aramayo
    Nombre: ${nombre}
    Envio: ${envio}
    ${cart.map((item) => {
      return `
      ${item.name} (${item.quantity}) ${item.price}
      `;
    })}
    direccion: ${direccion}
    pago: ${pago}
    Total: ${PrecioTotal}
    `;

    console.log(message);

    setMensaje(message);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese su nombre"
          name="Nombre"
          onChange={handleChange}
          className="p-2 border-2 border-slate-600 rounded-xl"
        />

        <hr />
        <select onChange={handleChangeEnvio}>
          <option selected disabled value={""}>
            Selecciona la forma de consumir
          </option>

          <option value="delivery">Delivery</option>
          <option value="take">Retirar en el restaurante</option>
        </select>
        {envio === "delivery" ? (
          <input
            onChange={handleChangeDireccion}
            type="text"
            placeholder="Ingrese su direccion"
          />
        ) : (
          <></>
        )}

        <hr />

        <select onChange={handleChangePago}>
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
    </>
  );
};

export default Checkout;
