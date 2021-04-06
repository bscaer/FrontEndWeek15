const LEGISCAN_ENDPOINT = 'https://api.legiscan.com/?key=omitted&state=NH';

// The BillService uses an API to fetch bills from LegiScan.
class BillService {

    // The getAll function fetches all the bills
    getAll = async() => {
        try {
            const resp = await fetch(LEGISCAN_ENDPOINT);
            const data = await resp.json();
            return data;
        } catch(e) {
            console.error(`Problem fetching bill: ${e}`);
        }
    }
}

// Instantiate the BillService.
export const billService = new BillService();