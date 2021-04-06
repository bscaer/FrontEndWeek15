import Table from 'react-bootstrap/Table';

const BillRow = props => {
    return (<tr>
        <td>{props.number}</td>
        <td>{props.title}</td>
    </tr>);
}

// The BillTable class represents a table of bills
export const BillTable = props => {
    const selectedBills = props.bills.filter(bill => props.selectedBills.find(bill_id => bill_id === bill.bill_id));
    const listOfSelectedBills = selectedBills.map(bill => <BillRow {...bill} />);

    return <Table>
        <thead>
            <tr>
                <th>Number</th>
                <th>Title</th>
            </tr>
        </thead>
        <tbody>
            {listOfSelectedBills}
        </tbody>
    </Table>;
}