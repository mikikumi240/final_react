
import globals from './global';
import entity from './entities';
import React from 'react';

import{Navbar,Nav,NavDropdown}  from 'react-bootstrap';





class Menus extends React.Component {
    constructor(props){
      super(props);
      this.disconnect=this.disconnect.bind(this);
      this.state={menuChanged:false};
    }
    componentDidUpdate(){
      if(this.state.menuChanged==true){
        this.setState({menuChanged:false});
      }    
    }
    disconnect(){
      globals.currentUser=new entity.UserModel(0,'','','');
      // ******we must notify that the menu changed in order to repaint the nituk navbar:this.props.notifyMenuChange();
      this.setState({menuChanged:true})
    }
    render(){
    
    var classForDisconnect=globals.currentUser["un"]==''? 'd-none' : 'visible';
    var disableFlag=globals.currentUser["un"]==''? 'disabled' : '';
    var classForConnect=globals.currentUser["un"]==''? 'visible' : 'd-none';
    return (
      <div>
      <Navbar bg="light" expand="lg" >
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
          
          <Nav className="ml-auto " >
            <Nav.Link disabled={disableFlag} href="#/Delivery">הזמנות</Nav.Link>
            <Nav.Link disabled={disableFlag} href="#/Input">הזנה למלאי</Nav.Link>
            <Nav.Link disabled={disableFlag} href="#/AttachDeAttach">ניוד</Nav.Link>
            <Nav.Link disabled={disableFlag} href="#/TablesManage">ניהול טבלאות מערכת</Nav.Link>
            <Nav.Link href="#/About">אודות</Nav.Link>
            <NavDropdown disabled={disableFlag} title="דוחות" id="basic-nav-dropdown">
              <NavDropdown.Item href="#/ReportDeviceHistory">דוח השאלות למכשיר</NavDropdown.Item>
              <NavDropdown.Item href="#/ReportDevicesInUse">דוח מכשירים בשימוש</NavDropdown.Item>
              
              {/* <NavDropdown.Divider /> */}
              
            </NavDropdown>
          </Nav>
          {/* the following nav is redundant */}
          <Nav className="mr-auto border d-none">
            <Nav.Link href="#/Registration/Login">שיטה 1 מבוטל:כניסה</Nav.Link>
            <Nav.Link href="#/Registration/SignUp">שיטה 1 מבוטל:רישום</Nav.Link>
          </Nav>
          {/* end of the redundant  */}
          <Nav className={"mr-auto " + classForConnect}>
            <Nav.Link href="#/NewLogIn">כניסה</Nav.Link>
            <Nav.Link href="#/NewReg">רישום</Nav.Link>
          </Nav>
          
          <Nav className={"mr-auto "+ classForDisconnect} >
            <Nav.Link onClick={this.disconnect} >ניתוק</Nav.Link>
            <Nav.Link >{globals.currentUser["userDisplayName"]  } <i className="fa fa-user"/> </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      
      </div>
    );
  }
  }
  export default Menus;