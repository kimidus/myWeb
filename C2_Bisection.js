import React, {Component} from "react"
import { Button,Container,Form,Table} from "react-bootstrap"
import { evaluate } from "mathjs"
import Plot from "react-plotly.js"

class C2_Bisection extends Component{
     constructor(props){
          super(props)
          this.state={
               Equation: "pow(x,4)-13",
               XL: 1.5,
               XR: 2.0,
               XM: 0,
               Data: []
          }
     }
     error=(xold,xnew)=>Math.abs((xnew-xold)/xnew)*100
     CalBisection=(xl,xr)=>{
          let xm,fxm,fxl,fxr
          const MAX_ITER=50
          const tolerance=0.000001
          let iteration=0;
          let ea=100
          const data=[]
          while(ea>tolerance && iteration<MAX_ITER){
               iteration++
               fxl=evaluate(this.state.Equation,{x: xl})
               fxr=evaluate(this.state.Equation,{x: xr})
               xm=(xl+xr)/2
               fxm=evaluate(this.state.Equation,{x: xm})
               if(fxm*fxr<0){
                    ea=this.error(xl,xm)
                    data.push({
                         iteration:iteration,
                         xl:xl,
                         xr:xr,
                         xm:xm,
                         error:ea
                    })
                    xl=xm
               }
               else if(fxm*fxl<0){
                    ea=this.error(xr,xm)
                    data.push({
                         iteration:iteration,
                         xl:xl,
                         xr:xr,
                         xm:xm,
                         error:ea
                    })
                    xr=xm
               }
               else{
                    ea=0
                    data.push({
                         iteration:iteration,
                         xl:xl,
                         xr:xr,
                         xm:xm,
                         error:ea
                    })
               }
          }
          this.setState({Data:data,XM:xm})
     }

     inputEquation=(event)=>{
          this.setState({Equation:event.target.value})
     }
     inputXL=(event)=>{
          this.setState({XL:event.target.value})
     }
     inputXR=(event)=>{
          this.setState({XR:event.target.value})
     }  
     calculateRoot=()=>{
          let xl=parseFloat(this.state.XL)
          let xr=parseFloat(this.state.XR)
          this.CalBisection(xl,xr)
     }

     render(){
          const {Data,Equation,XL,XR,XM}=this.state
          return(
            <Container>
              <h1>Bisection Method</h1>
      
              <Form>
                <Form.Group>
                  <Form.Label>Input f(x)</Form.Label>
                  <input
                    type="text"
                    value={Equation}
                    onChange={(event)=>this.inputEquation(event)}
                    style={{widht:"20%",margin:"0 auto"}}
                  />
                  <Form.Label>Input XL</Form.Label>
                  <input
                    type="number"
                    value={XL}
                    onChange={(event)=>this.inputXL(event)}
                    style={{widht:"20%",margin:"0 auto"}}
                  />
                  <Form.Label>Input XR</Form.Label>
                  <input
                    type="number"
                    value={XR}
                    onChange={(event)=>this.inputXR(event)}
                    style={{widht:"20%",margin:"0 auto"}}
                  />
                </Form.Group>
      
                <Button onClick={this.calculateRoot}>Calculate</Button>
              </Form>
              <h4>Answer={XM.toFixed(6)}</h4>
      
              <Table striped bordered hover variant="dark">
                <thead>
                  <th width="10%">Iterlation</th>
                  <th width="25%">XL</th>
                  <th width="25%">XR</th>
                  <th width="25%">XM</th>
                  <th width="25%">Error</th>
                </thead>
                <tbody>
                  {Data.map((element,index)=>(
                    <tr key={index}>
                      <td>{element.iteration}</td>
                      <td>{element.xl.toFixed(6)}</td>
                      <td>{element.xr.toFixed(6)}</td>
                      <td>{element.xm.toFixed(6)}</td>
                      <td>{element.error.toFixed(6)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              <Plot
                    data={[{
                         x: Data.map(element => element.xm.toFixed(6)),
                         y: Data.map(element => evaluate(Equation,{x: element.xm}).toFixed(6)),
                         type: 'scatter',
                         mode: 'lines+markers',
                         marker: { color:'red' }
                         }]}
                    layout={{
                         width: 800,
                         height: 400,
                         title: 'Bisection Graph',
                         xaxis: { title: 'x' },
                         yaxis: { title: 'f(x)' }
                    }}
               />
            </Container>

            
          )
     }
     
     
}
export default C2_Bisection