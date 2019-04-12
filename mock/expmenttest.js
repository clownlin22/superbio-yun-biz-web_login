const tableDataSource = [];
tableDataSource.push({
  key: `01001`,
  id:'001',
  ExperDate: '2018-11-07 11:00:12',
});

function getQuery(req, res) {
  const result = {
    list: tableDataSource,
    pagination: {
      total: tableDataSource.length,
    },
  };
  return res.json(result);
}

export default {
  'GET /expmenttest/queryceshi': getQuery,
};
