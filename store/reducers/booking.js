import SeatItem from '../../models/seat-item';
import { TOGGLE_SEATS} from '../actions/booking';

const initialState = {
    bookedSeats: {},
    total: 0,
};

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_SEATS: 
            
            const addedSeat = action.seat;
            const sId = addedSeat.id;
             const seatIdNo = addedSeat.seatNo;
            const seatPrice = addedSeat.price;

            let updatedSeatItem;

            if (state.bookedSeats[addedSeat.id]) {

                const selectedSeatItem = state.bookedSeats[sId];
                // console.log("Reducer true", selectedSeatItem);
                updatedSeatItem = { ...state.bookedSeats };
                delete updatedSeatItem[sId];

                return {...state, bookedSeats: updatedSeatItem, total: state.total -= +seatPrice};
            }else{
                console.log("Reducer", false);
                updatedSeatItem = new SeatItem(sId, seatIdNo, seatPrice);
                return {...state, bookedSeats: { ...state.bookedSeats, [addedSeat.id]: updatedSeatItem },total: state.total += +seatPrice};
                // console.log('Reducer',state.bookedSeats);
            }
                  
        default: 
            return state;
    }
}

export default bookingReducer;