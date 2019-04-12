const tableDataSource = [];
tableDataSource.push({
  key: `0101`,
  id: `001`,
  case_number: '3456456457816',
  client: '张三',
  experimental: ['0'],
  experResult: '0',
  confState: '0',
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
  'GET /experdatatest/queryceshi': getQuery,
};
