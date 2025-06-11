import { useContext } from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import AuthContext from '../../context/authContext';
import './AppNavbar.css'; // Ensure this CSS file is linked

const AppNavbar = () => {
    const { user, isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
            <Container>
                {/* Branding */}
                <Navbar.Brand as={NavLink} to="/" className="custom-nav-link">
                    Task Manager
                </Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav" className="justify-content-between">
                    {/* Left Nav */}
                    <Nav className="me-auto nav-links d-flex align-items-center">
                        {isAuthenticated && (
                            <Nav.Link as={NavLink} to="/dashboard" className="custom-nav-link">
                                Dashboard
                            </Nav.Link>
                        )}
                        {user?.role === 'admin' && (
                            <Nav.Link as={NavLink} to="/admin" className="custom-nav-link">
                                Admin Panel
                            </Nav.Link>
                        )}
                    </Nav>

                    {/* Right Auth Controls */}
                    <Nav className="auth-section">
                        {isAuthenticated ? (
                            <>
                                <Navbar.Text className="text-white">
                                    Signed in as: <strong>{user?.username}</strong>
                                </Navbar.Text>
                                <Button variant="outline-light" onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>
                        ) : (
                            <>
                                <Nav.Link as={NavLink} to="/login" className="custom-nav-link">
                                    Login
                                </Nav.Link>
                                <Nav.Link as={NavLink} to="/register" className="custom-nav-link">
                                    Register
                                </Nav.Link>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
