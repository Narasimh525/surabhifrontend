/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class TableList extends Component {

constructor(props){
  super(props);
  this.state={
    results:[],
    filtervalue:'',
    defaultdate:'',
    agentmobilenumber:'',
    dropdownValue:''
  }
}
componentDidMount(){


  var date=new Date();
  var month=date.getMonth()+1;
  var getdate=date.getDate();
  var year=date.getFullYear();
  //console.log(month);

  if(getdate>9) var defaultdate=year+"-"+month+"-"+getdate;
  else var defaultdate=year+"-"+month+"-"+"0"+getdate;
this.setState({filtervalue:defaultdate,dropdownValue:'iffcotokio'},
  ()=>{
    console.log("this.state.filtervalue"+this.state.filtervalue);
    axios.post('http://localhost:4937/filtercsvdata', {
      postdate: this.state.filtervalue,
      agentmobilenumber:this.state.agentmobilenumber,
      dropdownValue:this.state.dropdownValue
    }).then(response =>{
      console.log(response['data']['orginalarr']);
      console.log("ddd"+JSON.stringify(response['data']['ipData']));
      if(response['data']){
    this.setState({results:response['data']['orginalarr']});
    }
    });
  });
// axios.get("http://localhost:4937/readcsvdata").then(res=>{

// console.log(res['data']);
// var resultdata=this.setState({results:res['data']['arr']});

// })

}
handleChange=(event)=>{
  // alert(event.target.name);
  //this.setState({ filtervalue: e.target.value });

  if(event.target.name==='filtervalue') {
this.setState({
  filtervalue:event.target.value
})
}

if(event.target.name==='agentmobilenumber') {
this.setState({
agentmobilenumber:event.target.value
})
}

if(event.target.name==='dropdownvalue') {
  this.setState({
    dropdownValue:event.target.value
    })
  }

}

handleClick = (e) => {
e.preventDefault();
//    alert(this.state.filtervalue);
    var date=new Date(this.state.filtervalue);
    var month=date.getMonth()+1;
    var getdate=date.getDate()+1;
    var year=date.getFullYear();
    //console.log(month);
//alert(this.GetTime(new Date('2020-11-01')));
//alert(date.getMonth()+1);
//var month=(today.getMonth()+1);
//console.log(month);
/*if(month<10)
{
  month="0"+month;
} else {
  month=month;
}*/
/*
if(getdate<10)
{
  getdate="0"+getdate;
} else {
  getdate=getdate;
}*/

  //  var dateformat=year+"-"+month+"-"+getdate;
    //console.log(dateformat)
// alert(dateformat);
    axios.post('http://localhost:4937/filtercsvdata', {
    postdate: this.state.filtervalue,
    agentmobilenumber:this.state.agentmobilenumber,
    dropdownValue:this.state.dropdownValue
  }).then(response =>{
    console.log(response['data']['orginalarr']);
    if(response['data']){
  this.setState({results:response['data']['orginalarr']});
}
});

  }

  render() {
      //alert(this.state.results.length);
    return (
      <div className="content" >
      <h3>Surabhi Match Dashboard</h3>
      <br />
      <form onSubmit={this.handleClick}>
      <div className="row">
<div className="col-md-1" style={{textAlign:"right"}}>Filter By</div>
<div className="col-md-3">
<input type="date" required name="filtervalue" defaultValue={this.state.filtervalue} id="filtervalue" onChange={ this.handleChange } className="form-control" />
</div>
<div className="col-md-3">
<input type="text" placeholder="Agent Mobile Number" name="agentmobilenumber" id="agentmobilenumber" onChange={ this.handleChange } className="form-control" />
</div>
<div className="col-md-3">
 
  <div className="col-md-6">
    <select name="dropdownvalue" className="btn " onChange={this.handleChange}>
      <option className="btn btn-danger" value="iffcotokio">IFFCOTOKIO</option>
      <option className="btn btn-success" value="edairy">Edairy</option>
    </select>
  </div>
  <div className="col-md-6">
    <input type="submit" name="submit" id="submit" className="btn btn-primary" value="Filter" />
  </div>
</div>

      </div>
      </form>
      <br />
        <Grid fluid>
          <Row>
            <Col md={12}>

                  <Table striped hover>
                    <thead>
                      <tr>
                      <th>S.No</th>
                      <th>File Name</th>

                      <th>Reference ID</th>
                      <th>Result</th>
                      <th>Roll No</th>
                      <th>Agent Mobile Number</th>
                      <th>Timestamp</th>
                      <th style={{width: '16%'}}>File Destination</th>
                      </tr>
                    </thead>
                    <tbody>
                      {

  this.state.results.length && this.state.results.map(function(item, i){

    if(typeof item['File Destination']==='string'){
var filedestnation=item['File Destination'].split('/');
var filefolder_name=filedestnation[filedestnation.length-2]+"_"+filedestnation[filedestnation.length-1]+"_"+item['Roll No'];
//var filefolder_name="";
  var resss=item['Roll No'] ? item['Roll No']:'No';
  console.log(typeof item['Result']);
  if(typeof item['Result']!=='undefined'){
  var nomatch=item['Result'].includes("No");
} else {
  var nomatch="yes".includes("No");
}
  //console.log(nomatch);
  return <tr key={i}><td>{i+1}</td><td>{item['File Name']}</td>

  <td>{item['Reference ID']}</td>

  <td >
  {
    !nomatch?<Link style={{color:"green"}} to={"/admin/viewimage/"+item['Result']+"/"+filefolder_name}>{item['Result']}</Link>:<Link style={{color:"red"}} to={"/admin/viewimage/"+item['Result']+"/"+filefolder_name}>{item['Result']}</Link>
}
  </td>
  <td>{ item['Roll No'] ? item['Roll No']:'Not Available'}</td>
<td>{item['Agent Mobile Number']?item['Agent Mobile Number']:'Not Available'}</td>
<td>{item['Timestamp'] ? item['Timestamp']:'Not Available' }</td>
<td>{item['File Destination']}</td>
  </tr>
} })

                      }

                    </tbody>
                  </Table>


            </Col>

          </Row>
        </Grid>
      </div>
    );
  }
}

export default TableList;
