import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

function App() {

  const [name, setPname] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage]=useState("");

  const onSubmit = (event) => {
		event.preventDefault();
		const product = { name, description, price};
    setIsPending(true);
    
    fetch('http://localhost:3000/products', {
      method: 'POST',
      headers: { "Content-Type" : "application/json" },
      body:JSON.stringify(product)
    }).then (() =>{
        setIsPending(false);
        setPname("");
        setDescription("");
        setPrice(0);
        setMessage("Product is added to the DB");
      })
  }

  return (
    <div>
      <p>{ message }</p>
        <Form onSubmit={onSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product name</Form.Label>
            <Form.Control 
              type="text" 
              required 
              value={ name } 
              onChange ={(event) => setPname(event.target.value)} 
              placeholder="Type the name of the product" />           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product description</Form.Label>
            <Form.Control 
              type="text" 
              required 
              value={ description } 
              onChange ={(event) => setDescription(event.target.value)} 
              placeholder="Type the description of the product" />           
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Product price</Form.Label>
            <Form.Control 
              type="number" 
              required 
              value={ price } 
              onChange ={(event) => setPrice(event.target.value)} 
              placeholder="Enter the value of the product" />           
          </Form.Group>
          {!isPending && 
            <Button variant="primary" type="submit">
              Add Product
            </Button>
          }
          {isPending && 
            <Button variant="primary" type="submit" disabled>
            Please wait ...
            </Button>
          }   

        </Form> 
    </div>
  );
}
export default App;
