import React from 'react';
import { ActionIcon, Center, Group, Stack, Text } from '@mantine/core';
import { Page } from '../layouts/Page';
import { BrandGithub, BrandLinkedin } from 'tabler-icons-react';
import ExternalLink from '../components/ExternalLink';

const AboutPage = () => {
  return (
    <Page showHeader={false}>
      <Center sx={{ height: '100%' }} p="md">
        <Stack align="center">
          <Text sx={{ textAlign: 'center' }}>
            Aplicación desarrollada con fines de aprendizaje
          </Text>

          <Text>Matias Ruiz</Text>

          <Group>
            <ExternalLink href="https://github.com/soamati">
              <ActionIcon>
                <BrandGithub />
              </ActionIcon>
            </ExternalLink>
            <ExternalLink href="https://linkedin.com/in/matiruizsh/">
              <ActionIcon>
                <BrandLinkedin />
              </ActionIcon>
            </ExternalLink>
          </Group>
        </Stack>
      </Center>
    </Page>
  );
};

export default AboutPage;
