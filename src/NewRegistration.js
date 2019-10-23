import globals from './global';
import functions from './misc';
import entity from './entities';
import React from 'react';
import {Redirect} from 'react-router-dom';
import{Alert,Form,Row,Col,Button}  from 'react-bootstrap';

class NewRegistration extends React.Component  {
    constructor(props){
        super(props);
         
        this.readInputValue=this.readInputValue.bind(this);
        this.okPressed=this.okPressed.bind(this);
        
        this.state={
          isAdmin:0,
          adminPsw:'',
          password:'',
          un:'',
          jobEnded:false,
          error:'',
          userDisplayName:''
        }
        if (!globals.dbLoaded){
          functions.loadDb();
          globals.dbLoaded=true;
          } 
    }
    okPressed(){    
  
      if(this.props.target==="LOGGING"){
  
        let arrUser=globals.arrUsers.filter(x=>x["un"]===this.state.un && x["password"]===this.state.password);
  
        if(arrUser.length===0){
          this.setState({error:"לא נמצא משתמש"});
        }
        else{
          globals.currentUser=arrUser[0];
          this.props.handleCompletion(globals.currentUser)
          this.setState({jobEnded:true});
        }
      }
      else{
        debugger
        if(this.state.un=='' || this.state.userDisplayName=='' || this.state.password==''){
          this.setState({error:"יש למלא את כל שדות הקלט"});
        }
        else if (globals.arrUsers.filter(x=>x["un"]===this.state.un).length>0){
  
          this.setState({error:"שם משתמש כבר קיים"});
        }
        else if(this.state.isAdmin==1 && this.state.adminPsw!="admin1"){
          this.setState({error:"סיסמת מנהל שגויה!"});
        }
        else {
  
          let objUser=new entity.UserModel(this.state.isAdmin,this.state.adminPsw,this.state.password,this.state.un,this.state.userDisplayName);
          globals.arrUsers.push(objUser);
          globals.currentUser=objUser;
          this.props.handleCompletion(globals.currentUser)
          this.setState({jobEnded:true});
        }
      }
      
    }  
    
    readInputValue(e){
      let input_field=e.target.getAttribute("data-id");
      let input_value;
      
      switch(input_field){
        case "chkAdmin":
            input_value=e.target.checked?1:0;
            this.setState({isAdmin:input_value});
            break;
        case "txtAdmin":
            input_value=e.target.value;
            this.setState({adminPsw:input_value});
            break;
        case "txtUN":
            input_value=e.target.value;
            this.setState({un:input_value});
            break;
        case "txtPsw":
            input_value=e.target.value;
            this.setState({password:input_value});
            break;
        case "txtDisplayName":
            input_value=e.target.value;
            this.setState({userDisplayName:input_value});
            break;
      }
      console.log(input_value);
    }
      
    render(){
      if (this.state.jobEnded===true)   {
        return (<Redirect to={"/"}/>);   
      }
      else{
       return (
         <div style={{width:"25vw",border:"1px solid black"}}>
         <h3 className="mt-3 mx-auto w-50 text-center">{this.props.target==="LOGGING"?"מסך כניסה":"מסך רישום"}</h3>
         <Form className="mt-5" style={{width:"25vw",border:"0px solid red"}}>
           <Form.Group as={Row} controlId="formUN" className="mx-auto">
             <Form.Label column sm="3">
               שם משתמש
             </Form.Label>
             <Col sm="5">
               <Form.Control type="text" onChange={this.readInputValue} data-id="txtUN"  />
             </Col>
           </Form.Group>
     
           <Form.Group as={Row} controlId="formPassword" className="p-3">
             <Form.Label  column sm="3">
               סיסמא
             </Form.Label>
             <Col sm="5">
               <Form.Control type="password" onChange={this.readInputValue} data-id="txtPsw"  />
             </Col>
           </Form.Group>
            
            <Form.Group as={Row} controlId="formNickName" className= {this.props.target==="LOGGING"?"hide":"" +" p-3"}>
             <Form.Label column sm="3">
               שם לתצוגה
             </Form.Label>
             <Col sm="5">
               <Form.Control type="text" onChange={this.readInputValue} data-id="txtDisplayName"  />
             </Col>
            </Form.Group>
  
  
            
           <Form.Group as={Row} controlId="formAdmin" className={ this.props.target==="LOGGING"?"hide":"" +" p-3"} >
            
            <Col sm="3">
             <Form.Check inline label="&nbsp;מנהל" type="checkbox" onChange={this.readInputValue} data-id="chkAdmin"/>
            </Col>
             <Col sm="5">
               <Form.Control type="password" onChange={this.readInputValue} data-id="txtAdmin" className={this.state.isAdmin==false?"hide":"display"} />
             </Col>
           </Form.Group>
           <Form.Group as={Row} className="justify-content-center w-50 " style={{border:"0px solid"}} controlId="formAdmin">
             <Col sm="4"><Button variant="primary" type="button" onClick={this.okPressed}>
              אישור
              </Button>
             </Col>
             <Col sm="4"><Button variant="secondary" type="button" href="/">
             ביטול
             </Button></Col>
           </Form.Group>         
     
         </Form>
     
         <Alert variant="danger" className={this.state.error===true?"display":"hide"} dismissible>
             {this.state.error}
         </Alert>
         </div>
         );
      }
    }
         
  }
  export default NewRegistration;