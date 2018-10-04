const True = ({ deleted }) => deleted ? False() : true;
const False = () => false;
const isCompleted = ({ completed }) => completed;
const isDeleted = ({ deleted }) => deleted;
const isNotCompleted = ({ completed }) => !completed;

export const getFilterFunc = filter => {
  console.log('this is getFilterFunc', filter);
  return filter === 'all' ? True :
          filter === 'completed' ? isCompleted :
          filter === 'not-completed' ? isNotCompleted :
          filter === 'deleted' ? isDeleted :
          False
};

export const filterList = (list, filter) => {
  console.log('this is filterList', list, filter.toString());
  return list.filter(filter)
};

export const get = field => obj => {
  console.log('this is get', obj[field]);
  return obj[field];
};