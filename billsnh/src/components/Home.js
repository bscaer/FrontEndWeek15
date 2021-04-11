import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ListGroup from 'react-bootstrap/ListGroup';

// The Bill component displays a selectable bill in a list
const Bill = props => {
    return <ListGroup.Item key={props.bill_id} active={props.selected} onClick={props.handleClick}>{props.number}: {props.title}</ListGroup.Item>
}

// The BillList component displays a list of bills
const BillList = props => {
    return <ListGroup>
        <h4>{props.title}</h4>
        {props.bills}
    </ListGroup>
}

// The BillListCol component displays a list of bills in a column
const BillListCol = props => {
    return <Col><BillList title={props.title} bills={props.bills} /></Col>
}

// The Home class represents the home page
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        // Bind the handleBillClick callback
        this.handleBillClick = this.handleBillClick.bind(this);
    }

    // The handleBillClick function toggles the selected state of a bill.
    handleBillClick(bill) {
        this.props.toggleBill(bill.bill_id);
    }

    // isBillSelected returns true if the specified bill is selected.
    isBillSelected(bill) {
        return this.props.selectedBillIds.find(bill_id => bill_id === bill.bill_id);
    }

    // getBillsForPrefix gets all the bills with the specified prefix in it's number
    getBillsForPrefix(prefix) {
        return this.props.bills.filter(bill => bill.number ? bill.number.startsWith(prefix) : false);
    }

    // Render the bills with a list of bills in each column
    render() {
        this.props.updateNavbarState(true, false);

        // Instantiate the lists of bills
        const listOfHouseBills = this.getBillsForPrefix('HB').map(bill => <Bill selected={this.isBillSelected(bill)} handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfSenateBills = this.getBillsForPrefix('SB').map(bill => <Bill selected={this.isBillSelected(bill)} handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfCACRBills = this.getBillsForPrefix('CACR').map(bill => <Bill selected={this.isBillSelected(bill)} handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfSRBills = this.getBillsForPrefix('SR').map(bill => <Bill selected={this.isBillSelected(bill)} handleClick={() => this.handleBillClick(bill)} {...bill} />);

        // Display each bill list in a separate column
        return <Container fluid>
            <Row>
                <BillListCol title="House Bills" bills={listOfHouseBills} />
                <BillListCol title="Senate Bills" bills={listOfSenateBills} />
                <BillListCol title="Constitutional Amendments" bills={listOfCACRBills} />
                <BillListCol title="Session Rules" bills={listOfSRBills} />
            </Row>
        </Container>;
    }
}