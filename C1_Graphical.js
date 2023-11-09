import React, { Component } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { evaluate, abs } from "mathjs";
import Plot from "react-plotly.js";

class C1_Graphical extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Equation: "43*x-180",
      X1: 0,
      X2: 10,
      X: 0,
    };
  }

  inputEquation = (event) => {
    this.setState({ Equation: event.target.value });
  };

  inputX1 = (event) => {
    this.setState({ X1: event.target.value });
  };

  inputX2 = (event) => {
    this.setState({ X2: event.target.value });
  };

  calculateRoot = () => {
    const x1 = parseFloat(this.state.X1);
    const x2 = parseFloat(this.state.X2);
    this.CalGraphical(x1, x2);
  };

  CalGraphical = (x1, x2) => {
    let fx, fx_next;
    let x = x1;
    const error = 0.000001;
    while (x < x2) {
      fx = evaluate(this.state.Equation, { x: x });
      fx_next = evaluate(this.state.Equation, { x: x + 1 });
      if (fx * fx_next <= 0) {
        break;
      } else {
        x = x + 1;
      }
    }
    while (abs(fx) >= 0.0001) {
      x = x + error;
      fx = evaluate(this.state.Equation, { x: x });
    }
    this.setState({ X: x });
  };

  render() {
    return (
      <Container>
        <h1>Graphical Method</h1>
        <Form>
          <Form.Group>
            <Form.Label>Input f(x)</Form.Label>
            <input
              type="text"
              value={this.state.Equation}
              onChange={this.inputEquation}
              style={{ width: "20%", margin: "0 auto" }}
            />
            <Form.Label>Input X1</Form.Label>
            <input
              type="number"
              value={this.state.X1}
              onChange={this.inputX1}
              style={{ width: "20%", margin: "0 auto" }}
              className="form-control"
            />
            <Form.Label>Input X2</Form.Label>
            <input
              type="number"
              id="X2"
              value={this.state.X2}
              onChange={this.inputX2}
              style={{ width: "20%", margin: "0 auto" }}
              className="form-control"
            />
          </Form.Group>

          <Button variant="dark" onClick={this.calculateRoot}>
            Calculate
          </Button>
        </Form>
        <br />
        <h4 style={{ color: "black" }}>Answer = {this.state.X.toFixed(6)}</h4>

        {/* Graph */}
        {this.state.X && (
          <Plot
            data={[
              {
                x: [this.state.X1, this.state.X, this.state.X2],
                y: [
                  evaluate(this.state.Equation, { x: this.state.X1 }),
                  0,
                  evaluate(this.state.Equation, { x: this.state.X2 }),
                ],
                type: "scatter",
                mode: "lines+markers",
                marker: { color: "red" },
              },
            ]}
            layout={{ width: 800, height: 500, title: "Graphical Graph" }}
          />
        )}
      </Container>
    );
  }
}

export default C1_Graphical;
