import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Row, Col, Jumbotron, Button, Collapse
} from 'reactstrap';

import LatestProjects from '../Project/LatestProjects';
import LatestTasks from '../Task/LatestTasks';
import LatestComments from '../Comment/LatestComments';

import Projects from '../Project/Projects';
import Tasks from '../Task/Tasks';
import Comments from '../Comment/Comments';
import MyProject from '../Project/MyProjects';
import MyTasks from '../Task/MyTasks';
import MyComments from '../Comment/MyComments';
import Users from '../User/Users';
import Profile from '../User/Profile';
import Sidebar from '../Sidebar/Sidebar';

import {
    JWT_TOKEN, BODY_PROJECTS, BODY_MY_TASKS,
    BODY_TASKS, BODY_COMMENTS, BODY_DEFAULT
    , BODY_MY_PROJECTS, BODY_MY_COMMENTS, BODY_USERS, BODY_PROFILE
} from '../../utils/Utils';
import { updateMyProgress } from '../../actions/HomeActions';
import * as Storage from '../../utils/Storage';
import { Line } from 'react-chartjs-2';

class Body extends Component {

    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = { collapse: true };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    componentWillMount() {
        this.props.updateMyProgress()
    }

    renderBody() {
        switch (true) {
            case (this.props.homeBody == BODY_PROJECTS):
                return (<Projects />);
            case (this.props.homeBody == BODY_TASKS):
                return (<Tasks />);
            case (this.props.homeBody == BODY_PROJECTS):
                return (<Projects />);
            case (this.props.homeBody == BODY_USERS):
                return (<Users />);
            case (this.props.homeBody == BODY_PROFILE):
                return (<Profile />);
            case (this.props.homeBody == BODY_COMMENTS):
                return (<Comments />);
            case (this.props.homeBody == BODY_MY_PROJECTS):
                return (<MyProject />);
            case (this.props.homeBody == BODY_MY_TASKS):
                return (<MyTasks />);
            case (this.props.homeBody == BODY_MY_COMMENTS):
                return (<MyComments />);
            default: return (<Row className="">
                <Col>
                    <LatestProjects isAdmin={this.props.isAdmin} style={{ borderRadius: 15 }} />
                </Col>
                <Col>
                    <LatestTasks isAdmin={this.props.isAdmin} style={{ borderRadius: 15 }} />
                </Col>
                <Col>
                    <LatestComments isAdmin={this.props.isAdmin} style={{ borderRadius: 15 }} />
                </Col>
            </Row>);
        }
    }

    render() {
        let chartData = {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [
                {
                    label: "My Tasks Progress",
                    backgroundColor: "#23282e",
                    data: this.props.myProgress
                },
                /*{
                    label: "Tasks Finished",
                    fillColor: "rgba(219,186,52,0.4)",
                    strokeColor: "rgba(220,220,220,1)",
                    pointColor: "rgba(220,220,220,1)",
                    pointStrokeColor: "#fff",
                    data: [5, 60, 42, 58, 31, 21, 50, 40, 10, 30, 40, 22, 150]
                },*/
            ]
        }
        return (
            <div class="container-fluid">
                <div class="row ">
                    <Sidebar />
                    <div class="col col-10 pt-5 mt-3  justify-content-around">
                    <Button className="outline float-right" onClick={this.toggle} />
                <Collapse isOpen={this.state.collapse}>
                    <Jumbotron style={{ borderRadius: 15 }} className="customBG">
                        <Line data={chartData} height={50} className="" />
                    </Jumbotron>
                </Collapse>
                    {this.renderBody()}
                    </div>
                </div>
            </div>
        )
    }

}


const mapStateToProps = ({ bodyReducer }) => {
    const { username, email, isAdmin, homeBody, myProgress } = bodyReducer;
    return { username, email, isAdmin, homeBody, myProgress };
};

export default connect(mapStateToProps, {
    updateMyProgress
})(Body);