import React, { Component } from 'react';
import { Container, Card, CardBody, CardTitle, CardText} from 'reactstrap';
import './OpeningBanner.css';

class OpeningBanner extends Component {

    render() {
        const opacity = 75/Math.max(this.props.currentScrollHeight, 0.01);
        return (
            <div>
                <Container id="homepageBackground" className="d-flex flex-row-reverse justify-content-right align-items-center" fluid>
                <Card className="mr-md-2 mr-lg-5" style={{opacity}}>
                    <CardBody>
                        <CardTitle><h3>Outdoor trip planning is hard</h3></CardTitle>
                        <CardText>Eldora analyses outdoor risks to make your planning easier.</CardText>
                    </CardBody>
                </Card>
                </Container>
                <br/>
            </div>
        );
    }
}

export default OpeningBanner;