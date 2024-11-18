import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  addCartItem = product => {
    const {cartList} = this.state
    const productContainList = cartList.some(
      eachItem => eachItem.id === product.id,
    )
    if (productContainList) {
      this.incrementCartItemQuantity(product.id)
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }

    //   TODO: Update the code here to implement addCartItem
  }

  removeCartItem = id => {
    const {cartList} = this.state
    const updateList = cartList.filter(eachItem => eachItem.id !== id)
    this.setState({cartList: updateList})
  }
  removeAllCartItems = () => {
    this.setState({cartList: []})
  }
  incrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateValue = cartList.map(eachItem => {
      if (eachItem.id === id) {
        return {...eachItem, quantity: eachItem.quantity + 1}
      } else {
        return eachItem
      }
    })
    this.setState({cartList: updateValue})
  }
  decrementCartItemQuantity = id => {
    const {cartList} = this.state
    const updateValue = cartList.map(eachItem => {
      if (eachItem.id === id && eachItem.quantity > 1) {
        return {...eachItem, quantity: eachItem.quantity - 1}
      }if (eachItem.quantity===1){
        this.removeCartItem(id)
      }else {
        return eachItem
      }
    })
    this.setState({cartList: updateValue})
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          removeAllCartItems: this.removeAllCartItems,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
