import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardBody,
    CardTitle, Button, CardHeader, CardFooter, Badge ,
    Collapse, Table,
} from 'reactstrap';
import { FormattedDate, IntlProvider } from 'react-intl';
import { updateMyProjects } from '../../actions/ProjectActions';
import { routeToDashboard } from '../../actions/HomeActions';
import { getProgressBackground } from '../../utils/Utils';


class MyProjects extends Component {

    constructor(props) {
        super(props);
        //Init state//Don't remove it
        this.state = {
            modal: false
        };
    }

    componentWillMount() {
        this.props.updateMyProjects();
    }

    onProjectsTable() {
        this.props.routeToProjectsTable();
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

    render() {
        return (
            <div className="">
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
                    <Button
                        className="float-left fa fa-home"
                        onClick={this
                            .onBackToDashboard
                            .bind(this)} />
                    <CardTitle className="text-center text-white">My Projects</CardTitle>
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
                                <th>Name</th>
                                <th>Description</th>
                                <th>Create Date</th>
                                <th>Last Modefied</th>
                                <th>Progress</th>
                                <th>My Progress</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this
                                .props
                                .myProjects
                                .map((project, index) => {
                                    return (
                                        <tr key={index}>    
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
                                            <td>
                                                <Badge className={getProgressBackground(project.statistics.myProgress)}>
                                                    {project.statistics.myProgress}%</Badge>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </Table>
                </CardBody>
                <CardFooter className="text-center">{this.props.myProjects.length} 
                {this.props.myProjects.length > 1
                    ? ' Projects'
                    : ' Project'}</CardFooter>
            </Card>
            </div>
        );
    }
}

const mapStateToProps = ({ projectReducer }) => {
    const { myProjects, userId } = projectReducer;
    return { myProjects, userId };
};

export default connect(mapStateToProps, {
    updateMyProjects, routeToDashboard
})(MyProjects);