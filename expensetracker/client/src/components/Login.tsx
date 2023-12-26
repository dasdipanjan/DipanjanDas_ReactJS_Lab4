
import { FormEvent, useRef, useState } from "react"
import { Form, Button, Alert, Container, Col, Row, Card } from "react-bootstrap"

import { useNavigate } from "react-router-dom";

import { isValidUser } from "../services/user-utils";

import { getAllUserItems } from "../services/users-service";

const Login = () => {

    // int age
    // age : integer
    // List<String>
    // Set<Employee>

    const [error, setError] = useState('');

    const navigate = useNavigate();

    const usernameRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);



    const doLogin = async (event: FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const username = usernameRef?.current?.value;
        const password = passwordRef?.current?.value;
        const userItems = await getAllUserItems();
        const matchedUser = isValidUser(userItems, username, password);
        console.log(matchedUser);
        console.log(`Matching user -> ${matchedUser}`)
        if (matchedUser) {

            // MatchedUser is defined 
            // MatchedUser 'true'

            // show Home
            navigate("/home")
        } else {

            // MatchedUser is undefined 

            setError("Username/password combination is wrong...")
        }

    }

    return (
        <div>
            <Container>
                <Row className="vh-100 d-flex justify-content-center align-items-center">
                    <Col md={8} lg={6} xs={12}>
                        <Card className="shadow">
                            <Card.Body>
                                <Form onSubmit={doLogin}>

                                    {
                                        error && (
                                            /* Display the error message */

                                            <Alert key='danger' variant='danger'>
                                                {error}
                                            </Alert>
                                        )
                                    }

                                    <Form.Group className="mb-3" controlId="username">
                                        <Form.Label className="text-center">Username</Form.Label>
                                        <Form.Control type="text" placeholder="Enter username" ref={usernameRef} />
                                    </Form.Group>

                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" ref={passwordRef} />
                                    </Form.Group>
                                    <div className="d-grid">
                                        <Button variant="primary" type="submit">
                                            Login
                                        </Button>
                                    </div>
                                </Form>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export { Login }