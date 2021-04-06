import ListGroup from 'react-bootstrap/ListGroup';

// The Bill class represents a bill
export const Bill = props => {
    // The JSX that renders the bill
    return <ListGroup.Item onClick={props.handleClick}>{props.number}: {props.title}</ListGroup.Item>
}
