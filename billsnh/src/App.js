import React from 'react';

import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link
} from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

import { billService } from './BillService';

import Home from './components/Home';
import { BillTable } from './components/BillTable';

// This is the main App class
export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.selectBill = this.selectBill.bind(this);

    // Initialize the list of bills in the state.
    this.state = {
      bills: [],
      selectedBills: [],
      redirect: false
    }
  }

  // The _refreshData function fetches the list of bills from the
  // BillService, updates the list of bills, which triggers render
  // to display the list of bills.
  _refreshData = async () => {
    let billData = await billService.getAll();
    const rawBills = billData ? billData.masterlist : {};

    // Using obj[key] to retrieve key value
    const bills = Object.keys(rawBills).map(key => rawBills[key]);
    if (bills) {
      this.setState({ bills: bills, redirect: true });
    }
  }

  // When the page is displayed for the first time, update the
  // list of bills.
  componentDidMount() {
    this._refreshData();
  }

  selectBill(bill_id, selected) {
    let selectedBills = this.state.selectedBills.filter(bid => bid !== bill_id);
    if (selected) {
      this.setState({ selectedBills: [...selectedBills, bill_id] });
    }
  }

  render() {
    // Render everything
    return (
      <Router>
        <Navbar className="navbar">
          <Navbar.Brand as={Link} to="/">2021 NH Bills</Navbar.Brand>
          <Nav>
            <Nav.Link as={Link} to="/details">Bill Details</Nav.Link>
          </Nav>
        </Navbar>
        <Switch>
          <Route path="/details">
            <BillTable bills={this.state.bills} selectedBills={this.state.selectedBills} />
          </Route>
          <Route path="/">
            <Home selectBill={this.selectBill} bills={this.state.bills} selectedBills={this.state.selectedBills} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
