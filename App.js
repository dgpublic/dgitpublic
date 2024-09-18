
import "./App.css";

import React, { Component } from 'react';
import { Row, Col, Button, Card, CardBody, CardHeader, CardFooter, InputGroup, Input } from 'reactstrap'


class App extends Component {
  
    // ######################### initialzation ###########################
    constructor(props) {
        super(props);
        this.state = {
            "key": "001",
            "firstName": "Dy",
            "lastName": "Gan",
            "httpStatus": 0,
            "errorMsg": "No Error"
        };
        this.handleClick = this.handleClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    // ######################### input handler ###########################
    handleChange(event) {
        const inputId = event.target.id;
        const inputValue = event.target.value;
        let state = this.state;
        state[inputId] = inputValue;
        this.setState(state);
    }

    // ######################### click handler ###########################
    handleClick(event) {
        const serverUrl = "http://localhost:5000/keys";
        const debugUrl = "http://localhost:5000/debug";
        const buttonId = event.target.id;
        let state = this.state
        // ######################### create name ###########################
        if (buttonId === "create") {
            fetch(serverUrl, {
                method: 'POST',
                body: JSON.stringify({
                    "key": state["key"],
                    "firstName": state["firstName"],
                    "lastName": state["lastName"]
                })
            })
                .then(response => {
                    console.log(response);
                    state["httpStatus"] = response.status;
                    //state["errorMsg"] = response.statusText;
                    state["errorMsg"] = "Yoooohooo" + response.status;
                    this.setState(state);
                    if (response.status < 300) {
                        return response.json();
                    }
                    return {}
                })
                .then(object => {
                    console.log(object);
                    if (state["httpStatus"] < 300) {
                        state["key"] = object["key"];
                        state["firstName"] = object["firstName"];
                        state["lastName"] = object["lastName"];
                    }
                    this.setState(state);
                })
                .catch(error => {
                    console.log(error);
                    state["errorMsg"] = error;
                    this.setState(state);
                });
        }

        // ########################## read name ############################
        else if (buttonId === "read") {
            fetch(serverUrl + "/" + state["key"], {
                method: 'GET'
            })
                .then(response => {
                     console.log(response);
                    state["httpStatus"] = response.status;
                    state["errorMsg"] = response.statusText;
                    if (response.status < 300) {
                        return response.json();
                    }
                    return {}
                })
                .then(object => {
                    console.log(object);
                    if (state["httpStatus"] < 300) {
                        state["key"] = object["key"];
                        state["firstName"] = object["firstName"];
                        state["lastName"] = object["lastName"];
                    } else {
                        state["firstName"] = "";
                        state["lastName"] = "";
                    }
                    this.setState(state);
                })
                .catch(error => {
                    console.log(error);
                    state["firstName"] = "";
                    state["lastName"] = "";
                    state["errorMsg"] = error;
                    this.setState(state);
                });
        }

        // ######################### update name ###########################
        else if (buttonId === "update") {
            fetch(serverUrl + "/" + state["key"], {
                method: 'PUT',
                body: JSON.stringify({
                    "firstName": state["firstName"],
                    "lastName": state["lastName"]
                })
            })
                .then(response => {
                    console.log(response);
                    state["httpStatus"] = response.status;
                    state["errorMsg"] = response.statusText;
                    if (response.status < 300) {
                        return response.json();
                    }
                    return {}
                })
                .then(object => {
                    console.log(object);
                    if (state["httpStatus"] < 300) {
                        state["key"] = object["key"];
                        state["firstName"] = object["firstName"];
                        state["lastName"] = object["lastName"];
                    }
                    this.setState(state);
                })
                .catch(error => {
                    console.log(error);
                    state["errorMsg"] = error;
                    this.setState(state);
                });
        }

        // ######################### delete name ###########################
        else if (buttonId === "delete") {
            fetch(serverUrl + "/" + state["key"], {
                method: 'DELETE'
            })
                .then(response => {
                    console.log(response);
                    state["httpStatus"] = response.status;
                    state["errorMsg"] = response.statusText;
                    if (response.status < 300) {
                        return response.json();
                    }
                    return {}
                })
                .then(object => {
                    console.log(object);
                    if (state["httpStatus"] < 300) {
                        state["key"] = object["key"];
                        state["firstName"] = object["firstName"];
                        state["lastName"] = object["lastName"];
                    }
                    this.setState(state);
                })
                .catch(error => {
                    console.log(error);
                    state["errorMsg"] = error;
                    this.setState(state);
                });
        }

        // ######################### debug method ###########################
        else if (buttonId === "debug") {
            fetch(debugUrl, {
                method: 'GET'
            })
                .then(response => {
                    console.log(response);
                    state["httpStatus"] = response.status;
                    state["errorMsg"] = response.statusText;
                    if (response.status < 300) {
                        return response.json();
                    }
                    return {}
                })
                .then(object => {
                    console.log(object);
                    if (state["httpStatus"] < 300) {
                        state["errorMsg"] = JSON.stringify(object);
                    }
                    this.setState(state);
                })
                .catch(error => {
                    console.log(error);
                    state["firstName"] = "";
                    state["lastName"] = "";
                    state["errorMsg"] = error;
                    this.setState(state);
                });
        }
    }
    // ######################### page design ###########################
    render() {
        const state = this.state;
        return (

            <><div className="App" height = '2'>
                <div>

                    <p> DG test                   </p>
                </div>
           
                    <Row> <Col sm={{ size: 6, offset: 3 }}> <Card className='mt-5'>
                        <CardHeader tag="h3">Product Details</CardHeader>
                        <CardBody>
                            <InputGroup>
                                Key: <Input value={state["key"]} onChange={this.handleChange} id="key" />
                            </InputGroup> <br />
                            <InputGroup>
                                First Name:
                                <Input value={state["firstName"]} onChange={this.handleChange} id="firstName" />
                            </InputGroup> <br />
                            <InputGroup>
                                Last Name:
                                <Input value={state["lastName"]} onChange={this.handleChange} id="lastName" />
                            </InputGroup> <br />
                            <Button color="red" onClick={this.handleClick} id="create">Create</Button>{" "}
                            <Button color="green" onClick={this.handleClick} id="read">Read</Button>{" "}
                            <Button color="yellow" onClick={this.handleClick} id="update">Update</Button>{" "}
                            <Button color="magenta" onClick={this.handleClick} id="delete">Delete</Button>{" "}
                            <Button color="blue" onClick={this.handleClick} id="debug">Debug</Button>{" "}
                        </CardBody>
                        <CardFooter>
                            {"Message: " + state["errorMsg"]}
                        </CardFooter>
                    </Card> </Col> </Row>
                </div></>
        )
    }
}
export default App;