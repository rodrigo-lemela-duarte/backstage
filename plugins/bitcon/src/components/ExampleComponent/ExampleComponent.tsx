import React from 'react';
import { Typography, Grid } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { useApi } from '@backstage/core-plugin-api';
import { ExampleFetchComponent } from '../ExampleFetchComponent';
import { bitcoinApiRef } from '../../api';
import useAsync from 'react-use/esm/useAsync';

export const ExampleComponent = () => {
  const bitconAPI = useApi(bitcoinApiRef);

  useAsync(async () => {
    return await bitconAPI.getValueByCurrency('BRL');
  }, [bitconAPI]);

  return (
    <Page themeId="tool">
      <Header title="Welcome to bitcon!" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Plugin title">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <InfoCard title="Information card">
              <Typography variant="body1">
                All content should be wrapped in a card like this.
              </Typography>
            </InfoCard>
          </Grid>
          <Grid item>
            <ExampleFetchComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
