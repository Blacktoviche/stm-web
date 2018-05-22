import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Badge,
    Alert,
    Table,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardFooter,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Popover,
    Input
} from 'reactstrap';
import {
    newTask,
    saveTask,
    getTasksByProject,
    getAllProjects,
    editTask,
    deleteTask,
    updateAllUsers,
    updateSelectedTaskUsers
} from '../../actions/TaskActions';
import { routeToDashboard } from '../../actions/HomeActions';
import TaskModal from './TaskModal';
import { getProgressBackground, getTaskStatusText } from '../../utils/Utils';
import { FormattedDate } from 'react-intl';


class Tasks extends Component {

    constructor(props) {
        super(props);
        this.toggle = this
            .toggle
            .bind(this);
        this.state = {
            popoverOpen: false
        };
    }

    toggle() {
        this.setState({
            popoverOpen: !this.state.popoverOpen
        });
    }

    componentWillMount() {
        this
            .props
            .getAllProjects();
    }

    onNewTask() {
        console.log('selectedProject:: ', this.props.selectedProject);
        this.props.updateAllUsers();
        if (this.props.selectedProject !== null && this.props.selectedProject.id !== null) {
            this
                .props
                .newTask();
        } else {
            this.toggle();
        }
    }

    onEditTask(task) {
        this.props.updateSelectedTaskUsers(task.id);
        console.log('name::', task.id)
        this
            .props
            .editTask(task);
    }

    onDeleteTask(id) {
        this
            .props
            .deleteTask(id, this.props.selectedProject);
    }

    onBackToDashboard() {
        this
            .props
            .routeToDashboard();
    }

    onTasksByProject(e) {
        let selectedProject = this.props.projects.find(proj => proj.id == e.target.value);
        this
            .props
            .getTasksByProject(selectedProject);
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
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverOpen}
                    target="newTaskBtn"
                    toggle={this.toggle}>
                    <Alert color="danger" className="my-0">
                        No Project Selected!
                        </Alert>
                </Popover>
                <Card
                    className="rounded outline dark"
                    style={{
                        borderRadius: 20
                    }}>
                    <CardHeader className="text-white customBG" style={{
                        borderRadius: 15
                    }}>
                        <Button
                            id="newTaskBtn"
                            className="float-right"
                            onClick={this
                                .onNewTask
                                .bind(this)}>
                            <i className="fa fa-plus" />
                            New Task
                        </Button>
                        <Button
                            className="float-left fa fa-home"
                            onClick={this
                                .onBackToDashboard
                                .bind(this)} />
                        <CardTitle className="text-center">Tasks</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                        <CardHeader>
                        <Input onChange={this.onTasksByProject.bind(this)} 
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
                                    .tasks
                                    .map((task, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <UncontrolledDropdown key={index}>
                                                        <DropdownToggle>
                                                            <i className="fa fa-ellipsis-h" />
                                                        </DropdownToggle>
                                                        <DropdownMenu left style={{
                                                                borderRadius: 15
                                                            }}>
                                                            <DropdownItem style={{
                                                                borderRadius: 15
                                                            }}
                                                            onClick={() => this.onEditTask(task)}>
                                                                <i className="fa fa-edit" />
                                                                Edit
                                                            </DropdownItem>
                                                            <DropdownItem className="text-danger" style={{
                                                                borderRadius: 15
                                                            }}
                                                            onClick={() => this.onDeleteTask(task.id)}>
                                                                <i className="fa fa-trash-alt" />
                                                                Delete
                                                            </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
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
                    </CardBody>
                    <CardFooter className="text-center">{this.props.tasks.length} {this.props.tasks.length > 1
                        ? ' Tasks'
                        : ' Task'}</CardFooter>
                </Card>
                <TaskModal />
            </div>
        )
    }
}

const mapStateToProps = ({ taskReducer }) => {
    const { selectedProject, tasks, projects,  errorMsg } = taskReducer;
    return { selectedProject, tasks, projects,  errorMsg };
};

export default connect(mapStateToProps, {
    newTask,
    editTask,
    saveTask,
    deleteTask,
    routeToDashboard,
    getTasksByProject,
    getAllProjects,
    updateAllUsers,
    updateSelectedTaskUsers
})(Tasks);