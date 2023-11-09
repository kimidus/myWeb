import React,{Component} from "react";
import { Button,Container,Form,Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js"

class C6_Secant extends Component{
  constructor(props){
    super(props)
    this.state={
      Equation: "pow(x,2)-7",
      X1: 0,
      X2: 1,
      XN: 0,
      Data: []
    }
  }
  error=(xold,xnew)=>Math.abs((xnew-xold)/xnew)*100

  CalSecant=(x1,x2)=>{
    let xn1=x1
    let xn2=x2
    let xn_new,fx1,fx2
    const MAX_ITER=50
    const tolerance = 0.000001;
    let iteration = 0;
    let ea = 100;
    const data=[]
    while(ea>tolerance  && iteration<MAX_ITER){
      iteration++
      fx1 = evaluate(this.state.Equation,{x: xn1});
      fx2 = evaluate(this.state.Equation,{x: xn2});
      xn_new = xn1-((fx1*(xn1-xn2))/(fx1-fx2))
      ea=this.error(xn2,xn_new)
      data.push({
          iteration:iteration,
          xn:xn_new,
          error:ea
      })
      xn1=xn2
      xn2=xn_new
    }
    this.setState({Data:data,XN:xn_new})
  }

  inputEquation1=(event)=>{
    this.setState({Equation:event.target.value})
  }
  inputX1=(event)=>{
    this.setState({X1:event.target.value})
  }
  inputX2=(event)=>{
     this.setState({X2:event.target.value})
   }
  calculateRoot=()=>{
    let x1=parseFloat(this.state.X1)
    let x2=parseFloat(this.state.X2)
    this.CalSecant(x1,x2)
  }

  render(){
    const {Data,Equation,X1,X2,XN}=this.state
    return(
      <Container>
        <h1>Secant Method</h1>

        <Form>
          <Form.Group>
            <Form.Label>Input f(x)</Form.Label>
            <input
              type="text"
              value={Equation}
              onChange={(event)=>this.inputEquation(event)}
              style={{widht:"20%",margin:"0 auto"}}
            />
            <Form.Label>Input X1</Form.Label>
            <input
              type="number"
              value={X1}
              onChange={(event)=>this.inputX1(event)}
              style={{widht:"20%",margin:"0 auto"}}
            />
            <Form.Label>Input X2</Form.Label>
            <input
              type="number"
              value={X2}
              onChange={(event)=>this.inputX2(event)}
              style={{widht:"20%",margin:"0 auto"}}
            />
          </Form.Group>

          <Button onClick={this.calculateRoot}>Calculate</Button>
        </Form>
        <h4>Answer={XN.toFixed(6)}</h4>

        <Table striped bordered hover variant="dark">
          <thead>
            <th width="10%">Iterlation</th>
            <th width="25%">XN</th>
            <th width="25%">Error</th>
          </thead>
          <tbody>
            {Data.map((element,index)=>(
              <tr key={index}>
                <td>{element.iteration}</td>
                <td>{element.xn.toFixed(6)}</td>
                <td>{element.error.toFixed(6)}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        <Plot
          data={[{
          x: Data.map(element => element.xn.toFixed(6)),
          y: Data.map(element => evaluate(Equation,{x: element.xn}).toFixed(6)),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color:'red' }
          }]}
          layout={{
            width: 800,
            height: 400,
            title: 'Secant Graph',
            xaxis: { title: 'x' },
            yaxis: { title: 'f(x)' }
          }}
        />
      </Container>
    )
  }
  
}
export default C6_Secant