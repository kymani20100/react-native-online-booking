import Bus from '../../models/bus';
export const FETCH_BUSES = 'FETCH_BUSES';

export const fetchBuses = (sourceId,destinationId,tripdate) => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('https://stcticketing.gov.gh/api/SearchBusAPI/GetListBusAllWeb', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({SourceID: sourceId, DestinationID: destinationId, TravelDate: tripdate})
    })
  
      const resData = await response.json();
       console.log(resData);
      const loadedBuses = [];

      if(resData.Message !== 'NO_RECORD_FOUND'){

        for (const key in resData) {
          loadedBuses.push(
            new Bus(
              resData[key].ID,
              resData[key].TName,
              resData[key].Depart,
              resData[key].Arrive,
              resData[key].FAR,
              resData[key].SEAT,
              resData[key].LSEAT,
              resData[key].ServiceType,
            )
          );
        }
      }else{
        for (const key in resData) {
          loadedBuses.push(
            new Bus(
              "0",
              'SORRY, WE COULD NOT FIND YOU A BUS',
              '00:00',
              '00:00',
              '00',
              0,
              0,
              0,
            )
          );
        }
      }
  
      dispatch({ type: FETCH_BUSES, buses: loadedBuses });
    };
  };