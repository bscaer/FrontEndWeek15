import { Redirect } from 'react-router-dom';
import Table from 'react-bootstrap/Table';

import BillRow from './BillRow';

// The BillTableHeader component displays  the headers for the bill table
export const BillTableHeader = props => {
    return <thead>
        <tr>
            <th>Number</th>
            <th>Title</th>
            <th>Status</th>
            <th>Last Action</th>
            <th>Original Bill Link</th>
        </tr>
    </thead>
}

// The BillTable class displays a table of the selected bills
export const BillTable = props => {
    // Get the selected bills
    const selectedBills = props.bills.filter(bill => props.selectedBillIds.find(bill_id => bill_id === bill.bill_id));

    // If there are no selected bills, return to the home page
    if (selectedBills.length == 0) return <Redirect to="/" />;

    // Update the navbar state
    props.updateNavbarState(false, true);

    // Instantiate the list of bill rows and display them.
    const listOfSelectedBills = selectedBills.map(bill => <BillRow {...bill} />);
    return <Table>
        <BillTableHeader />
        <tbody>
            {listOfSelectedBills}
        </tbody>
    </Table>;
}