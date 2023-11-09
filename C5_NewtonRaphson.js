import React,{Component} from "react";
import { Button,Container,Form,Table } from "react-bootstrap";
import { evaluate } from "mathjs";
import Plot from "react-plotly.js"

class C5_Newton extends Component{
  constructor(props){
    super(props)
    this.state={
      Equation1: "x^2-7",
      Equation2: "2x",
      X1: 2,
      XN: 0,
      Data: []
    }
  }
  error=(xold,xnew)=>Math.abs((xnew-xold)/xnew)*100

  CalNewton=(x1)=>{
    let xn=x1,xn_new
    let fxn,gxn
    const MAX_ITER=50
    const tolerance = 0.000001;
    let iteration = 0;
    let ea = 100;
    const data=[]
    while(ea>tolerance && iteration<MAX_ITER){
      iteration++
      fxn = evaluate(this.state.Equation1,{x: xn});
      gxn = evaluate(this.state.Equation2,{x: xn});
      xn_new=xn-(fxn/gxn)
      ea=this.error(xn,xn_new)
      data.push({
          iteration:iteration,
          xn:xn,
          error:ea
      })
      xn=xn_new
    }
    this.setState({Data:data,XN:xn})
  }

  inputEquation1=(event)=>{
    this.setState({Equation:event.target.value})
  }
  inputEquation2=(event)=>{
     this.setState({Equation:event.target.value})
   }
  inputX1=(event)=>{
    this.setState({X1:event.target.value})
  }
  calculateRoot=()=>{
    let x1=parseFloat(this.state.X1)
    this.CalNewton(x1)
  }

  render(){
    const {Data,Equation1,Equation2,X1,XN}=this.state
    return(
      <Container>
        <h1>Newton Raphson Method</h1>

        <Form>
          <Form.Group>
            <Form.Label>Input f(x)</Form.Label>
            <input
              type="text"
              value={Equation1}
              onChange={(event)=>this.inputEquation1(event)}
              style={{widht:"20%",margin:"0 auto"}}
            />
            <Form.Label>Input f'(x)</Form.Label>
            <input
              type="text"
              value={Equation2}
              onChange={(event)=>this.inputEquation2(event)}
              style={{widht:"20%",margin:"0 auto"}}
            />
            <Form.Label>Input X1</Form.Label>
            <input
              type="number"
              value={X1}
              onChange={(event)=>this.inputX1(event)}
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
          y: Data.map(element => evaluate(Equation1,{x: element.xn}).toFixed(6)),
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color:'red' }
          }]}
          layout={{
            width: 800,
            height: 400,
            title: 'Newton Raphson Graph',
            xaxis: { title: 'x' },
            yaxis: { title: 'f(x)' }
          }}
        />
      </Container>
    )
  }
  
}
export default C5_Newton