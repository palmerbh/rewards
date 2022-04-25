export const calculateResults = (data) => {
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  const getPointsPerTransaction = data.map((transaction) => {
    let points = 0;
    let over100 = transaction.amt - 100;
    if (over100 > 0) {
      points += over100 * 2;
    }
    if (transaction.amt > 50) {
      points += 50;
    }
    const month = new Date(transaction.transactionDt).getMonth();
    return { ...transaction, points, month };
  });

  let perCustomer = {};
  let totalPointsByCustomer = {};
  getPointsPerTransaction.forEach((getPointsPerTransaction) => {
    let { custid, name, month, points } = getPointsPerTransaction;
    if (!perCustomer[custid]) {
      perCustomer[custid] = [];
    }

    if (!totalPointsByCustomer[name]) {
      totalPointsByCustomer[name] = 0;
    }

    totalPointsByCustomer[name] += points;

    if (perCustomer[custid][month]) {
      perCustomer[custid][month].points += points;
      perCustomer[custid][month].monthNumber = month;
      perCustomer[custid][month].numTransactions++;
    } else {
      perCustomer[custid][month] = {
        custid,
        name,
        monthNumber: month,
        month: months[month],
        numTransactions: 1,
        points,
      };
    }
  });
  let tot = [];
  for (var customerKey in perCustomer) {
    perCustomer[customerKey].forEach((cRow) => {
      tot.push(cRow);
    });
  }
  let totByCustomer = [];
  for (customerKey in totalPointsByCustomer) {
    totByCustomer.push({
      name: customerKey,
      points: totalPointsByCustomer[customerKey],
    });
  }
  return {
    summaryByCustomer: tot,
    getPointsPerTransaction,
    totalPointsByCustomer: totByCustomer,
  };
};
