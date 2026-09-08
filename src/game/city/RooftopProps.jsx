import WaterTank from './props/WaterTank.jsx';
import ACUnit from './props/ACUnit.jsx';
import Antenna from './props/Antenna.jsx';
import SatelliteDish from './props/SatelliteDish.jsx';
import SecurityBulkhead from './props/SecurityBulkhead.jsx';

const PROP_COMPONENTS = {
  waterTank: WaterTank,
  acUnit: ACUnit,
  antenna: Antenna,
  satelliteDish: SatelliteDish,
  bulkhead: SecurityBulkhead,
};

export default function RooftopProps({ tower }) {
  const { rooftopProps = [], width, depth } = tower;

  if (!rooftopProps || rooftopProps.length === 0) return null;

  // Pre-calculated deterministic rooftop layout slots (away from center landing circle)
  const slotPositions = [
    [-width * 0.32, 0, -depth * 0.32], // 0: Northwest corner
    [width * 0.32, 0, -depth * 0.32],  // 1: Northeast corner
    [-width * 0.32, 0, depth * 0.32],  // 2: Southwest corner
    [width * 0.32, 0, depth * 0.32],   // 3: Southeast corner
    [0, 0, -depth * 0.36],             // 4: North edge
    [-width * 0.36, 0, 0],             // 5: West edge
  ];

  return (
    <group>
      {rooftopProps.map((propKey, index) => {
        const Component = PROP_COMPONENTS[propKey];
        if (!Component) return null;

        const slot = slotPositions[index % slotPositions.length];

        return (
          <Component
            key={`${propKey}-${index}`}
            position={slot}
          />
        );
      })}
    </group>
  );
}

