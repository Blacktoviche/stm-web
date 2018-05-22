import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
    Button, Col, Nav, NavItem, NavLink, NavbarBrand, Alert, Collapse,
    ListGroup, ListGroupItem, UncontrolledTooltip
} from 'reactstrap';
import { routeTo } from '../../actions/SideBarActions';
import {
    BODY_USERS, BODY_PROFILE, BODY_PROJECTS, BODY_MY_COMMENTS, BODY_COMMENTS,
    BODY_TASKS, BODY_MY_TASKS, BODY_MY_PROJECTS
} from '../../utils/Utils';
import './Sidebar.css';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            admins: false,
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    onMenuToggle(type) {
        console.log('menue toggle: ', this.state[type]);
        this.setState({
            [type]: !this.state[type]
        });
    }

    onProjectsTable() {
        this.props.routeTo(BODY_PROJECTS);
        this.onButtonClick(1);
    }

    onTasksTable() {
        this.props.routeTo(BODY_TASKS);
        this.onButtonClick(2);
    }

    onCommentsTable() {
        this.props.routeTo(BODY_COMMENTS);
        this.onButtonClick(3);
    }

    onUsersTable() {
        this.props.routeTo(BODY_USERS);
        this.onButtonClick(4);
    }

    onMyProjectcTable() {
        this.props.routeTo(BODY_MY_PROJECTS);
        this.onButtonClick(5);
    }

    onMyTasksTable() {
        this.props.routeTo(BODY_MY_TASKS);
        this.onButtonClick(6);
    }

    onMyCommentsTable() {
        this.props.routeTo(BODY_MY_COMMENTS);
        this.onButtonClick(7);
    }

    onProfile() {
        this.props.routeTo(BODY_PROFILE);
        this.onButtonClick(8);
    }

    onButtonClick(selected) {
        this.setState({ btnSelected: [selected] });
    }


    renderAdministration() {
        if (this.props.isAdmin) {
            return (
                <ListGroup className="">
                <i className="d-none d-md-block d-lg-block d-xl-block" >
                    <li 
                    onClick={() => this.onMenuToggle('admins')}>
                        <a href="#">
                            <i className="fa fa-dashboard fa-lg" />
                            Administration
                        </a>
                    </li>
                    <Collapse className="sub-menu" 
                    isOpen={this.state.admins}>
                        <li onClick={this.onProjectsTable.bind(this)}>
                            <a href="#">
                                <i className="fa fa-building fa-lg" />
                                Projects
                        </a>
                        </li>
                        <li onClick={this.onTasksTable.bind(this)}>
                            <a href="#">
                                <i className="fa fa-tasks fa-lg" />
                                Tasks
                        </a>
                        </li>
                        <li onClick={this.onCommentsTable.bind(this)}>
                            <a href="#">
                                <i className="fa fa-comments fa-lg" />
                                Comments
                        </a>
                        </li>
                        <li onClick={this.onUsersTable.bind(this)}>
                            <a href="#">
                                <i className="fa fa-users fa-lg" />
                                Users
                        </a>
                        </li>
                    </Collapse>
                </i>
                    <i className="d-md-none">
                    <li  onClick={() => this.onMenuToggle('admins')}
                    id="administration">
                    <UncontrolledTooltip  target="administration">
                    Administration
                        </UncontrolledTooltip>
                        <a href="#">
                            <i className="fa fa-dashboard fa-lg" />
                        </a>
                    </li>
                    <Collapse className="sub-menu" isOpen={this.state.admins}>
                        <li onClick={this.onProjectsTable.bind(this)} id="projects">
                        <UncontrolledTooltip  target="projects">
                            Projects
                        </UncontrolledTooltip>
                            <a href="#">
                                <i className="fa fa-building fa-lg" />
                        </a>
                        </li>
                        <li onClick={this.onTasksTable.bind(this)} id="tasks">
                        <UncontrolledTooltip  target="tasks">
                            Tasks
                        </UncontrolledTooltip>
                            <a href="#">
                                <i className="fa fa-tasks fa-lg" />
                        </a>
                        </li>
                        <li onClick={this.onCommentsTable.bind(this)} id="comments">
                        <UncontrolledTooltip  target="comments">
                            Comments
                        </UncontrolledTooltip>
                            <a href="#">
                                <i className="fa fa-comments fa-lg" />
                        </a>
                        </li>
                        <li onClick={this.onUsersTable.bind(this)} id="users">
                        <UncontrolledTooltip  target="users">
                            Users
                        </UncontrolledTooltip>
                            <a href="#">
                                <i className="fa fa-users fa-lg" />
                        </a>
                        </li>
                    </Collapse>
                 </i>
                </ListGroup>);
        }
    }

    render() {
        return (
            <div className="col col-2 sidebar-offcanvas pl-0 
            nav-side-menu mt-5" id="sidebar" role="navigation">
            <Nav className="nav flex-column sticky-top pl-0 pt-5 mt-3 menu-list">
            <Collapse className="menu-content" isOpen={this.props.isSidebarToggled}>
            {this.renderAdministration()}
            <ul className="d-none d-md-block d-lg-block d-xl-block">
                            <li onClick={this.onMyProjectcTable.bind(this)}>
                                <a href="#" class="d-inline-block">
                                    <i className="fa fa-building fa-lg" />
                                    My Projects
                                </a>
                            </li>
                            <li onClick={this.onMyTasksTable.bind(this)}>
                                <a href="#">
                                    <i className="fa fa-tasks fa-lg" />
                                    My Tasks
                                    </a>
                            </li>
                            <li onClick={this.onMyCommentsTable.bind(this)}>
                                <a href="#">
                                    <i className="fa fa-comments fa-lg" />
                                    My Comments
                                    </a>
                            </li>
                            <li onClick={this.onProfile.bind(this)}>
                                <a href="#">
                                    <i className="fa fa-user fa-lg" />
                                    Profile
                                    </a>
                            </li>
                        </ul>
                        <ul className="d-md-none">
                            <li onClick={this.onMyProjectcTable.bind(this)} id="myprojects">
                            <UncontrolledTooltip  target="myprojects">
                            My Projects
                        </UncontrolledTooltip>
                                <a href="#" class="d-inline-block">
                                    <i className="fa fa-building fa-lg" />
                                </a>
                            </li>
                            <li onClick={this.onMyTasksTable.bind(this)} id="mytasks">
                            <UncontrolledTooltip  target="mytasks">
                            My Tasks
                        </UncontrolledTooltip>
                                <a href="#">
                                    <i className="fa fa-tasks fa-lg" />
                                    </a>
                            </li>
                            <li onClick={this.onMyCommentsTable.bind(this)} id="mycomments">
                            <UncontrolledTooltip  target="mycomments">
                            My Comments
                        </UncontrolledTooltip>
                                <a href="#">
                                    <i className="fa fa-comments fa-lg" />
                                    </a>
                            </li>
                            <li onClick={this.onProfile.bind(this)} id="profile">
                            <UncontrolledTooltip  target="profile">
                             Profile
                        </UncontrolledTooltip>
                                <a href="#">
                                    <i className="fa fa-user fa-lg" />
                                    </a>
                            </li>
                        </ul>
                      </Collapse>
            </Nav>
        </div>
        )
    }

}


const mapStateToProps = ({ sideBarReducer }) => {
    const { isAdmin, isSidebarToggled } = sideBarReducer;
    return { isAdmin, isSidebarToggled };
};

export default connect(mapStateToProps, {
    routeTo
})(Sidebar);