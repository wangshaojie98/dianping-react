import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Category from './components/Category';
import Headline from './components/Headline';
import Discount from './components/Discount';
import LikeList from './components/LikeList';
import Banner from './components/Banner';
import Activity from './components/Activity';
import HomeHeader from './components/HomeHeader';
import Footer from '../../components/Footer';
import { actions as homeActions, getLikes, getDiscounts, getPageCountOfLikes } from '../../redux/modules/home';

class Home extends Component {
  fetchMoreLikes = () => {
    this.props.homeActions.loadLikes();
  }
  componentDidMount() {
    this.props.homeActions.loadDiscounts();
  }
  render() {
    const { discunts, likes, pageCount } = this.props;
    return (
      <div>
        <HomeHeader />
        <Banner />
        <Category />
        <Headline />
        <Activity />
        <Discount data={discunts} />
        <LikeList data={likes} pageCount={pageCount} fetchData={this.fetchMoreLikes}/>
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  likes: getLikes(state),
  discunts: getDiscounts(state),
  pageCount: getPageCountOfLikes(state)
});

const mapDispatchToProps = (dispatch) => ({
  homeActions: bindActionCreators(homeActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
