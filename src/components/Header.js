import React, { Component } from "react";
import CartScrollBar from "./CartScrollBar";
import Counter from "./Counter";
import EmptyCart from "../empty-states/EmptyCart";
import CSSTransitionGroup from "react-transition-group/CSSTransitionGroup";
import { findDOMNode } from "react-dom";
import { Modal } from 'react-modal-overlay';
import 'react-modal-overlay/dist/index.css';

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCart: false,
      cart: this.props.cartItems,
      mobileSearch: false
    };
  }

  

  handleCart(e) {
    e.preventDefault();
    this.setState({
      showCart: !this.state.showCart
    });
  }
  handleSubmit(e) {
    e.preventDefault();
  }
  handleMobileSearch(e) {
    e.preventDefault();
    this.setState({
      mobileSearch: true
    });
  }
  handleSearchNav(e) {
    e.preventDefault();
    this.setState(
      {
        mobileSearch: false
      },
      function() {
        this.refs.searchBox.value = "";
        this.props.handleMobileSearch();
      }
    );
  }
  handleClickOutside(event) {
    const cartNode = findDOMNode(this.refs.cartPreview);
    const buttonNode = findDOMNode(this.refs.cartButton);
    if (cartNode.classList.contains("active")) {
      if (!cartNode || !cartNode.contains(event.target)) {
        this.setState({
          showCart: false
        });
        event.stopPropagation();
      }
    }
  }
  componentDidMount() {
    document.addEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }
  componentWillUnmount() {
    document.removeEventListener(
      "click",
      this.handleClickOutside.bind(this),
      true
    );
  }

  state = {
    showModal: false
  }
 
  toggleModal = () => {
    this.setState({
      showModal: !this.state.showModal
    })
  }

  render() {
    let cartItems;
    
    cartItems = this.state.cart.map(product => {
      return (
        <li className="cart-item" key={product.name}>
          <img className="product-image" src={product.image} />
          <div className="product-info">
            <p className="product-name">{product.name}</p>
            <p className="product-price">{product.price}</p>
          </div>
          <div className="product-total">
            <p className="quantity">
              {product.quantity} {product.quantity > 1 ? "Nos." : "No."}{" "}
            </p>
            <p className="amount">{product.quantity * product.price}</p>
          </div>
          <a
            className="product-remove"
            href="#"
            onClick={this.props.removeProduct.bind(this, product.id)}
          >
            ×
          </a>

         
        </li>
      );
    });
    let view;
    if (cartItems.length <= 0) {
      view = <EmptyCart />;
    } else {
      view = (
        <CSSTransitionGroup
          transitionName="fadeIn"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}
          component="ul"
          className="cart-items"
        >
          {cartItems}
        </CSSTransitionGroup>
      );
    }
    return (
      <header>
        <div className="container">
          <div className="brand">
              <img src="https://mobiotics.com/assets/images/logo1.svg" width="200" /> 
          </div>

          

          <div className="cart">
            <div className="cart-info">
              <table>
                <tbody>
                  <tr>
                    <td>No. of items</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.totalItems}</strong>
                    </td>
                  </tr>
                  <tr>
                    <td>Sub Total</td>
                    <td>:</td>
                    <td>
                      <strong>{this.props.total}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <a
              className="cart-icon"
              href="#"
              onClick={this.handleCart.bind(this)}
              ref="cartButton"
            >
              <img
                className={this.props.cartBounce ? "tada" : " "}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjVFQ0UwMEI1OTY3QTExRUE4QjI3RDg0NjZDMENEMzVCIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjVFQ0UwMEI2OTY3QTExRUE4QjI3RDg0NjZDMENEMzVCIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NUVDRTAwQjM5NjdBMTFFQThCMjdEODQ2NkMwQ0QzNUIiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NUVDRTAwQjQ5NjdBMTFFQThCMjdEODQ2NkMwQ0QzNUIiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz44K/gqAAAES0lEQVR42uxXW2hcRRj+/znn7G52z+ZqpBeC0bS21IppYx+qeOlDFApaX1upWB+KqC2+KApaCsZHi/giiqBgBR+K4ougoNAWVIrF1lti1VaTmObSrt3N3s5l5vefs7Ppiq7J2Qh56cBHds7cvvkv3/xBIoKVbAJWuF0jYDcb+OTRu6A7DzAy5MBZ+288HcZ6xmOMh8wlPma8yRhj+PWJt4UKDp8K4EoWYcd7J+IR+A+L3c84xLidgeb7E4w7GS8zPmTI/80FL572G7vrGCPmcD3wFeMLRkVfmPESY/PVtcHyCfT9CrBBqrrpHzEH5BhPMR5m7GXsZ0wzbmbsYyT1mr5fqPUYaGxHTvhwZLvjfpay7uOu3vXYwUvhUUFQ1eMKYfK162xtlScZw/dW5cgzXwbesoLQ+FePW9dPEgzlqedkim5iWwS7ivLMnk9DtCSl9ERpIV58EM985FqBAlo7VKA1vKaoRBQiOh5CQ3zpBISCrqRPe1DBgO5v+UN2dfda2RAB75hVDwgJG+pzmQjcPS0Hjg8IvZ+9eUY+x39nkI9M+DTOex3l/lwsAqsu06auWTiMRD26nykRWNrcjISEnQi0s3F+guPNNnfMVGB3ZEKW+c5LOF9Nwlnufh6LQMdlcB0P3OhMhKJxiWuGddQH/7JXWv8gpBLPZm/wHlVw89mFdUvPAmYfmdNLw1RuFW4b6xPD8wiFEkB5oh0PEOJGHl8AB+J+yeN5AcVzq61dudV4SzWNE7wPshvTsYNwdKNIbPlaWcqG4Kd+MTnWIab4yu9KxI7xNB4nAdNo5EYH27e94uQM4jFtgG86xelsPxUGR1UFygApHzKxCbAfXRPhciaD3g8ZISuIL+g172ft3AEr0LEQtZCd/3qPPcE/n9V8PnCtwo6LkphgyaRTfAKhbRYpqnK+y04ZRVh+kbTWAgWP50K49ZwCEzsQWs0JNI2BpAfZWophafhUCPfMSf6wuLLpOWvKBAFfLXRqBFI+peMTCClyQZCkosdys+1HCYcuLK7tz4+HsPVnCV6CH4tEzQVO0DwLmrrAc2pmQ7ZAneXWUQWvSh+eXpeA7wYtLVZgpDhqr5z3YdNvqlHMIgK+A22xCaQr0B4RaYN5aV39PjCl4J2KB1UHFw7Wnnn7ew/aiwSVVEPhIGsuaKu2YAGW2loW2FAKG2Zdacfo8H9YzGYRYJtlyg1xQjULWAozrTzH9UVlrekac90CqglsukCTyHP1o10TwRAAovhCxNoeZQHreCHgSqCUEiCXUEFKFqU/O5AfIcWBjAVtBtvsFcsCfAO3JiJY8vjWYYziTRNVVmSpstkrvgUsw1ofzGbviVvtehwnNothRKCVNERZ04HeWdrNT/H2VkruVAXWRnspii/F9Qomm6PBbA4Gl1P7IzaX0KYEfu8Xb9x4ng4KRclFTyBTLVBDoV4fEhiM9+NbNzR/9q/9c7qy7S8BBgA6u5sFCKLScwAAAABJRU5ErkJggg=="
                alt="Cart"
              />
              {this.props.totalItems ? (
                <span className="cart-count">{this.props.totalItems}</span>
              ) : (
                ""
              )}
            </a>
            <div
              className={
                this.state.showCart ? "cart-preview active" : "cart-preview"
              }
              ref="cartPreview"
            >
              <CartScrollBar>{view}</CartScrollBar>
              <div className="action-block">
                <button onClick={this.toggleModal}
                  type="button"
                  className={this.state.cart.length > 0 ? " " : "disabled"}
                >
                  CHECKOUT
                </button>

                <Modal show={this.state.showModal} closeModal={this.toggleModal}>
                  <h4>Transaction Successfully Completed! </h4>

                  
              <div className="TotalPrice">
                   Total Price : <strong>{this.props.total}</strong>
                      </div>    
          
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
