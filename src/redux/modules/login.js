const initState = {
	username: localStorage.getItem('username') || '',
	password: '',
	status: localStorage.getItem('isLogin') || '',
	isFetching: false
};

// actionTypes
const types = {
	LOGIN_REQUEST: 'LOGIN/LOGIN_REQUEST',
	LOGIN_SUCCESS: 'LOGIN/LOGIN_SUCCESS',
	LOGIN_FAILURE: 'LOGIN/LOGIN_FAILURE',
	//输入用户和密码
	SET_USERNAME: 'LOGIN/SET_USERNAME',
	SET_PASSWORD: 'LOGIN/SET_PASSWORD',
	//注销
	LOGOUT: 'LOGIN/LOGOUT'
};

// actionCreator
export const actions = {
	login: () => {
		return (dispatch, getState) => {
			const { username, password } = getState().login;
			if (!(username && username.length > 0 && password && password.length > 0)) {
				dispatch(loginFailure('用户名或密码不能为空！'));
			}
			dispatch(loginRequest());
			new Promise((resolve, reject) => {
				setTimeout(() => {
					dispatch(loginSuccess());
					localStorage.setItem('username', username);
					localStorage.setItem('isLogin', true);
					resolve();
				}, 1000);
			});
		};
	},
	setUsername: (username) => ({
		type: types.SET_USERNAME,
		username
	}),
	setPassword: (password) => ({
		type: types.SET_PASSWORD,
		password
	}),
	logOut: () =>{
		localStorage.removeItem('username');
		localStorage.removeItem('isLogin');
		return {
			type: types.LOGOUT
		}
		
	}
};

const loginRequest = () => ({
	type: types.LOGIN_REQUEST
});

const loginSuccess = () => ({
	type: types.LOGIN_SUCCESS
});

const loginFailure = (error) => ({
	type: types.LOGIN_FAILURE,
	error
});

// reducer

export default (state = initState, action) => {
	switch (action.type) {
		case types.LOGIN_REQUEST:
			return { ...state, isFetching: true };
		case types.LOGIN_SUCCESS:
			return { ...state, isFetching: false, status: true };
		case types.LOGIN_FAILURE:
			return { ...state, isFetching: false };
		case types.SET_USERNAME:
			return { ...state, username: action.username };
		case types.SET_PASSWORD:
			return { ...state, password: action.password };
		case types.LOGOUT:
			return { ...state, username: '', password: '', status: false };
		default:
			return state;
	}
};

// selectors

export const getUsername = (state) => state.login.username;

export const getPassword = (state) => state.login.password;

export const getIsLogin = (state) => state.login.status;
