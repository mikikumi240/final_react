import globals from './global';
import entity from './entities';
import React from 'react';
import axios from 'axios';
import {Route,Switch,Redirect} from 'react-router-dom';
import './App.css';
import Reports from './Reports';
import About from './About';
import TablesManage from './TablesManage';
import HomeScreen from './HomeScreen';
import{Alert,Container,Form,Row,Col,Button,Table}  from 'react-bootstrap';
import jsonEmployees from './Employees';
import NewRegistration from './NewRegistration';


class Employee extends React.Component  {
    constructor(props){
      // alert("bona");
      debugger
      super(props);
      this.showEmpData=this.showEmpData.bind(this);
      this.state={
        objEmp:new entity.EmployeeModel(0,'','',0)
      }
    }
    componentDidMount(){
      // alert("componentDidMount");
    }
    componentDidUpdate(){
      let g=12;
      // alert("componentDidUpdate");
      
      if (this.props.reset==true){
        debugger
        let tmpEmp=new entity.EmployeeModel(0,'','',0);
        this.setState({objEmp:tmpEmp});
        this.props.notifySelectionBy(tmpEmp);
      }
    }
    showEmpData(e){
      debugger
      e.preventDefault();
      let FieldName=e.target.getAttribute("data-id");
      let FieldValue=e.target.value;
      
      switch (FieldName){
        case "EmpNum":
          debugger
            let arrEmpFound=globals.arrEmp.filter(e=>e.EmpNum==FieldValue);
            if (arrEmpFound.length>0){
        
              this.setState({objEmp:arrEmpFound[0]});
              this.props.notifySelectionBy(arrEmpFound[0]);
              }
            else
            {
              let tmpEmp=new entity.EmployeeModel(FieldValue,'','',0);
              this.setState({objEmp:tmpEmp});
              this.props.notifySelectionBy(tmpEmp);//Quest:how come that in this stage this.state.objEmp is not reflecthion of tmpEmp???
            }            
              
            break;
        case "EmpFirstName":
        case "EmpLastName":
        case "EmpDeptId":
            let tmpEmp=this.state.objEmp;
            tmpEmp[FieldName]=FieldValue;
            if (tmpEmp["EmpDeptId"]==0) tmpEmp["EmpDeptId"]=1;//set default in case user does not change selected value in cboDepart
            this.setState({objEmp:tmpEmp});
            this.props.notifySelectionBy(tmpEmp);
            break;
      }
      
    }
    render(){     
    // alert("render");
    var jsxDepts=globals.arrDepartments.map(x=><option value={x.DeptId}>{x.DeptName}</option>);

    var disableFlag='';
    if(globals.arrEmp.filter(i=>i.EmpNum==this.state.objEmp.EmpNum).length>0){
      disableFlag='disabled';
    }
    return (     
        
        <Form autocomplete="off">
          <Form.Row>        
  
            <Form.Group as={Col} controlId="formTZ">
              <Form.Label>מס' עובד</Form.Label>
              <Form.Control type="text" data-id="EmpNum" placeholder="הזן מס' עובד" 
              // onKeyDown={(e)=>e.keycode===13?this.showEmpData:null} 
              onChange={this.showEmpData} 
              value={this.state.objEmp.EmpNum}
              // onChange={this.showEmpData}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formPrati">
              <Form.Label>שם פרטי</Form.Label>
              <Form.Control disabled={disableFlag} type="text" data-id="EmpFirstName" placeholder="הזן שם פרטי" 
              onChange={this.showEmpData} 
              value={this.state.objEmp.EmpFirstName}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formLast">
              <Form.Label>שם משפחה</Form.Label>
              <Form.Control disabled={disableFlag} data-id="EmpLastName" type="text" placeholder="הזן שם משפחה" 
              onChange={this.showEmpData} 
              value={this.state.objEmp.EmpLastName}/>
            </Form.Group>
            <Form.Group as={Col} controlId="formDept">
              <Form.Label>מחלקה</Form.Label>
              <Form.Control as="select" disabled={disableFlag} data-id="EmpDeptId" 
              onChange={this.showEmpData} 
              value={this.state.objEmp.EmpDeptId}>
                {jsxDepts}
              </Form.Control>
            </Form.Group>
          </Form.Row>
        </Form>
       
    );
    }
  }
  

  export default Employee;