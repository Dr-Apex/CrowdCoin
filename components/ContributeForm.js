import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';

export default function ContributeForm({address}) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.contribute().send({
        from: accounts[0],
        value: web3.utils.toWei(value, 'ether')
      });
      router.replace(`/campaigns/${address}`);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
    setValue('');
  };

  return (
    <Form onSubmit={onSubmit} error={!!errorMessage}>
      <Form.Field>
        <label>Amount to Contribute</label>
        <Input
          value={value}
          onChange={e => setValue(e.target.value)}
          label='ether' 
          labelPosition='right'
        />
      </Form.Field>
      <Message error header='Oops!' content={errorMessage} />
      <Button loading={loading} primary>Contribute!</Button>
    </Form>
  );
};