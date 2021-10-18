import {Switch,Route} from "react-router-dom"
import Home from "./Home.jsx"
import Payment from "./Payment"
const App=()=>{
    return(
        <>
        <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route exact path="/payment" component={Payment}></Route>
        </Switch>
        </>
    );

};

export default App;
