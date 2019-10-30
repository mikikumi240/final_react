import globals from './global';
import functions from './misc';
import React from 'react';
import{Form,Row,Col,Button,Table}  from 'react-bootstrap';

class Reports extends React.Component{
    constructor(props){
      super(props);
      this.readMakat=this.readMakat.bind(this);
      this.searchDeviceHistory=this.searchDeviceHistory.bind(this);
      this.selectedTypeChanged=this.selectedTypeChanged.bind(this);  
      this.selectedSubTypeChanged=this.selectedSubTypeChanged.bind(this);
      this.searchDevicesInUse=this.searchDevicesInUse.bind(this);
      this.getJoinedData=this.getJoinedData.bind(this);
      this.state={
        makat:'',
        QueryResult:[],
        type:1,
        subtype:0
      };
      if (!globals.dbLoaded){
        functions.loadDb();
        globals.dbLoaded=true;
        } 
    }
    getJoinedData(){
      debugger
      if (globals.arrLents.length==0){
        // let stam={LentId:1,InvId:1,ReceivedDate:'2000-01-02',ReturnedDate:'2001-01-02',EmpNum:1200,Remark:"hi"};
        // globals.arrLents.push(stam);
        // let stam2={LentId:2,InvId:1,ReceivedDate:'2002-01-02',ReturnedDate:'',EmpNum:1200,Remark:"there"};
        // globals.arrLents.push(stam2);
      }     
  
      let arrJoin=[];
      for(let i=0; i<globals.arrLents.length; i++) {
        arrJoin.push({
            ...globals.arrLents[i], 
            ...(globals.arrInventory.find((itmInv) => itmInv.InvID == globals.arrLents[i].InvId ))
            }
        );
    }
    /////
   
    let arrJoin2=[];
    for(let i=0; i<arrJoin.length; i++) {
        arrJoin2.push({
            ...arrJoin[i], 
            ...(globals.arrTypes.find((itm) => itm.code == arrJoin[i].TypeCode))
            }
        );
    } 
    
    /////
    let arrJoin3=[];
    for(let i=0; i<arrJoin2.length; i++) {
        arrJoin3.push({
            ...arrJoin2[i], 
            ...(globals.arrSubTypes.find((itm) => itm.subType_code == arrJoin2[i].SubTypeCode))
            }
        );
    } 
  
    /////
    let arrJoin4=[];
    for(let i=0; i<arrJoin3.length; i++) {
        arrJoin4.push({
            ...arrJoin3[i], 
            ...(globals.arrEmp.find((itm) => itm.EmpNum == arrJoin3[i].EmpNum))
            }
        );
    } 
  
    /////
    let arrJoin5=[];
    for(let i=0; i<arrJoin4.length; i++) {
        arrJoin5.push({
            ...arrJoin4[i], 
            ...(globals.arrDepartments.find((itm) => itm.DeptId == arrJoin4[i].EmpDeptId))
            }
        );
    } 
  
  return arrJoin5;
  
  
    }
    searchDevicesInUse(){
      
      var arrJoined=this.getJoinedData();           
      var QueryResult=arrJoined.filter(x=>x.ReturnedDate==='');    
      this.setState({QueryResult});
    }
    searchDeviceHistory(e){
      if (e.keyCode==13){      
        let arrJoined= this.getJoinedData();         
        arrJoined=arrJoined.filter(x=>x.Makat==this.state.makat);    
        this.setState({QueryResult:arrJoined});
      }
    }
    selectedSubTypeChanged(e){
      let subtype=e.target.value;  
      this.setState({subtype});                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
    }
    selectedTypeChanged(e){
       
      let type=e.target.value;    
      let subTypeDef=globals.arrSubTypes.filter(i=>i.type_code==type)[0]["subType_code"];    
      this.setState({type,subtype:subTypeDef});
    }
  readMakat(e){
  let makat=e.target.value;
  this.setState({makat})
    }
    render(){
      var search_criteria;
      var title;
      if(this.props.reportName=='DeviceHistory'){
        title=<h4 className="m-5" >היסטוריית השאלות למכשיר</h4>
        search_criteria=<Row>
          <Col md={3}>
            <Form.Control placeholder='הזן מק"ט' type="text" 
            onChange={this.readMakat} onKeyDown={this.searchDeviceHistory}
            value={this.makat}></Form.Control>
          </Col>
        </Row>
      }
      else{
        debugger
        var jsxDevices=globals.arrTypes.map(x=><option value={x.code}>{x.short}</option>);
        var tmpSubTypes=globals.arrSubTypes.filter(i=>i.type_code==this.state.type);
        let jsxSubType=tmpSubTypes.map(x=><option value={x.subType_code}>{x.descr}</option>);
    
        title=<h4 className="m-5" >מכשירים בשימוש</h4>;
        search_criteria=
        <Form autocomplete="off">
          <Form.Row>          
            <Form.Group as={Col} md={3} controlId="formDevice">
              <Form.Label>סוג מכשיר</Form.Label>
              <Form.Control as="select" onChange={this.selectedTypeChanged}>
                {jsxDevices}
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col} md={3} controlId="formDevice">
              <Form.Label>יצרן</Form.Label>
              <Form.Control as="select" onChange={this.selectedSubTypeChanged}>
                {jsxSubType}
              </Form.Control>
            </Form.Group>
            
          </Form.Row>
          <Button onClick={this.searchDevicesInUse} md={2} variant="secondary fa fa-search"/>
      
          </Form>;
      }
      var jsxTable=this.state.QueryResult.map(x=><tr><td>{x.short}</td><td>{x.descr}</td><td>{x.ReceivedDate}</td>
        <td>{x.ReturnedDate}</td><td>{x.EmpLastName} {x.EmpFirstName}</td><td>{x.DeptName}</td><td>{x.Remark}</td></tr>);
  
      
      return(
      <div>
        {title}
        {search_criteria}
        <Table striped bordered hover className="mt-2">
          <thead>
          <tr>
            <th>מכשיר</th>
            <th>יצרן</th>
            <th>תאריך מסירה</th>
            <th>תאריך החזרה</th>
            <th>שם משתמש</th>
            <th>מחלקה</th>
            <th>הערה</th>
          </tr>
          </thead>
          <tbody>
          {jsxTable}
          </tbody>
        </Table>
        <Button href="#/" variant="primary">יציאה</Button>
      </div>
      );
    }
  }

  export default Reports;