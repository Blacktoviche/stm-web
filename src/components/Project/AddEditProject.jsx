import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Badge,
    Input,
    Label,
    Form,
    FormGroup,
    Alert,
    Table,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardFooter,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    FormFeedback,
    ListGroup,
    ListGroupItem,
    UncontrolledTooltip
} from 'reactstrap';
import { FormattedDate } from 'react-intl';
import {
    saveProject,
    projectNameChanged,
    projectDescChanged,
    cancelNewProject,
    taskTitleChanged,
    taskDescChanged,
    taskAdded,
    taskAddedFail,
    taskRemoved,
    taskCanceled,
    updateAllUsers,
    usersListChanged
} from '../../actions/ProjectActions';

import { fillTask, getProgressBackground, getTaskStatusText } from '../../utils/Utils';
import { TASK_ASSIGNED_USERS_EMPTY, TASK_TITLE_EMPTY } from '../../utils/Messages';
import Immutable from 'immutable';

class ProjectModal extends Component {

    onSaveProject() {
        const { projectId, projectName, projectDesc } = this.props;
        this
            .props
            .saveProject({
                id: projectId, name: projectName,
                description: projectDesc, tasks: this.props.tasksList
            });
    }

    onProjectNameChanged(e) {
        this
            .props
            .projectNameChanged(e.target.value);
    }

    onProjectDescChanged(e) {
        this
            .props
            .projectDescChanged(e.target.value);
    }

    onTaskTitleChanged(e) {
        console.log('task title::', e.target.value);
        this
            .props
            .taskTitleChanged(e.target.value);
    }

    onTaskDescChanged(e) {
        this
            .props
            .taskDescChanged(e.target.value);
    }

    onAddTask() {
        if (this.props.taskTitle === null || this.props.taskTitle === '') {
            this
                .props
                .taskAddedFail(TASK_TITLE_EMPTY)
        } else if (this.props.selectedUsersList.length === 0) {
            this
                .props
                .taskAddedFail(TASK_ASSIGNED_USERS_EMPTY)
        } else {
            let currentTask = fillTask(this.props.taskTitle,
                this.props.taskDesc, this.props.selectedUsersList);
            let tasks = Immutable.List(this.props.tasksList);
            console.log('assignedIDz:: ', currentTask.assignedToUsers);
            this
                .props
                .taskAdded(tasks.push(currentTask).toArray());
        }
    }

    onRemoveTask(index) {
        let tasks = Immutable.List(this.props.tasksList);
        this
            .props
            .taskRemoved(tasks.delete(index).toArray());
    }

    onCancelTask() {
        this
            .props
            .taskCanceled();
    }

    onAddUser(user, index) {
        let taskUsers = Immutable.List(this.props.taskUsersList);
        let selectedUsers = Immutable.List(this.props.selectedUsersList);

        this
            .props
            .usersListChanged(taskUsers.delete(index).toArray(), selectedUsers.push(user).toArray());
    }

    onRemoveUser(user, index) {
        let taskUsers = Immutable.List(this.props.taskUsersList);
        let selectedUsers = Immutable.List(this.props.selectedUsersList);

        this
            .props
            .usersListChanged(taskUsers.push(user).toArray(), selectedUsers.delete(index).toArray());
    }

    onCancelNewProject() {
        this
            .props
            .cancelNewProject();
    }

    renderAddTaskErrorMessage() {

        if (this.props.addTaskError !== '') {
            return (
                <Alert color="danger">
                    Error saving Task! ({this.props.addTaskError})
                </Alert>
            )
        }
    }

    render() {

        return (
            <div className="">
                <Row>
                    <Col>
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
                                <CardTitle className="text-center">Project</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form method="POST">
                                    <FormGroup>
                                        <Label for="projectName">Name</Label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="projectName"
                                            id="projectName"
                                            placeholder="Enter Project name"
                                            onChange={this
                                                .onProjectNameChanged
                                                .bind(this)}
                                            value={this.props.projectName} />
                                        <FormFeedback>Name can't be empty!</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="projectDesc">Description</Label>
                                        <Input
                                            className="form-control"
                                            type="textarea"
                                            name="projectDesc"
                                            id="projectDesc"
                                            placeholder="Enter Project Description"
                                            onChange={this
                                                .onProjectDescChanged
                                                .bind(this)}
                                            value={this.props.projectDesc} />
                                    </FormGroup>
                                </Form>
                            </CardBody>
                            <CardFooter>
                                <Button
                                    className="btn-primary btn-sm  rounded float-left"
                                    onClick={() => this.onSaveProject()}>Save Project</Button>
                                <Button
                                    className="btn-primary btn-sm  rounded float-right"
                                    onClick={() => this.onCancelNewProject()}>Cancel</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                    <Col>
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
                                <CardTitle className="text-center">Task</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Form method="POST">
                                    <FormGroup>
                                        <Label for="taskTitle">Title</Label>
                                        <Input
                                            className="form-control"
                                            type="text"
                                            name="taskTitle"
                                            id="taskTitle"
                                            placeholder="Enter Task Title"
                                            onChange={this
                                                .onTaskTitleChanged
                                                .bind(this)}
                                            value={this.props.taskTitle} />
                                        <FormFeedback>Title can't be empty!</FormFeedback>
                                    </FormGroup>
                                    <FormGroup>
                                        <Label for="taskDesc">Description</Label>
                                        <Input
                                            className="form-control"
                                            type="textarea"
                                            name="taskDesc"
                                            id="taskDesc"
                                            placeholder="Enter Task Description"
                                            onChange={this
                                                .onTaskDescChanged
                                                .bind(this)}
                                            value={this.props.taskDesc} />
                                    </FormGroup>
                                    <FormGroup>
                                        <UncontrolledDropdown className="align-center">
                                            <DropdownToggle caret>
                                                Assigned To Users
                                            </DropdownToggle>
                                            <DropdownMenu>
                                                {this
                                                    .props
                                                    .taskUsersList
                                                    .map((user, index) => {
                                                        return (
                                                            <DropdownItem key={index} onClick={() => this.onAddUser(user, index)}>
                                                                {user.username}
                                                            </DropdownItem>
                                                        );
                                                    })}
                                            </DropdownMenu>
                                        </UncontrolledDropdown>
                                    </FormGroup>
                                    <FormGroup>
                                        <ListGroup>
                                            {this
                                                .props
                                                .selectedUsersList
                                                .map((user, index) => {
                                                    return (
                                                        <ListGroupItem key={index} className="justify-content-between">
                                                            {user.username}
                                                            <Button
                                                                onClick={() => this.onRemoveUser(user, index)}
                                                                className="float-right"
                                                                id='usrBtnId'>
                                                                <i className="fa fa-trash">
                                                                    <UncontrolledTooltip placement="bottom" target="usrBtnId">
                                                                        Remove
                                                                    </UncontrolledTooltip>
                                                                </i>
                                                            </Button>
                                                        </ListGroupItem>
                                                    );
                                                })}
                                        </ListGroup>
                                    </FormGroup>
                                </Form>
                                {this.renderAddTaskErrorMessage()}
                            </CardBody>
                            <CardFooter>
                                <Button
                                    className="btn-primary btn-sm  rounded float-left"
                                    onClick={() => this.onAddTask()}>Add Task</Button>
                                <Button
                                    className="btn-primary btn-sm  rounded float-right"
                                    onClick={() => this.onCancelTask()}>Clear</Button>
                            </CardFooter>
                        </Card>
                    </Col>
                </Row>
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
                        <CardTitle className="text-center">Tasks</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                        <CardHeader></CardHeader>
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
                                    .tasksList
                                    .map((task, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <UncontrolledDropdown key={index}>
                                                        <DropdownToggle>
                                                            <i className="fa fa-ellipsis-h" />
                                                        </DropdownToggle>
                                                        <DropdownMenu left>
                                                            <DropdownItem onClick={() => this.onRemoveTask(index)}>
                                                                <i className="fa fa-trash-alt" />
                                                                Remove
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
                    <CardFooter className="text-center">
                        {this.props.tasksList.length}
                        {this.props.tasksList.length > 1
                            ? ' Tasks'
                            : ' Task'}</CardFooter>
                </Card>
            </div>
        )
    }
}

const mapStateToProps = ({ projectReducer }) => {
    const {
        projectName,
        projectDesc,
        projectId,
        projectModalOpen,
        projectSaveError,
        tasksList,
        taskTitle,
        taskDesc,
        allUsersList,
        taskUsersList,
        selectedUsersList,
        addTaskError
    } = projectReducer;
    return {
        projectName,
        projectDesc,
        projectId,
        projectModalOpen,
        projectSaveError,
        tasksList,
        taskTitle,
        taskDesc,
        allUsersList,
        taskUsersList,
        selectedUsersList,
        addTaskError
    };
};

export default connect(mapStateToProps, {
    saveProject,
    projectNameChanged,
    projectDescChanged,
    cancelNewProject,
    taskTitleChanged,
    taskDescChanged,
    taskAdded,
    taskAddedFail,
    taskRemoved,
    taskCanceled,
    updateAllUsers,
    usersListChanged
})(ProjectModal);