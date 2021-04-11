import React from "react";
import { Link } from 'react-router-dom';

import { billService } from '../BillService';
import { BillLink } from "./BillLink";

// The BillNumberLink component displays a link to the details page
// for a bill.
const BillNumberLink = props => {
    return <Link to={`/details/${props.bill_id}`}>{props.number}</Link>
}

// The BillRow class displays a bill's propreties in a table row
export default class BillRow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            originalBillLink: ""
        }
    }

    // _refreshData fetches the bill's original bill link from the BillService
    _refreshData = async () => {
        let originalBillLink = await billService.getOriginalBillLink(this.props.bill_id);
        this.setState(() => {
            return { originalBillLink: originalBillLink }
        });
    }

    // When the page is displayed for the first time, _refreshData is called.
    componentDidMount() {
        this._refreshData();
    }

    // getStatusString returns a string to represent the specified bill status
    static getStatusString(status) {
        let statusString = "";
        switch (status) {
            case "1":
                statusString = "Introduced";
                break;
            case "2":
                statusString = "Engrossed";
                break;
            case "3":
                statusString = "Enrolled";
                break;
            case "4":
                statusString = "Passed";
                break;
            case "5":
                statusString = "Vetoed";
                break;
            case "6":
                statusString = "Failed";
                break;
            default:
                statusString = "Unknown";
                break;
        }

        return statusString;
    }

    // Render the bill properties in a table row
    render() {
        return <tr>
            <td><BillNumberLink bill_id={this.props.bill_id} number={this.props.number}/></td>
            <td>{this.props.title}</td>
            <td>{BillRow.getStatusString(this.props.status)}</td>
            <td>{this.props.last_action}</td>
            <td><BillLink originalBillLink={this.state.originalBillLink} label="Link"/></td>
        </tr>;
    }
}