import React, { Component } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import logo from '../../assets/imgz/logo.svg';
import { connect } from 'react-redux';
import { logout, toggleSidebar } from '../../actions/TopBarActions';

class Topbar extends Component {

  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      isOpen: false
    };
  }

  componentWillMount() {
    console.log('usernameTOPBAR:', this.props.username);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  toggleSidebar() {
    console.log('Toggle');
    this.props.toggleSidebar();
  }

  onLogout() {
    this.props.logout();
  }


    render() {
        return (
            <Navbar className="fixed-top navbar-expand-md navbar-dark mb-3 customBG" >
             <NavbarToggler onClick={this.toggleSidebar} className="fa fa-bars" />
                    <NavbarBrand href="/" className="text-white">
                            <img src={logo} width="30" height="30" />
                            STW
                    </NavbarBrand>
            <NavbarToggler onClick={this.toggle} className="fa fa-bars" />
            <Collapse isOpen={this.state.isOpen} navbar id="topNavbarId">
            <Nav className="ml-auto" navbar>
              <NavItem>
                <NavLink href="#" className="text-white" onClick={ () => this.onLogout()}>Logout</NavLink>
              </NavItem>
              <NavItem>
                <NavLink href="https://github.com/Blacktoviche"
                  className="text-white">GitHub</NavLink>
              </NavItem>
            </Nav>
            </Collapse>
          </Navbar>            
        )
    }

}


const mapStateToProps = ({ topBarReducer }) => {
  const { username, email, isAdmin } = topBarReducer;
  return { username, email, isAdmin };
};

export default connect(mapStateToProps, {
  logout, toggleSidebar
})(Topbar);