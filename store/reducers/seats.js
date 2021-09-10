import SeatItem from '../../models/seat-item';
import {EMPTY_BUCKET, FETCH_SEATS } from '../actions/seats';

const initialState = {
    seats: [],
    bookedSeats: {},
    total: 0,
};

const seatsReducer = (state = initialState, action) => {
    switch (action.type) {
        // case TOGGLE_SEATS: 
        //     const addedSeat = action.seat;
        //     const sId = addedSeat.id;
        //      const seatIdNo = addedSeat.seatNo;
        //     const seatPrice = addedSeat.price;

        //     let updatedSeatItem;

        //     // if (state.bookedSeats[addedSeat.id]) {

        //     //     const selectedSeatItem = state.bookedSeats[action.id];
                
        //     //     updatedSeatItem = { ...state.bookedSeats };
        //     //     delete updatedSeatItem[action.id];

        //     //     return {...state, bookedSeats: updatedSeatItem, total: state.total - selectedSeatItem.price};
        //     // }else{
        //     //     updatedSeatItem = new SeatItem(sId, seatIdNo, seatPrice);
        //     //     return {...state, bookedSeats: { ...state.bookedSeats, [addedSeat.id]: updatedSeatItem },total: state.total + seatPrice};
        //     // }
        //     console.log('Reducer',state.seats);

        case EMPTY_BUCKET: 
            return { ...state, bookedSeats: [] }
        case FETCH_SEATS:
            return {
                seats: action.seats
            };
        default: 
            return state;
    }
}

export default seatsReducer;