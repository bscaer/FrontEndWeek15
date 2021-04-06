import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { Bill } from './Bill';
import { BillList } from './BillList';

// The Home class represents the home page
export default class Home extends React.Component {
    constructor(props) {
        super(props);

        this.handleBillClick = this.handleBillClick.bind(this);
        this.handleSelectedBillClick = this.handleSelectedBillClick.bind(this);
    }

    handleBillClick(bill) {
        this.props.selectBill(bill.bill_id, true);
    }

    handleSelectedBillClick(bill) {
        this.props.selectBill(bill.bill_id, false);
    }

    render() {
        const houseBills = this.props.bills.filter(
            bill => bill.number ? bill.number.startsWith('HB') && !this.props.selectedBills.find(bill_id => bill_id === bill.bill_id) : false);
        const senateBills = this.props.bills.filter(
            bill => bill.number ? bill.number.startsWith('SB') && !this.props.selectedBills.find(bill_id => bill_id === bill.bill_id) : false);
        const cacrBills = this.props.bills.filter(
            bill => bill.number ? bill.number.startsWith('CACR') && !this.props.selectedBills.find(bill_id => bill_id === bill.bill_id) : false);
        const srBills = this.props.bills.filter(
            bill => bill.number ? bill.number.startsWith('SR') && !this.props.selectedBills.find(bill_id => bill_id === bill.bill_id) : false);

        const selectedBills = this.props.bills.filter(bill => this.props.selectedBills.find(bill_id => bill_id === bill.bill_id));

        // Instantiate a Bill object for each bill
        const listOfHouseBills = houseBills.map(bill => <Bill handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfSenateBills = senateBills.map(bill => <Bill handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfCACRBills = cacrBills.map(bill => <Bill handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfSRBills = srBills.map(bill => <Bill handleClick={() => this.handleBillClick(bill)} {...bill} />);
        const listOfSelectedBills = selectedBills.map(bill => <Bill handleClick={() => this.handleSelectedBillClick(bill)} {...bill} />);

        return <Container>
            <Row>
                <Col>
                    <BillList title="House Bills" bills={listOfHouseBills} />
                </Col>
                <Col>
                    <BillList title="Senate Bills" bills={listOfSenateBills} />
                    <BillList title="Constitutional Amendments" bills={listOfCACRBills} />
                    <BillList title="SR Bills" bills={listOfSRBills} />
                </Col>
                <Col>
                    <BillList title="Selected Bills" bills={listOfSelectedBills} />
                </Col>
            </Row>
        </Container>;
    }
}