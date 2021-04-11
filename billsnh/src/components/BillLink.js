// The BillLink class displays the clickable original bill link
export const BillLink = props => {
    return <a href={props.originalBillLink} target="_blank" rel="noreferrer">{props.label}</a>
}
