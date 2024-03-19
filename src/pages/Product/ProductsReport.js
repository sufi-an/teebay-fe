import * as React from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

import ProductCard from '../../components/Card/ProductCard';

export default function LabTabs() {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Bought" value="1" />
            <Tab label="Sold" value="2" />
            <Tab label="Borrowed" value="3" />
            <Tab label="Lent" value="4" />
          </TabList>
        </Box>
        <TabPanel value="1">
            <ProductCard/>
        </TabPanel>
        <TabPanel value="2"><ProductCard/></TabPanel>
        <TabPanel value="3"><ProductCard/></TabPanel>
        <TabPanel value="4"><ProductCard/></TabPanel>
      </TabContext>
    </Box>
  );
}
