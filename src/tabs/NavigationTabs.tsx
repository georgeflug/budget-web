import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {TransactionTab} from "./TransactionTab";
import {AppBar} from '@material-ui/core';
import {BudgetTab} from "./BudgetTab";
import {InboxTab} from "./InboxTab";

export function NavigationTabs() {
  const [selectedTab, setSelectedTab] = React.useState(0);

  const handleTabChanged = (event: React.ChangeEvent<{}>, newValue: any) => {
    setSelectedTab(newValue);
  };

  return (
    <div>
      <AppBar position="static" color="default">
        <Tabs value={selectedTab} onChange={handleTabChanged}>
          <Tab label="Inbox"/>
          <Tab label="Transactions"/>
          <Tab label="Budgets"/>
        </Tabs>
      </AppBar>
      { selectedTab === 0 && ( <InboxTab/> )}
      { selectedTab === 1 && ( <TransactionTab/> )}
      { selectedTab === 2 && ( <BudgetTab/> )}
    </div>
  );
}
