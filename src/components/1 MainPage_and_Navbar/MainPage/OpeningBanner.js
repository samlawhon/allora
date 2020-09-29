import React from 'react';
import { Container, Card, CardBody, CardTitle, CardText} from 'reactstrap';
import './OpeningBanner.css';

const OpeningBanner = () => (
    <div>
        <Container id="homepageBackground" className="d-flex flex-row-reverse justify-content-right align-items-center" fluid>
        <Card className="mr-md-2 mr-lg-5">
            <CardBody>
                <CardTitle><h3>Outdoor trip planning is hard</h3></CardTitle>
                <CardText>Eldora analyses outdoor risks to make your planning easier.</CardText>
            </CardBody>
        </Card>
        </Container>
        <br/>
    </div>
);

export default OpeningBanner;