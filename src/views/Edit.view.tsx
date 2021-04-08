import React, { useEffect, useState } from 'react';
import { DashboardLayout } from '../layouts';
import { useAuth0 } from '@auth0/auth0-react';
import { DeviceLog, JsonBuilderForm, Loading, MenuHeading } from '../components';
import { getDevice } from '../api';
import { Device } from "../types";
import { Paper, Tab, Tabs } from '@material-ui/core';
import { EditForm } from '../components';
import { SocketProvider } from '../context';

interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
}

export function EditView({ match }: any) {
  let params = match.params;
  const { getAccessTokenSilently } = useAuth0();
  const [isLoading, setLoading] = useState(true);
  const [device, setDevice] = useState<Device | null>(null);
  const [tab, setTab] = React.useState<number>(0);

  const handleChange = (_event: React.ChangeEvent<{}>, newTab: number) => {
    setTab(newTab);
  };

  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently({
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      });
      setLoading(true);
      setDevice((await getDevice(params.id, accessToken)));
      setLoading(false);
    })();
  }, [getAccessTokenSilently, params.id]);


  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <div>{children}</div>
        )}
      </div>
    );
  }


  if (isLoading) {
    return <Loading isLoading={true}/>;
  }

  return (
    device ?
    <div>
      <DashboardLayout>
        <div className="flex flex-col pb-12">
          <MenuHeading>Device {device.name}</MenuHeading>
            <div className="edit-container rounded-lg overflow-hidden shadow-sm bg-white">
              <Paper square>
                <Tabs
                  value={tab}
                  indicatorColor="primary"
                  textColor="primary"
                  onChange={handleChange}
                  aria-label="edit menu tabs"
                >
                  <Tab className="outline-none border-none" label="Edit" {...a11yProps(0)} />
                  <Tab className="outline-none border-none" label="Data" {...a11yProps(1)} />
                  <Tab className="outline-none border-none" label="Logs" {...a11yProps(2)} />
                </Tabs>
              </Paper>
              <div className="p-8">
                <TabPanel value={tab} index={0}>
                  <EditForm device={device} setDevice={setDevice} />
                </TabPanel>
                <TabPanel value={tab} index={1}>
                  <JsonBuilderForm device={device} setDevice={setDevice} />
                </TabPanel>
                <TabPanel value={tab} index={2}>
                <SocketProvider>
                  <DeviceLog device={device} />
                </SocketProvider>
                </TabPanel>
              </div>
            </div>
          </div>
      </DashboardLayout>
    </div>
    : null
  );
}