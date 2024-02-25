import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
//components

//pages
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";

// react router
import { Route, Routes} from "react-router-dom";
import { AuthProvider } from './context/AuthContext1';
import VenueProvider from './context/VenueContext';
import Layout from './components/layout/Layout';
import RequireAuth from './hooks/RequireAuth';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import EditVenueDetails from './pages/EditVenue';


const App = () => {
  const queryClient = new QueryClient();
  return <div>
    <AuthProvider>
      <VenueProvider>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Public */}
            <Route index element={<Home />} />
            <Route path='/login' element={<SignIn />} />
            <Route path='/register' element={<Register />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/room/:id' element={<RoomDetails />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/room/:id' element={<EditVenueDetails />} />
            {/* auth protected routes, requires registered profile*/}
            <Route element={<RequireAuth />}>
              
              <Route path='/contact' element={<Contact />} />
              
            </Route>
          </Route>
        </Routes>
        <ReactQueryDevtools />
        </QueryClientProvider>
      </VenueProvider>
    </AuthProvider>
  </div>;
};

export default App;
