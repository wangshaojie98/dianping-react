import createReducer from '../../../utils/createReducer';

const schema = {
	id: 'id',
	name: 'comments'
};

const types = {
	ADD_COMMENT: 'COMMENTS/ADD_COMMENT'
};

export const actions = {
	addComment: (commentObj) => ({
		type: types.ADD_COMMENT,
		commentObj
	})
}

const normalReducer = createReducer(schema.name);

const reducer = (state = {}, action) => {
	if (action.type === types.ADD_COMMENT) {
		return {
			...state,
			[action.commentObj.id]: action.commentObj
		}
	} else {
		return normalReducer(state, action);
	}
};

export default reducer;
