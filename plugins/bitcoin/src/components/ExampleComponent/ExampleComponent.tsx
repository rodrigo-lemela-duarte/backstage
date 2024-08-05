import React, { PropsWithChildren, useState } from 'react';
import { Grid, Select } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  HeaderLabel,
} from '@backstage/core-components';
import { Bitcoin, bitcoinAPIRef } from '../../types';
import { useApi } from '@backstage/core-plugin-api';
import MaterialButton from '@material-ui/core/Button';

export const ExampleComponent = () => {
  const [bitcoin, setBitcoin] = useState<Bitcoin>();
  const [currency, setCurrency] = useState('USD');

  const bitcoinAPI = useApi(bitcoinAPIRef);

  const getBitcoinService = async () => {
    try {
      const bitcoinData: Bitcoin = await bitcoinAPI.getByCurrency(currency);
      setBitcoin(bitcoinData);
    } catch (error) {
      console.error(`Erro ao buscar dados de Bitcoin: ${error}`);
    }
  };

  const handleInputChange = (event: any) => {
    setCurrency(event.target.value);
  };

  const handleButtonClick = () => {
    getBitcoinService();
  };

  const Wrapper = ({ children }: PropsWithChildren<{}>) => (
    <Grid container spacing={4}>
      <Grid item style={{ display: 'flex', flexDirection: 'row' }}>
        {children}
      </Grid>
    </Grid>
  );

  return (
    <Page themeId="tool">
      <Header
        title="Bitcoin"
        subtitle="Verifique a cotação atual do Bitcoin, na moeda desejada."
      >
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <Wrapper>
          <InfoCard title="Pesquisar">
            <div
              style={{
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Select
                placeholder="Moeda"
                label="Moeda"
                fullWidth
                style={{ marginBottom: '2em' }}
                onChange={handleInputChange}
              >
                <option value="USD" selected>
                  Dolar (USD)
                </option>
                <option value="GBP">Libra Esterlina (GBP)</option>
                <option value="EUR">Euro (EUR)</option>
              </Select>
              <MaterialButton
                onClick={handleButtonClick}
                color="primary"
                variant="contained"
              >
                Pesquisar
              </MaterialButton>
            </div>
          </InfoCard>
          <InfoCard title="Resultado">
            <div
              style={{
                width: 500,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              {bitcoin ? (
                <div>
                  <p>Currency: {bitcoin.code}</p>
                  <p>Value: {bitcoin.rate}</p>
                </div>
              ) : (
                <p>Sem dados disponíveis.</p>
              )}
            </div>
          </InfoCard>
        </Wrapper>
      </Content>
    </Page>
  );
};
