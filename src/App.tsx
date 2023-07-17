import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider as JotaiProvider } from 'jotai';
import { DevTools as JotaiDevTools } from 'jotai-devtools';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { ThemeProvider } from 'ThemeProvider';
import { Route, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './index.css';
import Home from '@page/common/Home';
import Dashboard from '@page/common/Dashboard';
import PostManager from '@page/post/PostManager';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <JotaiProvider>
        <ThemeProvider>
          <ModalsProvider>
            <Routes>
              <Route path="/" element={<Home />}>
                <Route index element={<Dashboard />} />
                <Route path="/post" element={<PostManager />} />
              </Route>
            </Routes>
          </ModalsProvider>
          <Notifications />
        </ThemeProvider>
        <JotaiDevTools />
      </JotaiProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
