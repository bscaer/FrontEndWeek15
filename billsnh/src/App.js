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
import BillDetails from './components/BillDetails';

// This is the main App class
export default class App extends React.Component {
  constructor(props) {
    super(props);

    // Bind the methods
    this.toggleBill = this.toggleBill.bind(this);
    this.updateNavbarState = this.updateNavbarState.bind(this);

    // Initialize the list of bills, the list of selected bill ids, 
    // and the active flags for the home and details pages.
    this.state = {
      bills: [],
      selectedBillIds: [],
      homeActive: true,
      detailsActive: false
    }
  }

  // The _refreshData function fetches the list of bills from the
  // BillService and updates the list of bills, which triggers render
  // to display the list of bills.
  _refreshData = async () => {
    // Get the bills from the BillService
    let billData = await billService.getAll();
    const rawBills = billData ? billData.masterlist : {};

    // Create an array of the bills and save the array in the state.
    const bills = Object.keys(rawBills).map(key => rawBills[key]);
    this.setState({ bills: bills });
  }

  // When the page is displayed for the first time, update the
  // list of bills.
  componentDidMount() {
    this._refreshData();
  }

  // A bill's selection state was toggled
  toggleBill(bill_id) {
    if (this.state.selectedBillIds == null) return;

    // Is this bill's id in the list of selected bill ids?
    let selectedBill = this.state.selectedBillIds.find(bid => bid === bill_id);

    // If it is then remove it's id from the list and save the list in the state.
    if (selectedBill) {
      let selectedBillIds = this.state.selectedBillIds.filter(bid => bid !== bill_id);
      this.setState({ selectedBillIds: selectedBillIds});

    // If it isn't then add it's id to the list and save the list in the state.
    } else {
      this.setState({ selectedBillIds: [...this.state.selectedBillIds, bill_id]});
    }
  }

  // Update the navbar with the active state for the home link and the details link.
  updateNavbarState(homeActive, detailsActive) {
    if (this.state.homeActive != homeActive || this.state.detailsActive != detailsActive) {
      this.setState({ homeActive: homeActive, detailsActive: detailsActive });
    }
  }

  // Render the app
  render() {
    // Render everything
    return (
      <Router>
        {/* The navbar has a link for the home page and a link for the details page. */}
        <Navbar>
          <Nav>
            <Nav.Item>
              <Nav.Link as={Link} to="/" active={this.state.homeActive}>2021 NH Bills</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              {<Nav.Link as={Link} to="/details" active={this.state.detailsActive}>Selected Bill Details</Nav.Link>}
            </Nav.Item>
          </Nav>
        </Navbar>

        {/* Navigate to the correct page */}
        <Switch>
          {/* The root path goes to the home page */}
          <Route path="/" exact>
            <Home updateNavbarState={this.updateNavbarState} toggleBill={this.toggleBill} bills={this.state.bills} selectedBillIds={this.state.selectedBillIds} />
          </Route>

          {/* The details path goes to the details page */}
          <Route path="/details" exact>
            <BillTable updateNavbarState={this.updateNavbarState} bills={this.state.bills} selectedBillIds={this.state.selectedBillIds} />
          </Route>

          {/* The details/id path displays a single bill */}
          <Route path="/details/:id">
            <BillDetails updateNavbarState={this.updateNavbarState} bills={this.state.bills} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
