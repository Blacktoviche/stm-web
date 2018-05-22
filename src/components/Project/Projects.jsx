import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Projects.css';
import {
    Button,
    Badge,
    Modal,
    ModalHeader,
    ModalBody,
    Alert,
    Card,
    CardBody,
    CardTitle,
    CardHeader,
    CardFooter,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse,
    Table
} from 'reactstrap';
import {
    updateAllProjects,
    newProject,
    editProject,
    deleteProject,
    updateAllUsers,
    openProjectStatisticsModal,
    closeProjectDetailModal
} from '../../actions/ProjectActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { getProgressBackground, PROJECTS_BODY_TABLE, PROJECTS_BODY_ADD_EDIT } from '../../utils/Utils';
import { FormattedDate } from 'react-intl';
import ProjectModal from './ProjectModal';
import ProjectStatistics from './ProjectStatistics';
import AddEditProject from './AddEditProject';

class Projects extends Component {

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

    onDescToggle(type) {
        this.setState({
            [type]: !this.state[type]
        });
    }

    componentWillMount() {
        this
            .props
            .updateAllProjects();
    }

    onNewProject() {
        this.props.updateAllUsers();
        this
            .props
            .newProject();
    }

    onEditProject(project) {
        console.log('project:: ', project);
        this
            .props
            .editProject(project);
    }

    onDeleteProject(id) {
        this
            .props
            .deleteProject(id);
    }

    onBackToDashboard() {
        this
            .props
            .routeToDashboard();
    }

    onOpenProjectStatisticsModal(project) {
        this
            .props
            .openProjectStatisticsModal(project);
    }

    onCloseProjectDetail() {
        this
            .props
            .closeProjectDetailModal();
    }


    getProjectsTable() {
        return (
            <div className="">
                <Card
                    className="rounded outline dark"
                    style={{
                        borderRadius: 20
                    }}>
                    <CardHeader
                        className="customBG text-white"
                        style={{
                            borderRadius: 15
                        }}>
                        <Button
                            className="float-right"
                            onClick={this
                                .onNewProject
                                .bind(this)}>
                            <i className="fa fa-plus" />
                            New Project
                            </Button>
                        <Button
                            className="float-left fa fa-home"
                            onClick={this
                                .onBackToDashboard
                                .bind(this)} />
                        <CardTitle className="text-center">All Projects</CardTitle>
                    </CardHeader>
                    <CardBody className="text-center">
                        <Table
                            responsive
                            hover
                            bordered
                            secondary
                            className="striped"
                            style={{
                                borderRadius: 15
                            }}>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Create Date</th>
                                    <th>Last Modefied</th>
                                    <th>Progress</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this
                                    .props
                                    .projects
                                    .map((project, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">
                                                    <UncontrolledDropdown key={index}>
                                                        <DropdownToggle>
                                                            <i className="fa fa-ellipsis-h" />
                                                        </DropdownToggle>
                                                        <DropdownMenu
                                                            left
                                                            style={{
                                                                borderRadius: 15
                                                            }}>
                                                            <DropdownItem
                                                                onClick={() => this.onOpenProjectStatisticsModal(project)}
                                                                style={{
                                                                    borderRadius: 15
                                                                }}>
                                                                <i className="fa fa-info-circle" />
                                                                Detail
                                                                </DropdownItem>
                                                            <DropdownItem
                                                                onClick={() => this.onEditProject(project)}
                                                                style={{
                                                                    borderRadius: 15
                                                                }}>
                                                                <i className="fa fa-edit ml-1" />
                                                                Edit
                                                                </DropdownItem>
                                                            <DropdownItem className="text-danger"
                                                                onClick={() => this.onDeleteProject(project.id)}
                                                                style={{
                                                                    borderRadius: 15
                                                                }}>
                                                                <i className="fa fa-trash" />
                                                                Delete
                                                                </DropdownItem>
                                                        </DropdownMenu>
                                                    </UncontrolledDropdown>
                                                </th>
                                                <td>
                                                  {project.name}
                                                </td>
                                                <td><i className="btn btn-default btn-xs" 
                                                    onClick={ () => this.onDescToggle(`proj${index}`)} >
                                                    <span className="fa fa-eye" /></i>
                                                    {project.description ? project.description.substring(0, 10) :
                                                     project.description}...
                                                    <Collapse isOpen={this.state[`proj${index}`]}>
                                                       {project.description}
                                                    </Collapse></td>
                                                <td><FormattedDate
                                                    value={project.dateCreated}
                                                    day="numeric"
                                                    month="long"
                                                    year="numeric" /></td>
                                                <td>
                                                    <FormattedDate
                                                        value={project.lastModefied}
                                                        day="numeric"
                                                        month="long"
                                                        year="numeric" /></td>
                                                <td>
                                                    <Badge className={getProgressBackground(project.progress)}>
                                                        {project.progress}%</Badge>
                                                </td>
                                            </tr>
                                        );
                                    })}
                            </tbody>
                        </Table>
                    </CardBody>
                    <CardFooter className="text-center">{this.props.projects.length} {this.props.projects.length > 1
                        ? 'Projects'
                        : 'Project'}</CardFooter>
                </Card>
                <ProjectModal />
                <Modal
                    isOpen={this.props.projectDetailOpen}
                    className="modal-dialog-centered modal-lg"
                    backdrop="true"
                    id="projectDetailModalId">
                    <ModalHeader toggle={() => this.onCloseProjectDetail()} className="">
                        Project Statistics
                        </ModalHeader>
                    <ModalBody className="">
                        <ProjectStatistics />
                    </ModalBody>
                </Modal>
            </div>
        );
    }

    renderProjectsBody() {
        switch (true) {
            case (this.props.projectsBody == PROJECTS_BODY_TABLE):
                return (this.getProjectsTable());
            case (this.props.projectsBody == PROJECTS_BODY_ADD_EDIT):
                return (<AddEditProject />);
            default:
                return (this.getProjectsTable());
        }
    }

    render() {
        return (this.renderProjectsBody())
    }
}


const mapStateToProps = ({ projectReducer }) => {
    const { projects, projectDetailOpen, selectedProject, projectsBody } = projectReducer;
    return { projects, projectDetailOpen, selectedProject, projectsBody };
};

export default connect(mapStateToProps, {
    updateAllProjects,
    newProject,
    editProject,
    deleteProject,
    routeToDashboard,
    updateAllUsers,
    openProjectStatisticsModal,
    closeProjectDetailModal
})(Projects);
