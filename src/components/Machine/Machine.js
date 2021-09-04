import "./Machine.css";

const Machine = () => {
  const three = [1, 2, 3];
  const rowSize = [1, 2, 3, 4];
  const columnSize = [1, 2, 3, 4, 5];

  return (
    <div className="machine__container">
      <div className="machine__left">
        <div className="machine__display">
          {columnSize.map((col) => (
            <div key={col} className="machine__column">
              {rowSize.map((row) => (
                <div key={row} className="machine__product"></div>
              ))}
            </div>
          ))}
        </div>
        <div className="machine__out"></div>
      </div>
      <div className="machine__right">
        <div className="machine__rightFirst"></div>
        <div className="machine__rightSecond">
        {
            rowSize.map(row => (
                <div key={row} className='machine__rightSecondRow' >
                    {
                        three.map(el => (
                            <div key={el} className="machine__rightSecondCol" ></div>
                        ))
                    }
                </div>
            ))
        }
        </div>
        <div className="machine__rightThird"></div>
        <div className="machine__rightLast"></div>
      </div>
    </div>
  );
};

export default Machine;
