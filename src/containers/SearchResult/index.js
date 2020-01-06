import React, { Component } from 'react';
import ShopList from "./components/ShopList"
import SearchHeader from "./components/SearchHeader"
import KeywordBox from "./components/KeywordBox"
import Banner from "../../components/Banner"
import {connect} from 'react-redux';
import {getCurrentKeyword, getSearchedShopByKeyword} from '../../redux/modules/search';

class SearchResult extends Component {
  render() {
  const {searchedShopByKeyword, currentKeyword} = this.props;
    return (
      <div>
        <SearchHeader onBack={this.handleBack} onSearch={this.handleSearch}/>
        <KeywordBox text={currentKeyword} />
        <Banner dark />
        <ShopList data={searchedShopByKeyword}/>
      </div>
    );
  }

  handleBack = () => {
    this.props.history.push('/')
  }

  handleSearch = () => {
    this.props.history.push('/search')
  }
}

const mapStateToProps = (state) => ({
  searchedShopByKeyword: getSearchedShopByKeyword(state),
  currentKeyword: getCurrentKeyword(state)
});

export default connect(mapStateToProps, null)(SearchResult);