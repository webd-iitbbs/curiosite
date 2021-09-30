import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from "react-redux";
import singleQuestion from "../components/home/Feeds/SingleQuestion";
import MainNavigation from "../components/home/Header/MainNavigation";

import { store } from "../store";
import SingleQuestion from "../components/home/Feeds/SingleQuestion";
export default function Home() {
  return (
    <div>
      <Provider store={store}>
        <MainNavigation />
      </Provider>
    </div>
  );
}
