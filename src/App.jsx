import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

import { Sign as SignPage } from "./pages/Sign.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/">
      <Route path="signup" element={<SignPage isSignUp={true} />} />
      <Route path="signin" element={<SignPage isSignUp={false} />} />
    </Route>
  )
);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
