import React from "react";
import {Card , Button} from 'react-bootstrap'
import { Link } from "react-router-dom";
import '../styles/Card.modules.css'


export default function GameCard ({image, name, genres}) {
   
    return (
      <Card style={{ width: '18rem', boxShadow: ' rgba(0, 0, 0, 0.1) 0px 4px 8px', height: '20rem', color:"black", textDecoration: "none"}} >
      <Card.Img variant="top" src={image} />
      <Card.Body className='gameCard'>
        <Card.Title style={{ fontSize: "20px", textDecoration: "none", color:"whitesmoke"}}>{name}</Card.Title>
        <Card.Text className="text-center" style={{color:"whitesmoke", textDecoration: "none"}}>
          {genres}
        </Card.Text>
      </Card.Body>
    </Card>

    )
}