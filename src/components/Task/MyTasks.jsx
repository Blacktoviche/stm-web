import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardBody,
    CardTitle, Button, CardHeader, CardFooter,Badge,
    Collapse, Table, UncontrolledDropdown, DropdownMenu, DropdownItem,
    DropdownToggle, Input
} from 'reactstrap';
import { FormattedDate } from 'react-intl';
import { updateMyTasks, getMyTasksByProject } from '../../actions/TaskActions';
import {updateMyProjects} from '../../actions/ProjectActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { getProgressBackground, getTaskStatusText } from '../../utils/Utils';


class MyTasks extends Component {

    constructor(props) {
        super(props);
        //Init state//Don't remove it
        this.state = {
            modal: false
        };
    }

    componentWillMount() {
        this.props.updateMyProjects(this.props.userId);
    }

    onBackToDashboard() {
        this
            .props
            .routeToDashboard();
    }

    onDescToggle(type) {
        this.setState({
            [type]: !this.state[type]
        });
    }

    onMyTasksByProject(e) {
        let selectedProject = this.props.projects.find(proj => proj.id == e.target.value);
        this.props.getMyTasksByProject(selectedProject);
    }

    renderProjectProgress() {
        if (this.props.selectedProject !== null) {
            return (<Badge className={getProgressBackground(this.props.selectedProject.progress)}>
                {this.props.selectedProject.progress}%</Badge>);
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
                    <CardHeader className="text-white customBG" style={{
                        borderRadius: 15
                    }}>
                        <Button
                            className="float-left fa fa-home"
                            onClick={this
                                .onBackToDashboard
                                .bind(this)} />
                        <CardTitle className="text-center">My Tasks</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                        <CardHeader>
                            <Input onChange={this.onMyTasksByProject.bind(this)} 
                                type="select" value="1" name="select"  
                                className="align-center col-md-3">
                                <option disabled="disabled" value="1"
                                    hidden="hidden">Select Project</option>
                                {this
                                    .props
                                    .projects
                                    .map((project, index) => {
                                        return (
                                            <option key={index} value={project.id}>
                                                {project.name}
                                            </option>
                                        );
                                    })}
                            </Input>
                        </CardHeader>
                        <h5 className="float-left">Project: {this.props.selectedProject !== null ?
                            this.props.selectedProject.name : ' '} : {this.renderProjectProgress()}</h5>
                        <Table responsive hover bordered secondary className="striped">
                            <thead>
                                <tr>
                                    <th>Title</th>
                                    <th>Description</th>
                                    <th>Create Date</th>
                                    <th>Last Modefied</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                    <th>My Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this
                                    .props
                                    .tasks
                                    .map((task, index) => {
                                        return (
                                            <tr key={index}>
                                                <td>{task.title}</td>
                                                <td><i className="btn btn-default btn-xs" 
                                                onClick={ () => this.onDescToggle(`task${index}`)} >
                                                <span className="fa fa-eye" /></i>
                                                {task.description ? task.description.substring(0, 10) :
                                                 task.description}...
                                                <Collapse isOpen={this.state[`task${index}`]}>
                                                   {task.description}
                                                </Collapse></td>
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
                                                <td>
                                                <Badge className={getProgressBackground(task.statistics.myProgress)}>
                                                    {task.statistics.myProgress}%</Badge>
                                            </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter className="text-center">{this.props.tasks.length} {this.props.tasks.length > 1
                        ? ' Tasks'
                        : ' Task'}</CardFooter>
                </Card>
            </div>
        );
    }
}

const mapStateToProps = ({ taskReducer }) => {
    const { projects, selectedProject, tasks, userId } = taskReducer;
    return { projects, selectedProject, tasks, userId };
};

export default connect(mapStateToProps, {
    updateMyTasks, routeToDashboard, updateMyProjects, getMyTasksByProject
})(MyTasks);