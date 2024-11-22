import Wine from "./Wine";
import { Component } from "react";

class App extends Component {
  render() {
    return (
      <>
        <Wine title="Wine1" description="hgfghjkhjfdfghb" rating="4/5" />
        <Wine title="Wine2" description="hgfdsvfbghj" rating="3/5" />
        <Wine title="Wine3" description="hjgfdfcv" rating="2/5" />
      </>
    );
  }
}
export default App;
