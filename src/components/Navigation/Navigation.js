// Styles
import './_Navigation.css';
// Libraries
import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';
// Components
import LogoutButton from '../Logout-Button/Logout-Button';
import { MAIN_URL } from '../../constants/app';

// Stateless functional components
let HeaderLogo = () => {
	return (
		<Link to={MAIN_URL}><span className="navigation__header-logo" title="More Detailed, More Beautiful"></span></Link>
	);
};

class Navigation extends Component {
	constructor(props) {
		super(props);
		this._onNavItemsClick = ::this._onNavItemsClick;
		this._onLogoutHandler = ::this._onLogoutHandler;
	}

	_onNavItemsClick(e) {
		const { onNavItemsClick } = this.props;
		let nameIndexCombo = e.target.name.split('-'),
		    name = nameIndexCombo[0],
		    index = nameIndexCombo[1];

		onNavItemsClick (name, index);
	}

	_onLogoutHandler() {
		const { onLogoutHandler } = this.props;
		onLogoutHandler();
	}

	render() {
		const { currentUser, navItems, hasLogo } = this.props;
		let headerLogoHtml = hasLogo ? <HeaderLogo /> : null,
		    navItemsHtml = navItems.map((item, index) => {
				return (
					<Link
					    className="mdl-navigation__link"
					    to={item.link}
						onlyActiveOnIndex={item.link === '/main'}
						activeClassName="navigation__link--active"
					    key={`navItem${index}`}
					    name={`${item.displayText}-${index}`}
					    onClick={this._onNavItemsClick.bind(this)}>
					    {item.displayText}
					</Link>
				);
			});

		return (
			<header className="mdl-layout__header is-casting-shadow mdl-layout__header--level1">
			<div className="mdl-layout__header-row">
			    <span className="mdl-layout-title">
				    { headerLogoHtml }
				</span>
				<nav className="mdl-navigation">
					{ navItemsHtml }
				</nav>
			</div>
      <div className="top-right-area">
        <div className="top-right-area__bar">
          <div title={currentUser.name} className="top-right-area__summary" />
        </div>
        <div style={{height:'9px'}}></div>
        <div className="top-right-area__sub-area">
          <div className="top-right-area__sub-area__head">
            Welcome, {currentUser.name}
          </div>
          <div className="top-right-area__sub-area__body">
          </div>
          <div className="top-right-area__sub-area__foot">
            <LogoutButton onClickHandler={this._onLogoutHandler} />
          </div>
        </div>
      </div>
			</header>
		);
	}
}

Navigation.propTypes = {
	navItems       : PropTypes.array.isRequired,
	headerTitle    : PropTypes.string,
  currentUser    : PropTypes.object,
	hasLogo        : PropTypes.bool,
	onNavItemsClick: PropTypes.func,
	onLogoutHandler: PropTypes.func
};

Navigation.defaultProps = {
	headerTitle    : '',
	hasLogo        : false,
	onNavItemsClick: () => {},
	onLogoutHandler: () => {}
};

export default Navigation;
