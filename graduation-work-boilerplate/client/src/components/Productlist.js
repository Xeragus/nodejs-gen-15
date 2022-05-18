import { Table } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { useState, useEffect } from 'react';


function App() {
  const [products, setProducts]=useState(null);
  const [isPending, setIsPending] = useState(false);
  const [message, setMessage]=useState("");
  const [error, setError]=useState(false);


  useEffect(() => {
		fetch('http://localhost:3000/products')
      .then (res => {
        if(!res.ok){
          throw Error('Can not fetch data from the server');
        }  
        return res.json()
      })
      .then (data=>{
        setProducts(data.products);
        setIsPending(false);
        setMessage("");
  
      })
      .catch(err => {
        console.log(err.message);
        setMessage('Can not fetch data from the server');
        setError(true);   
      }) 
    
	}, []);

  return (
    <div>
      { error && <div> { message } </div>}
      { isPending && <div>Loading Data...</div>}
      { products &&    
      <> 
        <div> { message } </div>
        <Button variant="success" type="submit">
          Add New Product          
        </Button>
                  
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Product Description</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            { products.map((product)=> (
              <tr>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.price}</td>
                <td>
                  <Button variant="primary" type="submit">
                    Edit
                  </Button>
                  <Button variant="danger" type="submit">
                    Delete
                  </Button>
                </td>
                </tr>
            ))}         
          </tbody>
      </Table>
    </>
    }
    </div>
  );
}

export default App;
