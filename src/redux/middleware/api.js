import { get } from '../../utils/request';

// 处理中间件经过的action所有标识
export const FETCH_DATA = 'FETCH DATA';
/**
 * 其实就是一个中间件函数，对带有[FETCH_DATA]属性的action进行拦截,
 * [FETCH_DATA]中包含了types, schema, endPoint(url),
 * 先dispatch一个types[1]的action,然后对url先进行get请求，
 * 在得到的返回值中dispatch types[2],如果失败dispatch[3],
 * 总的来说就是整合了请求数据的三部曲，prepare, success, failure.
 * 可以简化creator函数中的代码量。
 * 真正的creator只需暴露一个actionCreator = {
 *  FETCH_DATA: [prepare, success, failure](reducer处理的三个阶段，视情况而定),
 *  schema,(领域实体)
 *  endPoint(url)
 * }
 */
export default store => next => action => {
  const callAPI = action[FETCH_DATA];

  // 说明是普通action
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, schema, endPoint } = callAPI;

  if (typeof endPoint !== 'string') {
    throw new Error('endPoint必须为string类型的URL');
  }
  
  if (!schema) {
    throw new Error('必须指定领域实体的schema');
  }

  if (!Array.isArray(types) && types.length === 3) {
    throw new Error('需要指定一个包含三个action type的types');
  }

  if (!types.every(item => typeof item === 'string')) {
    throw new Error('action type字段必须为string类型');
  }

  // 扩展action的属性
  const withAction = data => {
    const finallAction = {...action, ...data};

    delete finallAction[FETCH_DATA];
    return finallAction;
  }

  const [requestType, successType, failureType] = types;
  next(withAction({type: requestType}));
  return fetchData(endPoint, schema).then(res => {
    next(withAction({
      type: successType,
      response: res
    }))
  }, err => {
    next(withAction({
      type: failureType,
      error: err.message || '获取数据失败！'
    }))
  })
}

const fetchData = (url, schema) => {
  return get(url).then(res => {
    
    return normalizeData(res, schema);
  })
};

const normalizeData = (data, schema) => {
  const {name, id} = schema;
  let kvObj = {};
  let ids = [];

  if (Array.isArray(data)) {
    data.forEach(item => {
      kvObj[item[id]] = item;
      ids.push(item[id]);
    })
  } else {
    kvObj[data[id]] = data;
    ids.push(data[id]);
  }

  return {
    [name]: kvObj,
    ids
  }
}