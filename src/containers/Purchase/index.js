import React, { Component } from 'react';
import Header from '../../components/Header';
import PurchaseForm from './components/PurchaseForm';
import Tip from '../../components/Tip';
import { connect } from 'react-redux';
import { getOrderQuanlity, getProduct, getShowTip, actions as purchaseActions } from '../../redux/modules/purchase';
import { actionCreators as detailActions } from "../../redux/modules/detail";
import { bindActionCreators } from 'redux';
import { getUsername } from '../../redux/modules/login';

class Purchase extends Component {
	render() {
    const { quanlity, product, showTip, phone } = this.props;
    console.log(product);
		return (
			<div>
				<Header title="下单" onBack={this.handleBack} />
				{product ? (
          <PurchaseForm 
            quanlity={quanlity}
            product={product}
            phone={phone}
            onIncrease={this.handleIncrease}
            onDecrease={this.handleDecrease}
            onSetQuanility={this.handleChange}
            onSubmit={this.handleSubmit}
          />
        ) : null}
				{showTip ? <Tip message="购买成功！" onClose={this.handleCloseTip} /> : null}
			</div>
		);
	}

  componentDidMount() {
    const {product} = this.props;
    if (!product) {
      const productId = this.props.match.params.id;
      this.props.detailActions.loadProductDetail(productId);
    }
  }

  componentWillMount() {
    this.props.purchaseActions.setOrderQuanlity(1);
  }

	handleBack = () => {
		this.props.history.goBack();
	};

	handleCloseTip = () => {
		this.props.purchaseActions.closeTip();
	};

	handleDecrease = () => {
		const { quanlity } = this.props;
		if (quanlity > 0) {
      this.props.purchaseActions.setOrderQuanlity(quanlity - 1);
    }
	};

	handleChange = (quanlity) => {
		this.props.purchaseActions.setOrderQuanlity(quanlity);
	};

	handleIncrease = () => {
		const { quanlity } = this.props;
		this.props.purchaseActions.setOrderQuanlity(quanlity + 1);
	};

	handleSubmit = () => {
    const productId = this.props.match.params.id;
    const { quanlity } = this.props;
    if (quanlity > 0) {
      this.props.purchaseActions.submitOrder(productId);
    }   
	};
}

const mapStateToProps = (state, props) => {
  const productId = props.match.params.id;
  return {
    quanlity: getOrderQuanlity(state),
    product: getProduct(state, productId),
    showTip: getShowTip(state),
    phone: getUsername(state)
  }
};

const mapDispatchToProps = (dispatch) => ({
  purchaseActions: bindActionCreators(purchaseActions, dispatch),
  detailActions: bindActionCreators(detailActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Purchase);
