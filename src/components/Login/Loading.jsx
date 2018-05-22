import React, { Component } from 'react';
import {
    Container, Col, Row,
    Progress
} from 'reactstrap';

import bgImg from '../../assets/imgz/stwscreenshot.png';


export default class Loading extends Component {

    render() {
        const imgStyle = {
            padding: '170px 0',
            backgroundImage: 'url("' + bgImg + '")',
            backgroundSize: 'cover',
            backgroundPosition: 'center center',
        };

        return (
            <section>
                <Container className="py-5" >
                    <Row>
                        <div class="col-md-12">
                            <div className="mb-5"></div>
                            <Row>
                                <div className="col-md-6 mx-auto">
                                    <Progress bar animated color="success" value="100">Loading...</Progress>
                                </div>
                            </Row>
                        </div>
                    </Row>
                </Container>
            </section>
        )
    }
}
