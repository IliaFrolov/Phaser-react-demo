import { useRef, useState } from "react";
import { IRefPhaserGame, PhaserGame } from "./game/PhaserGame";
import { MainMenu } from "./game/scenes/MainMenu";
import { Game } from "./game/scenes/Game";

function App() {
  // The sprite can only be moved in the MainMenu Scene
  const [animState, setAnimState] = useState("idle");

  //  References to the PhaserGame component (game and scene are exposed)
  const phaserRef = useRef<IRefPhaserGame | null>(null);

  const changeScene = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as MainMenu;

      if (scene) {
        scene.changeScene();
      }
    }
  };
  const walk = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Game;
      if (scene && scene.scene.key === "Game") {
        scene.walk();
      }
    }
  };
  const run = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Game;
      if (scene && scene.scene.key === "Game") {
        scene.run();
      }
    }
  };
  const stop = () => {
    if (phaserRef.current) {
      const scene = phaserRef.current.scene as Game;
      if (scene && scene.scene.key === "Game") {
        scene.stop();
      }
    }
  };

  // Event emitted from the PhaserGame component
  const currentScene = (scene: Phaser.Scene) => {
    console.log({ scene });
  };

  return (
    <div id="app">
      <PhaserGame
        ref={phaserRef}
        currentActiveScene={currentScene}
        currentAnimationState={(state) => {
          console.log({ state });

          setAnimState(state);
        }}
      />
      <div className="controls">
        {/* <button className="button" onClick={changeScene}>
            Change Scene
          </button> */}
        <button
          disabled={animState == "walk"}
          className="button"
          onClick={walk}
        >
          Walk
        </button>
        <button disabled={animState == "run"} className="button" onClick={run}>
          Run
        </button>

        <button
          disabled={animState == "idle"}
          className="button"
          onClick={stop}
        >
          Stop
        </button>
      </div>
    </div>
  );
}

export default App;
