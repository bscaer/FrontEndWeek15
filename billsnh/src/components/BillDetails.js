import React from "react";
import Card from 'react-bootstrap/Card';
import { withRouter } from "react-router-dom";

import BillRow from "./BillRow";
import { BillLink } from "./BillLink";

import { billService } from '../BillService';

// The BillDetails class displays a bill's details in a card format
class BillDetails extends React.Component {
    constructor(props) {
        super(props);

        // Initialize the state
        this.state = {
            bill: null,
            originalBillLink: ""
        }
    }

    // _refreshData gets the original bill link for the bill
    // from the bill service and saves it in the state
    _refreshData = async (bill) => {
        let originalBillLink = await billService.getOriginalBillLink(bill.bill_id);
        this.setState(() => {
            return { bill: bill, originalBillLink: originalBillLink }
        });
    }

    // When the page is displayed for the first time, _refreshData is called.
    componentDidMount() {
        // Get the id for the bill to display and find the bill in the list of bills
        const id = this.props.match.params.id;
        const bill = this.props.bills.find(bill => bill.bill_id == id);
        if (bill != null) {
            this._refreshData(bill);
        }
    }

    // Render the bill details
    render() {
        // Update the navbar state, showing that neither home nor details are displayed
        this.props.updateNavbarState(false, false);

        // Display nothing if there is no bill to display
        if (!this.state.bill) return <p></p>;

        // Otherwise, display the bill details in a Card.
        return (
            <Card>
                <Card.Body>
                    <Card.Title>Bill Number: {this.state.bill.number}</Card.Title>
                    <Card.Text>Bill Title: {this.state.bill.title}</Card.Text>
                    <Card.Text>Status: {BillRow.getStatusString(this.state.bill.status)}</Card.Text>
                    <Card.Text>Last Action: {this.state.bill.last_action}</Card.Text>
                    <BillLink originalBillLink={this.state.originalBillLink} label="Original Bill Link" />
                </Card.Body>
            </Card>
        );
    }
}

export default withRouter(BillDetails);