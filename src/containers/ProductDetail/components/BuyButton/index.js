import React from 'react';
import {Link} from 'react-router-dom';
import './style.css';

export default function BuyButton(props) {
	return <Link className="buyButton" to={`/purchase/${props.productId}`}>立即购买</Link>;
}
