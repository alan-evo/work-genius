// Styles
import './_Main.css';
// React & Redux
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// Components
import Navigation from '../../components/Navigation/Navigation';
import AlertBox from '../../components/AlertBox/AlertBox';
import SubMenu from '../../components/Sub-Menu/Sub-Menu';
// Actions
import * as AppActions from '../../actions/app-actions';
import * as MainActions from '../../actions/main-actions';
import * as SearchActions from '../../actions/search-actions';

class Main extends Component {
	constructor(props) {
		super(props);
		this._closeAlertBox = ::this._closeAlertBox;
		this._navItemsClickHandler = ::this._navItemsClickHandler;
		this._mapPathNameToDisplayName = ::this._mapPathNameToDisplayName;
	}

	componentDidMount() {
		const { setCurrentSelectedPageName } = this.props.mainActions;
		let name = this._mapPathNameToDisplayName(this.props.location.pathname, this.props.mainState.navItems);
		setCurrentSelectedPageName(name);
	}

	componentDidUpdate(prevProps) {
		const { setCurrentSelectedPageName } = this.props.mainActions;
		if (prevProps.location.pathname !== this.props.location.pathname) {
			let name = this._mapPathNameToDisplayName(this.props.location.pathname, this.props.mainState.navItems);
			setCurrentSelectedPageName(name);
		}
	}

	_mapPathNameToDisplayName(pathName, navItems) {
		var re = /main\/([a-zA-Z0-9-_]*)\/?/i;
		let titleMatchResult = pathName.match(re),
		    titleFromPath = titleMatchResult ? titleMatchResult[1] : '',
			filteredItems = navItems.filter((item) => {
				let itemMatchResult = item.link.match(re),
					titleFromItem = itemMatchResult ? itemMatchResult[1] : itemMatchResult;
				return titleFromItem === titleFromPath;
			});
		return filteredItems.length === 0 ? '' : filteredItems[0].displayText;
	}

	_navItemsClickHandler() {
		// console.log(name);
	}

	_closeAlertBox() {
		const {
			errorMessage
		} = this.props.appState;
		if (errorMessage.toLowerCase() === 'unauthorized') {
			location.reload();
		}
		this.props.appActions.clearErrorMessage();
	}

  _renderInvisibleGlass() {
    let {
      searchKeyword, 
      searchBoxNeedShow
    } = this.props.searchState;
    let {
      setSearchBoxNeedShow
    } = this.props.searchActions;
    return (<div style={{display:searchKeyword && searchBoxNeedShow ? 'block' : 'none'}}>
      <div onClick={()=>{
        setSearchBoxNeedShow(false);
      }} className="invisibleGlass" id="invisibleGlass1" />
      <div onClick={()=>{
        setSearchBoxNeedShow(false);
      }} className="invisibleGlass" id="invisibleGlass2" />
      <div onClick={()=>{
        setSearchBoxNeedShow(false);
      }} className="invisibleGlass" id="invisibleGlass3" />
      <div onClick={()=>{
        setSearchBoxNeedShow(false);
      }} className="invisibleGlass" id="invisibleGlass4" />
      </div>);
  }

  render() {
		const {
			navHeaderTitle,
			navItems,
			hasLogo,
			currentSelectedPageSubMenu
		} = this.props.mainState;
		const {
			errorMessage,
      		currentUser
		} = this.props.appState;
    const {
      searchState,
      searchActions
    } = this.props;
		const { logout } = this.props.appActions;

		// Location props are coming from react router
		const { pathname } = this.props.location;

    let SubMenuSearchSectionProps = Object.assign({}, searchState, searchActions);
    return (
			<section className="mdl-layout mdl-js-layout">
				<AlertBox
					type="error"
				    show={!!errorMessage}
				    message={errorMessage}
				    onHideHandler={this._closeAlertBox}
				    onConfirmHandler={this._closeAlertBox} />
				<Navigation
				    headerTitle={navHeaderTitle}
				    navItems={navItems}
            		currentUser={currentUser}
				    hasLogo={hasLogo}
				    onNavItemsClick={this._navItemsClickHandler}
				    onLogoutHandler={logout} />
				<SubMenu
            {...SubMenuSearchSectionProps}
				    data={currentSelectedPageSubMenu}
					headerTitle={this._mapPathNameToDisplayName(pathname, navItems)} />
				<main className="mdl-layout__content">
				    <div className="page-content">
						{this.props.children}
				    </div>
				</main>
        {this._renderInvisibleGlass()}
			</section>
		);
	}
}

Main.propTypes = {
	mainState  : PropTypes.object.isRequired,
  appState   : PropTypes.object.isRequired,
	searchState   : PropTypes.object.isRequired,
	appActions : PropTypes.object.isRequired,
  mainActions: PropTypes.object.isRequired,
	searchActions: PropTypes.object.isRequired,
	location   : PropTypes.object.isRequired
};

function mapStateToProps(state) {
	return {
    mainState: state.main.toJS(),
    appState: state.app.toJS(),
		searchState: state.search.toJS()
	};
}

function mapDispatchToProps(dispatch) {
	return {
		appActions : bindActionCreators(AppActions, dispatch),
    mainActions: bindActionCreators(MainActions, dispatch),
		searchActions: bindActionCreators(SearchActions, dispatch)
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Main);
