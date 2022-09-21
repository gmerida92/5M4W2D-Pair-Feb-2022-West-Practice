import articles from '../data/data.json';

const LOAD_ARTICLES = 'article/loadArticles';
const ADD_ARTICLE = 'article/addArticle';

export const loadArticles = (payload) => {
  return {
    type: LOAD_ARTICLES,
    payload
  };
};

export const addArticle = (article) => {
  return {
    type: ADD_ARTICLE,
    article
  };
};

export const fetchArticles = () => async dispatch => {
  const response = await fetch('/api/articles');
  const articles = await response.json();
  dispatch(loadArticles(articles));
};

export const writeArticle = (article) => async dispatch => {
  const response = await fetch('/api/articles', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(article)
  });
  const newArticle = await response.json();
  dispatch(addArticle(newArticle));
};

const initialState = { entries: [], isLoading: true };

const articleReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_ARTICLES:
      return { ...state, entries: [...action.payload] };
    case ADD_ARTICLE:
      return { ...state, entries: [...state.entries, action.article] };
    default:
      return state;
  }
};

export default articleReducer;