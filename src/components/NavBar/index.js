import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Segment, Icon, Label, Menu } from 'semantic-ui-react';
import { openMenu } from './actions';
import { getCart } from '../../views/Cart/reducer';
import './NavBar.scss';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.showSidebar = this.showSidebar.bind(this);
  }

  getQuantity() {
    const cart = this.props.cart;
    return cart.reduce((quantity, item) => item.quantity + quantity, 0);
  }

  showSidebar(e) {
    e.stopPropagation();
    this.props.openMenu();
  }

  render() {
    return (
      <Segment basic size="small" className="nav-bar main">
        <Menu fluid secondary>
          <Menu.Item className="shop-logo">
            <Link to="/"><img alt="logo" src="./logo.svg" /></Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">About us</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Blog</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/">Contact us</Link>
          </Menu.Item>
          <Menu.Item position="right">
            <Menu.Item fitted>
              <Icon.Group>
                <Link to="/cart" className="cart-link">
                  <Icon name="cart" size="large" className="shop-icon" />
                  {_.isEmpty(this.props.cart) ? null : (
                    <Label
                      color="orange"
                      size="mini"
                      floating
                      circular
                      content={this.getQuantity()}
                      className="cart-counter"
                    />
                  )}
                </Link>
              </Icon.Group>
            </Menu.Item>
          </Menu.Item>
        </Menu>
      </Segment>

    );
  }
}

NavBar.propTypes = {
  openMenu: PropTypes.func.isRequired,
  cart: PropTypes.arrayOf(
    PropTypes.shape({
      quantity: PropTypes.number.isRequired,
    }),
  ).isRequired,
};

const mapStateToProps = state => ({
  cart: getCart(state.cart),
});

export default connect(mapStateToProps, { openMenu })(NavBar);
