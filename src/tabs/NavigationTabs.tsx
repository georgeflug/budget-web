import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {Transactions} from "../transactions/Transactions";
import {Budgets} from "../budgets/Budgets";
import {AppBar} from '@material-ui/core';

export function NavigationTabs() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChanged = (event: React.ChangeEvent<{}>, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={selectedTab} onChange={handleTabChanged}>
          <Tab label="Transactions"/>
          <Tab label="Budgets"/>
        </Tabs>
      </AppBar>
      { selectedTab === 0 && ( <Transactions/> )}
      { selectedTab === 1 && ( <Budgets/> )}
    </div>
  );
}