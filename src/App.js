import React from 'react';
import Cart from './Cart';
import Navbar from './Navbar';
import firebase from 'firebase/app'

class App extends React.Component {

  constructor () {
    super();
    this.state = {
      products: [],
      loading: true
    }
    // this.increaseQuantity = this.increaseQuantity.bind(this);
    // this.testing();
  }
  componentDidMount (){
  //  firebase
  //  .firestore()
  //  .collection('products')
  //  .get()
  //  .then((snapshot) =>{
  //    console.log(snapshot); 
  //    snapshot.docs.map((doc) =>{
  //      console.log(doc.data());
  //    })

  //    const products = snapshot.docs.map((doc) => {
  //    const data = doc.data();
  //    data['id'] = doc.id;
  //    return data;
  //    })

  //    this.setState({
  //      products: products,
  //      loading: false
  //    })

  //  })
  firebase
  .firestore()
  .collection('products')
  // .where('price', '==', 999) yaha > < >= <= bhi use kar sakte
  //  .where('title', '==', 'Mug')
  // .orderBy('price', 'asc') orderBy 2 argument leta hai ascending aur descending 
  .onSnapshot((snapshot) =>{
    console.log(snapshot); 
    snapshot.docs.map((doc) =>{
      console.log(doc.data());
    })

    const products = snapshot.docs.map((doc) => {
    const data = doc.data();
    data['id'] = doc.id;
    return data;
    })

    this.setState({
      products: products,
      loading: false
    })

  })
  }

// .get method returns a promise
  handleIncreaseQuantity = (product) => {
    // console.log('Heyy please inc the qty of ', product);
    const { products } = this.state;
    console.log(typeof(products));
    const index = products.indexOf(product);

    // products[index].qty += 1;

    // this.setState({
    //   products : products
    // })
    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    docRef
    .update({
      qty: products[index].qty + 1
    })
    .then(() =>{
      console.log('Updated successfully');
    })
    .catch((error) => {
      console.log('Error :', error)
    })
  }
  handleDecreaseQuantity = (product) => {
    const { products } = this.state;
    const index = products.indexOf(product);

    // if (products[index].qty === 0) {
    //   return;
    // }

    // products[index].qty -= 1;

    // this.setState({
    //   products: products
    // })
    const docRef = firebase.firestore().collection('products').doc(products[index].id);
    
    if(products[index].qty===0)
    {
      return;
    }
    docRef
    .update({
      qty: products[index].qty - 1
    })
    .then(() =>{
      console.log('Updated successfully');
    })
    .catch((error) => {
      console.log('Error :', error)
    })
  }
  handleDeleteProduct = (id) => {
    const { products } = this.state;

    // const items = products.filter((item) => item.id !== id); // [{}]

    // this.setState({
    //   products: items
    // })
    const docRef = firebase.firestore().collection('products').doc(id);
    docRef
    .delete()
    .then(() => {
      console.log('Deleted successfully');
    })
    .catch((error) => {
      console.log('Error', error);
    })
  }

  getCartCount = () => {
    const { products } = this.state;

    let count = 0;

    products.forEach((product) => {
      count += product.qty;
    })

    return count;
  }

  getCartTotal = () => {
    const {products} = this.state;
    let cartTotal = 0;
    
    products.forEach((product) => {
     cartTotal = cartTotal + product.qty * product.price;
    })
    
    return cartTotal;
  }
  // addProduct = () => {
  //  firebase
  //  .firestore()
  //  .collection('products')
  //  .add({
  //    img :  '',
  //    price: 900,
  //    qty: 3,
  //    title: 'washing machine'
  //  })
  //  .then((docRef) => {
  //   console.log('Product has been added', docRef);
  //  })
  //  .catch((error) => {
  //    console.log('Error : ', error);
  //  })
  // }
  render () {
    const { products ,loading } = this.state;
    return (
      <div className="App">
        <Navbar count={this.getCartCount()} />
        {/* <button onClick={this.addProduct} style={{padding:20, fontSize: 20}}>Add a product</button> */}
        <Cart
          products={products}
          onIncreaseQuantity={this.handleIncreaseQuantity}
          onDecreaseQuantity={this.handleDecreaseQuantity}
          onDeleteProduct={this.handleDeleteProduct}
        />
        {loading && <h1>Loading Products</h1>}
       <div style={{padding:10, fontSize: 20 ,color:'darkgrey', fontFamily:'sans-sarif'}}><b>TOTAL : {this.getCartTotal()}</b></div> 
      </div>
    );
  }
}

export default App;
