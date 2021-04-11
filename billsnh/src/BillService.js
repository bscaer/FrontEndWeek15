const LEGISCAN_ENDPOINT = 'https://api.legiscan.com/?key=omitted';

// The BillService uses an API to fetch bills from LegiScan. See https://legiscan.com/
class BillService {

    // The getAll function fetches all the bills
    getAll = async () => {
        try {
            const resp = await fetch(`${LEGISCAN_ENDPOINT}&op=getMasterList&state=NH`);
            const data = await resp.json();
            return data;
        } catch (e) {
            console.error(`Problem fetching bill: ${e}`);
        }
    }

    // The getOriginalBillLink function fetches the specified bill's link on the state's website
    getOriginalBillLink = async (bill_id) => {
        try {
            const resp = await fetch(`${LEGISCAN_ENDPOINT}&op=getBill&id=${bill_id}`);
            const data = await resp.json();
            return data.bill.state_link;
        } catch (e) {
            console.error(`Problem fetching bill: ${e}`);
        }
    }
}

// Instantiate the BillService.
export const billService = new BillService();