import { test } from '@playwright/test';
import { fetchUserData } from '../helpers/exportUserData';

test('test analysis', async ({}, testInfo) => {
  const userData = await fetchUserData();

  await testInfo.attach('User data', {
    body: JSON.stringify(userData, null, 2),
    contentType: 'application/json',
  });
});

