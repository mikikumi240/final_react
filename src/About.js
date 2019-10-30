
import React from 'react';    
import{ Form,Row,Col,Button}  from 'react-bootstrap';
import apple_logo from './appleseeds.png';

class About extends React.Component {
    render(){
       
    return (
      <div className="mx-auto mt-5" style={{width:'30vw',height:'25vx'}} >
        <div className="row">
          <img src={apple_logo} className="mr-auto" ></img>    
        </div>
        <div className="row">
          <h4 style={{borderBottom:'1px solid gray'}} >מערכת לניהול מלאי</h4>                
        </div>                 
      <section>
        
        <p>תוכנה פותחה על ידי עמותת תפוח</p>
        <p>גירסה 1.1.125 מיום 01-01-2019</p>
        <p>כל הזכויות שמורות</p>
        <p>פרטי התקשרות:</p>
        <Form>
          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              אי-מייל
            </Form.Label>
            <Col sm={6}>
              <Form.Control plaintext readOnly defaultValue="email@example.com" />
            </Col>
          </Form.Group>
  
          <Form.Group as={Row} >
            <Form.Label column sm={2}>
              טלפון
            </Form.Label>
            <Col sm={4}>
              <Form.Control plaintext readOnly defaultValue="03-7654321" />
            </Col>
          </Form.Group>
          <Button variant="primary"  href="#/" >
            סגור
          </Button>
        </Form>                
      </section>
      </div>
    );
    }
  }
  export default About;