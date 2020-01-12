import React, { Component } from "react";
import "./style.css";

class PurchaseForm extends Component {
  render() {
    const {quanlity, product, phone, onIncrease, onDecrease, onSubmit} = this.props;
    const totalPrice = (quanlity * product.currentPrice).toFixed(1);
    return (
      <div className="purchaseForm">
        <div className="purchaseForm__wrapper">
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">数量</div>
            <div className="purchaseForm__rowValue">
              <span
                className="purchaseForm__counter--dec"
                onClick={onDecrease}
              >
                -
              </span>
              <input
                className="purchaseForm__quantity"
                onChange={this.handleChange}
                value={quanlity}
                type="number"
              />
              <span
                className="purchaseForm__counter--inc"
                onClick={onIncrease}
              >
                +
              </span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">小计</div>
            <div className="purchaseForm__rowValue">
              <span className="purchaseForm__totalPrice">¥{totalPrice}</span>
            </div>
          </div>
          <div className="purchaseForm__row">
            <div className="purchaseForm__rowLabel">手机号码</div>
            <div className="purchaseForm__rowValue">{phone}</div>
          </div>
        </div>
        <ul className="purchaseForm__remark">
          <li className="purchaseForm__remarkItem">
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持随时退</span>
          </li>
          <li>
            <i className="purchaseForm__sign" />
            <span className="purchaseForm__desc">支持过期退</span>
          </li>
        </ul>
        <a className="purchaseForm__submit" onClick={onSubmit}>
          提交订单
        </a>
      </div>
    );
  }

  handleChange = (e) => {
    this.props.onSetQuanility(Number.parseInt(e.target.value));
  };

}

export default PurchaseForm;
