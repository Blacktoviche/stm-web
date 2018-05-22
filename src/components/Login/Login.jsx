import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, Alert, Col, Row, Container, Card, CardHeader, CardTitle, CardBody
} from 'reactstrap';
import { login, usernameChanged, passwordChanged, setupLogin } from '../../actions/AuthActions';
import './Login.css';
import bgImg from '../../assets/imgz/stwscreenshot.png';


class Login extends Component {


    componentWillMount() {
        /* if(this.props.auth === true ){
             this.props.setupLogin();
         }*/
    }

    componentDidMount() {
    }

    onLogin() {
        const { username, password } = this.props;
        this.props.login(username, password);
    }

    onUsernameChange(e) {
        this.props.usernameChanged(e.target.value);
    }

    onPasswordChange(e) {
        this.props.passwordChanged(e.target.value);
    }


    renderMessage() {
        if (this.props.loginError !== '') {
            return (<Alert color="danger">
                Login error! ({this.props.loginError})
      </Alert>)
        }
    }

    render() {
        const imgStyle = {
            padding: '170px 0', 
            backgroundImage: 'url("' + bgImg + '")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
           
        };


        return (
            <section  style={imgStyle}>
            <Container className="py-5">
                <Row>
                    <div class="col-md-12">
                        <div className="mb-5"></div>
                        <Row>
                            <div className="col-md-6 mx-auto">
                                <Card className="rounded-3" id="login-card">
                                    <CardHeader className="rounded-3 customBG">
                                        <CardTitle className="mb-0 customBG text-white text-center">STW Login</CardTitle>
                                    </CardHeader>
                                    <CardBody className="rounded-3">
                                        <Form>
                                            <FormGroup>
                                                <Input className="form-control form-control-lg"
                                                    type="text"
                                                    name="username"
                                                    id="username"
                                                    placeholder="Enter username"
                                                    onChange={this.onUsernameChange.bind(this)}
                                                    value={this.props.username}
                                                />
                                            </FormGroup>
                                            <FormGroup>
                                                <Input className="form-control form-control-lg"
                                                    type="password"
                                                    name="password"
                                                    id="passowrd"
                                                    placeholder="Enter password"
                                                    onChange={this.onPasswordChange.bind(this)}
                                                    value={this.props.password}
                                                />
                                            </FormGroup>
                                            {this.renderMessage()}
                                            <Button className="btn btn-success btn-lg btn-block  rounded-3"
                                                id="btnLogin" onClick={this.onLogin.bind(this)}>Login</Button>
                                        </Form>
                                    </CardBody>
                                </Card>
                            </div>
                        </Row>
                    </div>
                </Row>
            </Container>
        </section>
        )
    }
}

const mapStateToProps = ({ authReducer }) => {
    const { username, password, loginError, loading, authenticated } = authReducer;
    return { username, password, loginError, loading, authenticated };
};

export default connect(mapStateToProps, {
    usernameChanged, passwordChanged, login, setupLogin
})(Login);