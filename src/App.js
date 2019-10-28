import React from 'react';

import {ThemeContextProvider} from './core/ThemeProvider';
import Navigator from './Navigator';

import {Database} from '@nozbe/watermelondb';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';

import {mySchema} from './models/schema';
import Activity from './models/Activity';
import SubActivity from './models/SubActivity';

const adapter = new SQLiteAdapter({
  dbName: 'TodoList',
  schema: mySchema,
});

const database = new Database({
  adapter,
  modelClasses: [Activity, SubActivity],
  actionsEnabled: true,
});

export default function App() {
  return (
    <DatabaseProvider database={database}>
      <ThemeContextProvider>
        <Navigator />
      </ThemeContextProvider>
    </DatabaseProvider>
  );
}
