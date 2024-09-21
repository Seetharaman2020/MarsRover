import React, { useState } from "react";

type Direction = "N" | "E" | "S" | "W";

interface Position {
  x: number;
  y: number;
  direction: Direction;
}

const MarsRover: React.FC = () => {
  const [plateauSize, setPlateauSize] = useState<[number, number]>([0, 0]);
  const [roverPosition, setRoverPosition] = useState<Position>({
    x: 0,
    y: 0,
    direction: "N",
  });
  const [instructions, setInstructions] = useState<string>("");

  const moveRover = () => {
    let { x, y, direction } = roverPosition;

    const turnLeft = (): Direction => {
      switch (direction) {
        case "N":
          return "W";
        case "E":
          return "N";
        case "S":
          return "E";
        case "W":
          return "S";
      }
    };
    // adding a minor commit #1 - git rebase squash
    // comment 2 added
    const turnRight = (): Direction => {
      switch (direction) {
        case "N":
          return "E";
        case "E":
          return "S";
        case "S":
          return "W";
        case "W":
          return "N";
      }
    };

    const moveForward = (): void => {
      switch (direction) {
        case "N":
          if (y < plateauSize[1]) y++;
          break;
        case "E":
          if (x < plateauSize[0]) x++;
          break;
        case "S":
          if (y > 0) y--;
          break;
        case "W":
          if (x > 0) x--;
          break;
      }
    };

    for (const instruction of instructions) {
      switch (instruction) {
        case "L":
          direction = turnLeft();
          break;
        case "R":
          direction = turnRight();
          break;
        case "M":
          moveForward();
          break;
      }
    }

    setRoverPosition({ x, y, direction });
  };

  const handlePlateauSizeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const size = event.target.value.split(" ").map(Number);
    setPlateauSize([size[0], size[1]]);
  };

  const handleStartingPositionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const positionData = event.target.value.split(" ");
    setRoverPosition({
      x: parseInt(positionData[0]),
      y: parseInt(positionData[1]),
      direction: positionData[2] as Direction,
    });
  };

  const handleInstructionsChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInstructions(event.target.value);
  };

  return (
    <div>
      <h1>Mars Rover</h1>
      <div>
        <label>Starting Position: </label>
        <input
          type="text"
          placeholder="Enter Starting position..."
          onChange={handleStartingPositionChange}
        />
      </div>
      <div>
        <label>Instructions: </label>
        <input
          type="text"
          placeholder="Enter instructions..."
          onChange={handleInstructionsChange}
        />
      </div>
      <div>
        <label>Plateau Size: </label>
        <input
          type="text"
          placeholder="Enter plateau size..."
          onChange={handlePlateauSizeChange}
        />
      </div>
      <button onClick={moveRover}>Move Rover</button>
      <p>
        Final Position: {roverPosition.x}, {roverPosition.y},{" "}
        {roverPosition.direction}
      </p>
    </div>
  );
};

export default MarsRover;
