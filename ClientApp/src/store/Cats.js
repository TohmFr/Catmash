const requestCatsRankType = 'REQUEST_CATS_RANK';
const receiveCatsRankType = 'RECEIVE_CATS_RANK';

const requestRandomCatsType = 'REQUEST_CATS_RANDOM';
const receiveRandomCatsType = 'RECEIVE_CATS_RANDOM';

const requestCatsVoteType = 'REQUEST_CATS_VOTE';
const receiveCatsVoteType = 'REQUEST_CATS_VOTE';

const initialState = { cats: [], isLoading: false };

export const actionCreators = {
    requestCatsRank: pageIndex => async (dispatch, getState) => {
   
        
        if (pageIndex === getState().cats.pageIndex) {
            // Don't issue a duplicate request (we already have or are loading the requested data)
            return;
        }
      

        dispatch({ type: requestCatsRankType, pageIndex });

        const url = `api/cats/rank?page=${pageIndex}`;
        const response = await fetch(url);
        const cats = await response.json();

        dispatch({ type: receiveCatsRankType, pageIndex, cats });
    },
    requestRandomCats: () => async (dispatch) => {
        dispatch({ type: requestRandomCatsType });

        const url = `api/cats/getTwoRandowCats`;
        const response = await fetch(url);
        const cats = await response.json();

        dispatch({ type: receiveRandomCatsType,  cats });
    },
    requestCatsVote: (winningCatId, losingCatId) => async (dispatch) => {
        dispatch({ type: requestCatsVoteType });

        const url = `api/cats/saveVote`;//?;

        let data = new FormData();
        data.append('winningCatId', winningCatId);
        data.append('losingCatId', losingCatId);

        const response = await fetch(url, {
            method: 'POST',
            body: data
        });
        //const response = await response.json();

        dispatch({ type: receiveCatsVoteType });
    }
    
};

export const reducer = (state, action) => {
    state = state || initialState;

    if (action.type === requestCatsRankType) {
        return {
            ...state,
            pageIndex: action.pageIndex,
            isLoading: true
        };
    }

    if (action.type === receiveCatsRankType) {
     
        return {
            ...state,
            pageIndex: action.pageIndex,
            cats: action.cats,
            isLoading: false
        };
    }

    if (action.type === requestRandomCatsType) {
        return {
            ...state,
            isLoading: true
        };

    }
    if (action.type === receiveRandomCatsType) {
        return {
            ...state,
            cats: action.cats,
            isLoading: false
        };
    }


    return state;
};
