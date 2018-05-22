import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, Alert, FormFeedback,
    UncontrolledTooltip, Col, ListGroup, DropdownMenu, DropdownItem, DropdownToggle,
    ListGroupItem, UncontrolledDropdown
} from 'reactstrap';
import {
    saveTask, taskTitleChanged, taskDescChanged, cancelTaskModal,
    updateAllUsers, usersListChanged
} from '../../actions/TaskActions';
import Immutable from 'immutable';


class TaskModal extends Component {


    onSaveTask() {
        console.log('selectedProjectDID::', this.props.selectedProject);
        const { taskId, taskTitle, taskDesc } = this.props;
        let taskUsersIds = [];
        this.props.selectedUsersList.map(user => {
            taskUsersIds.push(user.id);
        });
        this.props.saveTask(
            { id: taskId, title: taskTitle, description: taskDesc, assignedToUsersIds: taskUsersIds},
            this.props.selectedProject );
    }

    onTaskTitleChanged(e) {
        this.props.taskTitleChanged(e.target.value);
    }

    onTaskDescChanged(e) {
        this.props.taskDescChanged(e.target.value);
    }

    onCancelNewTask() {
        this.props.cancelTaskModal();
    }

    renderMessage() {
        if (this.props.taskSaveError !== '') {
            return (<Alert color="danger">
                Error saving task! ({this.props.taskSaveError})
      </Alert>)
        }
    }

    //
    onRemoveUser(user, index) {
        let taskUsers = Immutable.List(this.props.taskUsersList);
        let selectedUsers = Immutable.List(this.props.selectedUsersList);

        this
            .props
            .usersListChanged(taskUsers.push(user).toArray(), selectedUsers.delete(index).toArray());
    }

    onAddUser(user, index) {
        let taskUsers = Immutable.List(this.props.taskUsersList);
        let selectedUsers = Immutable.List(this.props.selectedUsersList);

        this
            .props
            .usersListChanged(taskUsers.delete(index).toArray(), selectedUsers.push(user).toArray());
    }

    render() {
        return (
            <Modal isOpen={this.props.taskModalOpen} toggle={this.toggle}
                backdrop="static" className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggle}>Task</ModalHeader>
                <ModalBody>
                    <div className="mx-auto">
                        <Form>
                            <Col>
                                <FormGroup>
                                    <Label for="taskTitle">Name</Label>
                                    <Input className="form-control"
                                        type="text"
                                        name="taskTitle"
                                        id="taskTitle"
                                        placeholder="Enter Task Title"
                                        onChange={this.onTaskTitleChanged.bind(this)}
                                        value={this.props.taskTitle}
                                    />
                                    <FormFeedback>Title can't be empty!</FormFeedback>
                                </FormGroup>
                                <FormGroup>
                                    <Label for="titleDesc">Description</Label>
                                    <Input className="form-control"
                                        type="text"
                                        name="titleDesc"
                                        id="titleDesc"
                                        placeholder="Enter Task Description"
                                        onChange={this.onTaskDescChanged.bind(this)}
                                        value={this.props.taskDesc}
                                    />
                                </FormGroup>
                            </Col>
                            <Col>
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
                            </Col>
                        </Form>

                        {this.renderMessage()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-primary btn-lg  rounded"
                        onClick={this.onSaveTask.bind(this)}>Save Project</Button>
                    <Button className="btn-primary btn-lg  rounded"
                        onClick={this.onCancelNewTask.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = ({ taskReducer }) => {
    const { taskTitle, taskDesc, taskId, taskModalOpen, taskSaveError, selectedProject, allUsersList,
        taskUsersList, selectedUsersList, } = taskReducer;
    return {
        taskTitle, taskDesc, taskId, taskModalOpen, taskSaveError, selectedProject, allUsersList,
        taskUsersList, selectedUsersList,
    };
};

export default connect(mapStateToProps, {
    saveTask, taskTitleChanged, taskDescChanged, cancelTaskModal, usersListChanged
})(TaskModal);