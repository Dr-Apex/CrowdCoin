import React from 'react';
import Link from 'next/link';
import {Card, Button} from 'semantic-ui-react';
import factory from '../ethereum/factory';
import Layout from '../components/Layout';

export default function CampaignIndex({campaigns}) {
  const showCampaigns = () => {
    const items = campaigns.map(address => {
      return {
        header: address,
        description: <Link href={`/campaigns/${address}`}><a>View Campaign</a></Link>,
        fluid: true
      };
    });

    return <Card.Group items={items} />;
  };

  return (
    <Layout>
      <div>
        <h3>Open Campaigns</h3>
        <Link href='/campaigns/new'>
          <a>
            <Button
              floated='right'
              content='Create Campaign' 
              icon='add circle'
              primary
            />
          </a>
        </Link>
        {showCampaigns()}
      </div>
    </Layout>
  );
};

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const campaigns = await factory.methods.getDeployedCampaigns().call();

  // Pass data to the page via props
  return {props: {campaigns}};
};