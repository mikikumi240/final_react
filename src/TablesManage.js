import globals from './global';
import functions from './misc';
import React from 'react';  
import './App.css'; 
import GridDevices from './GridDevices';
import{Alert,Form,Row,Col,Button,Table}  from 'react-bootstrap';

class TablesManage extends React.Component  {
  constructor(props){
    super(props);
    this.state={
      Type:'',
      SubType:'',
      TypeCode:0,
      SubTypeCode:0,
      Alert:''
    };
    this.addType=this.addType.bind(this);
    this.readType=this.readType.bind(this);
    this.typeSelected=this.typeSelected.bind(this);
    this.typeDeleted=this.typeDeleted.bind(this);    
    this.readSubType=this.readSubType.bind(this);
    this.addSubType=this.addSubType.bind(this); 
    this.subTypeDeleted=this.subTypeDeleted.bind(this);
    this.subTypeSelected=this.subTypeSelected.bind(this);
    this.hideAlert=this.hideAlert.bind(this);
    if (!globals.dbLoaded){
      functions.loadDb();
      globals.dbLoaded=true;
    }
    // https://reactstrap.github.io/components/tooltips/
  }
  hideAlert(){
    this.setState({Alert:''});
  }
  readType(e)  {
    this.setState({Type:e.target.value});    
  }
  addType(){
  let code=1;
  if (globals.arrTypes.length>0) {
    code = globals.arrTypes[globals.arrTypes.length-1]["code"]+1;
  }  
  globals.arrTypes.push({"code":code,"short":this.state.Type});
  this.setState({Type:''});
  }
  typeSelected(id){
    this.setState({TypeCode:id});    
  }
  typeDeleted(id){
    debugger
    let arrJoin=[]
    for (let i=0;i<globals.arrLents.length;i++){
      arrJoin.push({        
        ...(globals.arrInventory.find((itmInv) => itmInv.InvID == globals.arrLents[i].InvId && itmInv.Type==id ))
        }
      );
    }
    if(arrJoin.length>0){
      this.setState({Alert:'לא ניתן למחוק פריט שהיה בהשאלה'})
    }
    else{
      let i=globals.arrTypes.findIndex(x => x.code === id);
      globals.arrTypes.splice(i,1);
      //מחק את היצרנים של המכשיר
      globals.arrSubTypes=globals.arrSubTypes.filter(x=>x.type_code!=id);
      this.setState({Type:''});
    }
    
  }
  // sub type section
  readSubType(e)  {
    this.setState({SubType:e.target.value});    
  }
  addSubType(){
  let code=1;
  if (globals.arrSubTypes.length>0) {
    code = globals.arrSubTypes[globals.arrSubTypes.length-1]["subType_code"]+1;
  }  
  globals.arrSubTypes.push({"type_code":this.state.TypeCode,
                    "subType_code":code,
                    "descr":this.state.SubType});
  this.setState({SubType:''});
  }
  subTypeSelected(id){
    this.setState({SubTypeCode:id});    
  }
  subTypeDeleted(id){
    let arrJoin=[]
    for (let i=0;i<globals.arrLents.length;i++){
      arrJoin.push({        
        ...(globals.arrInventory.find((itmInv) => itmInv.InvID == globals.arrLents[i].InvId && itmInv.SubType==id ))
        }
      );
    }
    if(arrJoin.length>0){
      this.setState({Alert:'לא ניתן למחוק פריט שהיה בהשאלה'})
    }
    else{
      let i=globals.arrSubTypes.findIndex(x => x.subType_code === id);
    globals.arrSubTypes.splice(i,1);
    this.setState({SubType:''});
    }
    
  }
  
render(){
  var jsxAlert;
  if (this.state.Alert!=''){
    jsxAlert=<Alert variant="info" dismissible onClose={this.hideAlert}>
    {this.state.Alert}
  </Alert>
  }
  return(
    <div className="mx-auto w-75">
      <h2 className="mx-auto w-50 p-5">ניהול טבלאות מערכת</h2>
      <Row>
        <Col md={2}>
          <Form.Label>שם מכשיר</Form.Label>
        </Col>
        <Col md={3}>        
          <Form.Control type="text" placeholder='הכנס שם מכשיר' onKeyDown={(e)=> e.keyCode === 13 ? this.addType() : null}
          onChange={this.readType} value={this.state.Type}>
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button onClick={this.addType}><i className="fa fa-plus"/></Button>
        </Col>
      </Row>
      {jsxAlert}
      <GridDevices target="TypeCode" handleTypeSelected={this.typeSelected} 
        handleTypeDeleted={this.typeDeleted}/>
        {/* sub type section */}
      <Row>
        <Col md={2}>
          <Form.Label>שם יצרן</Form.Label>
        </Col>
        <Col md={3}>        
          <Form.Control placeholder='הכנס שם יצרן' type="text" onKeyDown={(e)=> e.keyCode === 13 ? this.addSubType() : null}
          onChange={this.readSubType} value={this.state.SubType}>
          </Form.Control>
        </Col>
        <Col md={2}>
          <Button onClick={this.addSubType}><i className="fa fa-plus"/></Button>
        </Col>
      </Row>
      
      <GridDevices target="SubTypeCode" Type={this.state.TypeCode} handleSubTypeSelected={this.subTypeSelected} 
        handleSubTypeDeleted={this.subTypeDeleted}/>
      <Button variant="primary" href="/#">יציאה</Button>
      
    </div>
    
  );
}

}

  
  export default TablesManage ;
