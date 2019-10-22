//var yourModule = require( "your_module_name" ); //.js file extension is optional
//correct import globals from './globalTmp';
//correct  import Miki from './component_zevel';
import globals from './global';
import functions from './misc';
import entity from './entities';
import React from 'react';
import axios from 'axios';
import {Route,Switch} from 'react-router-dom';
import './App.css';
import Reports from './Reports';
import About from './About';
import TablesManage from './TablesManage';
import HomeScreen from './HomeScreen';
import{Container}  from 'react-bootstrap';
import jsonEmployees from './Employees';//not using axios all the rest are so under public
//the following are redundant since we load all db in global function
// import jsonDepartments from './departments'
// import jsonInventory from './Inventory'
// import jsonSubTypes from './subTypes'
// import jsonTypes from './types'
// import jsonUsers from './Users'



import NewRegistration from './NewRegistration';
import AttachDeAttach from './AttachDeAttach';
import Input from './Input';
import Delivery from './Delivery';


class App extends React.Component  {
constructor(props){
  super(props);
  globals.currentUser= new entity.UserModel(0,'','','');
  this.userConnected=this.userConnected.bind(this);
  this.state={userConnected:new entity.UserModel(0,'','','')}
}

  componentDidMount() {
    ;
    // functions.nisayon();
    // no need to use axios on loading jsons from local !!!!
    // axios.get(`${process.env.PUBLIC_URL}/Users.json`)
    //   .then((res) =>{               
    //     globals.arrUsers=res.data;        
    //   });     
              

    // axios.get(`${process.env.PUBLIC_URL}/types.json`)
    //   .then((res) => {  
                   
    //     globals.arrTypes= res.data;        
    //   });
      
    //   axios.get(`${process.env.PUBLIC_URL}/subTypes.json`)
    //   .then((res) => { 
                       
    //     globals.arrSubTypes=res.data;        
    //   });

    //   axios.get(`${process.env.PUBLIC_URL}/departments.json`)
    //   .then((res) => { 
                     
    //     globals.arrDepartments=res.data; 
        
    //   });
    

    //   axios.get(`${process.env.PUBLIC_URL}/Inventory.json`)
    //   .then((res) => { 
                     
    //     globals.arrInventory=res.data; 
        
    //   });
    // if(1==2){
    //   globals.arrInventory=jsonInventory;
    //   globals.arrEmp=jsonEmployees;
    //   globals.arrDepartments=jsonDepartments;
    //   globals.arrSubTypes=jsonSubTypes;
    //   globals.arrTypes=jsonTypes;
    //   globals.arrUsers=jsonUsers;
    // }
    if (!globals.dbLoaded){
      functions.loadDb();
      globals.dbLoaded=true;
      console.log(globals.arrDepartments);
      console.log(globals.arrUsers);
      console.log(globals.arrTypes);
      console.log(globals.arrSubTypes);
      
      console.log(globals.arrInventory);
      console.log(globals.arrEmp);
    }      

  }
  userConnected(){
    this.setState({userConnected:globals.currentUser});
  }
  render(){
    // alert(globals.i_am_global);
    // globals.i_am_global="kalam";
    // alert(globals.i_am_global);

  return (
    <Container>      
      
      <Switch>
        
        <Route exact path="/">
          <HomeScreen />
        </Route>          
        
        <Route path="/About" component={About} />
        <Route path="/Input" component={Input} />
        <Route path="/AttachDeAttach" component={AttachDeAttach} />
         
        <Route exact path="/NewLogIn">
          <NewRegistration target="LOGGING" handleCompletion={this.userConnected}/>
        </Route>

        <Route exact path="/NewReg">
          <NewRegistration target="REG" handleCompletion={this.userConnected}/>
        </Route>

        <Route exact path="/TablesManage">
          <TablesManage/>
        </Route>         
        
        <Route exact path="/ReportDeviceHistory">
          <Reports reportName='DeviceHistory'/>
        </Route>
        
        <Route exact path="/ReportDevicesInUse">
          <Reports reportName='DevicesInUse'/>
        </Route>

        <Route exact path="/Delivery">
          <Delivery/>
        </Route>
        
      </Switch>
    
    </Container>
  );
  }
}

export default App;
