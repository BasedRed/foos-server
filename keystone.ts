// Welcome to Keystone!
//
// This file is what Keystone uses as the entry-point to your headless backend
//
// Keystone imports the default export of this file, expecting a Keystone configuration object
//   you can find out more at https://keystonejs.com/docs/apis/config

import { config } from '@keystone-6/core';

// to keep this file tidy, we define our schema in a different file
import { lists } from './schema';

// authentication is configured separately here too, but you might move this elsewhere
// when you write your list-level access control functions, as they typically rely on session data
import { withAuth, session } from './auth';

export default withAuth(
    config({
        db: {
            useMigrations: true,
            // we're using sqlite for the fastest startup experience
            //   for more information on what database might be appropriate for you
            //   see https://keystonejs.com/docs/guides/choosing-a-database#title
            // provider: 'sqlite',
            // provider: process.env.NODE_ENV === 'production' ? 'postgresql' : 'mysql',
            provider: 'postgresql',
            // url: 'file:./keystone.db',
            url:
                process.env.DATABASE_URL ??
                'postgres://postgres:e-DC4E6CcEbCB3*DbDC332Gg3G15fGEb@roundhouse.proxy.rlwy.net:49040/railway',
            // url: process.env.NODE_ENV === 'production' ? process.env.DATABASE_URL ?? '' : 'file:./keystone.db',
        },
        lists,
        session,
    })
);
