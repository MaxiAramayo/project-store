const CartItem = ({ data, deleteFromCart }) => {
  let { id, name, price, quantity } = data;


  return (
    <>
      <div style={{ borderBottom: "thin solid gray" }}>
        <h3>{name}</h3>
        <h5>${price}.00</h5>
        <h5>Cantidad: {quantity}</h5>
        <button onClick={() => deleteFromCart(id)}>Eliminar Uno</button>
        <br />
        <button onClick={() => deleteFromCart(id, true)}>Eliminar Todos</button>
      </div>
    </>
  );
};

export default CartItem;
