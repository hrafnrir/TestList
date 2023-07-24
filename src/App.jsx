import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import Layout from "./components/Layout.jsx";
import { Sign as SignPage } from "./pages/Sign.jsx";
import { Home as HomePage } from "./pages/Home.jsx";
import { Test as TestPage } from "./pages/Test.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="tests" element={<TestPage type="create" />} />
      </Route>
      <Route path="signup" element={<SignPage type="signup" />} />
      <Route path="signin" element={<SignPage type="signin" />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
