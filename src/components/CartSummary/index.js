// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      let totalAmount = 0
      for (let i of cartList) {
        totalAmount = totalAmount + i.price * i.quantity
      }
      const cartItemQuantity = cartList.length
      return (
        <div className="card-summery-container">
          <h1 className="total">
            Order Total: <span>RS {totalAmount}/-</span>
          </h1>
          <p className="total">{cartItemQuantity} items in cart</p>
          <button className="checkout-button">Checkout</button>
        </div>
      )
    }}
  </CartContext.Consumer>
)
export default CartSummary
