/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { NavItem, Nav, NavDropdown, MenuItem } from "react-bootstrap";
import logo from "assets/img/reactlogo.jpg";
class AdminNavbarLinks extends Component {
  render() {

    return (
      <div><img src={logo} style={{width:'100px',heght:'60px'}} />
        <Nav className="navbar-right">

          <NavItem eventKey={3} href="#">
            Log out
          </NavItem>
        </Nav>
      </div>
    );
  }
}

export default AdminNavbarLinks;
