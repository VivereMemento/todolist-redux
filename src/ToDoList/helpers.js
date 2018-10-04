const True = ({ deleted }) => deleted ? False() : true;
const False = () => false;
const isCompleted = ({ completed }) => completed;
const isDeleted = ({ deleted }) => deleted;
const isNotCompleted = ({ completed, deleted }) => deleted ? False() : !completed;

export const getFilterFunc = filter => (
  filter === 'all' ? True :
  filter === 'completed' ? isCompleted :
  filter === 'not-completed' ? isNotCompleted :
  filter === 'deleted' ? isDeleted :
  False
);

export const filterList = (list, filter) => list.filter(filter)

export const get = field => obj => obj[field];