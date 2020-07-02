/*from https://stackblitz.com/edit/reactstrap-navbartoggler-example?file=package.json*/

import React, {Component} from 'react';
import { Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';

const links =  [
    { href:"/how-it-works", text: "How it works" },
    { href:"https://www.mountaineers.org/blog/what-are-the-ten-essentials",  text: "Further reading"}
]

const createNavItem = ({href, text, className}) => (
    <NavItem>
        <NavLink href={href} className={className}>{text}</NavLink>
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
        return (
            <div>
                <Navbar color="light" light expand="md">
                    <NavbarBrand href="/" className="mr-auto">Eldora</NavbarBrand>
                    <NavbarToggler onClick={this.toggle}/>
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {links.map(createNavItem)}
                        </Nav>
                    </Collapse> 
                </Navbar>
            </div>
        );
    }
}

export default NavigationBar;
