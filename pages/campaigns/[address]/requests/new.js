import React, {useState} from 'react';
import {useRouter} from 'next/router';
import Link from 'next/link';
import {Button, Form, Input, Message} from 'semantic-ui-react';
import Layout from '../../../../components/Layout';
import Campaign from '../../../../ethereum/campaign';
import web3 from '../../../../ethereum/web3';

export default function RequestNew({address}) {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [recipient, setRecipient] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    const campaign = Campaign(address);
    setLoading(true);
    setErrorMessage('');

    try {
      const accounts = await web3.eth.getAccounts();
      await campaign.methods.createRequest(
        description,
        web3.utils.toWei(value, 'ether'),
        recipient
      ).send({from: accounts[0]});
      router.replace(`/campaigns/${address}/requests`);
    } catch (error) {
      setErrorMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <Layout>
      <Link href={`/campaigns/${address}/requests`}>
        <a>Back</a>
      </Link>
      <h3>Create a Request</h3>
      <Form onSubmit={onSubmit} error={!!errorMessage}>
        <Form.Field>
          <label>Description</label>
          <Input
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Value in Ether</label>
          <Input
            value={value}
            onChange={e => setValue(e.target.value)}
          />
        </Form.Field>
        <Form.Field>
          <label>Recipient</label>
          <Input
            value={recipient}
            onChange={e => setRecipient(e.target.value)}
          />
        </Form.Field>
        <Message error header='Oops!' content={errorMessage} />
        <Button loading={loading} primary>Create!</Button>
      </Form>
    </Layout>
  );
};

export async function getServerSideProps({query: {address}}) {
  return {props: {address}};
};