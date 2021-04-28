import { useReducer,useEffect } from 'react';
import axios from 'axios';

const ACTIONS = {
    MAKE_REQUEST: 'make_request',
    GET_REQUEST: 'get_request',
    ERROR: 'error',
    UPDATE_HAS_NEXT_PAGE: 'update-has-next-page'
}
function reducer(state, action){
    switch(action.type){
        case ACTIONS.MAKE_REQUEST:
            return{ loading : true , jobs : []};
        case ACTIONS.GET_REQUEST:
            return{...state, loading: false, jobs: action.payload.jobs}
        case ACTIONS.ERROR:
            return{...state, loading:false, error:action.payload.error, jobs:[]}
        case ACTIONS.UPDATE_HAS_NEXT_PAGE:
            return{...state, hasNextPage: action.payload.hasNextPage}
        default:
            return state
    }
}
export default function useFetchJobs(params, page) {
    const [state, dispatch] =useReducer(reducer, { jobs :[], loading:true})
    const BASE_URL = 'https://jobs.github.com/positions.json'

    useEffect(() =>{
        const cancelToken1 = axios.CancelToken.source()
        dispatch({type:ACTIONS.MAKE_REQUEST})
        axios.get(BASE_URL,{
            cancelToken: cancelToken1.token,
            params: {markdown: true, page: page, ...params}
        }).then(res =>{
            console.log(res.data)
           dispatch({type:ACTIONS.GET_REQUEST, payload:{jobs: res.data}}) 
        }).catch(error =>{
            if(axios.isCancel(error)) return
            dispatch({type: ACTIONS.ERROR, payload: {error: error }})
        })
        const cancelToken2 = axios.CancelToken.source()
        axios.get(BASE_URL,{
            cancelToken: cancelToken2.token,
            params: {markdown: true, page: page + 1, ...params}
        }).then(res =>{
            console.log(res.data)
           dispatch({type:ACTIONS.UPDATE_HAS_NEXT_PAGE, payload:{hasNextPage: res.data.length !==0}}) 
        }).catch(error =>{
            if(axios.isCancel(error)) return
            dispatch({type: ACTIONS.ERROR, payload: {error: error }})
        })

        return () =>{
            cancelToken1.cancel()
            cancelToken2.cancel()
            
        }
    },[params,page])

    return state
    
}


