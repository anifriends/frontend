import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs as ChakraTabs,
} from '@chakra-ui/react';
import { type ReactNode, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

type TabName = string;

type TabNode = ReactNode;

type TabsProps = {
  tabs: [TabName, TabNode][];
};

export function Tabs({ tabs }: TabsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const tabId = Number(searchParams.get('tab'));
  const [tabIndex, setTabIndex] = useState(tabId);

  const handleTabsChange = (index: number) => setTabIndex(index);

  const handleSetTabParam = () =>
    setSearchParams({ tab: `${tabIndex}` }, { replace: true });

  return (
    <ChakraTabs
      mt={3}
      isFitted
      variant="unstyled"
      onChange={handleTabsChange}
      index={tabIndex}
      bgColor="gray.50"
    >
      <TabList bgColor="white" pos="sticky" top={0} zIndex={10}>
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
            onClick={handleSetTabParam}
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
