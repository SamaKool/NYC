import GameCanvas from './game/GameCanvas.jsx';
import GameLoop from './game/GameLoop.jsx';
import Lights from './game/Lights.jsx';
import Skybox from './game/Skybox.jsx';
import PostProcessing from './game/PostProcessing.jsx';
import CameraController from './game/camera/CameraController.jsx';
import PlayerController from './game/player/PlayerController.jsx';
import CityGrid from './game/city/CityGrid.jsx';
import SectionTower from './game/city/SectionTower.jsx';
import StreetLevel from './game/city/StreetLevel.jsx';
import HeroGround from './game/sections/HeroGround.jsx';
import HUDOverlay from './hud/HUDOverlay.jsx';
import { TOWER_LIST } from './config/constants.js';

export default function App() {
  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#0a0e27]">
      {/* 3D Open World Canvas */}
      <GameCanvas>
        <GameLoop />
        <Lights />
        <Skybox />
        <CameraController />
        <PlayerController />
        <CityGrid />
        <StreetLevel />
        <HeroGround />
        {TOWER_LIST.map((tower) => (
          <SectionTower key={tower.id} tower={tower} />
        ))}
        <PostProcessing />
      </GameCanvas>

      {/* Cyberpunk Spider-Man HUD Overlay */}
      <HUDOverlay />
    </div>
  );
}
