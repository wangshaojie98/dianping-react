import React from 'react';
import './style.css';

export default class OrderItem extends React.Component {
	render() {
		const { title, statusText, orderPicUrl, channel, text, type, commentId } = this.props.data;
		return (
			<div className="orderItem">
				<div className="orderItem__title">
					<span>{title}</span>
				</div>
				<div className="orderItem__main">
					<div className="orderItem__imgWrapper">
						<div className="orderItem__tag">{statusText}</div>
						<img alt="" className="orderItem__img" src={orderPicUrl} />
					</div>
					<div className="orderItem__content">
						<div className="orderItem__line">{text[0]}</div>
						<div className="orderItem__line">{text[1]}</div>
					</div>
				</div>
				<div className="orderItem__bottom">
					<div className="orderItem__type">{channel}</div>
					<div>
						{type === 1 && !commentId? (
							(
								<div className="orderItem__btn" onClick={this.props.onComment}>
									评价
								</div>
							)
						) : null}
						<div className="orderItem__btn" onClick={this.props.onRemove}>
							删除
						</div>
					</div>
				</div>
				{this.props.isCommenting ? this.renderEditArea() : null}
			</div>
		);
	}

	// 渲染评价区域的DOM
	renderEditArea() {
		return (
			<div className="orderItem__commentContainer">
				<textarea
					className="orderItem__comment"
					onChange={this.handleCommentChange}
					value={this.props.comment}
				/>
				{this.renderStars()}
				<button className="orderItem__commentBtn" onClick={this.props.onSubmitComment}>
					提交
				</button>
				<button className="orderItem__commentBtn" onClick={this.props.onCancelComment}>
					取消
				</button>
			</div>
		);
	}

	renderStars() {
		return (
			<div className="">
				{[ 1, 2, 3, 4, 5 ].map((item, index) => {
					const lightClass = this.props.star >= item ? "orderItem__star--light" : "";
					return (
						<span
							className={"orderItem__star " + lightClass}
							key={index}
							onClick={this.props.onStarChange.bind(this, item)}
						>
							★
						</span>
					);
				})}
			</div>
		);
	}

	handleCommentChange = (e) => {
		this.props.onCommentChange(e.target.value);
	};
}
