import axios from 'axios';

const { PLAN_LIST_REQUEST, PLAN_LIST_SUCCESS, PLAN_LIST_FAIL } = require('../constants/planConstants');

export const listPlans = () => async (dispatch) => {
  try {
    dispatch({ type: PLAN_LIST_REQUEST });
    const { data } = await axios.get('pay_plan');
    // const response = await axios.get('user');
    // plans
    dispatch({ type: PLAN_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: PLAN_LIST_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};
