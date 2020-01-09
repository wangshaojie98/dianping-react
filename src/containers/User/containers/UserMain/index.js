import React from 'react';
import OrderItem from '../../components/OrderItem';
import './style.css';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Confirm from '../../../../components/Confirm';
import {
	actions as userActions,
	getCurrentTab,
	getDeletingOrderId,
	getCommentingOrderId,
	getCurrentOrderComment,
	getCurrentOrderStars
} from '../../../../redux/modules/user';

const tabTitles = [ '全部订单', '待付款', '可使用', '退款/售后' ];

class UserMain extends React.Component {
	render() {
		const { data, currentTab, deletingOrderId } = this.props;
		return (
			<div className="userMain">
				<div className="userMain__menu">
					{tabTitles.map((item, index) => {
						return (
							<div key={index} className="userMain__tab" onClick={this.handleClickTab.bind(this, index)}>
								<span
									className={
										currentTab === index ? (
											'userMain__title userMain__title--active'
										) : (
											'userMain__title'
										)
									}
								>
									{item}
								</span>
							</div>
						);
					})}
				</div>
				<div className="userMain__content">
					{data && data.length > 0 ? this.renderOrderList(data) : this.renderEmpty()}
				</div>
				{deletingOrderId ? this.renderConfirm() : null}
			</div>
		);
	}

	renderEmpty = () => {
		return (
			<div className="userMain__empty">
				<div className="userMain__emptyIcon" />
				<div className="userMain__emptyText1">您还没有相关订单</div>
				<div className="userMain__emptyText2">去逛逛看有哪些想买的</div>
			</div>
		);
	};

	renderOrderList = (data) => {
		const { commentingOrderId, orderComment, orderStars } = this.props;
		return data.map((item) => {
			return (
				<OrderItem
					key={item.id}
					data={item}
					comment={item.id === commentingOrderId ? orderComment : null}
					star={item.id === commentingOrderId ? orderStars : null}
					isCommenting={item.id === commentingOrderId}
					onRemove={this.handleRemove.bind(this, item.id)}
					onComment={this.handleComment.bind(this, item.id)}
					onCommentChange={this.handleCommentChange}
					onStarChange={this.handleStarChange}
					onSubmitComment={this.handleSubmitComment}
					onCancelComment={this.handleCancelComment}
				/>
			);
		});
	};

	renderConfirm = () => {
		const { userActions: { reomveOrder, hideDeleteDialog } } = this.props;
		return (
			<Confirm
				content="你确定要删除该订单吗？"
				confirmText="确定"
				cancelText="取消"
				onConfirm={reomveOrder}
				onCancel={hideDeleteDialog}
			/>
		);
	};

	handleComment = (id) => {
		this.props.userActions.showCommentArea(id);
	}

	handleCommentChange = comment => {
		this.props.userActions.setComment(comment);

	}
	handleStarChange = star => {
		this.props.userActions.setStars(star);
	}

	handleSubmitComment = () => {
		this.props.userActions.submitComment();
	}

	handleCancelComment = () => {
		this.props.userActions.hideCommentArea();
	}

	handleClickTab = (index) => {
		this.props.userActions.setCurrentTab(index);
	};

	handleRemove = (id) => {
		this.props.userActions.showDeleteDialog(id);
	};
}

const mapStateToProps = (state) => ({
	currentTab: getCurrentTab(state),
	deletingOrderId: getDeletingOrderId(state),
	commentingOrderId: getCommentingOrderId(state),
	orderComment: getCurrentOrderComment(state),
	orderStars: getCurrentOrderStars(state)
});

const mapDispatchToProps = (dispatch) => ({
	userActions: bindActionCreators(userActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(UserMain);
