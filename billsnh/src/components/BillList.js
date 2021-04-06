import ListGroup from 'react-bootstrap/ListGroup';

// The BillList class represents a list of bills
export const BillList = props => {
    return (<ListGroup as="ul">
        <h4>{props.title}</h4>
        {props.bills}
    </ListGroup>);
}