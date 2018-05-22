import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader, ModalBody, Alert, Form, 
    FormGroup, Label, Input, ModalFooter
} from 'reactstrap';
import {
    newUser, editUser, deleteUser, cancelNewUser, usernameChanged,
    firstnameChanged, lastnameChanged, passwordChanged, rePasswordChanged,
    enabledChanged, userRoleChanged, emailChanged, saveUser
} from '../../actions/UserActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { FormattedDate } from 'react-intl';


class UserModal extends Component {


    onCancelNewUser() {
        this
            .props
            .cancelNewUser();
    }


    onUsernameChanged(e) {
        this.props.usernameChanged(e.target.value);
    }

    onPasswordChanged(e) {
        this.props.passwordChanged(e.target.value);
    }

    onRePasswordChanged(e) {
        this.props.rePasswordChanged(e.target.value);
    }


    onFirstNameChanged(e) {
        this.props.firstnameChanged(e.target.value);
    }

    onLastNameChanged(e) {
        this.props.lastnameChanged(e.target.value);
    }

    onEmailChanged(e) {
        this.props.emailChanged(e.target.value);
    }

    onEnabledChanged(e) {
        this.props.enabledChanged(e.target.textContent === 'Disabled' ? true : false);
    }

    onUserRoleChanged(e) {
        this.props.userRoleChanged(e.target.textContent === 'User' ? 'Admin' : 'User');
    }

    onSaveUser() {
        console.log('saveUser: ', this.props.userId);
        let user = {
            id: this.props.userId,
            username: this.props.username,
            userPassword: this.props.password,
            email: this.props.email,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
            enabled: this.props.enabled,
            beautifyRoleName: this.props.beautifyRoleName,
        };
        this.props.saveUser(user, this.props.editMod, this.props.rePassword);
    }

    renderPAsswordInput() {
        return (this.props.editMod ? null : <FormGroup className="col-md-6">
            <Label for="password">Password</Label>
            <Input className="form-control"
                type="password"
                id="password"
                placeholder="Enter Password"
                onChange={this.onPasswordChanged.bind(this)}
                value={this.props.password}
            />
        </FormGroup>);
    }

    renderRePAsswordInput() {
        return (this.props.editMod ? null : <FormGroup className="col-md-6">
            <Label for="rePassword">Re-Password</Label>
            <Input className="form-control"
                type="password"
                id="rePpassword"
                placeholder="Enter Password Again"
                onChange={this.onRePasswordChanged.bind(this)}
                value={this.props.rePassword}
            />
        </FormGroup>);
    }

    renderMessage() {
        if (this.props.userSaveMsg !== '') {
            return (<Alert color="danger">
                Error while saving user! ({this.props.userSaveMsg})
      </Alert>)
        }
    }

    render() {
        return (
            <div className="">
                <Modal
                    isOpen={this.props.userModalOpen}
                    className="modal-dialog-centered modal-lg"
                    backdrop="true"
                    id="userModalId">
                    <ModalHeader toggle={() => this.onCancelNewUser()} className="">
                    User
                        </ModalHeader>
                    <ModalBody className="">
                        <Form className="form-row">
                            <FormGroup className="col-md-12">
                                <Label for="userName">Username</Label>
                                <Input className="form-control"
                                    type="text"
                                    id="userName"
                                    placeholder="Enter Username"
                                    onChange={this.onUsernameChanged.bind(this)}
                                    value={this.props.username}
                                />
                            </FormGroup>
                            {this.renderPAsswordInput()}
                            {this.renderRePAsswordInput()}
                            <FormGroup className="col-md-12">
                                <Label for="email">Email : </Label>
                                <Input className="form-control"
                                    type="text"
                                    id="email"
                                    placeholder="Enter Email"
                                    onChange={this.onEmailChanged.bind(this)}
                                    value={this.props.email}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="firstName">First Name: </Label>
                                <Input className="form-control"
                                    type="text"
                                    id="firstName"
                                    placeholder="Enter First Name"
                                    onChange={this.onFirstNameChanged.bind(this)}
                                    value={this.props.firstname}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="lastName">Last Name: </Label>
                                <Input className="form-control"
                                    type="text"
                                    id="lastName"
                                    placeholder="Enter Last Name"
                                    onChange={this.onLastNameChanged.bind(this)}
                                    value={this.props.lastname}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="enabledChe">Enabled :  </Label>
                                <Button className="ml-3" id="enabledBtn" color={this.props.enabled ? 'success' : 'danger'}
                                    onClick={this.onEnabledChanged.bind(this)}
                                >{this.props.enabled ? 'Enabled' : 'Disabled'}</Button>
                            </FormGroup>
                            <FormGroup className="col-md-6">
                                <Label for="userRoleBtn">Role : </Label>
                                <Button className="ml-3" id="userRoleBtn" color={this.props.beautifyRoleName === 'User' ? 'primary' : 'warning'}
                                    onClick={this.onUserRoleChanged.bind(this)}
                                >{this.props.beautifyRoleName}</Button>
                            </FormGroup>
                        </Form>
                        {this.renderMessage()}
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-primary btn-lg  rounded"
                            onClick={this.onSaveUser.bind(this)}>Save User</Button>
                        <Button className="btn-primary btn-lg  rounded"
                            onClick={this.onCancelNewUser.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

}


const mapStateToProps = ({ userReducer }) => {
    const { users, userId, username, password, rePassword, firstname, lastname,
        email, enabled, beautifyRoleName, userModalOpen, editMod, userSaveMsg } = userReducer;
    return {
        users, userId, username, password, rePassword, firstname, lastname,
        email, enabled, beautifyRoleName, userModalOpen, editMod, userSaveMsg
    };
};

export default connect(mapStateToProps, {
    cancelNewUser, usernameChanged,
    firstnameChanged, lastnameChanged, passwordChanged, rePasswordChanged,
    enabledChanged, userRoleChanged, emailChanged, saveUser
})(UserModal);
