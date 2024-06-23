import GridContainer from "./components/GridContainer";
import GridNode from "./components/GridNode";
import './styles/index.css'

function App() {
  return (
    <>
      <GridContainer></GridContainer>
      <GridNode x={0} y={0}></GridNode>
    </>
  );
}

export default App;
