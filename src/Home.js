import React from 'react'
import { Card, ListGroup } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function Home() {
  console.log(localStorage.getItem("loggedin"));
  return (
    <div className='home'>
    <div className="cards">
            <Card className='cardappointment'>
              <Card.Body>
                <Card.Title>
                  <h5 style={{ textAlign: "center" }}> Make Appointment</h5>
                </Card.Title>
              </Card.Body>

              <ListGroup className="list-group-flush">
              <br></br>To make appointment please click below button
                <button className="button"><Link to="/Appointment"  className='navlink'>Make Appointment</Link></button>
              </ListGroup>
            </Card>
            <Card className='cardappointment'>
              <Card.Body>
                <Card.Title>
                  <h5 style={{ textAlign: "center" }}>Time Schedule</h5>
                </Card.Title>
              </Card.Body>

              <ListGroup className="list-group-flush">
            
            <ListGroup.Item>
                <h6>Mon - Fri : 8:00am-7:00pm</h6>
            </ListGroup.Item>
            <ListGroup.Item>
                <h6>Sat : 9:00am-6:00pm</h6>
            </ListGroup.Item>
            <ListGroup.Item>
                <h6>Sunday : Holiday</h6>
            </ListGroup.Item>
              </ListGroup>
            </Card>
            <Card className='cardappointment'>
              <Card.Body>
                <Card.Title>
                  <h5 style={{ textAlign: "center" }}>Emergency Number</h5>
                </Card.Title>
              </Card.Body>

              <ListGroup className="list-group-flush">
              <br></br>if you're in Emergency ,you can call
              <button className="button"> <a href="tel:108" className='tel'><center>108</center></a></button>
              </ListGroup>
            </Card>
    </div>
    </div>
  )
}

export default Home