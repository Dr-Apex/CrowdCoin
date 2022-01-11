import React from 'react';
import Link from 'next/link';
import {Button, Table} from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Campaign from '../../../../ethereum/campaign';
import RequestRow from '../../../../components/RequestRow';

export default function RequestIndex({address, requests, requestCount, approversCount}) {
  const {Header, Row, HeaderCell, Body} = Table;

  const showRow = () => {
    return JSON.parse(requests).map((request, index) => {
      return (
        <RequestRow 
          key={index}
          id={index}
          request={request}
          address={address}
          approversCount={approversCount}
        />
      );
    });
  };

  return (
    <Layout>
      <h3>Request List</h3>
      <Link href={`/campaigns/${address}/requests/new`}>
        <a>
          <Button primary floated='right' style={{marginBottom: 10}}>Add Requests</Button>
        </a>
      </Link>
      <Table>
        <Header>
          <Row>
            <HeaderCell>ID</HeaderCell>
            <HeaderCell>Description</HeaderCell>
            <HeaderCell>Amount</HeaderCell>
            <HeaderCell>Recipient</HeaderCell>
            <HeaderCell>Approval Count</HeaderCell>
            <HeaderCell>Approve</HeaderCell>
            <HeaderCell>Finalize</HeaderCell>
          </Row>
        </Header>
        <Body>
          {showRow()}
        </Body>
      </Table>
      <div>Found {requestCount} requests.</div>
    </Layout>
  );
};

export async function getServerSideProps({query: {address}}) {
  const campaign = Campaign(address);
  const approversCount = await campaign.methods.approversCount().call();
  const requestCount = await campaign.methods.getRequestsCount().call();

  const requests =  await Promise.all(
    Array(parseInt(requestCount)).fill().map((element, index) => {
      return campaign.methods.requests(index).call();
    })
  );

  return {props: {
    address, 
    requests: JSON.stringify(requests), 
    requestCount, 
    approversCount
  }};
};