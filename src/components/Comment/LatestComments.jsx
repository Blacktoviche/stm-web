import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Card, CardBody,ListGroup, ListGroupItem, Badge, UncontrolledTooltip,
    CardTitle, Button, CardHeader, CardFooter
} from 'reactstrap';
import { updateLatestComments } from '../../actions/CommentActions';
import { routeTo } from '../../actions/SideBarActions';
import { BODY_COMMENTS, BODY_MY_COMMENTS } from '../../utils/Utils';
import { getProgressBackground } from '../../utils/Utils';


class LatestComments extends Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log('idADmin:: ', this.props.isAdmin);
        this.props.updateLatestComments(this.props.isAdmin);
    }

    onCommentsTable() {
        if(this.props.isAdmin){
            this.props.routeTo(BODY_COMMENTS);
        }else{
            this.props.routeTo(BODY_MY_COMMENTS);
        }
    }

    render() {
        return (
            <Card className="rounded outline dark" style={{ borderRadius: 20 }}>
                <CardHeader className="text-white customBG" style={{
                        borderRadius: 15
                    }}>
                    <Button color="secondary" className='float-left'
                        onClick={this.onCommentsTable.bind(this)}>
                        <i className="fa fa-bars" id='commentBtnId'>
                            <UncontrolledTooltip placement="bottom"
                                target="commentBtnId">
                                All Comments
                        </UncontrolledTooltip>
                        </i>
                    </Button>
                    <CardTitle className="text-center">Latest Comments</CardTitle>
                </CardHeader>
                <CardBody className="text-center">
                    <ListGroup>
                        {this.props.latestComments.map((comment, index) => {
                            return (
                                <ListGroupItem tag="a" action key={index}
                                    className="d-flex justify-content-between align-center">
                                    {comment.commentText ? comment.commentText.substring(0, 15) :
                                        comment.commentText}...
                                    <Badge className={getProgressBackground(comment.progress)}>
                                        {comment.progress}%</Badge>
                                </ListGroupItem>
                            );
                        })}
                    </ListGroup>
                </CardBody>
                <CardFooter className="text-left"></CardFooter>
            </Card>
        );
    }
}

const mapStateToProps = ({ commentReducer }) => {
    const { latestComments } = commentReducer;
    return { latestComments };
};

export default connect(mapStateToProps, {
    updateLatestComments, routeTo
})(LatestComments);