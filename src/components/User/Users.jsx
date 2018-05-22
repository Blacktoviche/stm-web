import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Badge, Alert, Card, CardBody, CardTitle, CardHeader,
    CardFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse,
    Table, Form, FormGroup, Label, Input, ModalFooter, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import {
    updateAllUsers, newUser, editUser, deleteUser,
    passwordChanged, rePasswordChanged, resetPassword, saveNewPwd, cancelNewPwd
} from '../../actions/UserActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { FormattedDate } from 'react-intl';
import UserModal from './UserModal';

class Users extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };

        this.toggle = this
            .toggle
            .bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    componentWillMount() {
        this
            .props
            .updateAllUsers();
    }

    onNewUser() {
        this
            .props
            .newUser();
    }

    onEditUser(user) {
        console.log('user:: ', user);
        this
            .props
            .editUser(user);
    }

    onDeleteUser(id) {
        this
            .props
            .deleteUser(id);
    }

    onResetPassword(user) {
        this.props.resetPassword(user);
    }

    onBackToDashboard() {
        this
            .props
            .routeToDashboard();
    }

    onPasswordChanged(e) {
        this.props.passwordChanged(e.target.value);
    }

    onRePasswordChanged(e) {
        this.props.rePasswordChanged(e.target.value);
    }

    onSaveNewPwd() {
        this.props.saveNewPwd(this.props.userId, this.props.password, this.props.rePassword);
    }

    onCancelPwdReset() {
        this.props.cancelNewPwd();
    }

    renderErrorMessage() {
        if (this.props.resetPwdSaveMsg !== '') {
            return (<Alert color="danger">
                Error while reseting password! ({this.props.resetPwdSaveMsg})
      </Alert>)
        }
    }

    render() {
        return (
            <div className="">
                <Card
                    className="rounded outline dark"
                    >
                    <CardHeader
                        className="text-white customBG"
                        style={{
                            borderRadius: 15
                        }}>
                        <Button
                            className="float-right"
                            onClick={this
                                .onNewUser
                                .bind(this)}>
                            <i className="fa fa-plus" />
                            New User
                            </Button>
                            
                        <Button
                            className="float-left fa fa-home"
                            onClick={this
                                .onBackToDashboard
                                .bind(this)} />
                        <CardTitle className="text-center">All Users</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                        <Table
                            responsive
                            hover
                            bordered
                            secondary
                            className="striped"
                            style={{
                                borderRadius: 15
                            }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Username</th>
                                    <th>First Name</th>
                                    <th>Last Name</th>
                                    <th>Enabled</th>
                                    <th>Role</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this
                                    .props
                                    .users
                                    .map((user, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <UncontrolledDropdown key={index}>
                                                        <DropdownToggle>
                                                            <i className="fa fa-ellipsis-h" />
                                                        </DropdownToggle>
                                                        <DropdownMenu
                                                            left
                                                            style={{
                                                                borderRadius: 15
                                                            }}>

                                                            <DropdownItem
                                                                onClick={() => this.onEditUser(user)}
                                                                style={{
                                                                    borderRadius: 15
                                                                }}>
                                                                <i className="fa fa-edit ml-1" />
                                                                Edit
                                                                </DropdownItem>
                                                            <DropdownItem className="text-dark"
                                                                onClick={() => this.onResetPassword(user)}
                                                                style={{
                                                                    borderRadius: 15
                                                                }}>
                                                                <i className="fa fa-key" />
                                                                Reset Password
                                                                </DropdownItem>
                                                            <DropdownItem className="text-danger"
                                                                onClick={() => this.onDeleteUser(user.id)}
                                                                style={{
                                                                    borderRadius: 15
                                                                }}>
                                                                <i className="fa fa-trash" />
                                                                Delete
                                                                </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </th>
                                                <td>
                                                    {user.username}
                                                </td>
                                                <td>{user.firstname}</td>
                                                <td>{user.lastname}</td>
                                                <td>{user.enabled ? 'True' : 'False'}</td>
                                                <td>{user.beautifyRoleName}</td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter className="text-center">{this.props.users.length} {this.props.users.length > 1
                        ? 'Users'
                        : 'User'}</CardFooter>
                </Card>
                <UserModal />
                <Modal isOpen={this.props.resetPwdModal}
                    className="modal-dialog-centered modal-sm"
                    backdrop="true"
                    id="userModalId">
                    <ModalHeader toggle={() => this.onCancelPwdReset()} className="">
                        Reset password for user {this.props.username}
                        </ModalHeader>
                    <ModalBody>
                        <Form className="form-row">
                            <FormGroup className="col-md-12">
                                <Label for="password">Password</Label>
                                <Input className="form-control"
                                    type="password"
                                    id="password"
                                    placeholder="Enter Password"
                                    onChange={this.onPasswordChanged.bind(this)}
                                    value={this.props.password}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-12">
                                <Label for="rePassword">Re-Password</Label>
                                <Input className="form-control"
                                    type="password"
                                    id="rePpassword"
                                    placeholder="Enter Password Again"
                                    onChange={this.onRePasswordChanged.bind(this)}
                                    value={this.props.rePassword}
                                />
                            </FormGroup>
                        </Form>
                        {this.renderErrorMessage()}
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-primary btn-lg  rounded"
                            onClick={this.onSaveNewPwd.bind(this)}>Save</Button>
                        <Button className="btn-primary btn-lg  rounded"
                            onClick={this.onCancelPwdReset.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}

const mapStateToProps = ({ userReducer }) => {
    const { users, password, rePassword, resetPwdSaveMsg, resetPwdModal, username, userId } = userReducer;
    return { users, password, rePassword, resetPwdSaveMsg, resetPwdModal, username, userId };
};

export default connect(mapStateToProps, {
    updateAllUsers, newUser, editUser, deleteUser,
    passwordChanged, rePasswordChanged, resetPassword, saveNewPwd, cancelNewPwd,
    routeToDashboard
})(Users);
