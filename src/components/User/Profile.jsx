import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Badge, Alert, Card, CardBody, CardTitle, CardHeader,
    CardFooter, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Collapse,
    Table, Form, FormGroup, Label, Input, ModalFooter, Modal, ModalBody, ModalHeader
} from 'reactstrap';
import { firstnameChanged, lastnameChanged,emailChanged,editProfile, defaultProfile, saveProfile,
    passwordChanged, rePasswordChanged, oldPasswordChanged, resetPassword, saveMyNewPwd, cancelNewPwd
} from '../../actions/UserActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { FormattedDate } from 'react-intl';

class Profile extends Component {

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
        this.props.defaultProfile(this.props.userProfile);
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

    onOldPasswordChanged(e) {
        this.props.oldPasswordChanged(e.target.value);
    }

    onSaveProfile() {
        console.log('userId:: ', this.props.userId);
        let user = {
            id: this.props.userId,
            email: this.props.email,
            firstname: this.props.firstname,
            lastname: this.props.lastname,
        };
        this.props.saveProfile(user);
    }

    onCancelEdit() {
        this.props.defaultProfile(this.props.userProfile);
    }

    onEditProfile(){
        this.props.editProfile();
    }

    onSaveNewPwd() {
        this.props.saveMyNewPwd(this.props.oldPassword, this.props.password, this.props.rePassword);
    }

    onCancelPwdReset() {
        this.props.cancelNewPwd();
    }

    renderSaveProfileErrorMessage() {
        if (this.props.userSaveMsg !== '') {
            return (<Alert color="danger">
                Error while saving profile! ({this.props.userSaveMsg})
      </Alert>)
        }
    }

    renderResetPwdErrorMessage() {
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
                    style={{
                        borderRadius: 20
                    }}>
                    <CardHeader
                        className="text-white customBG"
                        style={{
                            borderRadius: 15
                        }}>
                        <UncontrolledDropdown className="float-right" direction="left" >
                            <DropdownToggle>
                                <i className="fa fa-ellipsis-h" />
                            </DropdownToggle>
                            <DropdownMenu>
                                <DropdownItem
                                    onClick={this.onEditProfile.bind(this)}
                                    style={{
                                        borderRadius: 15
                                    }}>
                                    <i className="fa fa-edit" />
                                    Edit Profile
                             </DropdownItem>
                             <DropdownItem
                                    onClick={this.onResetPassword.bind(this)}
                                    style={{
                                        borderRadius: 15
                                    }}>
                                    <i className="fa fa-key" />
                                    Reset Password
                             </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                        <Button
                            className="float-left fa fa-home"
                            onClick={this
                                .onBackToDashboard
                                .bind(this)} />
                        <CardTitle className="text-center">Profile</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                        <Form className="form-row">
                            <FormGroup className="col-md-4">
                                <Label for="userName">Username</Label>
                                <Input className="form-control"
                                    type="text"
                                    id="userName"
                                    value={this.props.username} disabled
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4">
                                <Label for="firstName">First Name: </Label>
                                <Input className="form-control"
                                    type="text"
                                    id="firstName"
                                    onChange={this.onFirstNameChanged.bind(this)}
                                    value={this.props.firstname}
                                    disabled={!this.props.profileEditMod}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4">
                                <Label for="lastName">Last Name: </Label>
                                <Input className="form-control"
                                    type="text"
                                    id="lastName"
                                    onChange={this.onLastNameChanged.bind(this)}
                                    value={this.props.lastname}
                                    disabled={!this.props.profileEditMod}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4">
                                <Label for="email">Email : </Label>
                                <Input className="form-control"
                                    type="text"
                                    id="email"
                                    onChange={this.onEmailChanged.bind(this)}
                                    value={this.props.email}
                                    disabled={!this.props.profileEditMod}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-4">
                                <Label for="enabledChe">Enabled :  </Label>
                                <Alert className="ml-3" id="enabledBtn" color={this.props.enabled ? 'success' : 'danger'}
                                >{this.props.enabled ? 'Enabled' : 'Disabled'}</Alert>
                            </FormGroup>
                            <FormGroup className="col-md-4">
                                <Label for="userRoleBtn">Role : </Label>
                                <Alert className="ml-3" id="userRoleBtn" color={this.props.beautifyRoleName === 'User' ? 'primary' : 'warning'}
                                >{this.props.beautifyRoleName}</Alert>
                            </FormGroup>
                        </Form>
                        {this.renderSaveProfileErrorMessage()}
                    </CardBody>
                    <CardFooter className="text-center">
                    <Button className="btn-primary btn-lg  rounded mr-2" disabled={!this.props.profileEditMod}
                            onClick={this.onSaveProfile.bind(this)}>Save Profile</Button>
                        <Button className="btn-primary btn-lg  rounded ml-2" disabled={!this.props.profileEditMod}
                            onClick={this.onCancelEdit.bind(this)}>Cancel</Button>
                    </CardFooter>
                </Card>
                <Modal isOpen={this.props.resetPwdModal}
                    className="modal-dialog-centered modal-sm"
                    backdrop="true"
                    id="userModalId">
                    <ModalHeader toggle={() => this.onCancelPwdReset()} className="">
                        Reset password
                        </ModalHeader>
                    <ModalBody>
                        <Form className="form-row">
                        <FormGroup className="col-md-12">
                                <Label for="oldPassword">Current Password</Label>
                                <Input className="form-control"
                                    type="password"
                                    id="oldPassword"
                                    placeholder="Enter Current Password"
                                    onChange={this.onOldPasswordChanged.bind(this)}
                                    value={this.props.oldPassword}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-12">
                                <Label for="password">New Password</Label>
                                <Input className="form-control"
                                    type="password"
                                    id="password"
                                    placeholder="Enter New Password"
                                    onChange={this.onPasswordChanged.bind(this)}
                                    value={this.props.password}
                                />
                            </FormGroup>
                            <FormGroup className="col-md-12">
                                <Label for="rePassword">Re-New Password</Label>
                                <Input className="form-control"
                                    type="password"
                                    id="rePpassword"
                                    placeholder="Enter New Password Again"
                                    onChange={this.onRePasswordChanged.bind(this)}
                                    value={this.props.rePassword}
                                />
                            </FormGroup>
                        </Form>
                        {this.renderResetPwdErrorMessage()}
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
    const { userProfile, userId, username, firstname, lastname, email, enabled, beautifyRoleName,
        oldPassword, password, rePassword, resetPwdSaveMsg, resetPwdModal, userSaveMsg, profileEditMod} = userReducer;
    return { userProfile, userId, username, firstname, lastname, email, enabled, beautifyRoleName,
        oldPassword, password, rePassword, resetPwdSaveMsg, resetPwdModal, userSaveMsg, profileEditMod};
};

export default connect(mapStateToProps, {
    firstnameChanged, lastnameChanged, emailChanged, editProfile, defaultProfile, saveProfile,
    passwordChanged, rePasswordChanged, oldPasswordChanged, resetPassword, saveMyNewPwd, cancelNewPwd,
    routeToDashboard
})(Profile);
