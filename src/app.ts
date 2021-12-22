const container : HTMLElement | any = document.getElementById("app")

const SeatAmount: number = 20
var AllSeats: ISeat[] = populateSeatArray()
var AvailableSeats: number[] = getAvailableSeats()

interface ISeat 
{
    id: number;
    isBooked: boolean;
}

interface ISeatCluster
{
    size: number;
    startIndex: number;
}

// Return seat object using ID
const getSeat = (seatId: number): ISeat => 
{
    return AllSeats.filter(seat => seat.id === seatId)[0];
}

// Remove array of seat IDs
function bookSeats(amountOfSeats: number): number[]
{
    // If there is no sufficient space for the booking, return an empty array
    if(AvailableSeats.length < amountOfSeats)
        return new Array();

    let bookedSeats: number[] = [];

    let clusters: ISeatCluster[] = [];
    let size = 1;
    let index = 0;

    for(let i = 1; i < AvailableSeats.length; i++)
    {
        // If the current cluster size is big enough for the booking, return those seats
        if(size == amountOfSeats)
        {
            // Populate the bookedSeats array with the free seats
            for(let j = 0; j < amountOfSeats; j++)
                bookedSeats.push(AvailableSeats[j]);
            return bookedSeats;
        }
        // If the difference between the previous and the current seat is 1, increase the cluster size
        if(AvailableSeats[i - 1] == AvailableSeats[i] - 1)
            size++;
        // Otherwise add the cluster to cluster array and set the index and size values to create a new cluster
        else
        {
            clusters.push({ size: size, startIndex: index });
            index = i;
            size = 1;
        }
    }
    // Add the final cluster to the array
    clusters.push({ size: size, startIndex: index});

    // Sort the clusters in a descending manner, ordered by cluster size
    clusters.sort((a, b) => (a.size > b.size) ? -1 : 1);

    let startIndex = clusters[0].startIndex;
    let clusterIndex = 0;
    for(let i = 0; i < amountOfSeats; i++)
    {
        // Add the current person to a seat
        bookedSeats.push(AvailableSeats[startIndex]);
        // As long as the cluster is not to its full length, increase the index by 1, so move to the next seat
        if(startIndex < (clusters[clusterIndex].startIndex + clusters[clusterIndex].size - 1))
            startIndex++;
        // When the cluster exceeded its length, move onto the next cluster
        else
        {
            clusterIndex++;
            startIndex = clusters[clusterIndex].startIndex;
        }
    }
    return bookedSeats;  
}

// Return array of ID's of all available seats
function getAvailableSeats(): number[]
{
    var response: number[] = new Array();
    AllSeats.forEach(seat => {
        if(!seat.isBooked)
            response.push(seat.id);
    });
    return response;
}

// Return array with all seats in default state
function populateSeatArray(): ISeat[]
{
    var response: ISeat[] = new Array();
    for(let i = 0; i < SeatAmount; i++)
    {
        response.push(
            {id: i+1, isBooked: Math.random() > 0.5 ? false : true }
        );
    }
    return response;
}

// Append all seats to the display in the UI
function showSeats(): void
{
    container.innerHTML = "";
    
    AllSeats.forEach(seat => {
        let output: string;
        if(seat.isBooked)
        {
            output = 
            `
                <div class = "seat-taken">
                    <span class="seat-taken--id">${ seat.id }</span>
                </div>
            `;
        }
        else
        {
            output = 
            `
                <div class = "seat-available">
                    <span class="seat-available--id">${ seat.id }</span>
                </div>
            `;
        }
        container.innerHTML += output;
    });
}

// Set the newly booked seats in the arrays
function updateSeats(seats: number[]): void
{
    seats.forEach(seatId => {
        AllSeats[seatId-1].isBooked = true;
    });
    AvailableSeats = getAvailableSeats();

    showSeats();
}

// Display the seats
showSeats();

var button: HTMLButtonElement | any = document.getElementById("book")

// Control the button in the UI
button.onclick = function()
{
    var seatAmount = +(<HTMLInputElement>document.getElementById("seatInput")).value;
    let seats = bookSeats(seatAmount);
    console.log(seats);
    updateSeats(seats);
}

