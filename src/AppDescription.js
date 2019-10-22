
import React from 'react';

import{Jumbotron,Card,Col}  from 'react-bootstrap';



//images
import flexible from './flexible.png';
import multi_users from './multi_users.jpg';
import easy_implement from './easy_to_use.png';

class AppDescription extends React.Component{
  constructor(props){
    super(props);
    this.flipCardImg=this.flipCardImg.bind(this);
    this.state={rotation:0}
  }
  
  componentDidMount(){
    setInterval(this.flipCardImg, 1000);
  }
  flipCardImg(){
    
    // let newRotation=this.state.rotation+90;    
    // if (newRotation==360)newRotation=0;
    // this.setState({rotation:newRotation})

    let newRotation=this.state.rotation+180;    
    if (newRotation==360)newRotation=0;
    this.setState({rotation:newRotation})
  }
  render(){
     
  return (
    <div>
     {/* float-right999 */}
      {/* <Miki param={globals.i_am_global}/> */}
      <Jumbotron className="mb-0 container pb-3 pt-2" style={{"height":"100%"}}>
        <section className="d-flex">
          <Col sm={6}>
            <h3 lg={6}className=""> מערכת לניהול מלאי</h3>
          </Col>
          <Col sm={6}>
            <img lg={6} className="" style={{"width":"200px"}}src ="https://static.wixstatic.com/media/483ae6_20eb8ceba7e242d6b930b80849543a42~mv2.gif"/>
          </Col>
        </section>
        
        {/* <Col sm={12}> */}
          <h4  className="mt-0">
            מיועדת לניהול מחסנים, מלאי ושרשרת האספקה לבתי עסק 
          </h4>
        {/* </Col> */}
      
      </Jumbotron>
      <div className="bg-info" className_="app_advantage ">
        <h3 className="text-center">יתרונותיה המרכזיים של התוכנה:</h3>
        <div className="text-dark d-flex justify-content-between bg-info">
        <Card className="bg-info" style={{ border:'none', width: '18rem',backgroundColor_:'rgb(245,197,136)' }}>
        <Card.Img style={{transform: `rotateY(${this.state.rotation}deg)`}}  variant="top" src={easy_implement}/>
          <Card.Body>
            <Card.Title>קלה לשימוש</Card.Title>
            <Card.Text>
              מערכת זו ניתנת להטמעה באופן קל ומהיר, נוח למשתמש.
            </Card.Text>
            
          </Card.Body>
        </Card>

        <Card className="bg-info"style={{ border:'none',width: '18rem',_backgroundColor:'rgb(245,197,136)' }}>
        <Card.Img style={{transform: `rotateY(${this.state.rotation}deg)`}}  variant="top" src={flexible} />
          <Card.Body>
            <Card.Title>מודולרית</Card.Title>
            <Card.Text>
              ניתנת לאימפלמנטציה בכל ארגון, בית עסק ומתאימה לכל סוגי המלאי
            </Card.Text>
            
          </Card.Body>
        </Card>

        <Card className="bg-info" style={{ border:'none',width: '18rem',backgroundColor_:'rgb(245,197,136)'  }}>
        <Card.Img style={{transform: `rotateY(${this.state.rotation}deg)`}}  variant="top" src={multi_users} />
          <Card.Body>
            <Card.Title>ריבוי משתמשים</Card.Title>
            <Card.Text>
              לא מגבילה משתמשים, ניתן להוסיף על ידי תהליך רישום קל ומהיר
            </Card.Text>
            
          </Card.Body>
        </Card>

        </div>
      </div>
      
    </div>
  );
  }
}
export default AppDescription;