"use strict";
const container = document.getElementById("app");
const SeatAmount = 50;
const AllSeats = populateSeatArray();
const AvailableSeats = getAvailableSeats();
const getSeat = (seatId) => {
    return AllSeats.filter(seat => seat.id === seatId)[0];
};
function bookSeats(amountOfSeats) {
    //TODO: Implement booking algorithm
    return new Array(0);
}
function getAvailableSeats() {
    var response = Array();
    AllSeats.forEach(seat => {
        if (!seat.isBooked)
            response.push(seat.id);
    });
    return response;
}
function populateSeatArray() {
    var response = Array();
    for (let i = 0; i < SeatAmount; i++) {
        response.push({ id: i + 1, isBooked: false });
    }
    return response;
}
function showSeats() {
    AvailableSeats.forEach(seatId => {
        let seat = getSeat(seatId);
        let output = `
            <div class = "seat">
                <span class="seat--id">${seat.id}</span>
                <span class="seat--isBooked">${seat.isBooked}</span>
            </div>
        `;
        container.innerHTML += output;
    });
}
showSeats();
