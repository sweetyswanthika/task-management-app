// App.js File
import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import ListGroup from "react-bootstrap/ListGroup";

// The bootstrap CSS and individual Bootstrap components are imported to be used in the component.

class App extends Component {
    constructor(props) {
        super(props);

        // Setting up state
        this.state = {
            userInput: "", //userinput is empty when intially component is rendered
            list: [], //list is empty initially
             updateInput : this.updateInput.bind(this),
             addItem : this.addItem.bind(this),
             deleteItem : this.deleteItem.bind(this),
             editItem : this.editItem.bind(this) //the methods of this class are //bounded to this so that they have correct context when called
        };
    }

    // Sets a updated user input value
    updateInput(value) {
        this.setState({
            userInput: value,
        });
    }

    // Add item if user input is not empty
    addItem() {
        if (this.state.userInput !== "") {
            const userInput = {
                // Add a random id which is used to delete
                id: Math.random(),

                // Add a user value to list
                value: this.state.userInput,
            };

            // Update list using spread operator
            const list = [...this.state.list];
            list.push(userInput);

            // reset state by updated list and empty userinput
            this.setState({
                list,
                userInput: "",
            });
        }
    }

    // Function to delete item from list by id
    deleteItem(key) {
        const list = [...this.state.list];

      //It filters out the item with the matching id and updates the state with the new list.
        const updateList = list.filter((item) => item.id !== key);
      

        // Update list in state
        this.setState({
            list: updateList,
        });
    }

    //It prompts the user to edit the item and, if the input is valid, updates the item's //value in the list and updates the state.
    editItem = (index) => {
      const todos = [...this.state.list];
      const editedTodo = prompt('Edit the todo:', todos[index].value);
      if (editedTodo !== null && editedTodo.trim() !== "") {
        let updatedTodos = [...todos]
        updatedTodos[index].value= editedTodo
        this.setState({
          list: updatedTodos,
      });
      }
    }

   //This allows the user to add items by pressing Enter.
    handleKeyPress = (event) => {
    if (event.key === "Enter") {
        this.addItem();
     }
  };

    render() {
    const styles = {
        container: {
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            fontWeight: "bolder",
        },
    };
//The return statement in the render method returns the JSX that defines the UI.
//It includes a Container with Row and Col components for layout.
//An InputGroup is used for the input field and add button.
//The input field (FormControl) is controlled by userInput state, and its value is //updated by updateInput.
//The Button component calls addItem when clicked.
//A ListGroup is used to display the list of items. Each item has buttons for //deleting and editing, which call deleteItem and editItem respectively.
          return (
                  <Container>
                     <Row style={styles.container}>
                          TODO LIST
                    </Row>

                <hr />
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <InputGroup className="mb-3">
                            <FormControl
                                placeholder="add item . . . "
                                size="lg"
                                value={this.state.userInput}
                                onChange={(item) =>
                                    this.updateInput(item.target.value)
                                }
                                aria-label="add something"
                                aria-describedby="basic-addon2"
                            />
                            <InputGroup>
                                <Button
                                    variant="dark"
                                    className="mt-2"
                                    onClick={() => this.addItem()}
                                >
                                    ADD
                                </Button>
                            </InputGroup>
                        </InputGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={{ span: 5, offset: 4 }}>
                        <ListGroup>
                            {/* map over and print items */}
                            {this.state.list.map((item, index) => {
                                return (
                                  <div key = {index} > 
                                    <ListGroup.Item
                                        variant="dark"
                                        action
                                        style={{display:"flex",
                                                justifyContent:'space-between'
                                      }}
                                    >
                                        {item.value}
                                        <span>
                                        <Button style={{marginRight:"10px"}}
                                        variant = "light"
                                        onClick={() => this.deleteItem(item.id)}>
                                          Delete
                                        </Button>
                                        <Button variant = "light"
                                        onClick={() => this.editItem(index)}>
                                          Edit
                                        </Button>
                                        </span>
                                    </ListGroup.Item>
                                  </div>
                                );
                            })}
                        </ListGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default App;
