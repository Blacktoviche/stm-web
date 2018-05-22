import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Badge,
    ModalBody,
    ModalFooter,
    Input,
    Label,
    Form,
    FormGroup,
    Alert,
    Table,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Popover, Modal, ModalHeader, Nav, CardTitle, Row
} from 'reactstrap';
import { FormattedDate } from 'react-intl';
import { updateMyProjects } from '../../actions/ProjectActions';
import { getMyTasksByProject } from '../../actions/TaskActions';
import {
    getMyCommentsByTask, deleteComment,
    newComment, commentProgressChanged, commentTextChanged, cancelCommentModal, saveComment
} from '../../actions/CommentActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { getProgressBackground } from '../../utils/Utils';
import 'react-rangeslider/lib/index.css'
import Slider from 'react-rangeslider';

class MyComments extends Component {

    constructor(props) {
        super(props);
        this.toggleNoSelectedTask = this
            .toggleNoSelectedTask
            .bind(this);
        this.toggleCompletedTask = this
            .toggleCompletedTask
            .bind(this);

        this.state = {
            popoverNoSelectedTask: false,
            popoverCompletedTask: false
        };
    }

    toggleNoSelectedTask() {
        this.setState({
            popoverNoSelectedTask: !this.state.popoverNoSelectedTask
        });
    }

    toggleCompletedTask() {
        this.setState({
            popoverCompletedTask: !this.state.popoverCompletedTask
        });
    }

    componentWillMount() {
        this
            .props
            .updateMyProjects();
    }

    onBackToDashboard() {
        this
            .props
            .routeToDashboard();
    }

    onTasksByProject(e) {
        let selectedProject = this.props.projects.find(proj => proj.id == e.target.value);
        this.props.getMyTasksByProject(selectedProject);
    }

    onCommentsByTask(e) {
        console.log('selectedTask::', e.target.value);
        let selectedTask = this.props.tasks.find(tsk => tsk.id == e.target.value);
        this
            .props
            .getMyCommentsByTask(selectedTask);
    }

    onNewComment() {
        console.log('selectedTask:: ', this.props.selectedTask);
        if (this.props.selectedTask !== null && this.props.selectedTask.id !== null) {
            //check if task completed
            if (this.props.selectedTask.status == 0) {
                this
                    .props
                    .newComment(this.props.selectedTask.progress);
            } else {
                this.toggleCompletedTask();
            }
        } else {
            this.toggleNoSelectedTask();
        }
    }

    onSaveComment() {
        console.log('selectedTask::', this.props.selectedTask);
        const { commentText, commentProgress } = this.props;
        this.props.saveComment({ commentText: commentText, progress: commentProgress },
            this.props.selectedTask);
    }

    onCommentProgressChanged(progressValue) {
        console.log('progress:: ', progressValue);
        if (progressValue > this.props.selectedTask.progress) {
            console.log('progress:: passes');
            this.props.commentProgressChanged(progressValue);
        }
    }

    onCommentTextChanged(e) {
        this.props.commentTextChanged(e.target.value);
    }

    onCancelNewComment() {
        this.props.cancelCommentModal();
    }

    renderMessage() {
        if (this.props.commentSaveError != '') {
            return (<Alert color="danger">
                Error saving comment! ({this.props.commentSaveError})
      </Alert>)
        }
    }

    onDeleteComment(id) {
        this
            .props
            .deleteComment(id, this.props.selectedTask);
    }

    renderTaskProgress() {
        if (this.props.selectedTask !== null) {
            return (<Badge className={getProgressBackground(this.props.selectedTask.progress)}>
                {this.props.selectedTask.progress}%</Badge>);
        }
    }

    renderProjectProgress() {
        if (this.props.selectedProject !== null) {
            return (<Badge className={getProgressBackground(this.props.selectedProject.progress)}>
                {this.props.selectedProject.progress}%</Badge>);
        }
    }

    render() {
        return (
            <div className="ml-1">
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverNoSelectedTask}
                    target="newCommentBtn"
                    toggle={this.toggleNoSelectedTask}>
                    <Alert color="danger" className="my-0">
                        No Task Selected!
                        </Alert>
                </Popover>
                <Popover
                    placement="bottom"
                    isOpen={this.state.popoverCompletedTask}
                    target="newCommentBtn"
                    toggle={this.toggleCompletedTask}>
                    <Alert color="danger" className="my-0">
                        Task is completed!
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
                            id="newCommentBtn"
                            className="float-right"
                            onClick={this
                                .onNewComment
                                .bind(this)}>
                            <i className="fa fa-plus" />
                            New Comment
                        </Button>
                        <Button
                            className="float-left fa fa-home"
                            onClick={this
                                .onBackToDashboard
                                .bind(this)} />
                        <CardTitle className="text-center text-white">Comments</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                     <Form className="form-inline">
                            <Input onChange={this.onTasksByProject.bind(this)} 
                                type="select" value="1" name="select"  
                                className="form-control mb-2 mr-sm-3 ml-1 col-md-3">
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

                            <Input onChange={this.onCommentsByTask.bind(this)}
                                type="select" value="1" name="select"  
                                className="form-control mb-2 ml-sm-3 col-md-3">
                                <option disabled="disabled" value="1"
                                    hidden="hidden">Select Task</option>
                                    {this
                                        .props
                                        .tasks
                                        .map((task, index) => {
                                            return (
                                                <option key={index} value={task.id}
                                                onClick={this.onCommentsByTask.bind(this)}>
                                                    {task.title}
                                                </option>
                                            );
                                        })}
                                    </Input>
                        </Form>
                        <h5 className="float-left">Project: {this.props.selectedProject !== null ?
                            this.props.selectedProject.name : ' '} : {this.renderProjectProgress()} / Task: {this.props.selectedTask !== null ?
                                this.props.selectedTask.title : ' '} : {this.renderTaskProgress()}</h5>
                        <Table responsive hover bordered secondary className="striped">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Comment Text</th>
                                    <th>Create Date</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this
                                    .props
                                    .comments
                                    .map((comment, index) => {
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
                                                            }} className="text-danger" onClick={() =>
                                                                this.onDeleteComment(comment.id)}>
                                                                <i className="fa fa-trash-alt" />
                                                                Delete
                                                        </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </th>
                                                <td>{comment.commentText}</td>
                                                <td><FormattedDate
                                                    value={comment.dateCreated}
                                                    day="numeric"
                                                    month="long"
                                                    year="numeric" /></td>
                                                <td>
                                                    <Badge className={getProgressBackground(comment.progress)}>
                                                        {comment.progress}%</Badge>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter className="text-center">{this.props.comments.length} {this.props.comments.length > 1
                        ? ' Comments'
                        : ' Comment'}</CardFooter>
                </Card>

                <Modal isOpen={this.props.commentModalOpen}
                    backdrop="static" className="modal-dialog modal-dialog-centered">
                    <ModalHeader >New Comment</ModalHeader>
                    <ModalBody>
                        <div className="mx-auto">

                            <Form method="POST">
                                <FormGroup>
                                    <Label for="commentProgress">
                                    Task Progress {this.props.commentProgress}%</Label>
                                    <Slider defaultValue={30} id="commentProgress"
                                        name="commentProgress"
                                        value={this.props.commentProgress}
                                        onChange={this.onCommentProgressChanged.bind(this)} />
                                </FormGroup>
                                <FormGroup>
                                    <Label for="commentText">Description</Label>
                                    <Input className="form-control"
                                        type="textarea"
                                        name="commentText"
                                        id="commentText"
                                        placeholder="Enter Comment Text"
                                        onChange={this.onCommentTextChanged.bind(this)}
                                        value={this.props.commentText}
                                    />
                                </FormGroup>
                            </Form>
                            {this.renderMessage()}
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button className="btn-primary btn-lg  rounded"
                            onClick={this.onSaveComment.bind(this)}>Save</Button>
                        <Button className="btn-primary btn-lg  rounded"
                            onClick={this.onCancelNewComment.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = ({ commentReducer }) => {
    const { selectedProject, selectedTask, projects, tasks, comments,
        commentText, commentProgress, commentModalOpen, commentSaveError } = commentReducer;
    return {
        selectedProject, selectedTask, projects, tasks, comments,
        commentText, commentProgress, commentModalOpen, commentSaveError
    };
};

export default connect(mapStateToProps, {
    updateMyProjects, getMyTasksByProject, routeToDashboard, getMyCommentsByTask, deleteComment,
    newComment, commentProgressChanged, commentTextChanged, cancelCommentModal, saveComment
})(MyComments);