/*from https://stackblitz.com/edit/reactstrap-navbartoggler-example?file=package.json*/

import React, {Component} from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
    Container
} from 'reactstrap';
import './NavigationBar.css';

const links =  [
    { id: 0, href:"/how-it-works", text: "How it works" },
    { id: 1, href:"https://www.mountaineers.org/blog/what-are-the-ten-essentials",  text: "Further reading"}
]

const createNavItem = ({href, text, className}) => (
    <NavItem>
        <NavLink href={href} className={className}><h5 className="navItem">{text}</h5></NavLink>
    </NavItem>
)

class NavigationBar extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        var navColor = "white";
        if (this.props.currentScrollHeight<520) {
            navColor = "transparent";
        }
        return (
            <Container>
                <Navbar color={navColor} light expand="md" fixed="top" className="pl-5 pr-5">
                    <NavbarBrand href="/" className="mr-auto font-weight-bold"><h1 className="appName">Eldora</h1></NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {links.map(createNavItem)}
                        </Nav>
                    </Collapse> 
                </Navbar>
            </Container>
        );
    }
}

export default NavigationBar;
