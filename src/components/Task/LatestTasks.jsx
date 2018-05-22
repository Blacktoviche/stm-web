import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, CardTitle, CardBody,Button, CardHeader, CardFooter, UncontrolledTooltip
} from 'reactstrap';
import { ListGroup, ListGroupItem, Badge, Progress } from 'reactstrap';
import { updateLatestTasks } from '../../actions/TaskActions';
import { routeTo } from '../../actions/SideBarActions';
import { BODY_TASKS, BODY_MY_TASKS } from '../../utils/Utils';
import { getProgressBackground } from '../../utils/Utils';


class LatestTasks extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.props.updateLatestTasks(this.props.isAdmin);
    }

    onTasksTable() {
        if(this.props.isAdmin){
        this.props.routeTo(BODY_TASKS);
        }else{
            this.props.routeTo(BODY_MY_TASKS);
        }
    }

    render() {
        return (
            <Card className="rounded outline dark " style={{ borderRadius: 20 }}>
                <CardHeader className="text-white customBG" style={{
                        borderRadius: 15
                    }}>
                <Button color="secondary" className='float-left' 
                        onClick={this.onTasksTable.bind(this)}>
                        <i className="fa fa-bars" id='taskBtnId'>
                        <UncontrolledTooltip placement="bottom"
                            target="taskBtnId">
                            All Tasks
                        </UncontrolledTooltip>
                        </i>
                    </Button>
                    <CardTitle className="text-center">Latest Tasks</CardTitle>
                </CardHeader>
                <CardBody className="text-center">
                    <ListGroup>
                        {this.props.latestTasks.map((task, i) => {
                            return (
                                <ListGroupItem tag="a" action key={i}
                                    className="d-flex justify-content-between align-center">
                                    {task.title ? task.title.substring(0, 15) :
                                                     task.title}...
                                    <Badge className={getProgressBackground(task.progress)}>
                                        {task.progress}%</Badge>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </CardBody>
                <CardFooter className="text-center"></CardFooter>
            </Card>
        );
    }
}

const mapStateToProps = ({ taskReducer }) => {
    const { latestTasks } = taskReducer;
    return { latestTasks };
};

export default connect(mapStateToProps, {
    updateLatestTasks, routeTo
})(LatestTasks);