
import React, { Component } from "react";
import { Grid, Row, Col, Table } from "react-bootstrap";
import axios from 'axios';
import {Link} from 'react-router-dom';
import Card from "components/Card/Card.jsx";
import { thArray, tdArray } from "variables/Variables.jsx";

class Viewimage extends Component {

  constructor(props){
    super(props);
    this.state={
      id: this.props.match.params.id,
      cattleresults:[],
      fullsideimage:'',
      muzzleimage1:'',
      muzzleimage2:'',
      muzzleimage3:'',
      trainedcattleresults:[],
      trainedfullsideimage:'',
      trainedmuzzleimage1:'',
      trainedmuzzleimage2:'',
      trainedmuzzleimage3:'',
      cattlename:'',
      testimage:'',
      filename:this.props.match.params.filename,
      imagename:'',
      matchtype:'',
      closetid:'',
      trainedid:'',
    }
  }
  componentDidMount(){
  //  alert(this.state.id);
    console.log(this.state.id);

    var getreferenceid=this.state.id.split(",");
//alert(getreferenceid[1]);

axios.post('http://localhost:4937/api/referenceidmatch/', {
referenceid: getreferenceid[1],
}).then(response =>{
console.log(response['data']);
if(response['data']){
  //console.log(response['data']['cattleresults']['photos'])
  this.setState({closetid:getreferenceid[1],matchtype:getreferenceid[0],cattleresults:response['data']['cattleresults'],fullsideimage:response['data']['cattleresults']['photos'][0]['url'],
muzzleimage1:response['data']['cattleresults']['photos'][1]['url'],muzzleimage2:response['data']['cattleresults']['photos'][2]['url'],
muzzleimage3:response['data']['cattleresults']['photos'][3]['url'],cattlename:response['data']['cattleresults']['cowIDORPetName']})
}

});
this.gettestimage();
this.gettrainedimage();
  }


  gettrainedimage()
  {

    var folder_filename=this.state.filename.split("_");
    axios.post('http://localhost:4937/api/rollidmatch/', {
    rollid: folder_filename[2],
    }).then(response =>{
    console.log(response['data']);
    if(response['data']){
      //console.log(response['data']['cattleresults']['photos'])
      this.setState({trainedcattleresults:response['data']['cattleresults'],trainedfullsideimage:response['data']['cattleresults']['photos'][0]['url'],
    trainedmuzzleimage1:response['data']['cattleresults']['photos'][1]['url'],trainedmuzzleimage2:response['data']['cattleresults']['photos'][2]['url'],
    trainedmuzzleimage3:response['data']['cattleresults']['photos'][3]['url'],trainedid:folder_filename[2],imagename:folder_filename[1]})
    }

    });
  }

  gettestimage(){
/*axios.get('http://34.105.16.205:4936/getfile').then(response=>{
this.setState({testimage:response['data']});
console.log(response['data']);
})*/

var folder_filename=this.state.filename.split("_");
axios.post('http://34.105.16.205:4937/getfile', {
foldername: folder_filename[0],
filename: folder_filename[1]
}).then(response =>{
console.log(response['data']);
if(response['data']){
  //console.log(response['data']['cattleresults']['photos'])
this.setState({testimage:response['data']['url']});
}

});

  }

render(){
  //alert(this.state.id);
  return (
    <div className="content" >
    <h3>View Cattle</h3>
<h4> Cattle Name -  {this.state.cattlename}</h4>





<h4>Cattle Test Image -  {this.state.imagename}</h4>
<div class="row">
<div class="col-md-6">
<img style={{width:"450px",height:"200px"}} src={this.state.testimage} />
</div>

</div>
<br />

<h5>Roll No :{this.state.trainedid}</h5>

<h4>Trained Muzzle Images</h4>

<div class="row">
<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.trainedfullsideimage} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Ful side Image</p>
  </div>
</div>
</div>

<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.trainedmuzzleimage1} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Muzzle Image1</p>
  </div>
</div>
</div>
</div>


<div class="row">
<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.trainedmuzzleimage2} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Muzzle Image2</p>
  </div>
</div>
</div>

<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.trainedmuzzleimage3} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Muzzle Image3</p>
  </div>
</div>
</div>
</div>



<br />

<h5>Match Type : {this.state.matchtype}</h5>
<h5>Closest ID : {this.state.closetid}</h5>
<h4>Closest Muzzle Images</h4>

<div class="row">
<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.fullsideimage} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Ful side Image</p>
  </div>
</div>
</div>

<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.muzzleimage1} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Muzzle Image1</p>
  </div>
</div>
</div>
</div>


<div class="row">
<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.muzzleimage2} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Muzzle Image2</p>
  </div>
</div>
</div>

<div class="col-md-6">
<div className="card">
  <img className="card-img-top" style={{width: '590px',height: '255px',margin: '10px'}} src={this.state.muzzleimage3} alt="Card image cap" />
  <div className="card-body">
    <p className="card-text">Muzzle Image3</p>
  </div>
</div>
</div>
</div>

    </div>
  );
}
}

export default Viewimage;
