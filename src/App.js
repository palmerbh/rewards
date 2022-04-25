import React, { useMemo, useState, useEffect } from 'react';
import apiService from './api/dataService';
import RewardTable from './Table';
import { Col, Container, Row } from 'react-bootstrap';
import { calculateResults } from './utils';

const App = () => {
  const columns = useMemo(
    () => [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Points',
        accessor: 'points',
      },
    ],
    []
  );

  const totalsByCustomersColumns = useMemo(
    () => [
      {
        Header: 'Customer Name',
        accessor: 'name',
      },
      {
        Header: 'Month',
        accessor: 'month',
      },
      {
        Header: '# of Transactions',
        accessor: 'numTransactions',
      },
      {
        Header: 'Reward Points',
        accessor: 'points',
      },
    ],
    []
  );

  const [data, setData] = useState([]);
  const [dataByMonths, setDataByMonths] = useState([]);

  useEffect(() => {
    (async () => {
      await apiService().then((data) => {
        setData(calculateResults(data).totalPointsByCustomer);
        setDataByMonths(calculateResults(data).summaryByCustomer);
      });
    })();
  }, []);

  return (
    <Container>
      <Row className='mt-4 text-center'>
        <Col>
          <h3>Totals by Customer Months</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <RewardTable columns={totalsByCustomersColumns} data={dataByMonths} />
        </Col>
      </Row>
      <Row className='mt-4 text-center'>
        <Col>
          <h3>Totals By Customer</h3>
        </Col>
      </Row>
      <Row>
        <Col>
          <RewardTable columns={columns} data={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default App;
