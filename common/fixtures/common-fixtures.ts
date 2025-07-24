import { mergeTests } from '@playwright/test';
import { setupFixtures } from './setup-fixtures';
import { uiSetupFixtures } from '../../ui/fixtures/ui-setup-fixtures';
import { apiSetupFixtures } from '../../api/fixtures/api-setup-fixtures';

export const commonFixtures = mergeTests(setupFixtures, uiSetupFixtures, apiSetupFixtures);
