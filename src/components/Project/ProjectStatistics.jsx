import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Badge,
    Table,
    Row,
    Col,
    Card,CardHeader,
    CardBody,
    CardTitle,
    CardFooter,
    CardSubtitle,
    Progress
} from 'reactstrap';
import { routeTo } from '../../actions/SideBarActions';
import { BODY_PROJECTS } from '../../utils/Utils';
import { getProgressBackground, getTaskStatusText, getRandomColor } from '../../utils/Utils';
import { FormattedDate } from 'react-intl';
import { Pie } from 'react-chartjs-2';

class ProjectDetail extends Component {

    componentWillMount() {
    }

    onBackToProjectsTable() {
        this
            .props
            .routeTo(BODY_PROJECTS);
    }

    getTasksTable() {
        return (
            <Table responsive hover bordered secondary className="striped">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Create Date</th>
                        <th>Last Modefied</th>
                        <th>Progress</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {this
                        .props
                        .projectTasks
                        .map((task, index) => {
                            return (
                                <tr key={index}>
                                    <th scope="row">
                                        {index + 1}
                                    </th>
                                    <td>{task.title}</td>
                                    <td>{task.description}</td>
                                    <td><FormattedDate
                                        value={task.dateCreated}
                                        day="numeric"
                                        month="long"
                                        year="numeric" /></td>
                                    <td>
                                        <FormattedDate
                                            value={task.lastModefied}
                                            day="numeric"
                                            month="long"
                                            year="numeric" /></td>
                                    <td>
                                        <Badge className={getProgressBackground(task.progress)}>
                                            {task.progress}%</Badge>
                                    </td>
                                    <td>{getTaskStatusText(task.status)}</td>
                                </tr>
                            );
                        })}
                </tbody>
            </Table>
        );
    }

    getUserProgressChartData() {

        let labels = [];
        let backgroundColors = []
        let data = [];
        let usersProgress = 0;

        this
            .props
            .selectedProject
            .statistics
            .userProgress
            .map((userProg) => {
                usersProgress+=userProg.progress;
                labels.push(userProg.username);
                backgroundColors.push(getRandomColor());
                data.push(userProg.progress);
            });

        if(usersProgress < 100){
            data.push(100 - usersProgress);
            labels.push('Remains');
        }

        let userProgressChartData = {
            datasets: [
                {
                    backgroundColor: backgroundColors,
                    data: data
                }
            ],
            labels: labels,
        };
        return userProgressChartData;
    }

    render() {
        let chartData = {
            datasets: [
                {
                    backgroundColor: [
                        "#2ecc71", "#ffc107"
                    ],
                    data: [this.props.selectedProject.statistics.completedTasks,
                    this.props.selectedProject.statistics.inProgressTasks]
                }
            ],

            labels: ['Completed Tasks', 'In Progress Tasks']
        };

        return (
            <div>
                <h>
                    <Progress
                        bar
                        color={getProgressBackground(this.props.selectedProject.progress).substring(3)}
                        value={this.props.selectedProject.progress}>
                        {this.props.selectedProject.progress}%</Progress>
                </h>
                <Row>
                    <Col>
                        <Card
                            className="rounded outline dark"
                            style={{
                                borderRadius: 20
                            }}>
                            <CardHeader
                                className="bg-secondary"
                                style={{
                                    borderRadius: 20
                                }}>
                                <CardTitle className="text-center">{this.props.selectedProject.name}</CardTitle>
                                <CardSubtitle className="text-center">{this.props.selectedProject.description}</CardSubtitle>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Pie data={chartData} />
                            </CardBody>
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            className="rounded outline dark"
                            style={{
                                borderRadius: 20
                            }}>
                            <CardHeader className="bg-secondary"
                                style={{
                                    borderRadius: 20
                                }}>
                                <CardTitle className="text-center">
                                    Users Progress</CardTitle>
                                <CardSubtitle className="text-center">
                                    Project statistics for participated user</CardSubtitle>
                            </CardHeader>
                            <CardBody className="text-center">
                                <Pie data={this.getUserProgressChartData()} options={{
                                    tooltips: {
                                        callbacks: {
                                            label: function (tooltipItem, data) {
                                                return ' '+data.labels[tooltipItem.index] + ' : ' + 
                                                data.datasets[0].data[tooltipItem.index] + '%';
                                            },
                                        }
                                    }
                                }} />
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                {this.getTasksTable()}
            </div>
        )
    }
}

const mapStateToProps = ({ projectReducer }) => {
    const { selectedProject, projectTasks } = projectReducer;
    return { selectedProject, projectTasks };
};

export default connect(mapStateToProps, { routeTo })(ProjectDetail);