import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button,
    Badge,
    Table,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Nav, CardTitle,
    Form, Input
} from 'reactstrap';
import * as Storage from '../../utils/Storage';
import { FormattedDate, IntlProvider } from 'react-intl';
import { getAllProjects, getTasksByProject, getCommentsByTask, deleteComment } from '../../actions/CommentActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { getProgressBackground } from '../../utils/Utils';


class Comments extends Component {

    componentWillMount() {
        this
            .props
            .getAllProjects();
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

    onCommentsByTask(e) {
        let selectedTask = this.props.tasks.find(tsk => tsk.id == e.target.value);
        this
            .props
            .getCommentsByTask(selectedTask);
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
                <Card
                    className="rounded outline"
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
            </div>
        );
    }
}

const mapStateToProps = ({ commentReducer }) => {
    const { latestComments, selectedProject, selectedTask, projects, tasks, comments } = commentReducer;
    return { latestComments, selectedProject, selectedTask, projects, tasks, comments };
};

export default connect(mapStateToProps, {
    getAllProjects, routeToDashboard, getTasksByProject, getCommentsByTask, deleteComment
})(Comments);