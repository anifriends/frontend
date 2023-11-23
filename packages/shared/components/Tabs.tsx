import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as ChakraTabs,
} from '@chakra-ui/react';
import type { ReactNode } from 'react';

type TabName = string;

type TabNode = ReactNode;

type TabsProps = {
  tabs: [TabName, TabNode][];
};

export default function Tabs({ tabs }: TabsProps) {
  return (
    <ChakraTabs pt={3} isFitted variant="unstyled">
      <TabList>
        {tabs.map((tab, index) => (
          <Tab
            color="gray.400"
            borderTop="2px solid"
            borderTopColor="white"
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            _selected={{
              color: 'black',
              borderX: '1px solid',
              borderColor: 'gray.200',
              borderTopColor: 'orange.400',
              borderBottomColor: 'white',
              borderLeft: index === 0 ? 'none' : '1px solid',
              borderRight: index === tabs.length - 1 ? 'none' : '1px solid',
            }}
            key={index}
          >
            {tab[0]}
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {tabs.map((tab, index) => (
          <TabPanel key={index}>{tab[1]}</TabPanel>
        ))}
      </TabPanels>
    </ChakraTabs>
  );
}
