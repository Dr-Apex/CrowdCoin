import React from 'react';
import {Button, Table} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaign from '../ethereum/campaign';

export default function RequestRow({id, request, address, approversCount}) {
  const {Row, Cell} = Table;
  const readyToFinalize = request.approvalCount > approversCount / 2;

  const onApprove = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.approveRequest(id).send({
      from: accounts[0]
    });
  };
  
  const onFinalize = async () => {
    const campaign = Campaign(address);
    const accounts = await web3.eth.getAccounts();
    await campaign.methods.finalizeRequest(id).send({
      from: accounts[0]
    });
  };

  return (
    <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
      <Cell>{id}</Cell>
      <Cell>{request.description}</Cell>
      <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
      <Cell>{address}</Cell>
      <Cell>{request.approvalCount}/{approversCount}</Cell>
      <Cell>
        {request.complete ? null : (
          <Button basic color='green' onClick={onApprove}>Approve</Button>
        )}
      </Cell>
      <Cell>
        {request.complete ? null : (
          <Button basic color='teal' onClick={onFinalize}>Finalize</Button>
        )}
      </Cell>
    </Row>
  );
};
