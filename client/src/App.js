import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Cinflex, Liked, Login, Movies, Player, Signup, Tvshows } from "./pages";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" Component={Cinflex} />
          <Route exact path="/login" Component={Login} />
          <Route exact path="/signup" Component={Signup} />
          <Route exact path="player" Component={Player} />
          <Route exact path="/movies" Component={Movies}/>
          <Route exact path="/tvseries" Component={Tvshows}/>
          <Route exact path="/mylist" Component={Liked}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
