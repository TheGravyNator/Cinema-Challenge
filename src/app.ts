const container : HTMLElement | any = document.getElementById("app")

const SeatAmount: number = 50
const AllSeats: ISeat[] = populateSeatArray()
const AvailableSeats: number[] = getAvailableSeats()

interface ISeat 
{
    id: number;
    isBooked: boolean;
}

const getSeat = (seatId: number): ISeat => 
{
    return AllSeats.filter(seat => seat.id === seatId)[0];
}

function bookSeats(amountOfSeats: number): number[]
{
    //TODO: Implement booking algorithm
    return new Array(0)    
}


function getAvailableSeats(): number[]
{
    var response: number[] = Array()
    AllSeats.forEach(seat => {
        if(!seat.isBooked)
            response.push(seat.id)
    });
    return response
}

function populateSeatArray(): ISeat[]
{
    var response: ISeat[] = Array()
    for(let i = 0; i < SeatAmount; i++)
    {
        response.push(
            {id: i+1, isBooked: false }
        )
    }
    return response
}

function showSeats(): void
{
    AvailableSeats.forEach(seatId => {
        let seat = getSeat(seatId)
        let output: string = 
        `
            <div class = "seat">
                <span class="seat--id">${ seat.id }</span>
                <span class="seat--isBooked">${ seat.isBooked }</span>
            </div>
        `
    
        container.innerHTML += output
    });
}

showSeats()