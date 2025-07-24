import { test as base } from '@playwright/test';

import { UiSetupFixtures } from '../../ui/fixtures/ui-setup-fixtures';
import { ApiSetupFixtures } from '../../api/fixtures/api-setup-fixtures';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export type SetupFixtures = {};

export const setupFixtures = base.extend<SetupFixtures & UiSetupFixtures & ApiSetupFixtures>({});
