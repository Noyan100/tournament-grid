import React from 'react';
import './App.css';

function Item({ obj, current }) {
  return <div className="element">{obj.id}</div>;
}

function App() {
  const names = ['Testing', 'Arrr', 'RGD', 'TET', 'GRER', 'NIK', 'NAST', 'RERrR', 'gGRGG'];

  const [currentElement, setCurrentElement] = React.useState(1);
  const [currentPlayers, setCurrentPlayers] = React.useState();
  const [resultGrid, setResultGrid] = React.useState();
  const [amount, setAmount] = React.useState(8);
  const [localAmount, setLocalAmount] = React.useState(amount);

  const players = [];
  for (let i = 1; i <= amount; i++) {
    players.push({ id: i, name: 'name' });
  }

  React.useEffect(() => {
    setCurrentPlayers(players);
  }, [amount]);
  React.useEffect(() => {
    let count = -1;
    function gridGenerate(amount) {
      if (amount === 1) {
        count = count + 2;
        return {
          name: 'amount',
          players: [players[count - 1], players[count]],
        };
      } else {
        return {
          name: 'amount',
          players: [{}, {}],
          children: [gridGenerate(amount / 2), gridGenerate(amount / 2)],
        };
      }
    }
    const grid = gridGenerate(amount / 2);

    const tempGrid = [];
    function gridCreate(element) {
      return 'children' in element
        ? element.children.map((el) => gridCreate(el))
        : tempGrid.push(element);
    }
    gridCreate(grid);
    setResultGrid(tempGrid);
  }, [players]);

  const onChangeInput = (event) => {
    setLocalAmount(event.target.value);
    if (event.target.value > 128) setLocalAmount(128);
    if (event.target.value < 1) setLocalAmount(1);
  };
  const onKeyPress = (event) => {
    const code = event.keyCode || event.which;
    if (code === 13) {
      if (Math.log2(localAmount) % 1 === 0) {
        setAmount(localAmount);
      }
    }
  };
  const onBtnClick = () => {
    if (Math.log2(localAmount) % 1 === 0) {
      setAmount(localAmount);
    }
  };

  const onClickElement = () => {};

  const onClickPlayer = (obj) => {
    setCurrentPlayers(currentPlayers.filter((item) => item.id !== obj.id));
  };

  return (
    <div className="App">
      <label htmlFor="amount">Bracket Size: </label>
      <input
        type="number"
        id="amount"
        value={localAmount}
        onChange={onChangeInput}
        onKeyPress={onKeyPress}
      />
      <button type="submit" onClick={onBtnClick}>
        Enter
      </button>
      {resultGrid && (
        <>
          <div className="players">
            {currentPlayers.map((obj, index) => (
              <div className="player" key={obj + index} onClick={() => onClickPlayer(obj)}>
                {obj.name} {obj.id}
              </div>
            ))}
          </div>
          <button className="random">Random</button>
          <div className="grid">
            <div className="startgrid">
              {resultGrid.map((obj, indexOne) => (
                <div className="wrapper" key={obj + indexOne} onClick={onClickElement}>
                  {obj.players.map((value, index) => {
                    return <Item key={value + index} obj={value} current={currentElement} />;
                  })}
                </div>
              ))}
            </div>
            {resultGrid.map((_, index) => {
              resultGrid.splice(1, index === 0 ? 0 : resultGrid.length / 2);
              return (
                <div className="nextgrid" key={index}>
                  {resultGrid.map((obj, index) => {
                    return <div className="element" key={obj + index}></div>;
                  })}
                </div>
              );
            })}
            {resultGrid.length === 1 ? (
              ''
            ) : (
              <div className="lastgrid">
                <div className="element"></div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
