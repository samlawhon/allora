import React, { useState } from 'react';
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

const NavigationBar = () => {

    const [isOpen, setIsOpen] = useState(false);

    const toggle = () => (setIsOpen(!isOpen));

    const links =  [
        { id: 0, href:"https://www.mountaineers.org/blog/what-are-the-ten-essentials",  text: "Further reading"}
    ]
    
    const createNavItem = ({id, href, text}) => (
        <NavItem  key={id}>
            <NavLink href={href}><h5 className="navItem">{text}</h5></NavLink>
        </NavItem>
    )

    return (
        <Container>
            <Navbar color="white" light expand="md" fixed="top" className="pl-5 pr-5">
                <NavbarBrand href="/" className="mr-auto font-weight-bold"><h1 className="appName">Eldora</h1></NavbarBrand>
                <NavbarToggler onClick={toggle}/>
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        {links.map(createNavItem)}
                    </Nav>
                </Collapse> 
            </Navbar>
        </Container>
    );
}

export default NavigationBar;
