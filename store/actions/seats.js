// export const TOGGLE_SEATS = 'TOGGLE_SEATS';
export const EMPTY_BUCKET = 'EMPTY_BUCKET';
export const FETCH_SEATS = 'FETCH_SEATS';

import Seat from '../../models/seat';

// export const toggleSeats = (seat) => {
//     return {type: TOGGLE_SEATS, seat: seat};
// };

export const emptyBucket = () => {
    return {type: EMPTY_BUCKET};
}

export const fetchSeats = (fid,tid,tripdate,configId) => {
    return async dispatch => {
        // any async code you want!
        const response = await fetch('https://stcticketing.gov.gh/api/SeatBooking/SeatArragement', {
          method: 'POST',
          headers: {
              "Content-Type": 'application/json'
          },
          body: JSON.stringify({FID: fid, TID: tid, TravelDate: tripdate, ConfigID: configId})
      })
      const resData = await response.json();
    //  console.log('Seats Data',resData);
      const loadedSeats = [];

      for (const key in resData.SeatArragement) {
        loadedSeats.push(
          new Seat(
            resData.SeatArragement[key].ID,
            resData.SeatArragement[key].Postion,
            resData.SeatArragement[key].SeartNo,
            resData.SeatArragement[key].StatusShow,
            resData.SeatArragement[key].BookStatus,
            resData.SeatArragement[key].price,
            resData.SeatArragement[key].BlockSeat,
          )
        );
      }
      dispatch({ type: FETCH_SEATS, seats: loadedSeats });
    }
}
