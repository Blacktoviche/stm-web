import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Button, Modal, ModalHeader,
    ModalBody, ModalFooter, Input, Label,
    Form, FormGroup, Alert, FormFeedback
} from 'reactstrap';
import { saveProject, projectNameChanged, projectDescChanged, cancelNewProject } from '../../actions/ProjectActions';

class ProjectModal extends Component {

    onSaveProject() {
        const { projectId, projectName, projectDesc } = this.props;
        this.props.saveProject({ id: projectId, name: projectName, description: projectDesc });
    }

    onProjectNameChanged(e) {
        this.props.projectNameChanged(e.target.value);
    }

    onProjectDescChanged(e) {
        this.props.projectDescChanged(e.target.value);
    }

    onCancelNewProject() {
        this.props.cancelNewProject();
    }

    renderMessage() {
        if (this.props.projectSaveError !== '') {
            return (<Alert color="danger">
                Error while saving project! ({this.props.projectSaveError})
      </Alert>)
        }
    }

    render() {
        return (
            <Modal isOpen={this.props.projectModalOpen} toggle={this.toggle}
                backdrop="static" className="modal-dialog modal-dialog-centered">
                <ModalHeader toggle={this.toggle}>New Project</ModalHeader>
                <ModalBody>
                    <div className="mx-auto">
                        <Form>
                            <FormGroup>
                                <Label for="projectName">Name</Label>
                                <Input className="form-control"
                                    type="text"
                                    name="projectName"
                                    id="projectName"
                                    placeholder="Enter Project name"
                                    onChange={this.onProjectNameChanged.bind(this)}
                                    value={this.props.projectName}
                                />
                                <FormFeedback>Name can't be empty!</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label for="projectDesc">Description</Label>
                                <Input className="form-control"
                                    type="textarea"
                                    name="projectDesc"
                                    id="projectDesc"
                                    placeholder="Enter Project Description"
                                    onChange={this.onProjectDescChanged.bind(this)}
                                    value={this.props.projectDesc}
                                />
                            </FormGroup>
                        </Form>
                        {this.renderMessage()}
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className="btn-primary btn-lg  rounded"
                        onClick={this.onSaveProject.bind(this)}>Save Project</Button>
                    <Button className="btn-primary btn-lg  rounded"
                        onClick={this.onCancelNewProject.bind(this)}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }
}

const mapStateToProps = ({ projectReducer }) => {
    const { projectName, projectDesc, projectId, projectModalOpen, projectSaveError } = projectReducer;
    return { projectName, projectDesc, projectId, projectModalOpen, projectSaveError };
};

export default connect(mapStateToProps, {
    saveProject, projectNameChanged, projectDescChanged, cancelNewProject
})(ProjectModal);