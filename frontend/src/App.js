import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { Header, Footer } from './components/';
import { CartScreen, HomeScreen, ProductScreen } from './screens';

function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Route path="/" component={HomeScreen} exact />
          <Route path="/product/:id" component={ProductScreen} />
          <Route path="/cart/:id?" component={CartScreen} />
        </Container>
      </main>
      <Footer />
    </Router>
  );
}

export default App;
