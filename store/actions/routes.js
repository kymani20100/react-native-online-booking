import Route from '../../models/route';
export const FETCH_ROUTES = 'FETCH_ROUTES';

export const fetchRoutes = () => {
    return async dispatch => {
      // any async code you want!
      const response = await fetch('https://stcticketing.gov.gh/api/SeatBooking/GetLocationRouteTo', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({"ID":"0"})
    })
  
      const resData = await response.json();
      // console.log(resData);
      const loadedRoutes = [];
  
      for (const key in resData.SearchDetail) {
        //   const {Name, ID} = resData.SearchDetail;
        loadedRoutes.push(
          new Route(
            resData.SearchDetail[key].ID,
            resData.SearchDetail[key].Name,
          )
        );
  
      }
  
      dispatch({ type: FETCH_ROUTES, routes: loadedRoutes });
    };
  };