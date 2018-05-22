import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card, CardBody, ListGroup, ListGroupItem, Badge, UncontrolledTooltip,
    CardTitle, Button, CardHeader, CardFooter
} from 'reactstrap';
import { updateLatestProject } from '../../actions/ProjectActions';
import { routeTo } from '../../actions/SideBarActions';
import { BODY_PROJECTS, BODY_MY_PROJECTS } from '../../utils/Utils';
import { getProgressBackground } from '../../utils/Utils';



class LatestProjects extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.updateLatestProject(this.props.isAdmin);
    }

    onProjectsTable() {
        if (this.props.isAdmin) {
            this.props.routeTo(BODY_PROJECTS);
        } else {
            this.props.routeTo(BODY_MY_PROJECTS);
        }
    }

    render() {
        return (
            <Card className="rounded outline dark" style={{ borderRadius: 20 }}>
                <CardHeader className="text-white customBG" style={{
                        borderRadius: 15
                    }}>
                    <Button color="secondary" className='float-left'
                        onClick={this.onProjectsTable.bind(this)}>
                        <i className="fa fa-bars" id='projectBtnId'>
                            <UncontrolledTooltip placement="bottom"
                                target="projectBtnId">
                                All Projects
                        </UncontrolledTooltip>
                        </i>
                    </Button>
                    <CardTitle className="text-center">Latest Projects</CardTitle>
                </CardHeader>
                <CardBody className="text-center">
                    <ListGroup>
                        {this.props.latestProjects.map((project, index) => {
                            return (
                                <ListGroupItem tag="a" action key={index}
                                    className="d-flex justify-content-between align-center">
                                    {project.name ? project.name.substring(0, 15) :
                                        project.name}...
                                    <Badge className={getProgressBackground(project.progress)}>
                                        {project.progress}%</Badge>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </CardBody>
                <CardFooter className="text-left" ></CardFooter>
            </Card>
        );
    }
}

const mapStateToProps = ({ projectReducer }) => {
    const { latestProjects } = projectReducer;
    return { latestProjects };
};

export default connect(mapStateToProps, {
    updateLatestProject, routeTo
})(LatestProjects);